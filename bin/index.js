#!/usr/bin/env node

import { program } from "commander";

console.log("Starting CLI...");

program.description("hello world").action(() => {
  console.log("a");
});

program.parse(process.argv);
