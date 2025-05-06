
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/license.js');

if (!fs.existsSync(filePath)) {
// If the file doesn't exist, create it with an initial placeholder content
fs.writeFileSync(filePath, `
const license = '{REPLACE_YOUR_LICENSE_KEY}';

module.exports = { license };
`);
}
