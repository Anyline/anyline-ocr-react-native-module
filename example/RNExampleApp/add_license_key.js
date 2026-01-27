
const fs = require('node:fs');
const path = require('node:path');

// Step 1: Read the environment variable
const envValue = process.env.ANYLINE_MOBILE_SDK_LICENSE_KEY;

// Step 2: Validate environment variable
if (!envValue || envValue === 'undefined') {
  console.error('ERROR: ANYLINE_MOBILE_SDK_LICENSE_KEY environment variable is not set or is undefined');
  console.error('Please set it with: export ANYLINE_MOBILE_SDK_LICENSE_KEY="your-license-key"');
  process.exit(1);
}

// Step 3: Define the file path
const filePath = path.join(__dirname, 'src/license.js');

// Step 4: Create the license file content
const licenseContent = `
const license = '${envValue}';

module.exports = { license };
`;

// Step 5: Write the file (overwrites existing content)
fs.writeFileSync(filePath, licenseContent);

console.log('File content updated successfully!');
console.log('License key has been set in src/license.js');
