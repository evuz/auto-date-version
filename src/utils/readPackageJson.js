const path = require("path");
const fs = require("fs");

function readPackageJSON(p) {
  return JSON.parse(fs.readFileSync(path.resolve(p, "package.json"), "utf8"));
}

module.exports = readPackageJSON;
