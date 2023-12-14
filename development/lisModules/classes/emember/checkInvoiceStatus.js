import fs from "fs";
import path from "path";
import Axios from "axios";
import xml2js from "xml2js";
import lisedn001 from "../../../lisModels/lisedn001.js";
import lisedndocs from "../../../lisModels/lisedndocs.js";

export default async function (pSession_id, plisedndocs) {
    //*** Control Document Rights */

    const olisedn001 = await lisedn001.findOne({
        company: plisedndocs.company,
        username: global.sys_user,
        doctype: plisedndocs.doctype,
    });

    if (olisedn001 == null)
      throw new Error("Bu Belge İçin Yetkiniz Bulunmamaktadır!");

    //--------------------------------------

    var XMLBLOCK = await fs
        .readFileSync(
            path.join(
                process.env.liserp_DIR,
                "development/lisModules/classes/emember/wsXml/getInvoiceStatus.xml"
            )
        )
        .toString();
    XMLBLOCK = XMLBLOCK.replace("#SESSION_ID#", pSession_id);
    XMLBLOCK = XMLBLOCK.replace("#UUID#", plisedndocs.einvouuid);

    // ---- UBL string to BASE64 fromat ----

    const xmlBase64 = Buffer.from(plisedndocs.edistr).toString("base64");
    XMLBLOCK = XMLBLOCK.replace("#XMLIN64BITFORMAT#", xmlBase64);

    // ---- send to E-Invoice web service ----

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
                console.log(
                    "****result****",
                    result["S:Envelope"]["S:Body"][0][
                        "ns2:GetInvoiceStatusResponse"
                    ][0]["InvoiceStatusResponse"][0]["INVOICE_STATUS"][0]
                );

                let GIB_STATUS_CODE =
                    result["S:Envelope"]["S:Body"][0][
                        "ns2:GetInvoiceStatusResponse"
                    ][0]["InvoiceStatusResponse"][0]["INVOICE_STATUS"][0][
                        "GIB_STATUS_CODE"
                    ][0];
                let GIB_STATUS_DESCRIPTION =
                    result["S:Envelope"]["S:Body"][0][
                        "ns2:GetInvoiceStatusResponse"
                    ][0]["InvoiceStatusResponse"][0]["INVOICE_STATUS"][0][
                        "GIB_STATUS_DESCRIPTION"
                    ][0];

                console.log("****GIB_STATUS_CODE****", GIB_STATUS_CODE);
                console.log(
                    "****GIB_STATUS_DESCRIPTION****",
                    GIB_STATUS_DESCRIPTION
                );

                await lisedndocs.updateOne(
                    { _id: plisedndocs._id },
                    {
                        $set: {
                            edocstat: 2,
                            processstat: GIB_STATUS_CODE,
                            processstatstr: GIB_STATUS_DESCRIPTION,
                        },
                    }
                );
            });
        })
        .catch(async (err) => {
            await xml2js.parseString(
                err.response.data,
                async function (error, result) {
                    var errorStr =
                        result["S:Envelope"]["S:Body"][0]["S:Fault"][0][
                            "faultstring"
                        ][0];
                    console.log(errorStr);

                    await lisedndocs.updateOne(
                        { _id: plisedndocs._id },
                        {
                            $set: {
                                edocstat: 3,
                                processedby: global.sys_user,
                                processedat: new Date(),
                                processstat: errorStr,
                                processstatstr: err.response.data,
                            },
                        }
                    );
                }
            );

            //---------------------------

          throw new Error("E-Belge Statüsü Güncellenemedi!");
        });
}
