const { spawn } = require("child_process");

function asyncSpawn(cmd, args) {
  return new Promise((resolve, reject) => {
    console.log(cmd);
    const command = spawn("npm", ["run", cmd]);
    command.stdout.on("data", data => {
      console.log(`${data}`);
    });
    command.stderr.on("data", data => {
      console.log(`${data}`);
    });
    command.on("close", code => {
      resolve(code);
    });
  });
}

module.exports = asyncSpawn;
