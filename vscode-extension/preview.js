'use strict';
/**
 * Live preview: a side panel that renders the <m-eq> / <m-eqi> element the
 * cursor is in, using the real math-eq library (the same file your pages use).
 */

const vscode = require('vscode');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { equationAt, findLibraryScript } = require('./lib');

// Last resort when nothing else is found. No version in the URL: jsDelivr serves the latest.
const DEFAULT_LIBRARY_URL = 'https://cdn.jsdelivr.net/gh/TejasIsCool/HTMLMathRenderer/dist/math-eq.min.js';

let panel;
let disposables = [];
let timer;
let lastPayload;
let currentLibKey;

// ---------------------------------------------------------------- library lookup

const isFile = (p) => {
  try { return fs.statSync(p).isFile(); } catch { return false; }
};

/** The library the document itself loads, via its <script src="...">. */
function fromScriptTag(doc, folders) {
  const src = doc && findLibraryScript(doc.getText());
  if (!src) return undefined;
  if (/^https?:\/\//i.test(src)) return { url: src };
  if (src.startsWith('//')) return { url: 'https:' + src };
  if (/^[a-z][a-z0-9+.-]*:/i.test(src)) return undefined; // data:, file: ... not handled

  if (!doc.uri || doc.uri.scheme !== 'file') return undefined;
  const clean = src.split(/[?#]/)[0];
  const candidates = clean.startsWith('/')
    ? folders.map((f) => path.join(f, clean)) // root-relative: try each workspace folder
    : [path.resolve(path.dirname(doc.uri.fsPath), clean)];
  const file = candidates.find(isFile);
  return file ? { file } : undefined;
}

/**
 * Where to load math-eq.min.js from: { file } (local) or { url } (remote).
 * Order: setting -> the document's own <script src> -> <extension>/../dist ->
 *        <workspace>/dist -> jsDelivr.
 */
function findLibrary(doc) {
  const setting = String(vscode.workspace.getConfiguration('mathEq').get('previewLibrary', '')).trim();
  const folders = (vscode.workspace.workspaceFolders || []).map((f) => f.uri.fsPath);

  if (/^https?:\/\//i.test(setting)) return { url: setting };
  if (setting) {
    const c = path.isAbsolute(setting) ? [setting] : folders.map((f) => path.join(f, setting));
    const file = c.find(isFile);
    if (file) return { file };
  }

  const fromDoc = fromScriptTag(doc, folders);
  if (fromDoc) return fromDoc;

  const candidates = [path.join(__dirname, '..', 'dist', 'math-eq.min.js')]; // extension inside <repo>/vscode-extension
  folders.forEach((f) => candidates.push(path.join(f, 'dist', 'math-eq.min.js')));
  const file = candidates.find(isFile);
  return file ? { file } : { url: DEFAULT_LIBRARY_URL };
}

function describeLibrary(lib) {
  return lib.file ? lib.file : lib.url;
}

// ---------------------------------------------------------------- webview page

const escAttr = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function buildHtml({ cspSource, nonce, libSrc, libLabel }) {
  // The library injects a <style> that @imports KaTeX's CSS (and fonts) from jsDelivr,
  // hence 'unsafe-inline' for styles and the jsDelivr entries.
  const csp = [
    "default-src 'none'",
    `script-src 'nonce-${nonce}' ${cspSource}`,
    `style-src 'unsafe-inline' ${cspSource} https://cdn.jsdelivr.net`,
    `font-src ${cspSource} https://cdn.jsdelivr.net`,
    `img-src ${cspSource} https: data:`,
  ].join('; ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<base id="base" href="">
<style>
  body { margin: 0; padding: 0; color: var(--vscode-editor-foreground); background: var(--vscode-editor-background); font-family: var(--vscode-font-family); }
  #bar { position: sticky; top: 0; display: flex; gap: 8px; align-items: center; padding: 6px 12px;
         background: var(--vscode-editor-background); border-bottom: 1px solid var(--vscode-panel-border, #8884); font-size: 12px; }
  #bar button { color: var(--vscode-button-secondaryForeground); background: var(--vscode-button-secondaryBackground);
                border: none; border-radius: 3px; padding: 2px 8px; cursor: pointer; font-size: 13px; }
  #bar button:hover { background: var(--vscode-button-secondaryHoverBackground); }
  #status { opacity: 0.75; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  #status.error { color: var(--vscode-errorForeground); opacity: 1; }
  #stage { padding: 24px 16px; overflow: auto; }
  #out { display: inline-block; font-size: 32px; line-height: 1.5; }
  #out.stale { opacity: 0.45; }
</style>
<script nonce="${nonce}" src="${libSrc}"></script>
</head>
<body>
  <div id="bar">
    <span id="status" title="${escAttr(libLabel || libSrc)}">Put the cursor inside an equation to preview it.</span>
    <button id="smaller" title="Smaller">A&minus;</button>
    <button id="bigger" title="Bigger">A+</button>
  </div>
  <div id="stage"><div id="out"></div></div>
<script nonce="${nonce}">
(function () {
  const vscode = acquireVsCodeApi();
  const out = document.getElementById('out');
  const status = document.getElementById('status');
  const baseEl = document.getElementById('base');
  let size = (vscode.getState() || {}).size || 32;
  out.style.fontSize = size + 'px';

  function setStatus(text, isError) {
    status.textContent = text;
    status.className = isError ? 'error' : '';
  }
  function resize(delta) {
    size = Math.max(10, Math.min(160, size + delta));
    out.style.fontSize = size + 'px';
    vscode.setState({ size: size });
  }
  document.getElementById('smaller').addEventListener('click', function () { resize(-4); });
  document.getElementById('bigger').addEventListener('click', function () { resize(4); });

  // capture = true so failed <script src> / stylesheet loads are reported too
  let styleWarning = '';
  window.addEventListener('error', function (e) {
    const tag = e.target && e.target.tagName;
    if (tag === 'SCRIPT') {
      setStatus('Could not load the math-eq library (' + e.target.src + '). See the mathEq.previewLibrary setting.', true);
    } else if (tag === 'STYLE' || tag === 'LINK') {
      // the KaTeX stylesheet / fonts come from jsDelivr: probably offline
      styleWarning = '  (KaTeX fonts could not be loaded, are you offline?)';
      setStatus('KaTeX fonts could not be loaded, are you offline? Equations may look off.', false);
    } else if (e.message) {
      setStatus('Render error: ' + e.message, true);
    }
  }, true);

  window.addEventListener('message', function (ev) {
    const m = ev.data;
    if (m.type === 'render') {
      if (!customElements.get('m-eq')) {
        setStatus('The math-eq library did not register <m-eq>. Check mathEq.previewLibrary.', true);
        return;
      }
      if (m.base) baseEl.href = m.base;
      out.className = '';
      setStatus(m.label + styleWarning, false);
      out.innerHTML = m.html;
    } else if (m.type === 'outside') {
      out.className = 'stale';
      setStatus('Cursor is not inside an <m-eq> (showing the last equation).', false);
    }
  });

  vscode.postMessage({ type: 'ready' });
})();
</script>
</body>
</html>`;
}

// ---------------------------------------------------------------- panel

function previewLanguages() {
  return vscode.workspace.getConfiguration('mathEq').get('languages', ['html', 'markdown']);
}

function resourceRoots(lib, doc) {
  const roots = (vscode.workspace.workspaceFolders || []).map((f) => f.uri);
  if (lib.file) roots.push(vscode.Uri.file(path.dirname(lib.file)));
  if (doc && doc.uri && doc.uri.scheme === 'file') roots.push(vscode.Uri.file(path.dirname(doc.uri.fsPath)));
  return roots;
}

/** (Re)loads the webview page if the library for this document differs from the loaded one. */
function applyLibrary(doc) {
  const lib = findLibrary(doc);
  const key = describeLibrary(lib);
  if (key === currentLibKey) return false;
  currentLibKey = key;
  lastPayload = undefined;

  panel.webview.options = { enableScripts: true, localResourceRoots: resourceRoots(lib, doc) };
  panel.webview.html = buildHtml({
    cspSource: panel.webview.cspSource,
    nonce: crypto.randomBytes(16).toString('hex'),
    libSrc: lib.file ? panel.webview.asWebviewUri(vscode.Uri.file(lib.file)).toString() : lib.url,
    libLabel: 'Library: ' + key,
  });
  return true;
}

function update(force) {
  if (!panel) return;
  const editor = vscode.window.activeTextEditor;
  if (!editor || !previewLanguages().includes(editor.document.languageId)) return; // keep showing the last one

  const doc = editor.document;
  if (applyLibrary(doc)) return; // page reloads with the right library, then 'ready' calls update() again
  const eq = equationAt(doc.getText(), doc.offsetAt(editor.selection.active));

  let payload;
  if (!eq) {
    payload = { type: 'outside' };
  } else {
    let base = '';
    if (doc.uri.scheme === 'file') {
      base = panel.webview.asWebviewUri(vscode.Uri.file(path.dirname(doc.uri.fsPath))).toString().replace(/\/?$/, '/');
    }
    payload = {
      type: 'render',
      html: eq.open + eq.text + '</' + eq.tag + '>',
      label: '<' + eq.tag + '>  ' + path.basename(doc.fileName),
      base,
    };
  }

  const key = JSON.stringify(payload);
  if (!force && key === lastPayload) return;
  lastPayload = key;
  panel.webview.postMessage(payload);
}

function schedule() {
  clearTimeout(timer);
  timer = setTimeout(() => update(false), 120);
}

function openPreview() {
  if (panel) {
    panel.reveal(vscode.ViewColumn.Beside, true);
    update(true);
    return;
  }

  const active = vscode.window.activeTextEditor;
  const doc = active && previewLanguages().includes(active.document.languageId) ? active.document : undefined;

  panel = vscode.window.createWebviewPanel(
    'mathEqPreview',
    'm-eq Preview',
    { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
    { enableScripts: true, retainContextWhenHidden: true, localResourceRoots: resourceRoots(findLibrary(doc), doc) }
  );
  currentLibKey = undefined;
  applyLibrary(doc);

  disposables.push(
    panel.webview.onDidReceiveMessage((msg) => {
      if (msg && msg.type === 'ready') update(true);
    }),
    vscode.window.onDidChangeTextEditorSelection(schedule),
    vscode.window.onDidChangeActiveTextEditor(schedule),
    vscode.workspace.onDidChangeTextDocument(schedule),
    panel.onDidDispose(() => {
      clearTimeout(timer);
      disposables.forEach((d) => d.dispose());
      disposables = [];
      panel = undefined;
      lastPayload = undefined;
      currentLibKey = undefined;
    })
  );
}

function register(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('mathEq.openPreview', openPreview),
    { dispose: () => panel && panel.dispose() }
  );
}

module.exports = { register, buildHtml, findLibrary };
