#!/usr/bin/env node
const path = require("path");
const program = require("commander");
const autoDateVersion = require("../src/auto-date-version");
const { version } = require("../package.json");

const rootPath = process.cwd();

program.version(version, "-v, --version");
program
  //   .option("-p, --path <p>", "Path to search HTML file")
  .option("-f, --file <f>", "HTML file to replace")
  .option("-b, --build <cmd>", "Build command")
  .parse(process.argv);

autoDateVersion(
  rootPath,
  path.resolve(rootPath, program.path || ""),
  program.file,
  program.build
);
