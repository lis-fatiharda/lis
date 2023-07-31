export default async function getAdditionalSchema() {
    const additionalSchema = `<cac:AdditionalDocumentReference>
        <cbc:ID>#XSLTID#</cbc:ID>
        <cbc:IssueDate>#XSLTDATE#</cbc:IssueDate>
        <cbc:DocumentType>XSLT</cbc:DocumentType>
        <cac:Attachment>
            <cbc:EmbeddedDocumentBinaryObject
                characterSetCode="UTF-8"
                encodingCode="Base64"
                filename="#XSLTDOCID#"
                mimeCode="application/xml"
            >
                #XSLTSTR#
            </cbc:EmbeddedDocumentBinaryObject>
        </cac:Attachment>
    </cac:AdditionalDocumentReference>`;

    return additionalSchema;
}
