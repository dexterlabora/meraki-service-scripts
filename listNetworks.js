/*
Traverse the Meraki Dashboard API to display the Networks in an Organization

/*
 * $ node listNetworks.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -f networks.csv
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
  // Get Networks
  const orgId = program.orgId;
  let networks = await meraki.getNetworks(orgId).then(res => res);

  // Write CSV to File
  const csv = require("./js/writeCSVfile");
  let file = program.file;
  if (file) {
    csv.writeCSVfile(networks, file);
  }
}

// Launch main script
main();
