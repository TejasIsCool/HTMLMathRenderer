#!/usr/bin/env node
/**
 * generate-commands.mjs
 *
 * Builds / updates commands.json for the autocomplete extension from the
 * renderer's constants.js.
 *
 *   node generate-commands.mjs [constants.js] [commands.json] [--dry-run] [--no-backup]
 *
 * With no arguments it works from any directory:
 *   - constants.js is looked up at ../src/constants.js, then ../constants.js
 *     (relative to this script)
 *   - commands.json lives next to this script
 * Pass paths explicitly (relative to your current directory) to override.
 *
 * Merge rules (so your manual edits are safe):
 *   - If commands.json exists it is read first. Every `name` and every entry in
 *     `aliases` counts as "already defined".
 *   - Existing entries are never modified or removed, in any way. Docs, params,
 *     snippets, extra fields you invented: all kept as-is.
 *   - Only names from constants.js that are NOT defined yet get appended.
 *   - If commands.json is invalid JSON the script stops without touching it.
 *   - Names in commands.json that no longer exist in constants.js are only
 *     reported, never deleted.
 *   - Before writing, the old file is copied to commands.json.bak (unless
 *     --no-backup). Nothing is written if there is nothing new.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

// ---------------------------------------------------------------------------
// Hand-written knowledge about the structured commands (only used for NEW
// entries). Anything not listed here gets generic params (arg1, arg2, ...)
// and is reported at the end so you know to fill it in.
// ---------------------------------------------------------------------------

const P = (label, doc) => ({ label, doc });

const ATTACH = [
  P('main', 'The element the scripts attach to.'),
  P('top-right', 'Superscript position (top right).'),
  P('bottom-right', 'Subscript position (bottom right).'),
  P('top-left', 'Top left script.'),
  P('bottom-left', 'Bottom left script.'),
  P('up', 'Placed directly above the main element.'),
  P('down', 'Placed directly below the main element.'),
];
const OVERLAP = P('overlap', 'Overlap in em that pulls the scripts closer to the main element (default 0.3em).');
const SCALE_ARG = P('scale', 'Scale of the attached elements (default 0.6).');
const CONTENT = (d = 'The content.') => P('content', d);

/** @type {Record<string, {doc: string, params: {label: string, doc: string}[], snippet?: string}>} */
const SPECS = {
  over: {
    doc: 'Place the first argument directly over the second: `\\over{top}{main}`.',
    params: [P('top', 'Content placed above.'), P('main', 'The element it sits over.')],
  },
  under: {
    doc: 'Place the first argument directly under the second: `\\under{bottom}{main}`.',
    params: [P('bottom', 'Content placed below.'), P('main', 'The element it sits under.')],
  },
  cancel: {
    doc: 'Strikethrough from top right to bottom left.',
    params: [CONTENT('Content to cross out.')],
  },
  cancelangle: {
    doc: 'Strikethrough at a custom angle.',
    params: [P('angle', 'Angle in degrees.'), CONTENT('Content to cross out.')],
  },
  canceldir: {
    doc: 'Strikethrough in a chosen direction (`tlbr`, `trbl`, `ud`, `lr`, plus aliases like `diag`, `vert`, `horiz`).',
    params: [P('direction', 'tlbr, trbl, ud or lr (see documentation for aliases).'), CONTENT('Content to cross out.')],
    snippet: '\\canceldir{${1|tlbr,trbl,ud,lr|}}{$2}',
  },
  frac: {
    doc: 'Fraction with a horizontal line: `\\frac{numerator}{denominator}`.',
    params: [P('numerator', 'Top part.'), P('denominator', 'Bottom part.')],
  },
  atop: {
    doc: 'Like `\\frac`, but without the horizontal line.',
    params: [P('top', 'Top part.'), P('bottom', 'Bottom part.')],
  },
  root: {
    doc: 'N-th root: `\\root{index}{content}`.',
    params: [P('index', 'The root index (e.g. 3 for a cube root).'), CONTENT('What the root is taken of.')],
  },
  attach: {
    doc: 'Attach scripts around a main element. Leave unused slots empty: `\\attach{AB}{}{}{Above}{}{}{}`.',
    params: ATTACH,
  },
  attacho: {
    doc: 'Like `\\attach`, with an extra overlap parameter.',
    params: [...ATTACH, OVERLAP],
  },
  attachos: {
    doc: 'Like `\\attacho`, with an extra parameter for the scale of the attached elements.',
    params: [...ATTACH, OVERLAP, SCALE_ARG],
  },
  left: {
    doc: 'Left bracket that scales to the height of the content: `\\left{bracket}{content}`.',
    params: [P('bracket', 'Which bracket to draw. Use `\\{` for a curly brace.'), CONTENT('What the bracket scales with.')],
  },
  right: {
    doc: 'Right bracket that scales to the height of the content: `\\right{bracket}{content}`.',
    params: [P('bracket', 'Which bracket to draw. Use `\\}` for a curly brace.'), CONTENT('What the bracket scales with.')],
  },
  lr: {
    doc: 'Bracket pair scaling with the content: `\\lr{bracket1bracket2}{content}`. For some brackets the closing one is inferred.',
    params: [P('brackets', 'Both brackets, e.g. `()`. If several characters: first = left, rest = right.'), CONTENT('What the brackets scale with.')],
  },
  scale: {
    doc: 'Scale the content by a factor (uses CSS zoom).',
    params: [P('factor', 'Scale factor.'), CONTENT()],
  },
  scalew: {
    doc: 'Scale only the width of the content.',
    params: [P('factor', 'Width scale factor.'), CONTENT()],
  },
  scaleh: {
    doc: 'Scale only the height of the content.',
    params: [P('factor', 'Height scale factor.'), CONTENT()],
  },
  rotate: {
    doc: 'Rotate the content.',
    params: [P('degrees', 'Rotation in degrees.'), CONTENT()],
  },
  mathbb: {
    doc: 'Blackboard bold letters and digits, e.g. `\\mathbb{R}`.',
    params: [CONTENT('ASCII letters / digits to convert.')],
  },
  mathcal: {
    doc: 'Calligraphic letters, e.g. `\\mathcal{L}`.',
    params: [CONTENT('ASCII letters to convert.')],
  },
  underline: { doc: 'Line below the content.', params: [CONTENT()] },
  overline: { doc: 'Line above the content.', params: [CONTENT()] },
  sqrt: {
    doc: 'Square root: `\\sqrt{content}`. For an n-th root use `\\root{index}{content}`.',
    params: [CONTENT('What the root is taken of.')],
  },
};

