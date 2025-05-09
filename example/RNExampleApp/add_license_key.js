
const fs = require('fs');
const path = require('path');

// Step 1: Read the environment variable
const envValue = process.env.MOBILE_SDK_DEVEX_LICENSE_KEY;

// Step 2: Define the file path
const filePath = path.join(__dirname, 'src/license.js');

// Step 3: Check if the file exists
if (!fs.existsSync(filePath)) {
// If the file doesn't exist, create it with an initial placeholder content
fs.writeFileSync(filePath, `
const license = '{REPLACE_YOUR_LICENSE_KEY}';

module.exports = { license };
`);
}

// Step 4: Read the file content
let fileContent = fs.readFileSync(filePath, 'utf8');

// Step 5: Replace the placeholder with the environment variable value
const updatedContent = fileContent.replace(/{REPLACE_YOUR_LICENSE_KEY}/g, envValue);

// Step 6: Write the updated content back to the file
fs.writeFileSync(filePath, updatedContent);

console.log('File content updated successfully!');
