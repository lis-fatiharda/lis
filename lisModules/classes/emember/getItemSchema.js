export default async function getItemSchema() {
    console.log("getItemSchema");
    const itemSchema = `<cac:InvoiceLine>
            <cbc:ID>#LINENO#</cbc:ID>
            <cbc:Note>#LINENOTE#</cbc:Note>
            <cbc:InvoicedQuantity unitCode="#UNITCODE#">#QUANTITY#</cbc:InvoicedQuantity>
            <cbc:LineExtensionAmount currencyID="#CURRENCYCODE#">#SUBTOTAL#</cbc:LineExtensionAmount>
            #DISCOUNTSCHEMA#
            <cac:TaxTotal>
                        <cbc:TaxAmount currencyID="#CURRENCYCODE#">#VATAMOUNT#</cbc:TaxAmount>
                        #TAXSUBTOTALSCHEMA#
            </cac:TaxTotal>
            <cac:Item>
                <cbc:Description>#ITEMDESC#</cbc:Description>
                <cbc:Name>#MATERIAL#</cbc:Name>#BUYERITEMSTR#
            </cac:Item>
            <cac:Price>
                <cbc:PriceAmount currencyID="#CURRENCYCODE#">#SPRICE#</cbc:PriceAmount>
            </cac:Price>
        </cac:InvoiceLine>`;

    console.log("getItemSchema************");

    return itemSchema;
}
