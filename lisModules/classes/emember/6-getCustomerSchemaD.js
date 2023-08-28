export default async function getCustomerSchema() {
    const customerSchema = `<cac:DeliveryCustomerParty><cac:Party>
    <cbc:WebsiteURI>#WEBADR#</cbc:WebsiteURI>
    <cac:PartyIdentification>
    <cbc:ID schemeID="#PARTYTAXTYPE#">#TAXNO#</cbc:ID></cac:PartyIdentification>
    <cac:PartyName><cbc:Name>#CUSNAME#</cbc:Name></cac:PartyName>
    <cac:PostalAddress>
    <cbc:StreetName>#ADRESS#</cbc:StreetName>
    <cbc:BuildingNumber>#BUILDING#</cbc:BuildingNumber>
    <cbc:CitySubdivisionName>#STATE#</cbc:CitySubdivisionName>
    <cbc:CityName>#CITY#</cbc:CityName>
    <cbc:PostalZone>#POBOX#</cbc:PostalZone>
    <cac:Country><cbc:Name>#COUNTRY#</cbc:Name>
    </cac:Country></cac:PostalAddress>
    <cac:PhysicalLocation>
    <cbc:ID>Teknopark Şube</cbc:ID>
    <cac:Address>
    <cbc:ID>#TAXNO#</cbc:ID>
    <cbc:StreetName>#ADRESS#</cbc:StreetName>
    <cbc:BuildingNumber>#BUILDING#</cbc:BuildingNumber>
    <cbc:CitySubdivisionName>#STATE#</cbc:CitySubdivisionName>
    <cbc:CityName>#CITY#</cbc:CityName>
    <cbc:PostalZone>#POBOX#</cbc:PostalZone>
    <cac:Country>
    <cbc:Name>#COUNTRY#</cbc:Name>
    </cac:Country>
    </cac:Address>
    </cac:PhysicalLocation>
    <cac:PartyTaxScheme><cac:TaxScheme>
    <cbc:Name>#TAXDEPT#</cbc:Name>
    </cac:TaxScheme></cac:PartyTaxScheme><cac:Contact>
    <cbc:Telephone>#TEL#</cbc:Telephone><cbc:Telefax>#FAX#</cbc:Telefax>
    <cbc:ElectronicMail>#EMAIL#</cbc:ElectronicMail></cac:Contact>#PERSON#
    </cac:Party></cac:DeliveryCustomerParty>`;

    return customerSchema;
}
