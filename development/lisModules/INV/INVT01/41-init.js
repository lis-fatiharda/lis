export default async function (dv) {
    //*** Inventory supDocuments */

    dv.olisinvdocs = new lisinvdocs(lisinvdocs.prototype.schema.tree);

    dv.olisinvdocs.company = "01";

    return dv;
}
