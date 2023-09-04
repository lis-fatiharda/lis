export default async function (dv) {
  dv.lisDialog = "BAST02D02";
  dv.modi = 0;
  if (dv.lisCustomerList.filter(e => e._selected == true).length > 0) {
    let selectedRowId = dv.lisCustomerList.filter((e) => e._selected == true)[0]._id;
    dv.liscustomers = await liscustomers.findById(selectedRowId);
    dv.liscustomers.customer = "";
  } else {
    dv.liscustomers = {};
    dv.liscustomers = new liscustomers(liscustomers.prototype.schema.tree);
    dv.liscustomers.company = dv.sc.company;
    let newCusMat = new liscusmats(liscusmats.prototype.schema.tree);
    dv.liscusmats.push(newCusMat);
  }
 
  return dv;
}
