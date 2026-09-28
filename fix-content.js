const fs = require('fs');

let css = fs.readFileSync('/var/www/projects/static/stisla/assets/css/components-tailwind.css', 'utf8');

css = css.replace(/@apply content-\[' '\]/g, "content: ' '; @apply");
css = css.replace(/@apply content-\['\\\\f0d9'\]/g, "content: '\\\\f0d9'; @apply");
css = css.replace(/@apply content-\['\\\\f100'\]/g, "content: '\\\\f100'; @apply");
css = css.replace(/@apply content-\['\\\\f2d7'\]/g, "content: '\\\\f2d7'; @apply");
css = css.replace(/@apply content-\['\\\\f44c'\]/g, "content: '\\\\f44c'; @apply");
css = css.replace(/@apply content-\['\\\\f121'\]/g, "content: '\\\\f121'; @apply");
css = css.replace(/content-\[attr\(data-initial\)\]/g, "content: attr(data-initial);");

fs.writeFileSync('/var/www/projects/static/stisla/assets/css/components-tailwind.css', css);
console.log('Fixed content- classes');
