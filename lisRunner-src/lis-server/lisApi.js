import express from "express";
import https from "https";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
//import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
//import morgan from "morgan";
import cors from "cors";
//import _ from "lodash";
import dotenv from "dotenv";
dotenv.config(); 


//**** */ Global Functions ****
//--------------Ekstra DB Configuration-------------------
//const MSSQL = require("mssql");
//const BAG_config = {
//    server: "178.18.201.83",
//    database: "BAGDB604", 
//    user: "IAS",
//    password: "IAS",
//    port: 1433,
//    options: {
//        trustServerSertificate: true,
//        encrypt: false,
//    },
//};
//---------------------------------
import lisRouter from "./lisRouter.js"; 
 
import globalVars from "./globalVars.js";
import globalLisObj from "./globalLisObj.js";





//----------------redis-------------

//import { createClient } from "redis";
//
//const Redis = createClient();
//
//Redis.on("error", (err) => console.log("Redis Client Error", err));
//
//await Redis.connect();
//
//await Redis.set("key", "valuem benim");
//const value = await Redis.get("key");
//await Redis.disconnect();
//
//console.log("Redis", value);

//---------------------------------
const lisApi = express();

// enable files upload
lisApi.use(
    fileUpload({
        createParentPath: true,
    })
);

lisApi.use(express.json({ limit: "250mb" }));
lisApi.use(express.urlencoded({ limit: "250mb" })); 

lisApi.use(cors());
//?lisApi.use(bodyParser.json());
//?lisApi.use(bodyParser.raw());
//?lisApi.use(morgan("dev"));

lisApi.use("/", lisRouter);

lisApi.use((error, request, response, next) => {
    console.log("---------error----------");
    response.send(error.message);
});

// -------------------------------------------------------------------------------------

//*****SSL */
var cert = fs.readFileSync(path.resolve(process.env.liserp_DIR, "configs/ssl/certificate.crt"));
var key = fs.readFileSync(path.resolve(process.env.liserp_DIR, "configs/ssl/private.key"));
var options = {
    key: key,
    cert: cert,
};

var lisApiSsl = https.createServer(options, lisApi);

let myMongo_URI = process.env.lisdb_URI;
if (process.env.lis_DB != undefined) {
    myMongo_URI = myMongo_URI.replace("lisdb", process.env.lis_DB)
}

lisApi.listen(process.env.lisApi_PORT, async () => {

    globalLisObj();
    globalVars();
    
    //------------Mongoose Connection------------------
    await mongoose
        .connect(myMongo_URI)
        .catch((err) => console.log("LisDB Connection error!" + err));
    console.log(`Connected to lisdb.`);
    global.sys_session = false;

    await mongoose.plugin((schema) => {
        schema.pre(["find", "findOne"], function () {
            this.lean();
        });

        schema.pre(["create", "save"],
            { session: global.sys_session }, function () {
                this._id = undefined;
                this._createdby = sys_user;
                this._updatedby = sys_user;
                this._updatedat = new Date();
                this._createdat = new Date();
                console.log("------schema.pre([create, save------")


            });

        schema.pre(
            ["updateOne", "updateMany", "findOneAndUpdate"],
            function () {
                this._updatedby = sys_user;
                this._updatedat = new Date();

            }
        );
    });
    //--------------Ekstra DB Configuration-------------------
    //try {
    //    MSSQL.connect(BAG_config)
    //        .then(() => {
    //            console.log("Connected to BAGDB604.");
    //            BAGDB = MSSQL;
    //        })
    //        .catch((err) => console.log("BAGDB604 Connection error!" + err));
    //} catch (error) {
    //    console.log(error);
    //}

    console.log(`LisApi Listening on port : ${process.env.lisApi_PORT}`);
    //async () => {
    //const k = await BAG.query(`select TOP 1* from IASUSERS`)
    //console.log(K);
    //};
});

export default lisApi;
