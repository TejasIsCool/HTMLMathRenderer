'use strict';

const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { buildIndex, mathStart, findActiveArg } = require('./lib');
const preview = require('./preview');

const COMMANDS_FILE = path.join(__dirname, 'commands.json');

let index = buildIndex([]);
let registrations = [];

// ---------------------------------------------------------------- commands.json

function loadCommands(showMessage) {
  try {
    const parsed = JSON.parse(fs.readFileSync(COMMANDS_FILE, 'utf8'));
    if (!Array.isArray(parsed)) throw new Error('top level must be an array');
    index = buildIndex(parsed);
    if (showMessage) vscode.window.showInformationMessage(`m-eq: loaded ${index.list.length} commands.`);
  } catch (e) {
    vscode.window.showErrorMessage(`m-eq: could not read commands.json (${e.message}). Keeping the previous list.`);
  }
}

function watchCommands(context) {
  try {
    // Watch the folder (not the file): the generator replaces the file via rename.
    let timer;
    const watcher = fs.watch(__dirname, (_event, filename) => {
      if (filename !== 'commands.json') return;
      clearTimeout(timer);
      timer = setTimeout(() => loadCommands(false), 200);
    });
    context.subscriptions.push({ dispose: () => { clearTimeout(timer); watcher.close(); } });
  } catch {
    /* watching is a nicety; the reload command still works */
  }
}

// ---------------------------------------------------------------- helpers

function textBefore(document, position) {
  return document.getText(new vscode.Range(new vscode.Position(0, 0), position));
}

/** Text of the current equation up to the cursor, or undefined when not inside <m-eq>. */
function equationBefore(document, position) {
  const text = textBefore(document, position);
  const start = mathStart(text);
  return start === -1 ? undefined : text.slice(start);
}

function describe(cmd, extraAliasNote) {
  const md = new vscode.MarkdownString();
  let any = false;
  if (cmd.glyph) {
    md.appendText(cmd.glyph);
    md.appendMarkdown('\n\n');
    any = true;
  }
  if (cmd.doc) {
    md.appendMarkdown(cmd.doc + '\n\n');
    any = true;
  }
  if (extraAliasNote) {
    md.appendMarkdown(extraAliasNote + '\n\n');
    any = true;
  } else if (cmd.aliases && cmd.aliases.length) {
    md.appendMarkdown('Also: ' + cmd.aliases.map((a) => '`\\' + a + '`').join(', ') + '\n\n');
    any = true;
  }
  return any ? md : undefined;
}

// ---------------------------------------------------------------- providers

const completionProvider = {
  provideCompletionItems(document, position) {
    const lineBefore = document.lineAt(position.line).text.slice(0, position.character);
    const typed = /\\[A-Za-z]*$/.exec(lineBefore);
    if (!typed) return undefined;
    if (equationBefore(document, position) === undefined) return undefined;

    // The default word range ignores the backslash, so build our own range that includes it.
    const range = new vscode.Range(position.line, position.character - typed[0].length, position.line, position.character);

    const items = [];
    for (const cmd of index.list) {
      const names = [cmd.name, ...(cmd.aliases || [])];
      names.forEach((name, k) => {
        const text = '\\' + name;
        const kind = cmd.snippet ? vscode.CompletionItemKind.Function : vscode.CompletionItemKind.Constant;
        const item = new vscode.CompletionItem({ label: text, description: cmd.glyph || undefined }, kind);
        item.filterText = text;
        item.range = range;
        item.sortText = (k === 0 ? '0' : '1') + name;

        let snippet = cmd.snippet;
        if (snippet && k > 0) {
          // alias: swap the command name at the start of the snippet
          const head = '\\' + cmd.name;
          snippet = snippet.startsWith(head) ? text + snippet.slice(head.length) : undefined;
        }
        item.insertText = snippet ? new vscode.SnippetString(snippet) : text;

        if (k > 0) item.detail = 'alias of \\' + cmd.name;
        item.documentation = describe(cmd, k > 0 ? 'Alias of `\\' + cmd.name + '`.' : undefined);
        if (cmd.params && cmd.params.length && snippet) {
          item.command = { command: 'editor.action.triggerParameterHints', title: 'Parameter hints' };
        }
        items.push(item);
      });
    }
    return items;
  },
};

const signatureProvider = {
  provideSignatureHelp(document, position) {
    const equation = equationBefore(document, position);
    if (equation === undefined) return undefined;
    const hit = findActiveArg(equation, index.byName);
    if (!hit) return undefined;

    const { cmd, index: active } = hit;
    const head = '\\' + cmd.name;
    const labels = cmd.params.map((p) => '{' + p.label + '}');

    const signature = new vscode.SignatureInformation(
      head + labels.join(''),
      cmd.doc ? new vscode.MarkdownString(cmd.doc) : undefined
    );
    let offset = head.length;
    signature.parameters = cmd.params.map((p, i) => {
      const range = [offset, offset + labels[i].length]; // offsets, so repeated labels highlight correctly
      offset += labels[i].length;
      return new vscode.ParameterInformation(range, p.doc ? new vscode.MarkdownString(p.doc) : undefined);
    });

    const help = new vscode.SignatureHelp();
    help.signatures = [signature];
    help.activeSignature = 0;
    help.activeParameter = active;
    return help;
  },
};

const hoverProvider = {
  provideHover(document, position) {
    if (equationBefore(document, position) === undefined) return undefined;
    const range = document.getWordRangeAtPosition(position, /\\[A-Za-z]+/);
    if (!range) return undefined;
    const cmd = index.byName.get(document.getText(range).slice(1));
    if (!cmd) return undefined;
    const md = describe(cmd);
    return md ? new vscode.Hover(md, range) : undefined;
  },
};

// ---------------------------------------------------------------- activation

function register() {
  registrations.forEach((d) => d.dispose());
  const languages = vscode.workspace.getConfiguration('mathEq').get('languages', ['html', 'markdown']);
  registrations = [
    vscode.languages.registerCompletionItemProvider(languages, completionProvider, '\\'),
    vscode.languages.registerSignatureHelpProvider(languages, signatureProvider, {
      triggerCharacters: ['{'],
      retriggerCharacters: ['}'],
    }),
    vscode.languages.registerHoverProvider(languages, hoverProvider),
  ];
}

function activate(context) {
  loadCommands(false);
  register();
  watchCommands(context);
  preview.register(context);

  context.subscriptions.push(
    { dispose: () => registrations.forEach((d) => d.dispose()) },
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('mathEq.languages')) register();
    }),
    vscode.commands.registerCommand('mathEq.reloadCommands', () => loadCommands(true))
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
