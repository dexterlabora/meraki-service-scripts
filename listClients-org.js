/*
Traverse the Meraki Dashboard API to display the Clients of an Organization in a given timespan.

/*
 * $ node listClients-org.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -f clients.csv
*/

var program = require("commander");

program
  .option("-f, --file <file>", "CSV file to write")
  .option("-a, --apiKey <apiKey>", "The Meraki API Key")
  .option("-o, --orgId <orgId>", "The organization ID")
  .option(
    "-t, --timespan <timespan>",
    "The timespan to search for clients in seconds. 86400 is the default"
  )
  .parse(process.argv);

// Meraki API Service
const Meraki = require("meraki-service");
const API_URL = "https://api.meraki.com/api/v0";
const meraki = new Meraki(program.apiKey, API_URL);
console.log("API Base URL: ", API_URL);

// Primary Script
async function main() {
  const orgId = program.orgId;
  const timespan = program.timespan;

  // Get networks
  const networks = await meraki.getNetworks(orgId).then(res => res);

  // Get clients
  const clients = await meraki
    .getClientsForOrg(orgId, timespan)
    .then(res => res);

  // Format client data
  const clientsFormatted = clients.map(c => {
    c.usageSent = c.usage.sent;
    c.usageRecv = c.usage.recv;
    delete c.usage;
    c.deviceSerial = c.device.serial;
    c.networkId = c.device.networkId;
    const network = networks.find(n => n.id === c.networkId);
    c.networkName = network.name;
    return c;
  });
  console.log("Clients: ", clients);

  // Write CSV to File
  const csv = require("./js/writeCSVfile");
  let file = program.file;
  if (file) {
    csv.writeCSVfile(clientsFormatted, file);
  }
}

// Launch main script
main();
