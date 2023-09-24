
export default async function (dv) {
  dv.lisDialog = "PURT01D02";
  dv.modi = 0;

  if (dv.purDocList.filter(e => e._selected == true).length > 0) {
    let selectedRowId = dv.purDocList.filter((e) => e._selected == true)[0]._id;
    

    dv.lispurdocs = await lispurdocs.findById(selectedRowId);
    dv.lispurdocs.docnum = "";

    await Purchase.ctrlAuthorization(dv.lispurdocs, 0);
  } else {
    dv.lispurdocs = await new lispurdocs(lispurdocs.prototype.schema.tree);
    dv.lispurdocs.company = dv.sc.company;
    dv.lispurdocs.validfrom = new Date().toLocaleString();
  }
  return dv;
};
