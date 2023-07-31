export default async function getTaxSubSchema(plissaldocs) {
    console.log("getTaxSubSchema");

    var TAXSUBSCHEMA = `<cac:TaxSubtotal>
                        <cbc:TaxableAmount currencyID="#CURRENCYCODE#">#SUBTOTAL#</cbc:TaxableAmount>
                        <cbc:TaxAmount currencyID="#CURRENCYCODE#">#VATAMOUNT#</cbc:TaxAmount>
                        <cbc:CalculationSequenceNumeric>#INDEXNUM#</cbc:CalculationSequenceNumeric>
                        <cbc:Percent>#VATRATE#</cbc:Percent>
                        <cac:TaxCategory>#NOVATREASON#
                                <cac:TaxScheme>
                                        <cbc:Name>#TAXNAME#</cbc:Name>
                                        <cbc:TaxTypeCode>#TAXCODE#</cbc:TaxTypeCode>
                                </cac:TaxScheme>
                        </cac:TaxCategory>
                </cac:TaxSubtotal>`;

    var FINALTAXSUBSCHEMA = "";
    for (let i in plissaldocs.vats) {
        let myVat = plissaldocs.vats[i];
        FINALTAXSUBSCHEMA += TAXSUBSCHEMA;

        FINALTAXSUBSCHEMA = FINALTAXSUBSCHEMA.replace(
            "#CURRENCYCODE#",
            plissaldocs.currency
        );
        FINALTAXSUBSCHEMA = FINALTAXSUBSCHEMA.replace(
            "#CURRENCYCODE#",
            plissaldocs.currency
        );

        FINALTAXSUBSCHEMA = FINALTAXSUBSCHEMA.replace(
            "#SUBTOTAL#",
            plissaldocs.subtotal
        );
        FINALTAXSUBSCHEMA = FINALTAXSUBSCHEMA.replace(
            "#VATAMOUNT#",
            plissaldocs.vatamnt
        );
        FINALTAXSUBSCHEMA = FINALTAXSUBSCHEMA.replace("#INDEXNUM#", i + 1);
        FINALTAXSUBSCHEMA = FINALTAXSUBSCHEMA.replace(
            "#VATRATE#",
            myVat.vatrate
        );
        FINALTAXSUBSCHEMA = FINALTAXSUBSCHEMA.replace("#TAXNAME#", "KDV");
        FINALTAXSUBSCHEMA = FINALTAXSUBSCHEMA.replace("#TAXCODE#", "0015");

        if (myVat.vatamnt == 0) {
            FINALTAXSUBSCHEMA = FINALTAXSUBSCHEMA.replace(
                "#NOVATREASON#",
                `<cbc:TaxExemptionReasonCode>#TAXEXMPCODE#</cbc:TaxExemptionReasonCode>
<cbc:TaxExemptionReason>#TAXEXMPTEXT#</cbc:TaxExemptionReason>`
            );

            FINALTAXSUBSCHEMA = FINALTAXSUBSCHEMA.replace(
                "#TAXEXMPCODE#",
                myVat.novatcode
            );
            FINALTAXSUBSCHEMA = FINALTAXSUBSCHEMA.replace(
                "#TAXEXMPTEXT#",
                myVat.novattxt
            );
        } else {
            FINALTAXSUBSCHEMA = FINALTAXSUBSCHEMA.replace("#NOVATREASON#", "");
        }
    }

    console.log("getTaxSubSchemaTAXSUBSCHEMA");

    return FINALTAXSUBSCHEMA;
}
