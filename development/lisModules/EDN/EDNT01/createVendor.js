import xml2js from "xml2js";
export default async function (reportListSelected) {
    let oliscustomer = new liscustomers(liscustomers.prototype.schema.tree);

    const xmlOfBase64 = Buffer.from(
        reportListSelected.edistr,
        "base64"
    ).toString();

    xml2js.parseString(xmlOfBase64, async function (err, result) {
        try {
            let supplierInfo =
                result["Invoice"]["cac:AccountingSupplierParty"][0];

            oliscustomer.name1 =
                supplierInfo["cac:Party"][0]["cac:PartyName"][0]["cbc:Name"][0];
            oliscustomer.title =
                supplierInfo["cac:Party"][0]["cac:PartyName"][0]["cbc:Name"][0];

            oliscustomer.taxdept =
                supplierInfo["cac:Party"][0]["cac:PartyTaxScheme"][0][
                    "cac:TaxScheme"
                ][0]["cbc:Name"][0];
            oliscustomer.taxnum = reportListSelected.taxnum;

            oliscustomer.telnum =
                supplierInfo["cac:Party"][0]["cac:Contact"][0][
                    "cbc:Telephone"
                ][0];
            oliscustomer.faxnum =
                supplierInfo["cac:Party"][0]["cac:Contact"][0][
                    "cbc:Telephone"
                ][0];
            oliscustomer.email =
                supplierInfo["cac:Party"][0]["cac:Contact"][0][
                    "cbc:ElectronicMail"
                ][0];
            oliscustomer.website =
                supplierInfo["cac:Party"][0]["cbc: WebsiteURI"][0];
        } catch (error) {
            
        }
    });
    oliscustomer.custorvend = 2;

    return oliscustomer;
}
