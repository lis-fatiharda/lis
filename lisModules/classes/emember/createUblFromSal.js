import fs from "fs";
import path from "path";
import getBaseSchema from "./getBaseSchema.js";
import getOrderRefSchema from "./getOrderRefSchema.js";
import getDespatchRefSchema from "./getDespatchRefSchema.js";
import getAdditionalSchema from "./getAdditionalSchema.js";
import getAdditionalSchemaForEarchive from "./getAdditionalSchemaForEarchive.js";

import getSignatureSchema from "./getSignatureSchema.js";
import getSupplierSchema from "./getSupplierSchema.js";
import getCustomerSchema from "./getCustomerSchema.js";
import getTaxSchema from "./getTaxSchema.js";
import getTaxSubSchema from "./getTaxSubSchema.js";

import getMonetaryTotalSchema from "./getMonetaryTotalSchema.js";
import getItemSchema from "./getItemSchema.js";
import getItemDiscSchema from "./getItemDiscSchema.js";
import getHeadDiscSchema from "./getHeadDiscSchema.js";

import getTaxItemSchema from "./getTaxItemSchema.js";
import getExchangeRateSchema from "./getExchangeRateSchema.js";

import lisbas001 from "../../../lisModels/lisbas001.js";
import lisbas007 from "../../../lisModels/lisbas007.js";


