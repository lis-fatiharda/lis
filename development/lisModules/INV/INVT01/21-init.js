export default async function (dv) {
    //*** Inventory supDocuments */

    dv.lisinvdocs = new lisinvdocs(lisinvdocs.prototype.schema.tree);

    return dv;
}
