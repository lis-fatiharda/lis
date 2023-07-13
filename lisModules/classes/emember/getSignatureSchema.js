export default async function getSignatureSchema() {
    const signatureSchema = `<cac:Signature>
        <cbc:ID schemeID="VKN_TCKN">#TAXNO#</cbc:ID>
        <cac:SignatoryParty>
            <cac:PartyIdentification>
                <cbc:ID schemeID="#PARTYTAXTYPE#">#TAXNO#</cbc:ID>
            </cac:PartyIdentification>
            <cac:PostalAddress>
                <cbc:StreetName>#ADRESS#</cbc:StreetName>
                <cbc:BuildingName/>
                <cbc:BuildingNumber>#BUILDING#</cbc:BuildingNumber>
                <cbc:CitySubdivisionName>#STATE#</cbc:CitySubdivisionName>
                <cbc:CityName>#CITY#</cbc:CityName>
                <cbc:PostalZone>#POBOX#</cbc:PostalZone>
                <cbc:Region></cbc:Region>
                <cac:Country>
                    <cbc:Name>#COUNTRY#</cbc:Name>
                </cac:Country>
            </cac:PostalAddress>
        </cac:SignatoryParty>
        <cac:DigitalSignatureAttachment>
            <cac:ExternalReference>
                <cbc:URI>#Signature</cbc:URI>
            </cac:ExternalReference>
        </cac:DigitalSignatureAttachment>
    </cac:Signature>`;

    return signatureSchema;
}
