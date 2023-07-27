import fs from "fs";
import path from "path";
import Axios from "axios";
import xml2js from "xml2js";

export default async function (pSession_id, pUUID) {
    var XMLBLOCK = await fs
        .readFileSync(
            path.join(
                process.env.liserp_DIR,
                "lisModules/classes/emember/wsXml/markInvoice.xml"
            )
        )
        .toString();
    XMLBLOCK = XMLBLOCK.replace("#SESSION_ID#", pSession_id);
    XMLBLOCK = XMLBLOCK.replace("#UUID#", pUUID);

    // ---- get E-Invoices from izibiz ----

    var config = {
        headers: { "Content-Type": "text/xml" },
    };

    await Axios.post(
        "https://proxyws.izibiz.com.tr/EIWSOIBProxy/EFaturaOIBProxy?wsdl",
        XMLBLOCK,
        config
    )
        .then((res) => {
            xml2js.parseString(res.data, async function (err, result) {
                //    let myReturn =
                //        result["S:Envelope"]["S:Body"][0][
                //            "ns2:GetInvoiceResponse"
                //        ][0]["GetInvoiceResult"][0]["INVOICE"];
            });
        })
        .catch(async (err) => {
            await xml2js.parseString(
                err.response.data,
                async function (error, result) {}
            );

            //---------------------------

            throw new Error("E-Fatura Okundu İşaretlenirken Hata Oluştu!");
        });
}
