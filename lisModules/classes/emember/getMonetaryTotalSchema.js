export default async function getMonetaryTotalSchema() {
    const legalMonetaryTotal = `<cac:LegalMonetaryTotal>
                <cbc:LineExtensionAmount currencyID="#CURRENCYCODE#">#GROSS#</cbc:LineExtensionAmount>
                <cbc:TaxExclusiveAmount currencyID="#CURRENCYCODE#">#SUBTOTAL#</cbc:TaxExclusiveAmount>
                <cbc:TaxInclusiveAmount currencyID="#CURRENCYCODE#">#HEADGRANDTOTAL#</cbc:TaxInclusiveAmount>
                <cbc:AllowanceTotalAmount currencyID="#CURRENCYCODE#">#DISCAMOUNT#</cbc:AllowanceTotalAmount>
                <cbc:ChargeTotalAmount currencyID="#CURRENCYCODE#">#INCRAMOUNT#</cbc:ChargeTotalAmount>
                <cbc:PayableAmount currencyID="#CURRENCYCODE#">#GRANDTOTAL#</cbc:PayableAmount>
        </cac:LegalMonetaryTotal>`;

    return legalMonetaryTotal;
}
