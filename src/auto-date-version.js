const path = require("path");
const fs = require("./utils/fs-promise");
const spawn = require('./utils/spawn');

const readPackageJSON = require("./utils/readPackageJson");
const getDate = require("./utils/getDate");

function autoDateVersion(rootPath, pathCmd, file = "index.html", buildCmd = 'build') {
  const pkg = readPackageJSON(rootPath);
  const { date, hour } = getDate();
  const version = pkg.version;
  if(pkg.scripts && !pkg.scripts[buildCmd]) {
      return console.error('Build command not found');
  }
  const filePath = path.resolve(pathCmd, file);
  let originalFile;
  fs.readFile(filePath, 'utf8')
    .then(data => {
      originalFile = data;
      const modifyFile = data
        .replace(/\$\{version\}/, version)
        .replace(/\$\{date\}/, date)
        .replace(/\$\{hour\}/, hour);
      return fs.writeFile(filePath, modifyFile);
    })
    .then(() => spawn(buildCmd))
    .then(() => {
      return fs.writeFile(filePath, originalFile);
    })
    .then(() => console.log(`Your version ${version} was built ${date} at ${hour}`));
}

module.exports = autoDateVersion;
