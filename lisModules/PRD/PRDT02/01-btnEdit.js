export default async function (dv) {
  // Lock the document
  if (dv.prdListConf.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.prdListConf.filter((e) => e._selected == true)[0];

    dv.lisprddocs = await lisprddocs.findById(selectedRow._id);
  } else {
    throw new Error("Lütfen Bir Satır Seçiniz");
  }
  let isLocked = await System.lock(
    dv.lisprddocs.company,
    "PRDT02",
    dv.lisprddocs.doctype + dv.lisprddocs.docnum,
    //dv.lisprddocs.operations.confirmation,
    global.sys_user
  );

  if (isLocked == true) {
    dv.lisDialog = "PRDT02D02";
    dv.modi = 1;
    dv.lockKeyParams.company = dv.lisprddocs.company;
    dv.lockKeyParams.lockkey = dv.lisprddocs.doctype + dv.lisprddocs.docnum;
  } else {
    dv.lisprddocs = {};
    throw new Error("Kilitli Belge!");
  }
  
  return dv;
}
