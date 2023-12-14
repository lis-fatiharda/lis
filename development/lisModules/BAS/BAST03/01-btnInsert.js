export default async function (dv) {
  dv.lisDialog = "BAST03D02";
  dv.modi = 0;
  if (dv.materialList.filter(e => e._selected == true).length > 0) {
    let selectedRowId = dv.materialList.filter((e) => e._selected == true)[0]._id;
    dv.lismaterials = await lismaterials.findById(selectedRowId);
    dv.lismaterials.material = "";
    dv.lismaterials.mtext = "";
  } else {
    dv.lismaterials = new lismaterials(lismaterials.prototype.schema.tree);
    dv.lismaterials.company = dv.sc.company;
  }
  return dv;
}
