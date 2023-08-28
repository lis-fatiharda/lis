import fs from "fs";
import path from "path";
import Axios from "axios";
import xml2js from "xml2js";
import { lisnumranges } from "../../../lisModels/lisnumranges.js";

export default async function (pSession_id, plisedndocs) {

    //*** Control Document Rights */

    const olisedn001 = await lisedn001.findOne({
        company: plisedndocs.company,
        username: global.sys_user,
        doctype: plisedndocs.doctype,
    });
    
    if (olisedn001 == null)
        throw new Error(
            `${plisedndocs.doctype} Belge Tipi İçin Yetkiniz Bulunmamaktadır!`
        );
    
    //*** fetch E-InvoNumber */

    let myEinvonumber = await Numrange.getNewNumber({
        company: plisedndocs.company,
        numrange: olisedn001.edeliverynumrange,
    });

    myEinvonumber =
        olisedn001.edeliveryprefix + new Date().getFullYear() + myEinvonumber;

    plisedndocs.einvonumber = myEinvonumber;

    plisedndocs.edistr = plisedndocs.edistr.replace(
        "#EINVONUMBER#",
        plisedndocs.einvonumber
    );
    plisedndocs.edistr = plisedndocs.edistr.replace(
        "#XSLTDOCID#",
        plisedndocs.einvonumber
    );
    plisedndocs.edistr = plisedndocs.edistr.replace(
        "#Signature",
        `#Signature_${plisedndocs.einvonumber}`
    );
    //--------------------------------------

    var XMLBLOCK = await fs
        .readFileSync(
            path.join(
                process.env.liserp_DIR,
                "lisModules/classes/emember/wsXml/sendEdelivery.xml"
            )
        )
        .toString();
    XMLBLOCK = XMLBLOCK.replace("#SESSION_ID#", pSession_id);

    XMLBLOCK = XMLBLOCK.replace("#RTAXNUM#", plisedndocs.taxnum);
    XMLBLOCK = XMLBLOCK.replace("#RALIAS#", plisedndocs.alias);

    // ---- UBL string to BASE64 fromat ----
    
    const xmlBase64 = Buffer.from(plisedndocs.edistr).toString("base64");
    XMLBLOCK = XMLBLOCK.replace("#XMLIN64BITFORMAT#", xmlBase64);

    // ---- send to E-Invoice web service ----

    var config = {
        headers: { "Content-Type": "text/xml" },
    };

    let isError = false;

    await Axios.post(
        "https://proxyws.izibiz.com.tr/EIWSOIBProxy/EFaturaOIBProxy?wsdl",
        XMLBLOCK,
        config
    )
        .then((res) => {
            xml2js.parseString(res.data, async function (err, result) {
                
                let errorStr = undefined;
                if (
                    result["S:Envelope"]["S:Body"][0][
                            "ns2:SendDespatchAdviceResponse"
                        ][0]["SendDespatchAdviceResponse"][0].ERROR_TYPE[0][
                            "ERROR_CODE"
                        ][0] !=
                    undefined
                ) {
                    errorStr =
                        result["S:Envelope"]["S:Body"][0][
                            "ns2:SendDespatchAdviceResponse"
                        ][0]["SendDespatchAdviceResponse"][0].ERROR_TYPE[0][
                            "ERROR_SHORT_DES"
                        ][0]; 
                }

                if (errorStr == undefined) {
                    await lisedndocs.updateOne(
                        { _id: plisedndocs._id },
                        {
                            $set: {
                                edocstat: 2,
                                processedby: global.sys_user,
                                processedat: new Date(),
                                processstat: "Sent",
                                processstatstr: res.data,
                                einvonumber: myEinvonumber,
                                edistr: plisedndocs.edistr,
                            },
                        }
                    );

                    await lissaldocs
                        .updateOne(
                            {
                                company: plisedndocs.company,
                                doctype: plisedndocs.doctype,
                                docnum: plisedndocs.docnum,
                            },
                            { $set: { einvonumber: myEinvonumber } }
                        )
                        .catch((err) => {
                            console.log(err);
                            throw new Error(err);
                        });
                } else {
                    await lisedndocs.updateOne(
                        { _id: plisedndocs._id },
                        {
                            $set: {
                                edocstat: 3,
                                processedby: global.sys_user,
                                processedat: new Date(),
                                processstat: "Error",
                                processstatstr: errorStr,
                            }, 
                        }
                    );
                    //--- update numrange back ---

                    let olisnumranges = await lisnumranges.findOne({
                        company: plisedndocs.company,
                        numrange: olisedn001.edeliverynumrange,
                        isintegrator: true,
                    });
                    let oldNumber = (olisnumranges =
                        olisnumranges.numparts[0].valcurrent - 1);

                    lisnumranges.updateOne(
                        {
                            company: plisedndocs.company,
                            numrange: olisedn001.edeliverynumrange,
                            isintegrator: true,
                        },
                        {
                            $set: {
                                "numparts.0.valcurrent": oldNumber,
                            },
                        }
                    );

                    //---------------------------
                    isError = true;
                         
                    
                }
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

            //--- update numrange back ---

            let olisnumranges = await lisnumranges.findOne({
                company: plisedndocs.company,
                numrange: olisedn001.edeliverynumrange,
                isintegrator: true,
            });
            let oldNumber = (olisnumranges =
                olisnumranges.numparts[0].valcurrent - 1);

            lisnumranges.updateOne(
                {
                    company: plisedndocs.company,
                    numrange: olisedn001.edeliverynumrange,
                    isintegrator: true,
                },
                {
                    $set: {
                        "numparts.0.valcurrent": oldNumber,
                    },
                }
            );

            //---------------------------

            throw new Error("E-İrsaliye Gönderilemedi!");
        });
    
    
    if(isError == true) throw new Error("E-İrsaliye Gönderilemedi!");
};
