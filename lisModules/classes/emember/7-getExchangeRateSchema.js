export default async function getExchangeRateSchema() {
    console.log("getExchangeRateSchema");
    const itemSchema = `<cac:PricingExchangeRate>
    <cbc:SourceCurrencyCode
        listAgencyName="United Nations Economic Commission for Europe" listID="ISO 4217 Alpha" listName="Currency" listVersionID="2001">#SourceCurrencyCode#</cbc:SourceCurrencyCode>
    <cbc:TargetCurrencyCode listAgencyName="United Nations Economic Commission for Europe" listID="ISO 4217 Alpha" listName="Currency" listVersionID="2001">#TargetCurrencyCode#</cbc:TargetCurrencyCode>
    <cbc:CalculationRate>#CURRATE#</cbc:CalculationRate>
</cac:PricingExchangeRate>`;

    console.log("getExchangeRateSchema************");

    return itemSchema;
}
