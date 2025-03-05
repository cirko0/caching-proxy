#!/usr/bin/env node

import { program } from "commander";
import { clearCache, startProxyServer } from "../src/server.js";

console.clear();

console.log("-----------------------------------------");
console.log("Starting CLI...");
console.log("-----------------------------------------");

program
  .name("caching-proxy")
  .description("Caching Proxy CLI")
  .version("1.0.0", "-v, --version", "output the current version")
  .option("-p, --port <number>", "choose the port to run on", parseInt)
  .option("-o, --origin <url>", "choose the origin url to proxy to")
  .option("-c, --clear-cache", "clear the cache")
  .action((options) => {
    if (!options.port || !options.origin) return program.help();

    if (program.clearCache) clearCache();

    startProxyServer(options.port, options.origin);
  });

program.addHelpText(
  "after",
  `
    Examples:
      $ caching-proxy --port 8080 --origin http://example.com
      $ caching-proxy -p 3000 -o https://myapi.com
    `
);

program.parse(process.argv);
