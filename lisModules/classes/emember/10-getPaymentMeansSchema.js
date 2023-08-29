export default async function getPaymentMeansSchema() {
    const paymentMeansSchema = `<cac:PaymentMeans>
        <cac:PayeeFinancialAccount>
            <cac:FinancialInstitutionBranch>
                <cac:FinancialInstitution>
                    <cbc:Name>#BANK#</cbc:Name>
                </cac:FinancialInstitution>
                <cbc:Name>#BRANCH#</cbc:Name>
            </cac:FinancialInstitutionBranch>
            <cbc:ID>#IBAN#</cbc:ID>
            <cbc:CurrencyCode>#CURRENCY#</cbc:CurrencyCode>
        </cac:PayeeFinancialAccount>
    </cac:PaymentMeans>`;

    return paymentMeansSchema;
}
