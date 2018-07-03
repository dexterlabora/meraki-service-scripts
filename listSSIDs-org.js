/*
Traverse the Meraki Dashboard API to display the Clients of an Organization in a given timespan.

/*
 * $ node listSSIDs-org.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -f ssids-org-sandbox.csv
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
  const orgId = program.orgId;
  let ssidsOrg = [];

  // Get networks
  const networks = await meraki.getNetworks(orgId).then(res => res);

  // Get SSIDs for each network and merge data
  // errors will be thrown for networks that do not support wireless
  for (let n of networks) {
    const ssids = await meraki.getSsids(n.id).then(res => res);

    console.log("network ssids", n.id, ssids);
    if (!ssids) {
      continue;
    }
    ssids.map(s => {
      s.networkId = n.id;
      s.networkName = n.name;
      s.networkTemplateId = n.configTemplateId;
      return s;
    });

    ssidsOrg = [...ssidsOrg, ...ssids];
  }

  // Write CSV to File
  const csv = require("./js/writeCSVfile");
  let file = program.file;
  if (file) {
    csv.writeCSVfile(ssidsOrg, file);
  }
}

// Launch main script
main();
