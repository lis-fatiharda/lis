export default async function (dv) {
  dv.lisDialog = "FINT02D02";
  dv.modi = 0;

  if (dv.reportList.filter(e => e._selected == true).length > 0) {
    let selectedRowId = dv.reportList.filter((e) => e._selected == true)[0]._id;
    dv.lisfindocs = await lisfindocs.findById(selectedRowId);
    dv.lisfindocs.docnum = "";

    await Finance.ctrlAuthorization(dv.lisfindocs, 0);

  } else {
    dv.lisfindocs = await new lisfindocs(lisfindocs.prototype.schema.tree);
    dv.lisfindocs.company = dv.sc.company;
  }


  return dv;
}