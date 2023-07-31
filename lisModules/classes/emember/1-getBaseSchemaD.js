export default async function getBaseSchema() {
    const baseSchema = `<DespatchAdvice xmlns="urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2" xmlns:n4="http://www.altova.com/samplexml/other-namespace" xsi:schemaLocation="urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2 ../xsdrt/maindoc/UBL-DespatchAdvice-2.1.xsd">
<ext:UBLExtensions>
<ext:UBLExtension>
<ext:ExtensionContent/>
</ext:UBLExtension>
</ext:UBLExtensions>
<cbc:UBLVersionID>2.1</cbc:UBLVersionID>
<cbc:CustomizationID>TR1.2.1</cbc:CustomizationID>
<cbc:ProfileID>#PROFILEID#</cbc:ProfileID>
<cbc:ID>#EINVONUMBER#</cbc:ID>
<cbc:CopyIndicator>false</cbc:CopyIndicator>
<cbc:UUID>#UUID#</cbc:UUID>
<cbc:IssueDate>#VALIDFROM#</cbc:IssueDate>
<cbc:IssueTime>#VALIDTIME#</cbc:IssueTime>
<cbc:DespatchAdviceTypeCode>#INVOICETYPECODE#</cbc:DespatchAdviceTypeCode>
#NOTEBLOCK#
<cbc:LineCountNumeric>#LINECOUNT#</cbc:LineCountNumeric>`;

    return baseSchema;
}