export default async function createUblFromSal(plissaldocs, plisedndocs) {
    const olisbas001 = await lisbas001.findOne({
        company: plissaldocs.company,
    });

    //**********BASESCHEMA************************************* */
    var EINVOSTR = "";
    var BASEBLOCK = await getBaseSchema();
    //------------------------------------

    if (plisedndocs.edoctype == 1) {
        if (plissaldocs.einvotype == 0)
            BASEBLOCK = BASEBLOCK.replace("#PROFILEID#", "TEMELFATURA");
        if (plissaldocs.einvotype == 1)
            BASEBLOCK = BASEBLOCK.replace("#PROFILEID#", "TICARIFATURA");
    }
    if (plisedndocs.edoctype == 2)
        BASEBLOCK = BASEBLOCK.replace("#PROFILEID#", "EARSIVFATURA");
    if (plisedndocs.edoctype == 3) return;
    //------------------------------------

    //BASEBLOCK = BASEBLOCK.replace("#EINVONUMBER#", plisedndocs.einvonumber);

    BASEBLOCK = BASEBLOCK.replace("#UUID#", plisedndocs.einvouuid);
    BASEBLOCK = BASEBLOCK.replace(
        "#VALIDFROM#",
        lis.format(new Date(plissaldocs.validfrom), "yyyy-MM-dd")
    );
    BASEBLOCK = BASEBLOCK.replace(
        "#VALIDTIME#",
        lis.format(new Date(plissaldocs.validfrom), "HH:mm:SS")
    );
    if (plissaldocs.vats.findIndex((e) => e.novatcode == "212") > -1) {
        BASEBLOCK = BASEBLOCK.replace("#INVOICETYPECODE#", "ISTISNA");
    } else {
        BASEBLOCK = BASEBLOCK.replace("#INVOICETYPECODE#", "SATIS");
    }

    let noteSchema = "<cbc:Note>#NOTE#</cbc:Note>";
    let noteBlock = "";
    for (let nt in plissaldocs.notes) {
        if (plissaldocs.notes[nt]?.isenote == true) {
            noteBlock += noteSchema;
            noteBlock = noteBlock.replace(
                "#NOTE#",
                plissaldocs.notes[nt]?.note
            );
        }
    }
    BASEBLOCK = BASEBLOCK.replace("#NOTEBLOCK#", noteBlock);

    BASEBLOCK = BASEBLOCK.replace("#CURRENCYCODE#", plissaldocs.currency);
    BASEBLOCK = BASEBLOCK.replace("#LINECOUNT#", plissaldocs.items.length);

    EINVOSTR += BASEBLOCK;
    console.log("111111111111111111111111111");

    //**********getOrderRefSchema************************************* */

    //var ORDERBLOCK = await getOrderRefSchema();

    //**********getOrderRefSchema************************************* */

    //var DESPATCHBLOCK = await getDespatchRefSchema();

    //**********getAdditionalSchema************************************* */

    var ADDITIONALBLOCK = await getAdditionalSchema();

    ADDITIONALBLOCK = ADDITIONALBLOCK.replace(
        "#XSLTID#",
        plisedndocs.einvouuid
    );
    ADDITIONALBLOCK = ADDITIONALBLOCK.replace(
        "#XSLTDATE#",
        lis.format(new Date(plissaldocs.validfrom), "yyyy-MM-dd")
    );

    if (plisedndocs.edoctype == 1) {
        let xsltStr = await fs.readFileSync(
            path.join(
                process.env.liserp_DIR,
                "lisModules/classes/emember/wsXslt/eInvoice.xslt"
            )
        );
        console.log("******", xsltStr);
        const xsltStrBuffered = Buffer.from(xsltStr).toString("base64");
        ADDITIONALBLOCK = ADDITIONALBLOCK.replace("#XSLTSTR#", xsltStrBuffered);
    }
    if (plisedndocs.edoctype == 2) {
        let xsltStr = await fs.readFileSync(
            path.join(
                process.env.liserp_DIR,
                "lisModules/classes/emember/wsXslt/eArchive.xslt"
            )
        );
        const xsltStrBuffered = Buffer.from(xsltStr).toString("base64");
        ADDITIONALBLOCK = ADDITIONALBLOCK.replace("#XSLTSTR#", xsltStrBuffered);
    }

    EINVOSTR += ADDITIONALBLOCK;

    console.log("222222222222222222222222");
    if (plisedndocs.edoctype == 2) {
        ADDITIONALBLOCK = await getAdditionalSchemaForEarchive();
        ADDITIONALBLOCK = ADDITIONALBLOCK.replace(
            "#XSLTDATE#",
            lis.format(new Date(plissaldocs.validfrom), "yyyy-MM-dd")
        );
        EINVOSTR += ADDITIONALBLOCK;
    }

    //**********getSignatureSchema************************************* */

    var SIGNATUREBLOCK = await getSignatureSchema();

    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#TAXNO#", olisbas001.taxnum);
    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#TAXNO#", olisbas001.taxnum);
    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#WEBADR#", olisbas001.website);
    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#PARTYTAXTYPE#", "VKN");

    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#POBOX#", olisbas001.postcode);

    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#CUSNAME#", olisbas001.title);
    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#ADRESS#", olisbas001.address);
    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#BUILDING#", olisbas001.building);
    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#STATE#", olisbas001.state);
    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#CITY#", olisbas001.city);
    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#COUNTRY#", olisbas001.country);
    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#TAXDEPT#", olisbas001.taxdept);
    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#TEL#", olisbas001.telnum);

    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#FAX#", olisbas001.faxnum);
    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#EMAIL#", olisbas001.email);
    SIGNATUREBLOCK = SIGNATUREBLOCK.replace("#PERSON#", "");
    //SIGNATUREBLOCK = SIGNATUREBLOCK.replace(
    //    "#Signature",
    //    `#Signature_${plisedndocs.einvonumber}`
    //);

    EINVOSTR += SIGNATUREBLOCK;

    console.log("333333333333333333333333333333");

    //**********getSupplierSchema************************************* */

    var SUPPLIERBLOCK = await getSupplierSchema();

    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#WEBADR#", olisbas001.website);
    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#PARTYTAXTYPE#", "VKN");
    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#TAXNO#", olisbas001.taxnum);
    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#TICARISICILNO#", "");
    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#CUSNAME#", olisbas001.title);
    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#ADRESS#", olisbas001.address);
    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#BUILDING#", "");
    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#STATE#", "");
    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#CITY#", olisbas001.city);
    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#POBOX#", olisbas001.postcode);
    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#COUNTRY#", olisbas001.country);

    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#TAXDEPT#", olisbas001.taxdept);
    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#TEL#", olisbas001.telnum);
    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#FAX#", olisbas001.faxnum);
    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#EMAIL#", olisbas001.email);

    SUPPLIERBLOCK = SUPPLIERBLOCK.replace("#PERSON#", "");

    EINVOSTR += SUPPLIERBLOCK;

    console.log("44444444444444444444444444444444444");

    //**********getCustomerSchema************************************* */

    var CUSTOMERBLOCK = await getCustomerSchema();

    CUSTOMERBLOCK = CUSTOMERBLOCK.replace("#WEBADR#", plissaldocs.ircwebsite);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replace("#PARTYTAXTYPE#", "VKN");
    CUSTOMERBLOCK = CUSTOMERBLOCK.replace("#TAXNO#", plissaldocs.irctaxnum);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replace("#CUSNAME#", plissaldocs.ircname1);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replace("#ADRESS#", plissaldocs.address);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replace("#BUILDING#", "");
    CUSTOMERBLOCK = CUSTOMERBLOCK.replace("#STATE#", "");
    CUSTOMERBLOCK = CUSTOMERBLOCK.replace("#CITY#", plissaldocs.irccity);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replace("#POBOX#", plissaldocs.ircpostcode);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replace("#COUNTRY#", plissaldocs.irccountry);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replace("#TAXDEPT#", plissaldocs.irctaxdept);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replace("#TEL#", plissaldocs.irctelnum);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replace("#FAX#", plissaldocs.ircfaxnum);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replace("#EMAIL#", plissaldocs.ircemail);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replace("#PERSON#", "");

    EINVOSTR += CUSTOMERBLOCK;

    console.log("555555555555555555555555555555555555555555");

    //**********getExchangeRateSchema************************************* */

    if (plissaldocs.currency != "TRY") {
        var CURRENCYRATEBLOCK = await getExchangeRateSchema();

        CURRENCYRATEBLOCK = CURRENCYRATEBLOCK.replace(
            "#SourceCurrencyCode#",
            plissaldocs.currency
        );
        CURRENCYRATEBLOCK = CURRENCYRATEBLOCK.replace(
            "#TargetCurrencyCode#",
            "TRY"
        );
        CURRENCYRATEBLOCK = CURRENCYRATEBLOCK.replace(
            "#CURRATE#",
            plissaldocs.currate
        );

        EINVOSTR += CURRENCYRATEBLOCK;
    }

    //**********getHeadDiscSchema************************************* */
    if (Math.abs(plissaldocs.discamnt) > 0) {
        var HEADDISCBLOCK = await getHeadDiscSchema();
        HEADDISCBLOCK = HEADDISCBLOCK.replace(
            "#DISCORSURC#",
            plissaldocs.discamnt < 0 ? false : true
        );
        HEADDISCBLOCK = HEADDISCBLOCK.replace(
            "#DISCREASON#",
            "indirim/artırım"
        );
        HEADDISCBLOCK = HEADDISCBLOCK.replace(
            "#CURRENCYCODE#",
            plissaldocs.currency
        );
        HEADDISCBLOCK = HEADDISCBLOCK.replace(
            "#DISCAMOUNT#",
            Math.abs(plissaldocs.discamnt)
        );
        EINVOSTR += HEADDISCBLOCK;
    }

    //**********getTaxSchema************************************* */

    var TAXBLOCK = await getTaxSchema();

    TAXBLOCK = TAXBLOCK.replace("#CURRENCYCODE#", plissaldocs.currency);
    TAXBLOCK = TAXBLOCK.replace("#VATAMOUNT#", plissaldocs.vatamnt);
    TAXBLOCK = TAXBLOCK.replace("#CURRENCYCODE#", plissaldocs.currency);

    var TAXSUBSCHEMA = await getTaxSubSchema(plissaldocs);
    TAXBLOCK = TAXBLOCK.replace("#TAXSUBTOTALSCHEMA#", TAXSUBSCHEMA);

    EINVOSTR += TAXBLOCK;

    console.log("666666666666666666666666666666666666666");

    //**********getMonetaryTotalSchema************************************* */

    var MONETARYTOTALBLOCK = await getMonetaryTotalSchema(plissaldocs);

    MONETARYTOTALBLOCK = MONETARYTOTALBLOCK.replace(
        "#CURRENCYCODE#",
        plissaldocs.currency
    );
    MONETARYTOTALBLOCK = MONETARYTOTALBLOCK.replace(
        "#CURRENCYCODE#",
        plissaldocs.currency
    );
    MONETARYTOTALBLOCK = MONETARYTOTALBLOCK.replace(
        "#CURRENCYCODE#",
        plissaldocs.currency
    );
    MONETARYTOTALBLOCK = MONETARYTOTALBLOCK.replace(
        "#CURRENCYCODE#",
        plissaldocs.currency
    );
    MONETARYTOTALBLOCK = MONETARYTOTALBLOCK.replace(
        "#CURRENCYCODE#",
        plissaldocs.currency
    );
    MONETARYTOTALBLOCK = MONETARYTOTALBLOCK.replace(
        "#CURRENCYCODE#",
        plissaldocs.currency
    );

    MONETARYTOTALBLOCK = MONETARYTOTALBLOCK.replace(
        "#GROSS#",
        plissaldocs.gross
    );
    MONETARYTOTALBLOCK = MONETARYTOTALBLOCK.replace(
        "#SUBTOTAL#",
        plissaldocs.subtotal
    );
    MONETARYTOTALBLOCK = MONETARYTOTALBLOCK.replace(
        "#HEADGRANDTOTAL#",
        plissaldocs.grandtotal
    );
    //----------------------------------------------------------------

    if (plissaldocs.discamnt < 0) {
        MONETARYTOTALBLOCK = MONETARYTOTALBLOCK.replace(
            "#DISCAMOUNT#",
            Math.abs(plissaldocs.discamnt)
        );
        MONETARYTOTALBLOCK = MONETARYTOTALBLOCK.replace("#INCRAMOUNT#", 0);
    } else {
        MONETARYTOTALBLOCK = MONETARYTOTALBLOCK.replace(
            "#INCRAMOUNT#",
            Math.abs(plissaldocs.discamnt)
        );
        MONETARYTOTALBLOCK = MONETARYTOTALBLOCK.replace("#DISCAMOUNT#", 0);
    }

    //----------------------------------------------------------------

    MONETARYTOTALBLOCK = MONETARYTOTALBLOCK.replace(
        "#GRANDTOTAL#",
        plissaldocs.grandtotal
    );

    EINVOSTR += MONETARYTOTALBLOCK;

    console.log("77777777777777777777777777777777777");

    //**********getItemSchema************************************* */

    for (let i in plissaldocs.items) {
        var myItem = plissaldocs.items[i];
        console.log(myItem);
        var ITEMSBLOCK = await getItemSchema(plissaldocs);

        ITEMSBLOCK = ITEMSBLOCK.replace("#LINENO#", myItem.itemnum);
        ITEMSBLOCK = ITEMSBLOCK.replace("#LINENOTE#", "");
        let olisbas007 = await lisbas007.findOne({
            company: plissaldocs.company,
            unit: myItem.qunit,
        });
        ITEMSBLOCK = ITEMSBLOCK.replace("#UNITCODE#", olisbas007.unitcode);
        ITEMSBLOCK = ITEMSBLOCK.replace("#QUANTITY#", myItem.quantity);
        ITEMSBLOCK = ITEMSBLOCK.replace("#CURRENCYCODE#", plissaldocs.currency);
        ITEMSBLOCK = ITEMSBLOCK.replace("#CURRENCYCODE#", plissaldocs.currency);
        ITEMSBLOCK = ITEMSBLOCK.replace("#CURRENCYCODE#", plissaldocs.currency);
        ITEMSBLOCK = ITEMSBLOCK.replace("#CURRENCYCODE#", plissaldocs.currency);
        ITEMSBLOCK = ITEMSBLOCK.replace("#SUBTOTAL#", myItem.subtotal);
        ITEMSBLOCK = ITEMSBLOCK.replace("#CURRENCYCODE#", plissaldocs.currency);
        //----------------------------------------------------------------

        if (myItem.discount.length > 0) {
            
            var DISCBLOCK = "";
            for (let i in myItem.discount) {
                const myDisc = myItem.discount[i];
                DISCBLOCK += await getItemDiscSchema();

                DISCBLOCK = DISCBLOCK.replace(
                    "#DISCORSURC#",
                    myDisc.amnt < 0 ? false : true
                );
                DISCBLOCK = DISCBLOCK.replace("#DISCRATE#", myDisc.rate);
                DISCBLOCK = DISCBLOCK.replace("#DISCAMOUNT#", myDisc.amnt);
                DISCBLOCK = DISCBLOCK.replace("#GROSS#", myItem.gross);
                let ip = i + 1;
                DISCBLOCK = DISCBLOCK.replace("#DISCREASON#", "İndirim-" + ip);

                DISCBLOCK = DISCBLOCK.replace(
                    "#CURRENCYCODE#",
                    plissaldocs.currency
                );
                DISCBLOCK = DISCBLOCK.replace(
                    "#CURRENCYCODE#",
                    plissaldocs.currency
                );
            }
            ITEMSBLOCK = ITEMSBLOCK.replace("#DISCOUNTSCHEMA#", DISCBLOCK);
        } else {
            ITEMSBLOCK = ITEMSBLOCK.replace("#DISCOUNTSCHEMA#", '');
        }
        //----------------------------------------------------------------

        ITEMSBLOCK = ITEMSBLOCK.replace("#CURRENCYCODE#", plissaldocs.currency);
        ITEMSBLOCK = ITEMSBLOCK.replace("#VATAMOUNT#", myItem.vatamnt);
        ITEMSBLOCK = ITEMSBLOCK.replace("#CURRENCYCODE#", plissaldocs.currency);

        ITEMSBLOCK = ITEMSBLOCK.replace("#ITEMDESC#", myItem.mtext);
        ITEMSBLOCK = ITEMSBLOCK.replace("#MATERIAL#", myItem.mtext);
        ITEMSBLOCK = ITEMSBLOCK.replace("#BUYERITEMSTR#", "");
        ITEMSBLOCK = ITEMSBLOCK.replace("#MATERIALID#", "");

        ITEMSBLOCK = ITEMSBLOCK.replace("#ORIGINCOUNTRY#", "");
        ITEMSBLOCK = ITEMSBLOCK.replace("#ORIGINCOUNTRYTXT#", "");
        ITEMSBLOCK = ITEMSBLOCK.replace("#LISTNAME#", "");
        ITEMSBLOCK = ITEMSBLOCK.replace("#VERSIONID#", "");
        ITEMSBLOCK = ITEMSBLOCK.replace("#DGTIP#", "");

        ITEMSBLOCK = ITEMSBLOCK.replace("#SPRICE#", myItem.price);

        //Item Tax Schema

        var TAXSUBTOTALSCHEMA = await getTaxItemSchema(myItem);
        ITEMSBLOCK = ITEMSBLOCK.replace(
            "#TAXSUBTOTALSCHEMA#",
            TAXSUBTOTALSCHEMA
        );
        ITEMSBLOCK = ITEMSBLOCK.replace("#CURRENCYCODE#", plissaldocs.currency);
        ITEMSBLOCK = ITEMSBLOCK.replace("#CURRENCYCODE#", plissaldocs.currency);

        ITEMSBLOCK = ITEMSBLOCK.replace("#SUBTOTAL#", myItem.subtotal);
        ITEMSBLOCK = ITEMSBLOCK.replace("#VATAMOUNT#", myItem.vatamnt);
        ITEMSBLOCK = ITEMSBLOCK.replace("#INDEXNUM#", 1);
        ITEMSBLOCK = ITEMSBLOCK.replace("#VATRATE#", myItem.vatrate);
        ITEMSBLOCK = ITEMSBLOCK.replace("#TAXNAME#", "KDV");
        ITEMSBLOCK = ITEMSBLOCK.replace("#TAXCODE#", "0015");

        console.log("8888888888888888888888888888", ITEMSBLOCK);

        EINVOSTR += ITEMSBLOCK;
    }

    EINVOSTR += "</Invoice>";

    console.log("****************", EINVOSTR);

    return EINVOSTR;
}
