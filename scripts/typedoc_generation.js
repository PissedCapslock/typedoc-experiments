#!/usr/bin/env node
const TypeDoc = require('typedoc');
const path = require('path');
const fs = require('fs');

const ROOT_FOLDER = path.join(__dirname, "../");
const OUTPUT_DIR = path.join(ROOT_FOLDER, "tsdoc");

//See https://typedoc.org/guides/arguments/ for the arguments
const app = new TypeDoc.Application({
  mode: "modules",
  includeDeclarations: true,
  excludeNotExported: true,
  excludePrivate: true,
  excludeProtected: false,
  excludeExternals: true, //Prevent externally resolved TypeScript files from being documented.
  hideGenerator: true,
  listInvalidSymbolLinks: true, //Convenient for the CI
  logger: "console",
  readme: "none",
  tsconfig: path.join(ROOT_FOLDER, "typedoc_config.json"),
  name: "Typedoc-experiment"
});

//Collect all the input files
//See https://typedoc.org/guides/installation/ where this is illustrated
const inputDirs = [];
inputDirs.push(path.join(ROOT_FOLDER, "dist"));//use the compiled version to generate the documentation

const expandedInputFiles = app.expandInputFiles(inputDirs).filter(entry => !entry.endsWith(".js"));
const project = app.convert(expandedInputFiles);

if (project) {
  const result = app.generateDocs(project, OUTPUT_DIR);
  if (!result) {
    process.exitCode = 1;
  }
  app.generateJson(project, OUTPUT_DIR + '/documentation.json');
}

