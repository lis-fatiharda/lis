export default async function () {
    const itemSchema = `<cac:DespatchLine>
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
<cac:InvoiceLine>
<cbc:ID/>
<cbc:InvoicedQuantity>#QUANTITY#</cbc:InvoicedQuantity>
<cbc:LineExtensionAmount currencyID="#CURRENCYCODE#">#SUBTOTAL#</cbc:LineExtensionAmount>
<cac:Item>
<cbc:Name/>
</cac:Item>
<cac:Price>
<cbc:PriceAmount currencyID="#CURRENCYCODE#">#SPRICE#</cbc:PriceAmount>
</cac:Price>
</cac:InvoiceLine>
</cac:GoodsItem>
</cac:Shipment>
</cac:DespatchLine>`;

    return itemSchema;
}
