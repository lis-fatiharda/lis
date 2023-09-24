export default async function (dv) {
  dv.lisDialog = "SALT01D02";
  dv.modi = 0;

  if (dv.salDocList.filter((e) => e._selected == true).length > 0) {
    let selectedRowId = dv.salDocList.filter((e) => e._selected == true)[0]._id;


    dv.lissaldocs = await lissaldocs.findById(selectedRowId);
    dv.lissaldocs.docnum = "";

    await Sales.ctrlAuthorization(dv.lissaldocs, 0);
  } else {
    dv.lissaldocs = await new lissaldocs(lissaldocs.prototype.schema.tree);
    dv.lissaldocs.company = dv.sc.company;
    dv.lissaldocs.validfrom = new Date();
  }
  return dv;
}
