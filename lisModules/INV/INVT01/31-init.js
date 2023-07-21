export default async function (dv) {
  //*** Inventory supDocuments */

  dv.olisinvdocs = new lisinvdocs(lisinvdocs.prototype.schema.tree);
  dv.lisinvdocsListTrns = dv.olisinvdocs.items
  return dv;
}
