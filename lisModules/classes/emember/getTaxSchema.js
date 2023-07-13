export default async function getTaxSchema() {
    const taxSchema = `<cac:TaxTotal>
                        <cbc:TaxAmount currencyID="#CURRENCYCODE#">#VATAMOUNT#</cbc:TaxAmount>
                        #TAXSUBTOTALSCHEMA#
                </cac:TaxTotal>`;

    return taxSchema;
}