/** Docs for plain symbols (keyed by the canonical name of the new entry). */
const SYMBOL_DOCS = {
  sum: 'Sum with scripts at the side. Use `\\sumb` for scripts above/below.',
  prod: 'Product with scripts at the side. Use `\\prodb` for scripts above/below.',
  int: 'Integral with scripts at the side. Use `\\intb` for scripts above/below.',
  cup: 'Union with scripts at the side. Use `\\union` / `\\bigcup` for scripts above/below.',
  cap: 'Intersection with scripts at the side. Use `\\intersect` / `\\bigcap` for scripts above/below.',
};

// ---------------------------------------------------------------------------

const { values: flags, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    'dry-run': { type: 'boolean', default: false },
    'no-backup': { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

if (flags.help) {
  console.log('Usage: node generate-commands.mjs [constants.js] [commands.json] [--dry-run] [--no-backup]');
  process.exit(0);
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

const constantsPath = positionals[0]
  ? path.resolve(positionals[0])
  : ['../src/constants.js', '../constants.js'].map((p) => path.resolve(scriptDir, p)).find((p) => fs.existsSync(p));
const outPath = positionals[1] ? path.resolve(positionals[1]) : path.join(scriptDir, 'commands.json');

if (!constantsPath) {
  die('Could not find constants.js (tried ../src/constants.js and ../constants.js).\n  Pass the path explicitly: node generate-commands.mjs path/to/constants.js');
}

function die(msg) {
  console.error('Error: ' + msg);
  process.exit(1);
}

/** constants.js uses `export`, which Node only accepts in .mjs (or "type": "module").
 *  So: copy it to a temp .mjs in the OS temp dir, import that, delete it again. */
async function loadConstants(file) {
  if (!fs.existsSync(file)) die(`constants file not found: ${file}`);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'meq-constants-'));
  const tmp = path.join(dir, 'constants.mjs');
  fs.writeFileSync(tmp, fs.readFileSync(file, 'utf8'));
  try {
    return await import(pathToFileURL(tmp).href);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function loadExisting(file) {
  if (!fs.existsSync(file)) return [];
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    die(`${file} is not valid JSON, refusing to touch it.\n  ${e.message}`);
  }
  if (!Array.isArray(parsed)) die(`${file} must contain a JSON array at the top level.`);
  parsed.forEach((entry, i) => {
    if (!entry || typeof entry.name !== 'string') die(`${file}: entry #${i} has no string "name".`);
  });
  return parsed;
}

/** Readable glyph for the completion dropdown: drop zero-width chars, decode the few HTML entities. */
function displayGlyph(raw) {
  return raw
    .replace(/\u200b/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function specFor(name, singlePop, doublePop) {
  if (SPECS[name]) return { spec: SPECS[name], generic: false };

  // left[ right] lr( ... : bracket variants taking one braced argument
  const m = /^(left|right|lr)(.)$/.exec(name);
  if (m && singlePop.has(name)) {
    const [, kind, ch] = m;
    const what = kind === 'left' ? 'Left bracket' : kind === 'right' ? 'Right bracket' : 'Bracket pair opened by';
    return {
      spec: {
        doc: `${what} \`${ch}\`, scaled to the content. Written as \`\\${name}{content}\`.`,
        params: [CONTENT('What the bracket scales with.')],
      },
      generic: false,
    };
  }

  // Unknown function: derive the arity from the pop lists
  const n = singlePop.has(name) ? 1 : doublePop.has(name) ? 2 : 0;
  return {
    spec: { doc: '', params: Array.from({ length: n }, (_, i) => P(`arg${i + 1}`, '')) },
    generic: true,
  };
}

function makeSnippet(name, spec) {
  if (spec.snippet) return spec.snippet;
  if (!spec.params.length) return null;
  const head = '\\' + name.replace(/\}/g, '\\}');
  const labelled = spec.params.length <= 2; // short ones get placeholder text, long ones bare tab stops
  const args = spec.params.map((p, i) => '{' + (labelled ? '${' + (i + 1) + ':' + p.label + '}' : '$' + (i + 1)) + '}');
  return head + args.join('');
}

// --- JSON writer: one entry per block, short string arrays and flat objects on one line ---

const isPrim = (v) => v === null || typeof v !== 'object';

function ser(value, indent = 0, depth = 0) {
  const pad = ' '.repeat(indent + 2);
  const end = ' '.repeat(indent);
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    if (value.every(isPrim)) return '[' + value.map((v) => JSON.stringify(v)).join(', ') + ']';
    return '[\n' + value.map((v) => pad + ser(v, indent + 2, depth + 1)).join(',\n') + '\n' + end + ']';
  }
  if (value && typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) return '{}';
    if (depth > 0 && keys.every((k) => isPrim(value[k]))) {
      return '{ ' + keys.map((k) => JSON.stringify(k) + ': ' + JSON.stringify(value[k])).join(', ') + ' }';
    }
    return '{\n' + keys.map((k) => pad + JSON.stringify(k) + ': ' + ser(value[k], indent + 2, depth + 1)).join(',\n') + '\n' + end + '}';
  }
  return JSON.stringify(value);
}

function serialize(entries) {
  return '[\n' + entries.map((e) => '  ' + ser(e, 2)).join(',\n') + '\n]\n';
}

// ---------------------------------------------------------------------------

const C = await loadConstants(constantsPath);
const symbolMap = C.escape_word_map;
if (!symbolMap || !Array.isArray(C.escape_word_list)) {
  die('constants.js must export escape_word_map and escape_word_list.');
}
const singlePop = new Set(C.single_pop_list ?? []);
const doublePop = new Set(C.double_pop_list ?? []);

const existing = loadExisting(outPath);

// Everything already defined, as name or alias
const defined = new Set();
for (const e of existing) {
  defined.add(e.name);
  for (const a of e.aliases ?? []) defined.add(a);
}

// All names the renderer knows, in file order (symbols first, then function-only names)
const allNames = [...new Set([...Object.keys(symbolMap), ...C.escape_word_list])];
const newNames = allNames.filter((n) => !defined.has(n));

// Split new names into symbols (grouped by identical output glyph) and functions
const groups = new Map(); // raw glyph -> names in file order
const functionNames = [];
for (const n of newNames) {
  if (Object.hasOwn(symbolMap, n)) {
    const g = symbolMap[n];
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(n);
  } else {
    functionNames.push(n);
  }
}

const newEntries = [];
const genericFor = [];

for (const [raw, names] of groups) {
  // canonical = longest name, ties -> first defined; the rest become aliases
  const order = names.map((n, i) => ({ n, i })).sort((a, b) => b.n.length - a.n.length || a.i - b.i);
  const name = order[0].n;
  const aliases = names.filter((n) => n !== name);

  const entry = { name };
  if (aliases.length) entry.aliases = aliases;
  entry.glyph = displayGlyph(raw);

  // symbols that are also functions (sqrt)
  if (singlePop.has(name) || doublePop.has(name) || SPECS[name]) {
    const { spec, generic } = specFor(name, singlePop, doublePop);
    const snippet = makeSnippet(name, spec);
    if (snippet) entry.snippet = snippet;
    if (spec.doc || SYMBOL_DOCS[name]) entry.doc = spec.doc || SYMBOL_DOCS[name];
    if (spec.params.length) entry.params = spec.params;
    if (generic) genericFor.push(name);
  } else if (SYMBOL_DOCS[name]) {
    entry.doc = SYMBOL_DOCS[name];
  }
  newEntries.push(entry);
}

for (const name of functionNames) {
  const { spec, generic } = specFor(name, singlePop, doublePop);
  const entry = { name };
  const snippet = makeSnippet(name, spec);
  if (snippet) entry.snippet = snippet;
  if (spec.doc) entry.doc = spec.doc;
  if (spec.params.length) entry.params = spec.params;
  newEntries.push(entry);
  if (generic) genericFor.push(name);
}

// Names in commands.json that constants.js no longer knows (report only)
const known = new Set(allNames);
const stale = [];
for (const e of existing) {
  for (const n of [e.name, ...(e.aliases ?? [])]) if (!known.has(n)) stale.push(n);
}

// --- report + write ---

console.log(`constants : ${constantsPath}  (${allNames.length} names)`);
console.log(`commands  : ${outPath}  (${existing.length} existing entries, ${defined.size} names defined)`);

if (stale.length) {
  console.log(`\nNot in constants.js anymore (kept, not removed): ${stale.join(', ')}`);
}

if (newEntries.length === 0) {
  console.log('\nNothing new. commands.json is up to date, no changes made.');
  process.exit(0);
}

const symbolsAdded = newEntries.filter((e) => e.glyph !== undefined).length;
console.log(`\nNew entries: ${newEntries.length} (${symbolsAdded} symbols, ${newEntries.length - symbolsAdded} functions) from ${newNames.length} new names.`);
if (newEntries.length <= 40) {
  console.log('  ' + newEntries.map((e) => e.name).join(', '));
}
if (genericFor.length) {
  console.log(`\nFunctions without hand-written docs (generic params generated, please fill in): ${genericFor.join(', ')}`);
}

if (flags['dry-run']) {
  console.log('\n--dry-run: nothing written.');
  process.exit(0);
}

if (existing.length && !flags['no-backup']) {
  fs.copyFileSync(outPath, outPath + '.bak');
  console.log(`\nBackup: ${outPath}.bak`);
}

const tmpOut = outPath + '.tmp';
fs.writeFileSync(tmpOut, serialize([...existing, ...newEntries]), 'utf8');
fs.renameSync(tmpOut, outPath);
console.log(`Wrote ${existing.length + newEntries.length} entries to ${outPath}`);
