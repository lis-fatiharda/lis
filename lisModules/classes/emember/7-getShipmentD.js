export default async function () {
    const shipmentSchema = `<cac:Shipment>
<cbc:ID/>
<cac:GoodsItem>
<cbc:ValueAmount currencyID="#CURRENCYCODE#">#SUBTOTAL#</cbc:ValueAmount>
</cac:GoodsItem>
<cac:ShipmentStage>
<cac:TransportMeans>
<cac:RoadTransport>
<cbc:LicensePlateID schemeID="PLAKA">#DRIVERPLATE#</cbc:LicensePlateID>
</cac:RoadTransport>
</cac:TransportMeans>
<cac:DriverPerson>
<cbc:FirstName>#DRIVERNAME#</cbc:FirstName>
<cbc:FamilyName>#DRIVERSURNAME#</cbc:FamilyName>
<cbc:Title>Şoför</cbc:Title>
<cbc:NationalityID>#DRIVERID#</cbc:NationalityID>
</cac:DriverPerson>
</cac:ShipmentStage>
<cac:Delivery>
<cac:CarrierParty>
<cac:PartyIdentification>
<cbc:ID schemeID="TCKN">#DRIVERID#</cbc:ID>
</cac:PartyIdentification>
<cac:PartyName>
<cbc:Name>TAŞIYICI UNVANI</cbc:Name>
</cac:PartyName>
<cac:PostalAddress>
<cbc:CitySubdivisionName/>
<cbc:CityName/>
<cbc:PostalZone/>
<cbc:District/>
<cac:Country>
<cbc:Name/>
</cac:Country>
</cac:PostalAddress>
</cac:CarrierParty>
<cac:DeliveryAddress>
<cbc:CitySubdivisionName>#STATE#</cbc:CitySubdivisionName>
<cbc:CityName>#CITY#</cbc:CityName>
<cbc:PostalZone>#POBOX#</cbc:PostalZone>
<cbc:District>#DISTRICT#</cbc:District>
<cac:Country>#COUNTRY#</cac:Country>
</cac:DeliveryAddress>
<cac:Despatch>
<cbc:ActualDespatchDate>#VALIDFROM#</cbc:ActualDespatchDate>
<cbc:ActualDespatchTime>#VALIDTIME#</cbc:ActualDespatchTime>
</cac:Despatch>
</cac:Delivery>
<cac:TransportHandlingUnit>
<cac:TransportEquipment>
<cbc:ID schemeID="DORSEPLAKA">#DRIVERPLATE#</cbc:ID>
</cac:TransportEquipment>
</cac:TransportHandlingUnit>
</cac:Shipment>`;

    return shipmentSchema;
}
