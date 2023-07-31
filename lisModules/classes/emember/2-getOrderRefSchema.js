export default async function getOrderRefSchema() {
    const orderRefSchema = `<cac:OrderReference>
        <cbc:ID>#ORDERID#</cbc:ID>
        <cbc:IssueDate>#ORDERDATE#</cbc:IssueDate>
</cac:OrderReference>`;

    return orderRefSchema;
}
