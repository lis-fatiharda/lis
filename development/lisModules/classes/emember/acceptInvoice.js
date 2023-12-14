import fs from "fs";
import path from "path";
import Axios from "axios";
import xml2js from "xml2js";

export default async function (pCompany, pSession_id) {
    //*** Control Document Rights */



    //--------------------------------------

    var XMLBLOCK = await fs
        .readFileSync(
            path.join(
                process.env.liserp_DIR,
                "development/lisModules/classes/emember/wsXml/getInvoice.xml"
            )
        )
        .toString();
    XMLBLOCK = XMLBLOCK.replace("#SESSION_ID#", pSession_id);

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
                

                let myReturn =
                    result["S:Envelope"]["S:Body"][0][
                        "ns2:GetInvoiceResponse"
                    ][0]["GetInvoiceResult"][0]["INVOICE"];

                for (let i in myReturn) {
                    let myHeader = myReturn[i]["HEADER"][0];
                    let myContent = myReturn[i]["CONTENT"][0];

                    let olisedndocs = new lisedndocs(
                        lisedndocs.prototype.schema.tree
                    );

                    olisedndocs.taxnum = myHeader["SENDER"][0];

                    let oliscustomer = await liscustomers.find({
                        company: pCompany,
                        taxnum: olisedndocs.taxnum,
                        _deleted: false,
                    });
                    
                    olisedndocs.company = pCompany;
                    olisedndocs.doctype = '';
                    olisedndocs.docnum = '';
                    olisedndocs.customer = oliscustomer.customer;
                    olisedndocs.name1 = oliscustomer.name1;
                    olisedndocs.docdate = new Date(myHeader["CDATE"][0]);
                    olisedndocs.edocdate = new Date(myHeader["CDATE"][0]);
                    olisedndocs.edndocdate = new Date();
                    olisedndocs.grandtotal = myHeader["PAYABLE_AMOUNT"][0]['_'];
                    olisedndocs.currency =
                        myHeader["PAYABLE_AMOUNT"][0]["$"]["currencyID"];

                    olisedndocs._createdby = global.sys_user;
                    olisedndocs.edoctype = 1;
                    olisedndocs.postway = 0;
                    olisedndocs.edocstat = 1;

                    olisedndocs.processstat = myHeader["GIB_STATUS_CODE"][0];
                    olisedndocs.processstatstr =
                        myHeader["GIB_STATUS_DESCRIPTION"][0];

                    olisedndocs.alias = myHeader["FROM"][0];

                    //--------------------------------------
                    olisedndocs.einvouuid = myHeader["ENVELOPE_IDENTIFIER"][0];
                    olisedndocs.einvotype = myHeader["PROFILEID"][0];
                    olisedndocs.einvonumber = '';
                    olisedndocs.edistr = myContent;

                    if (olisedndocs.edistr == undefined)
                      throw new Error("UBL Alınamadı!");

                    //--------------------------------------
                    const olisedndocsSave = new lisedndocs(olisedndocs);
                    await olisedndocsSave.save().catch((err) => {
                        console.log(err);
                      throw new Error("E-fatura Kaydedilemedi!");
                    });
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

            //---------------------------

          throw new Error("E-Fatura Okunurken Hata Oluştu!");
        });
}
