import fs from "fs";
import path from "path";
import getBaseSchemaD from "./1-getBaseSchemaD.js";
import getOrderRefSchemaD from "./2-getOrderRefSchemaD.js";
import getAdditionalSchemaD from "./3-getAdditionalSchemaD.js";

import getSignatureSchemaD from "./4-getSignatureSchemaD.js";
import getSupplierSchemaD from "./5-getSupplierSchemaD.js";
import getCustomerSchemaD from "./6-getCustomerSchemaD.js";

import getShipmentD from "./7-getShipmentD.js";
import getItemSchemaD from "./9-getItemSchemaD.js";

export default async function (plissaldocs, plisedndocs) {
    const olisbas001 = await lisbas001.findOne({
        company: plissaldocs.company,
    });

    //**********BASESCHEMA************************************* */
    var EINVOSTR = "";
    var BASEBLOCK = await getBaseSchemaD();
    //------------------------------------

    BASEBLOCK = BASEBLOCK.replace("#PROFILEID#", "TEMELIRSALIYE");

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

    BASEBLOCK = BASEBLOCK.replace("#INVOICETYPECODE#", "SEVK");

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

    BASEBLOCK = BASEBLOCK.replace("#LINECOUNT#", plissaldocs.items.length);

    EINVOSTR += BASEBLOCK;
    console.log("111111111111111111111111111");

    //**********getOrderRefSchemaD************************************* */

    //var ORDERBLOCK = await getOrderRefSchemaD();

    //**********getOrderRefSchemaD************************************* */

    //var DESPATCHBLOCK = await getDespatchRefSchema();

    //**********getAdditionalSchemaD************************************* */

    var ADDITIONALBLOCK = await getAdditionalSchemaD();

    ADDITIONALBLOCK = ADDITIONALBLOCK.replace(
        "#XSLTID#",
        plisedndocs.einvouuid
    );
    ADDITIONALBLOCK = ADDITIONALBLOCK.replace(
        "#XSLTDATE#",
        lis.format(new Date(plissaldocs.validfrom), "yyyy-MM-dd")
    );

    let xsltStr = await fs.readFileSync(
        path.join(
            process.env.liserp_DIR,
            "lisModules/classes/emember/wsXslt/eDelivery.xslt"
        )
    );
    console.log("******", xsltStr);
    const xsltStrBuffered = Buffer.from(xsltStr).toString("base64");
    ADDITIONALBLOCK = ADDITIONALBLOCK.replace("#XSLTSTR#", xsltStrBuffered);

    EINVOSTR += ADDITIONALBLOCK;

    console.log("222222222222222222222222");

    //**********getSignatureSchemaD************************************* */

    var SIGNATUREBLOCK = await getSignatureSchemaD();

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

    //**********getSupplierSchemaD************************************* */

    var SUPPLIERBLOCK = await getSupplierSchemaD();

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

    //**********getCustomerSchemaD************************************* */

    var CUSTOMERBLOCK = await getCustomerSchemaD();

    CUSTOMERBLOCK = CUSTOMERBLOCK.replaceAll("#WEBADR#", plissaldocs.grcwebsite);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replaceAll("#PARTYTAXTYPE#", "VKN");
    CUSTOMERBLOCK = CUSTOMERBLOCK.replaceAll("#TAXNO#", plissaldocs.grctaxnum);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replaceAll("#CUSNAME#", plissaldocs.grcname1);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replaceAll("#ADRESS#", plissaldocs.grcaddress);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replaceAll("#BUILDING#", plissaldocs.grcbuilding);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replaceAll("#STATE#", plissaldocs.district);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replaceAll("#CITY#", plissaldocs.grccity);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replaceAll("#POBOX#", plissaldocs.grcpostcode);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replaceAll("#COUNTRY#", plissaldocs.grccountry);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replaceAll("#TAXDEPT#", plissaldocs.grctaxdept);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replaceAll("#TEL#", plissaldocs.grctelnum);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replaceAll("#FAX#", plissaldocs.grcfaxnum);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replaceAll("#EMAIL#", plissaldocs.grcemail);
    CUSTOMERBLOCK = CUSTOMERBLOCK.replaceAll("#PERSON#", "");

    EINVOSTR += CUSTOMERBLOCK;

    console.log("555555555555555555555555555555555555555555");

    //**********getShipmentD************************************* */

    var SHIPMENTBLOCK = await getShipmentD();

    SHIPMENTBLOCK = SHIPMENTBLOCK.replace("#STATE#", plissaldocs.grcdistrict);
    SHIPMENTBLOCK = SHIPMENTBLOCK.replace("#CITY#", plissaldocs.grccity);
    SHIPMENTBLOCK = SHIPMENTBLOCK.replace("#POBOX#", plissaldocs.grcpostcode);
    SHIPMENTBLOCK = SHIPMENTBLOCK.replace("#DISTRICT#", plissaldocs.grcdistrict);
    SHIPMENTBLOCK = SHIPMENTBLOCK.replace("#COUNTRY#", plissaldocs.grccountry);

    SHIPMENTBLOCK = SHIPMENTBLOCK.replace("#CURRENCYCODE#", plissaldocs.currency);
    SHIPMENTBLOCK = SHIPMENTBLOCK.replace("#SUBTOTAL#", plissaldocs.subtotal);
    SHIPMENTBLOCK = SHIPMENTBLOCK.replace("#DRIVERPLATE#", plissaldocs.driverplate);

    SHIPMENTBLOCK = SHIPMENTBLOCK.replace("#DRIVERNAME#", plissaldocs.drivername);
    SHIPMENTBLOCK = SHIPMENTBLOCK.replace("#DRIVERSURNAME#", plissaldocs.driversurname);
    SHIPMENTBLOCK = SHIPMENTBLOCK.replace("#DRIVERID#", plissaldocs.driverid);
    SHIPMENTBLOCK = SHIPMENTBLOCK.replace("#DRIVERID#", plissaldocs.driverid);
    SHIPMENTBLOCK = SHIPMENTBLOCK.replace(
        "#VALIDFROM#",
        lis.format(new Date(plissaldocs.validfrom), "yyyy-MM-dd")
    );
    SHIPMENTBLOCK = SHIPMENTBLOCK.replace(
        "#VALIDTIME#",
        lis.format(new Date(plissaldocs.validfrom), "HH:mm:SS")
    );
    SHIPMENTBLOCK = SHIPMENTBLOCK.replace("#DRIVERPLATE#", plissaldocs.driverplate);


    EINVOSTR += SHIPMENTBLOCK;

    console.log("6666666666666666666666666666666666666666666666");

    //**********getItemSchemaD************************************* */

    for (let i in plissaldocs.items) {
        var myItem = plissaldocs.items[i];
        console.log(myItem);
        var ITEMSBLOCK = await getItemSchemaD(plissaldocs);

        ITEMSBLOCK = ITEMSBLOCK.replaceAll("#LINENO#", myItem.itemnum);
        ITEMSBLOCK = ITEMSBLOCK.replace("#LINENOTE#", "");
        let olisbas007 = await lisbas007.findOne({ 
            company: plissaldocs.company,
            unit: myItem.qunit,
        });
        ITEMSBLOCK = ITEMSBLOCK.replaceAll("#UNITCODE#", olisbas007.unitcode);
        ITEMSBLOCK = ITEMSBLOCK.replaceAll("#QUANTITY#", myItem.quantity);
        ITEMSBLOCK = ITEMSBLOCK.replaceAll("#CURRENCYCODE#", plissaldocs.currency);
        ITEMSBLOCK = ITEMSBLOCK.replaceAll("#CURRENCYCODE#", plissaldocs.currency);
        ITEMSBLOCK = ITEMSBLOCK.replaceAll("#CURRENCYCODE#", plissaldocs.currency);
        ITEMSBLOCK = ITEMSBLOCK.replaceAll("#CURRENCYCODE#", plissaldocs.currency);
        ITEMSBLOCK = ITEMSBLOCK.replaceAll("#SUBTOTAL#", myItem.subtotal);
        ITEMSBLOCK = ITEMSBLOCK.replaceAll("#CURRENCYCODE#", plissaldocs.currency);
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
            ITEMSBLOCK = ITEMSBLOCK.replace("#DISCOUNTSCHEMA#", "");
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

        EINVOSTR += ITEMSBLOCK;
    }

    EINVOSTR += "</DespatchAdvice>";

    console.log("****************", EINVOSTR);

    return EINVOSTR;
}
