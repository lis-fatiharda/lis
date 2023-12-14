import Axios from "axios";
import xml2js from "xml2js";
const parser = xml2js.Parser();
import fs from "fs";
import path from "path";
import login from "./login.js";
import liscustomers from "../../../lisModels/liscustomers.js";

//pEdoctype: INVOICE, DESPATCHADVICE, ALL
export default async function checkUser(pliscustomers) {
  // Fetch SESSION_ID
  const mySession_Id = await login();
  if (!mySession_Id) new Error("Session_ID alınamadı!");
  // -------------

  //**************************INVOICE****************************** */
  var xmlBodyStr = fs
      .readFileSync(
          path.join(
              env.liserp_DIR,
              "development/lisModules/classes/emember/wsXml/checkUser.xml"
          )
      )
      .toString();

  xmlBodyStr = xmlBodyStr.replace("#SESSION_ID#", mySession_Id);
  xmlBodyStr = xmlBodyStr.replace("#TAXNUM#", pliscustomers.taxnum);
  xmlBodyStr = xmlBodyStr.replace("#INVOICE#", "INVOICE");

  //

  var config = {
    headers: { "Content-Type": "text/xml" },
  };

  var xmlReturned;

  await Axios.post(
    "https://efatura.izibiz.com.tr:2443/EIWSOIBProxy/EFaturaOIBProxy?wsdl",
    xmlBodyStr,
    config
  )
    .then((res) => {
      xmlReturned = res.data;
    })
    .catch((err) => {
    throw new Error(err);
    });

  var resultArray;
  parser.parseString(xmlReturned, function (err, result) {
    console.log("result");
    resultArray =
      result["S:Envelope"]["S:Body"][0]["ns2:CheckUserResponse"][0][
        "CheckUserResult"
      ][0]["USER"];
  });

  pliscustomers.einvmember = resultArray != undefined ? resultArray : [];
  await liscustomers.updateOne({ _id: pliscustomers._id }, pliscustomers);

  //**************************DESPATCHADVICE****************************** */
  console.log("DESPATCHADVICE");
  console.log(pliscustomers.taxnum);
  var xmlBodyStr = fs
      .readFileSync(
          path.join(
              env.liserp_DIR,
              "development/lisModules/classes/emember/wsXml/checkUser.xml"
          )
      )
      .toString();

  xmlBodyStr = xmlBodyStr.replace("#SESSION_ID#", mySession_Id);
  xmlBodyStr = xmlBodyStr.replace("#TAXNUM#", pliscustomers.taxnum);
  xmlBodyStr = xmlBodyStr.replace("#INVOICE#", "DESPATCHADVICE");

  //

  var config = {
    headers: { "Content-Type": "text/xml" },
  };

  var xmlReturned;

  await Axios.post(
    "https://efatura.izibiz.com.tr:2443/EIWSOIBProxy/EFaturaOIBProxy?wsdl",
    xmlBodyStr,
    config
  )
    .then((res) => {
      xmlReturned = res.data;
    })
    .catch((err) => {
    throw new Error(err);
    });
  console.log("xmlReturned");
  //console.log(xmlReturned);
  var resultArray;
  parser.parseString(xmlReturned, function (err, result) {
    console.log(
      "result99",
      result["S:Envelope"]["S:Body"][0]["ns2:CheckUserResponse"][0][
        "CheckUserResult"
      ][0]["USER"]
    );
    resultArray =
      result["S:Envelope"]["S:Body"][0]["ns2:CheckUserResponse"][0][
        "CheckUserResult"
      ][0]["USER"];
  });
  console.log("resultArray");
  console.log(resultArray);
  pliscustomers.edelmember = resultArray != undefined ? resultArray : [];
  await liscustomers.updateOne({ _id: pliscustomers._id }, pliscustomers);

  return pliscustomers;
};
