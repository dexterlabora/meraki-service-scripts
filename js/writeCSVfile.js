const fs = require("fs");
const json2csv = require("json2csv").parse;

exports.writeCSVfile = function(data, file) {
  let fields = Object.keys(data[0]); // use first object params as headers, this could be improved
  let csv = json2csv(data, fields);
  console.log("CSV: \n", csv);

  console.log(`\n writing file ${file}`);

  fs.writeFile(`${file}`, csv, function(err) {
    if (err) {
      return console.log("file save error", err);
    }
    console.log("The file was saved!");
  });
};
