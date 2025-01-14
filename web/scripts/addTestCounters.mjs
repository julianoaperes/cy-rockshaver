import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the test file
const testFilePath = path.join(
  __dirname,
  '../web/cypress/e2e/ts01-login.cy.js'
);

// Read the test file content
let fileContent = readFileSync(testFilePath, 'utf8');

// Initialize counters for numbering
let describeCounter = 0;

// Process the file to add numbering to `describe` and `it` blocks
fileContent = fileContent.replace(
  /describe\((['"`])(.+?)\1,\s*\(it\)\s*=>\s*{([\s\S]*?)}\);/g,
  (match, quote, describeText, itContent) => {
    describeCounter++;
    let itCounter = 0;

    // Add numbering to each `it` block inside the `describe`
    const updatedItContent = itContent.replace(/it\((['"`])(.+?)\1/g, () => {
      itCounter++;
      return `it(${quote}${describeCounter}.${itCounter} $2${quote}`;
    });

    // Add numbering to the `describe` block
    return `describe(${quote}${describeCounter}. ${describeText}${quote}, (it) => {${updatedItContent}});`;
  }
);

// Write the updated content back to the file
writeFileSync(testFilePath, fileContent, 'utf8');

console.log('Numbering added to the test file successfully!');
