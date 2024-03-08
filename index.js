"use strict";

const { createServer } = require("@lhci/server");
const cron = require("node-cron");
const { exec } = require("child_process");

async function runLhci() {
  try {
    // Example (replace with your storage implementation):

    exec(
      "lhci autorun --config=./lighthouerc.cjs --collect.url=https://ang-todotask.netlify.app/ --collect.numberOfRuns=1 --upload.target=lhci --upload.serverBaseUrl=https://lighthouse-server-production-8084.up.railway.app --upload.token=0ac98669-2c1f-4b1d-99c2-4acd8f163e45",
      (error, stdout) => {
        if (error) {
          console.log("Error", error.message);
          return;
        }
        console.log("Output", stdout);
      }
    );
  } catch (error) {
    console.error("Error running LHCI:", error);
  }
}

console.log("Starting server...");
createServer({
  port: process.env.PORT,
  storage: {
    storageMethod: "sql",
    sqlDialect: "postgres",
    sqlConnectionSsl: true,
    sqlConnectionUrl:
      "postgresql://postgres:*BEc52G5Abf2FFbaG1c-c*ee3GdA66ae@viaduct.proxy.rlwy.net:19632/railway",
  },
}).then(({ port }) => console.log("Listening on port", port));

cron.schedule("*/2 * * * *", runLhci); // Runs at every 5 minute
console.log("LHCI cron job started!");
