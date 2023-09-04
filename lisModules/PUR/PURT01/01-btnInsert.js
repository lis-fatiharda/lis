
export default async function (dv) {
  dv.lisDialog = "PURT01D02";
  dv.modi = 0;

  if (dv.purDocList.filter(e => e._selected == true).length > 0) {
    let selectedRowId = dv.purDocList.filter((e) => e._selected == true)[0]._id;
    let selectedRowIndex = dv.purDocList.findIndex(
      (e) => e._selected == true
    );
    const olispur008 = await lispur008.findOne({
      company: dv.purDocList[selectedRowIndex].company,
      doctype: dv.purDocList[selectedRowIndex].doctype,
      username: sys_user,
    });

    if ((olispur008 == null | olispur008.notinsert == true) && (dv.modi == 0)) throw new Error(`${dv.purDocList[selectedRowIndex].doctype} Belgesi Açma Yetkiniz Yoktur!`);


    dv.lispurdocs = await lispurdocs.findById(selectedRowId);
    dv.lispurdocs.docnum = "";
  } else {
    dv.lispurdocs = await new lispurdocs(lispurdocs.prototype.schema.tree);
    dv.lispurdocs.company = dv.sc.company;
    dv.lispurdocs.validfrom = new Date().toLocaleString();
  }
  return dv;
};
