export default async function getTaxExemptionSchema() {
    const getTaxExemptionSchema = `<cbc:TaxExemptionReasonCode>#TAXEXMPCODE#</cbc:TaxExemptionReasonCode>
<cbc:TaxExemptionReason>#TAXEXMPTEXT#</cbc:TaxExemptionReason>`;

    return getTaxExemptionSchema;
}
