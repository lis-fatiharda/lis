import Axios from "axios";
import xml2js from "xml2js";
const parser = xml2js.Parser();
import fs from "fs";
import path from "path";

export default async function getSessionId() {
    var xmlBodyStr = await fs
        .readFileSync(
            path.join(
                process.env.liserp_DIR,
                "development/lisModules/classes/emember/wsXml/login.xml"
            )
        )
        .toString();

    var config = {
        headers: { "Content-Type": "text/xml" },
    };
    var xmlReturned, mySession_Id;

    await Axios.post(
        "https://efatura.izibiz.com.tr:2443/EIWSOIBProxy/EFaturaOIBProxy?wsdl",
        xmlBodyStr,
        config
    )
        .then((res) => {
            xmlReturned = res.data;
        })
        .catch(async (err) => {
          throw new Error(err);
        });
    parser.parseString(xmlReturned, function (err, result) {
        mySession_Id =
            result["S:Envelope"]["S:Body"][0]["ns2:LoginResponse"][0][
                "SESSION_ID"
            ][0];
    });

    return mySession_Id;
};
