'use strict';
/**
 * Pure logic, no `vscode` import, so it can be tested with plain node.
 */

/** Build lookup structures from the parsed commands.json. */
function buildIndex(commands) {
  const byName = new Map();
  const list = [];
  for (const cmd of commands) {
    if (!cmd || typeof cmd.name !== 'string') continue;
    list.push(cmd);
    if (!byName.has(cmd.name)) byName.set(cmd.name, cmd);
    for (const alias of cmd.aliases || []) {
      if (!byName.has(alias)) byName.set(alias, cmd);
    }
  }
  return { byName, list };
}

/**
 * Given all the text from the start of the document up to the cursor, returns
 * the index just after the opening <m-eq> / <m-eqi> tag if the cursor is inside
 * such an element, otherwise -1.
 */
function mathStart(textBeforeCursor) {
  const re = /<(\/?)m-eqi?(?=[\s>])[^>]*>/g;
  let start = -1;
  let m;
  while ((m = re.exec(textBeforeCursor))) {
    start = m[1] ? -1 : m.index + m[0].length;
  }
  return start;
}

// A command followed directly by one of these may be a longer name like `left[` or `lr(`.
// ({ and } are deliberately NOT here: in `\left{bracket}{content}` the brace opens an argument.)
const NAME_SUFFIX_CHARS = '[]()|';

/**
 * Given the equation text from the opening tag up to the cursor, finds which
 * braced argument of which command the cursor is in.
 * Returns { cmd, index } (index is 0-based) or undefined.
 *
 * A `{` counts as an argument of a command when it directly follows the command
 * (or the `}` of its previous argument), and the command still has params left.
 * Any other `{` is a plain group. Innermost argument wins.
 */
function findActiveArg(mathText, byName) {
  const stack = []; // { cmd, index } for argument braces; { cmd: null } for plain groups
  let pending = null; // { cmd, next }: command currently waiting for its next argument
  const nameRe = /[A-Za-z]+/y;
  let i = 0;

  while (i < mathText.length) {
    const ch = mathText[i];

    // HTML inside the equation (<br>, <img ...>, comments): skip over it
    if (ch === '<' && /[A-Za-z\/!]/.test(mathText[i + 1] || '')) {
      const isComment = mathText.startsWith('<!--', i);
      const end = isComment ? mathText.indexOf('-->', i + 4) : mathText.indexOf('>', i + 1);
      if (end === -1) return undefined; // cursor is inside an HTML tag
      i = end + (isComment ? 3 : 1);
      continue;
    }

    if (ch === '\\') {
      nameRe.lastIndex = i + 1;
      const m = nameRe.exec(mathText);
      if (m) {
        let name = m[0];
        let end = i + 1 + name.length;
        const next = mathText[end];
        if (next && NAME_SUFFIX_CHARS.includes(next) && byName.has(name + next)) {
          name += next;
          end++;
        }
        const cmd = byName.get(name);
        pending = cmd && cmd.params && cmd.params.length ? { cmd, next: 0 } : null;
        i = end;
      } else {
        pending = null;
        i += 2; // escaped character: \{ \} \\ \^ \_ ...
      }
      continue;
    }

    if (ch === '{') {
      stack.push(pending ? { cmd: pending.cmd, index: pending.next } : { cmd: null, index: -1 });
      pending = null;
    } else if (ch === '}') {
      const frame = stack.pop();
      pending =
        frame && frame.cmd && frame.index + 1 < frame.cmd.params.length
          ? { cmd: frame.cmd, next: frame.index + 1 }
          : null;
    } else if (!/\s/.test(ch)) {
      pending = null;
    }
    i++;
  }

  for (let k = stack.length - 1; k >= 0; k--) {
    if (stack[k].cmd) return { cmd: stack[k].cmd, index: stack[k].index };
  }
  return undefined;
}

/**
 * Finds the whole <m-eq>/<m-eqi> element the cursor is in.
 * Returns { tag, open, text } or undefined:
 *   tag  - 'm-eq' or 'm-eqi'
 *   open - the opening tag exactly as written (may carry attributes)
 *   text - everything between the tags (the whole equation, not just up to the cursor)
 * If the element isn't closed yet, the text runs up to the cursor.
 */
function equationAt(text, offset) {
  const before = text.slice(0, offset);
  const re = /<(\/?)(m-eqi?)(?=[\s>])[^>]*>/g;
  let open;
  let m;
  while ((m = re.exec(before))) {
    open = m[1] ? undefined : { tag: m[2], open: m[0], start: m.index + m[0].length };
  }
  if (!open) return undefined;
  const close = new RegExp('</' + open.tag + '\\s*>').exec(text.slice(open.start));
  const end = close ? open.start + close.index : offset;
  return { tag: open.tag, open: open.open, text: text.slice(open.start, end) };
}

/**
 * Finds the <script src="..."> that loads the math-eq library in an HTML/Markdown
 * document and returns the src exactly as written, or undefined.
 * Matches file names / URLs containing math-eq, MathToHTML or HTMLMathRenderer.
 */
function findLibraryScript(text) {
  const re = /<script\b[^>]*?\bsrc\s*=\s*(["'])(.*?)\1/gis;
  let m;
  while ((m = re.exec(text))) {
    if (/math-?eq|MathToHTML|HTMLMathRenderer/i.test(m[2])) return m[2].trim();
  }
  return undefined;
}

module.exports = { buildIndex, mathStart, findActiveArg, equationAt, findLibraryScript };
