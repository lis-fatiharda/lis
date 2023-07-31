export default async function getDespatchRefSchema() {
    const despatchRefSchema = `<cac:DespatchDocumentReference>
                <cbc:ID>#DELDOCNUM#</cbc:ID>
                <cbc:IssueDate>#DELDOCDATE#</cbc:IssueDate>
        </cac:DespatchDocumentReference>`;

    return despatchRefSchema;
}
