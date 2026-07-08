const { CronJob } = require("cron");
const http = require("node:http");
const https = require("node:https");
const job = new CronJob("*/14 * * * *", function () {
  const base = process.env.BACKEND_URL;

  if (!base) return;

  const url = new URL("/health", base).href;
  const client = url.startsWith("https:") ? https : http;

  client
    .get(url, (res) => {
      if (res.statusCode === 200) {
        console.log("GET request sent successfully");
      } else {
        console.log("GET request failed", res.statusCode);
      }
    })
    .on("error", (err) => {
      console.error("Error while sending request", err);
    });
});
module.exports = job;