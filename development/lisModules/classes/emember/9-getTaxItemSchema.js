export default async function getTaxItemSchema() {
    console.log("getTaxSubSchema");

    var TAXSUBSCHEMA = `<cac:TaxSubtotal>
                        <cbc:TaxableAmount currencyID="#CURRENCYCODE#">#SUBTOTAL#</cbc:TaxableAmount>
                        <cbc:TaxAmount currencyID="#CURRENCYCODE#">#VATAMOUNT#</cbc:TaxAmount>
                        <cbc:CalculationSequenceNumeric>#INDEXNUM#</cbc:CalculationSequenceNumeric>
                        <cbc:Percent>#VATRATE#</cbc:Percent>
                        <cac:TaxCategory>
                                <cac:TaxScheme>
                                        <cbc:Name>#TAXNAME#</cbc:Name>
                                        <cbc:TaxTypeCode>#TAXCODE#</cbc:TaxTypeCode>
                                </cac:TaxScheme>
                        </cac:TaxCategory>
                </cac:TaxSubtotal>`;

    return TAXSUBSCHEMA;
}
