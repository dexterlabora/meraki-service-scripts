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

// CSV Handlers
const json2csv = require("json2csv").parse;

function writeCSVfile(data, file) {
  try {
    let fields = Object.keys(data[0]); // use first object params as headers
    let csv = json2csv(data, fields);
    console.log("CSV: \n", csv);

    console.log(`\n writing file ${file}`);
    var fs = require("fs");
    fs.writeFile(`${file}`, csv, function(err) {
      if (err) {
        return console.log("file save error", err);
      }
      console.log("The file was saved!");
    });
  } catch (error) {
    console.log("Error writing CSV file", error);
  }
}

// Primary Script
async function main(apiKey, orgId, timespan, file) {
  // Get Clients
  let clients = await meraki.getClientsForOrg(orgId, timespan).then(
    res => {
      console.log("Clients: \n", res);
      // flatten important paramaters. leave device details as raw JSON
      res.map(c => {
        c.usageSent = c.usage.sent;
        c.usageRecv = c.usage.recv;
        delete c.usage;
        c.deviceSerial = c.device.serial;
      });
      return res;
    },
    err => {
      console.log(err);
    }
  );

  // Write CSV to File
  if (file) {
    writeCSVfile(clients, file);
  }
}

// Launch main script
main(program.apiKey, program.orgId, program.timespan, program.file);
