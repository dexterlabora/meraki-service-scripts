/*
List the Templates of an Organization

/*
 * $ node listTemplates.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -f templates.csv
*/

var program = require("commander");

program
  .option("-f, --file <file>", "CSV file to write")
  .option("-a, --apiKey <apiKey>", "The Meraki API Key")
  .option("-o, --orgId <orgId>", "The organization ID")
  .parse(process.argv);

// Meraki API Service
const Meraki = require("meraki-service");
const API_URL = "https://api.meraki.com/api/v0";
const meraki = new Meraki(program.apiKey, API_URL);
console.log("API Base URL: ", API_URL);

// Primary Script
async function main() {
  // Get Templates
  let templates = await meraki.getConfigTemplates(orgId).then(res => res);
  console.log("Templates: \n", templates);

  // Write CSV to File
  const csv = require("./js/writeCSVfile");
  let file = program.file;
  if (file) {
    csv.writeCSVfile(templates, file);
  }
}

// Launch main script
main();
