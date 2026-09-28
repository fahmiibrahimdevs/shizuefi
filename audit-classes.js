const fs = require('fs');
const path = require('path');

const root = __dirname;
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

function classesFromCss(css) {
    const set = new Set();
    const t = css.replace(/\/\*[\s\S]*?\*\//g, '');
    const re = /\.(-?[_a-zA-Z][\w-]*)/g;
    let m;
    while ((m = re.exec(t))) set.add(m[1]);
    return set;
}

function collectFiles(dir, ext, out = []) {
    for (const f of fs.readdirSync(dir)) {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) collectFiles(p, ext, out);
        else if (p.endsWith(ext)) out.push(p);
    }
    return out;
}

const used = new Set();
for (const f of collectFiles(path.join(root, 'pages'), '.html')) {
    const c = fs.readFileSync(f, 'utf8');
    const re = /class\s*=\s*"([^"]*)"/g;
    let m;
    while ((m = re.exec(c))) for (const t of m[1].split(/\s+/)) if (t) used.add(t);
}

const originalFiles = ['assets/css/bootstrap.min.css', 'assets/css/style.css', 'assets/css/components.css'];
const compiledFiles = [
    'assets/css/bootstrap-tailwind.compiled.css',
    'assets/css/style-tailwind.compiled.css',
    'assets/css/components-tailwind.compiled.css',
];

const original = new Set();
for (const f of originalFiles) for (const c of classesFromCss(read(f))) original.add(c);

const compiled = new Set();
for (const f of compiledFiles) for (const c of classesFromCss(read(f))) compiled.add(c);

const missing = [...original].filter((c) => !compiled.has(c)).sort();
const usedMissing = missing.filter((c) => used.has(c));

let allJs = '';
for (const f of collectFiles(path.join(root, 'assets/js'), '.js')) allJs += fs.readFileSync(f, 'utf8');
const dynamicMissing = missing.filter((c) =>
    new RegExp('["\'\\.\\s]' + c.replace(/-/g, '\\-') + '["\'\\.\\s]').test(allJs)
);

console.log('Original classes:', original.size, '| Compiled classes:', compiled.size);
console.log('Original classes with no replacement:', missing.length);
console.log('=> USED in HTML & MISSING:', usedMissing.length);
for (const c of usedMissing) console.log('   ', c);
console.log('=> Referenced dynamically in assets/js & MISSING:', dynamicMissing.length);
for (const c of dynamicMissing) console.log('   ', c);

process.exitCode = usedMissing.length ? 1 : 0;
