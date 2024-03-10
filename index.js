"use strict";

// const { createServer } = require("@lhci/server");
// const cron = require("node-cron");
// const { exec } = require("child_process");

const express = require('express');
const lhci = require('@lhci/server');

(async () => {
  const app = express();
  const { app: lhciApp } = await lhci.createApp({
    storage: {
      storageMethod: "sql",
      sqlDialect: "postgres",
      sqlConnectionSsl: true,
      sqlConnectionUrl:
        "postgresql://postgres:*BEc52G5Abf2FFbaG1c-c*ee3GdA66ae@viaduct.proxy.rlwy.net:19632/railway",
    },
    psiCollectCron: {
      psiApiKey: "AIzaSyALh8C-UWtyiGN3MvJPSfcjo2QkkZ2FXwo",
      sites: [
        {
          urls: ["https://ang-todotask.netlify.app/"],
          schedule: "*/5 * * * *",
          projectSlug: "lightouse-server"
        }
      ]
    }
  });

  app.use((req, res, next) => handleCustomAuthentication(req, res, next));
  app.use(lhciApp);
  app.listen();
})();


// const auditCommand = 'lhci collect --collect.url=https://ang-todotask.netlify.app/ --collect.numberOfRuns=1';

// // Command to upload report to LHCI server
// const uploadCommand = 'lhci upload --target=lhci --serverBaseUrl=https://lighthouse-server-production-8084.up.railway.app --token=0ac98669-2c1f-4b1d-99c2-4acd8f163e45';

// // Function to execute shell commands
// function runCommand(command) {
//   return new Promise((resolve, reject) => {
//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`exec error: ${error}`);
//         reject(error);
//         return;
//       }
//       console.log(`stdout: ${stdout}`);
//       console.error(`stderr: ${stderr}`);
//       resolve();
//     });
//   });
// }

// async function runLhci() {
//   try {
//     // Run Lighthouse CI audit
//     runCommand(auditCommand)
//       .then(() => {
//         console.log('Lighthouse CI audit completed successfully.');
//         // Upload report to LHCI server
//         return runCommand(uploadCommand);
//       })
//       .then(() => {
//         console.log('Report uploaded to LHCI server.');
//       })
//       .catch(error => {
//         console.error('An error occurred:', error);
//       });
//   } catch (error) {
//     console.error("Error running LHCI:", error);
//   }
// }

// console.log("Starting server...");
// createServer({
//   port: process.env.PORT,
//   storage: {
//     storageMethod: "sql",
//     sqlDialect: "postgres",
//     sqlConnectionSsl: true,
//     sqlConnectionUrl:
//       "postgresql://postgres:*BEc52G5Abf2FFbaG1c-c*ee3GdA66ae@viaduct.proxy.rlwy.net:19632/railway",
//   },
// }).then(({ port }) => console.log("Listening on port", port));

// cron.schedule("* * * * *", runLhci); // Runs at every 5 minute
// console.log("LHCI cron job started!");
