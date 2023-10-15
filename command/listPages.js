const fs = require('fs');
const path = require('path');

const affiliateCode = process.argv[2];

if (!affiliateCode) {
  console.log('Please provide a language code as a command-line argument.');
  process.exit(1);
}
const dataFilePath = path.join(__dirname, '../data.json');

fs.readFile(dataFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading data.json:', err);
    process.exit(1);
  }

  try {
    const jsonData = JSON.parse(data);

    if (!jsonData[affiliateCode]) {
      console.log(`No data found for language code "${affiliateCode}".`);
      process.exit(1);
    }

    const pages = jsonData[affiliateCode];
    console.log(`Pages for language code "${affiliateCode}":`);

    pages.forEach((page, index) => {
      console.log(`${index + 1}: "${page}"`);
    });
  } catch (jsonParseError) {
    console.error('Error parsing data.json:', jsonParseError);
    process.exit(1);
  }
});
