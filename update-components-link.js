const fs = require('fs');
const path = require('path');

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.html')) {
            results.push(file);
        }
    });
    return results;
};

const htmlFiles = walk('/var/www/projects/static/stisla/pages');
if (fs.existsSync('/var/www/projects/static/stisla/index.html')) {
    htmlFiles.push('/var/www/projects/static/stisla/index.html');
}
if (fs.existsSync('/var/www/projects/static/stisla/index-0.html')) {
    htmlFiles.push('/var/www/projects/static/stisla/index-0.html');
}

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('assets/css/components.css')) {
        const newContent = content.replace(/assets\/css\/components\.css/g, 'assets/css/components-tailwind.compiled.css');
        fs.writeFileSync(file, newContent);
    }
});
console.log('HTML files updated successfully for components.css!');
