// Codemod ponctuel : remplace les couleurs Tailwind ad hoc par les tokens du design system.
// Usage : node scripts/codemod-colors.mjs
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const PREFIX = "(?<=\\b(?:bg|text|border|from|to|via|ring|divide|outline|decoration|placeholder|accent|shadow|stroke|fill|ring-offset)-)";

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(name)) out.push(p);
  }
  return out;
}

const files = [...walk(join(ROOT, "app")), ...walk(join(ROOT, "components"))];
let changed = 0;

for (const file of files) {
  const isAdmin = /[\\/]admin[\\/]/.test(file);
  let src = readFileSync(file, "utf8");
  const before = src;

  const rules = [
    // Gradients admin orange→amber : un seul dégradé de marque
    [/from-orange-500 to-amber-500/g, "from-primary-500 to-primary-400"],
    [/from-orange-400 to-amber-400/g, "from-primary-400 to-primary-300"],
    [/from-orange-600 to-amber-600/g, "from-primary-600 to-primary-500"],

    // Marque
    [new RegExp(`${PREFIX}orange-`, "g"), "primary-"],
    // Sémantique
    [new RegExp(`${PREFIX}(?:green|emerald|teal|lime)-`, "g"), "success-"],
    [new RegExp(`${PREFIX}(?:red|rose)-`, "g"), "danger-"],
    [new RegExp(`${PREFIX}(?:amber|yellow)-`, "g"), "warning-"],
    // Bleu : info dans l'admin (statuts), accent de marque sur le site public
    [new RegExp(`${PREFIX}(?:blue|sky|cyan)-`, "g"), isAdmin ? "info-" : "primary-"],
    [new RegExp(`${PREFIX}(?:purple|indigo|violet|fuchsia|pink)-`, "g"), "primary-"],
    // Neutres
    [new RegExp(`${PREFIX}(?:gray|slate|zinc|stone)-`, "g"), "neutral-"],
    // Anciens alias
    [new RegExp(`${PREFIX}background-secondary(?![\\w-])`, "g"), "surface-muted"],
    [new RegExp(`${PREFIX}background(?![\\w-])`, "g"), "surface"],
    [new RegExp(`${PREFIX}text-secondary(?![\\w-])`, "g"), "ink-secondary"],
    [new RegExp(`${PREFIX}text(?![\\w-])`, "g"), "ink"],
  ];

  for (const [re, rep] of rules) src = src.replace(re, rep);

  if (src !== before) {
    writeFileSync(file, src);
    changed++;
  }
}

console.log(`${changed} fichier(s) modifié(s)`);
