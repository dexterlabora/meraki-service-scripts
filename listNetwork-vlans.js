/*
 * $ node listNetwork-vlans.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -o 549236 -f test.csv
 * 
 * 
 * This will generate a report of the MX VLAN and subnet information for an organization, along with the applied templates. 
 * The data is exported to a CSV file for easy analysis. 
 

https://github.com/dexterlabora/meraki-service-scripts

This is written in JavaScript using custom Meraki-Service library.
[Source](https://github.com/dexterlabora/meraki-service)
[Docs](https://dexterlabora.github.io/meraki-service/)

Example
```
"id","networkId","name","applianceIp","subnet","fixedIpAssignments","reservedIpRanges","dnsNameservers","networkName","configTemplateId"
102,"N_646829496481111111","Wireless B","10.1.173.65","10.1.173.64/26","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481123456"
103,"N_646829496481111111","Point of Sale B","10.129.216.33","10.129.216.32/28","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481123456"
104,"N_646829496481111111","Back Office B","10.200.61.97","10.200.61.96/27","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481123456"
202,"N_646829496481111111","Wireless - A","10.27.178.129","10.27.178.128/26","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481123456"
203,"N_646829496481111111","Point of Sales - A","10.2.26.33","10.2.26.32/28","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481123456"
204,"N_646829496481111111","Back Office - A","10.1.154.193","10.1.154.192/27","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481123456"
102,"N_646829496480000001","Wireless B","10.17.133.129","10.17.133.128/26","{}","[]","upstream_dns","MX65 Depot - 5","L_646829496481123456"
103,"N_646829496480000001","Point of Sale B","10.128.158.193","10.128.158.192/28","{}","[]","upstream_dns","MX65 Depot - 5","L_646829496481123456"
104,"N_646829496480000001","Back Office B","10.196.29.97","10.196.29.96/27","{}","[]","upstream_dns","MX65 Depot - 5","L_646829496481123456"
202,"N_646829496480000001","Wireless - A","10.28.210.1","10.28.210.0/26","{}","[]","upstream_dns","MX65 Depot - 5","L_646829496481123456"
203,"N_646829496480000001","Point of Sales - A","10.5.24.193","10.5.24.192/28","{}","[]","upstream_dns","MX65 Depot - 5","L_646829496481123456"
204,"N_646829496480000001","Back Office - A","10.0.149.97","10.0.149.96/27","{}","[]","upstream_dns","MX65 Depot - 5","L_646829496481123456"
102,"N_64682949648123456","Wireless B","10.16.112.193","10.16.112.192/26","{}","[]","upstream_dns","MX65 Depot - 6","L_646829496481123456"
103,"N_64682949648123456","Point of Sale B","10.134.81.81","10.134.81.80/28","{}","[]","upstream_dns","MX65 Depot - 6","L_646829496481123456"
104,"N_64682949648123456","Back Office B","10.199.56.225","10.199.56.224/27","{}","[]","upstream_dns","MX65 Depot - 6","L_646829496481123456"
202,"N_64682949648123456","Wireless - A","10.2.168.193","10.2.168.192/26","{}","[]","upstream_dns","MX65 Depot - 6","L_646829496481123456"
203,"N_64682949648123456","Point of Sales - A","10.4.236.1","10.4.236.0/28","{}","[]","upstream_dns","MX65 Depot - 6","L_646829496481123456"
204,"N_64682949648123456","Back Office - A","10.3.24.97","10.3.24.96/27","{}","[]","upstream_dns","MX65 Depot - 6","L_646829496481123456"
```

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
