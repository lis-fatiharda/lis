export default async function (dv) {
  dv.lisDialog = "SYST03D02";
  dv.modi = 0;


  if (dv.reportList.filter(e => e._selected == true).length > 0) {
    let selectedRowId = dv.reportList.filter((e) => e._selected == true)[0]._id;
    dv.olisusers = await lisusers.findById(selectedRowId);
    dv.olisusers.username = "";
    dv.olisusers.email = "";
    dv.olisusers.password = "";
  } else {
    dv.olisusers = await new lisusers(lisusers.prototype.schema.tree);

  }
  return dv;
}


