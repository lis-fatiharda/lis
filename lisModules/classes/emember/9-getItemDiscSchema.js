export default async function getItemDiscSchema() {
    console.log("getItemDiscSchema");
    const itemSchema = `<cac:AllowanceCharge>
                <cbc:ChargeIndicator>#DISCORSURC#</cbc:ChargeIndicator>
                <cbc:AllowanceChargeReason>#DISCREASON#</cbc:AllowanceChargeReason>
                <cbc:MultiplierFactorNumeric>#DISCRATE#</cbc:MultiplierFactorNumeric>
                <cbc:Amount currencyID="#CURRENCYCODE#">#DISCAMOUNT#</cbc:Amount>
                <cbc:BaseAmount currencyID="#CURRENCYCODE#">#GROSS#</cbc:BaseAmount>
            </cac:AllowanceCharge>`;

    console.log("getItemSchema************");

    return itemSchema;
}
