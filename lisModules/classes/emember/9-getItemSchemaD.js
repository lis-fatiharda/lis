export default async function () {
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

   
    const itemSchema1 = `<cac:InvoiceLine>
<cbc:ID>#LINENO#</cbc:ID>
<cbc:DeliveredQuantity unitCode="#UNITCODE#">#QUANTITY#</cbc:DeliveredQuantity>
<cac:OrderLineReference>
<cbc:LineID>#LINENO#</cbc:LineID>
</cac:OrderLineReference>
<cac:Item>
<cbc:Name>#ITEMDESC#</cbc:Name>
<cac:SellersItemIdentification>
<cbc:ID>#MATERIAL#</cbc:ID>
</cac:SellersItemIdentification>
</cac:Item>
<cac:Shipment>
<cbc:ID/>
<cac:GoodsItem>

</cac:GoodsItem>
</cac:Shipment>
</cac:InvoiceLine>`;
    
    
    

    return itemSchema;
}
