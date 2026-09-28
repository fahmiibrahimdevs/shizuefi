const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'pages');

const oldLink = '<link rel="stylesheet" href="../assets/css/bootstrap.min.css">';
const newLink = '<link rel="stylesheet" href="../assets/css/bootstrap-tailwind.compiled.css">';
const oldLink2 = '<link rel="stylesheet" href="../assets/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">';

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = false;
            
            if (content.includes(oldLink)) {
                content = content.replace(oldLink, newLink);
                updated = true;
            }
            if (content.includes(oldLink2)) {
                content = content.replace(oldLink2, newLink);
                updated = true;
            }
            
            // For files that might have different variations
            const regex = /<link rel="stylesheet" href="\.\.\/assets\/css\/bootstrap\.min\.css"[^>]*>/;
            if (regex.test(content)) {
                content = content.replace(regex, newLink);
                updated = true;
            }

            if (updated) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

walkDir(targetDir);
console.log('All HTML files updated to point to bootstrap-tailwind.compiled.css');
