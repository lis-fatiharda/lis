export default async function getHeadDiscSchema() {
    const baseSchema = `<cac:AllowanceCharge>
<cbc:ChargeIndicator>#DISCORSURC#</cbc:ChargeIndicator>
<cbc:AllowanceChargeReason>#DISCREASON#</cbc:AllowanceChargeReason>
<cbc:Amount currencyID="#CURRENCYCODE#">#DISCAMOUNT#</cbc:Amount>
</cac:AllowanceCharge>`;

    return baseSchema;
}
