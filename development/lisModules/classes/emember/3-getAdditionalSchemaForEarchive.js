export default async function getAdditionalSchemaForEarchive() {
    const additionalSchema = `<cac:AdditionalDocumentReference>
    <cbc:ID>1</cbc:ID>
    <cbc:IssueDate>#XSLTDATE#</cbc:IssueDate>
    <cbc:DocumentTypeCode>SendingType</cbc:DocumentTypeCode>
    <cbc:DocumentType>KAGIT</cbc:DocumentType>
</cac:AdditionalDocumentReference>`;

    return additionalSchema;
};



