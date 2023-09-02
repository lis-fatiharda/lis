
export default async function (dv) {
  dv.lisDialog = "FINT01D02";
  dv.modi = 0;

  if (dv.reportList.filter(e => e._selected == true).length > 0) {
    let selectedRowId = dv.reportList.filter((e) => e._selected == true)[0]._id;
    dv.lisaccounts = await lisaccounts.findById(selectedRowId);
    dv.lisaccounts.account = "";
  } else {
    dv.lisaccounts = await new lisaccounts(lisaccounts.prototype.schema.tree);
    dv.lisaccounts.company = dv.sc.company;
  }
  return dv;
}
