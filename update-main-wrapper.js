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
// Also add index.html in the root if it exists
if (fs.existsSync('/var/www/projects/static/stisla/index.html')) {
    htmlFiles.push('/var/www/projects/static/stisla/index.html');
}

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('class="main-wrapper"')) {
        const newContent = content.replace(/class="main-wrapper"/g, 'class="main-wrapper main-wrapper-1"');
        fs.writeFileSync(file, newContent);
    }
});
console.log('HTML files updated successfully!');
