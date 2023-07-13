export default async function (dv) {
  // Lock the document
  if (dv.prdList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.prdList.filter((e) => e._selected == true)[0];

    dv.lisprddocs = await lisprddocs.findById(selectedRow._id);
  } else {
    throw new Error("Lütfen Bir Satır Seçiniz");
  }
  let isLocked = await System.lock(
    dv.lisprddocs.company,
    "PRDT01",
    dv.lisprddocs.doctype + dv.lisprddocs.docnum,
    global.sys_user
  );
  if (isLocked == true) {
    dv.lisDialog = "PRDT01D02";
    dv.modi = 1;
  } else {
    dv.lisprddocs = {};
    throw new Error("Kilitli Belge!");
  }

  return dv;
}
