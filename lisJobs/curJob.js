import Cron from "node-cron";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

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
const lisSchedule = "19 1 * * *";
//*****Job Task */

const task = async () => {
    //------------Mongoose Connection------------------
    await mongoose
        .connect(process.env.MONGO_URI)
        .then(async () => {
            console.log("Connected to LisDB.");

            const fetchTcmbCur = import("../lisModules/BAS/BAST05/fetchTcmbCur.js");
            await fetchTcmbCur({ scCompany: "01" });
        })
        .catch((err) => console.log("LisDB Connection error!" + err));
    //------------Fetch Currencies------------------
};

//*** */

const curJob = Cron.schedule(lisSchedule, task);

export default curJob;
