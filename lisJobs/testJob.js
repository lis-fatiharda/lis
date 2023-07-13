import Cron from "node-cron";

// ┌──────────── minute
// │ ┌────────── hour
// │ │ ┌──────── day of month
// │ │ │ ┌────── month
// │ │ │ │ ┌──── day of week
// │ │ │ │ │
// │ │ │ │ │
// * * * * *
//https://www.npmjs.com/package/node-cron
//https://crontab.guru/

//*****Job Schedule */
const lisSchedule = "* * * * *";
//*****Job Task */
const task = () => {
  console.log(
    "new Date()",
    new Date(),
    "/n new Date().toDateString()",
    new Date().toDateString(),
    "/n new Date().toISOString()",
    new Date().toISOString(),
    "/n new Date().toLocaleString()",
    new Date().toLocaleString(),
    "/n new Date().toLocaleTimeString()",
    new Date().toLocaleTimeString(),
    "/n new Date().toLocaleDateString()",
    new Date().toLocaleDateString()
  );
};

const testJob = Cron.schedule(lisSchedule, task);

module.exports = testJob;
