export default async function (dv) {
  if (dv.lisinvdocsItems.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.lisinvdocsItems.filter((e) => e._selected == true)[0];
    dv.lisinvdocs = await lisinvdocs.findById(selectedRow);
  } else {
    throw new Error("Lütfen Bir Satır Seçiniz");
  }

  // Lock the document
  let isLocked = await System.lock(
    dv.lisCrmHead.company,
    "INVT02",
    dv.lisCrmHead.acttype + dv.lisCrmHead.actnum,
    global.sys_user
  );
  if (isLocked == true) {
    dv.lisDialog = "INVT02D02";
    dv.modi = 1;
  } else {
    dv.liscustomers = [];
    throw new Error("Kilitli Belge!");
  }

  return dv;
}
