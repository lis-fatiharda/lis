export default async function getBaseSchema() {
    const baseSchema = `<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2" xmlns:ns8="urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2" xmlns:xades="http://uri.etsi.org/01903/v1.3.2#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2 UBL-Invoice-2.1.xsd">
<cbc:UBLVersionID>2.1</cbc:UBLVersionID>
<cbc:CustomizationID>TR1.2</cbc:CustomizationID>
<cbc:ProfileID>#PROFILEID#</cbc:ProfileID>
<cbc:ID>#EINVONUMBER#</cbc:ID>
<cbc:CopyIndicator>false</cbc:CopyIndicator>
<cbc:UUID>#UUID#</cbc:UUID>
<cbc:IssueDate>#VALIDFROM#</cbc:IssueDate>
<cbc:IssueTime>#VALIDTIME#</cbc:IssueTime>
<cbc:InvoiceTypeCode>#INVOICETYPECODE#</cbc:InvoiceTypeCode>
#NOTEBLOCK#
<cbc:DocumentCurrencyCode>#CURRENCYCODE#</cbc:DocumentCurrencyCode>
<cbc:LineCountNumeric>#LINECOUNT#</cbc:LineCountNumeric>`;

    return baseSchema;
};
