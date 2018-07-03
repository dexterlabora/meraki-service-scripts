/*
Traverse the Meraki Dashboard API to display the Clients of an Organization in a given timespan.

/*
 * $ node listSSIDs-net.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -f ssids-net-sandbox.csv
*/

var program = require("commander");

program
  .option("-f, --file <file>", "CSV file to write")
  .option("-a, --apiKey <apiKey>", "The Meraki API Key")
  .option("-n, --netId <netId>", "The network ID")
  .parse(process.argv);

// Meraki API Service
const Meraki = require("meraki-service");
const API_URL = "https://api.meraki.com/api/v0";
const meraki = new Meraki(program.apiKey, API_URL);
console.log("API Base URL: ", API_URL);

// Primary Script
async function main() {
  // Get SSIDs
  const ssids = await meraki.getSsids(program.netId).then(res => res);
  console.log("SSIDs: ", ssids);

  // Write CSV to File
  const csv = require("./js/writeCSVfile");
  let file = program.file;
  if (file) {
    csv.writeCSVfile(ssids, file);
  }
}

// Launch main script
main();
