/*
List the organizations available with this API key

/*
 * $ node listOrgs.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -f test.csv
*/

const program = require("commander");
program
  .option("-f, --file <file>", "CSV file to write")
  .option("-a, --apiKey <apiKey>", "The Meraki API Key")
  .parse(process.argv);

// Meraki API Service
const Meraki = require("meraki-service");
const API_URL = "https://api.meraki.com/api/v0";
console.log("API Base URL: ", API_URL);
const meraki = new Meraki(program.apiKey, API_URL);

// Primary Script
async function main() {
  // Get Organizations
  const orgs = await meraki.getOrganizations().then(res => res);
  console.log("Organizations: \n", orgs);

  // Write CSV to File
  const csv = require("./js/writeCSVfile");
  let file = program.file;
  if (file) {
    csv.writeCSVfile(orgs, file);
  }
}

// Launch main script
main();
