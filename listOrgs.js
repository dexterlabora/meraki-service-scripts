/*
List the organizations available with this API key

/*
 * $ node listOrgs.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -f test.csv
*/

var program = require("commander");

program
  .option("-f, --file <file>", "CSV file to write")
  .option("-a, --apiKey <apiKey>", "The Meraki API Key")
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

// Primary Script
async function main(apiKey, file) {
  // Get Organizations
  let orgs = await meraki.getOrganizations().then(
    res => {
      console.log("Organizations: \n", res);
      return res;
    },
    err => {
      console.log(err);
    }
  );

  // Write CSV to File
  if (file) {
    writeCSVfile(orgs, file);
  }
}

// Launch main script
main(program.apiKey, program.file);
