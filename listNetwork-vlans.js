/*
 * $ node listNetwork - vlans.js - a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f - o 549236 - f test.csv
*/

var program = require("commander");

program
  .option("-f, --file <file>", "CSV file to write")
  .option("-a, --apiKey <apiKey>", "The Meraki API Key")
  .option("-o, --orgId <orgId>", "The Meraki Organization ID")
  .parse(process.argv);

// Meraki API Service
const Meraki = require("meraki-service");
const API_URL = "https://api.meraki.com/api/v0";
const meraki = new Meraki(program.apiKey, API_URL);
console.log("API Base URL: ", API_URL);

// CSV Handlers
const json2csv = require("json2csv").parse;

function writeCSVfile(data, file) {
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
}

// Meraki Handlers
async function fetchNetworks(orgId) {
  const nets = await meraki.getNetworks(orgId).then(
    res => {
      console.log("Networks: ", res);
      return res;
    },
    err => {
      console.log(err);
    }
  );
  return nets;
}

async function fetchVlans(nets) {
  console.log("\n Getting VLAN information..");
  let allVlans = [];
  if (nets[0].id) {
    for (let n of nets) {
      const vlans = await meraki.getVlans(n.id).then(
        res => {
          //console.log(`Vlans for ${n.name} | ID: ${n.id}`, res);
          if (res.length >= 0) {
            allVlans = [...allVlans, ...res];
          }
          return res;
        },
        err => {
          console.log("script error: ", err);
        }
      );
    }
  } else {
    console.log("No networks found. Is your org ID and API key correct?");
    return;
  }
  return allVlans;
}

// Primary Script
async function main(apiKey, orgId, file) {
  // Get Networks
  const nets = await fetchNetworks(orgId);

  // Retrieve VLANs for every network
  const vlans = await fetchVlans(nets);

  // attach template and network name info to results
  vlans.map(v => {
    let net = nets.filter(obj => obj.id == v.networkId)[0];
    v.networkName = net.name;
    if (net.configTemplateId) {
      v.configTemplateId = net.configTemplateId;
    }
  });

  // Print Final Results
  console.log("VLANS with Network Template Info", vlans);

  // Write CSV to File
  if (file) {
    writeCSVfile(vlans, file);
  }
}

// Launch main script
main(program.apiKey, program.orgId, program.file);
