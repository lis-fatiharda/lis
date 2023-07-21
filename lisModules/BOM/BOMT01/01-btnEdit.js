export default async function (dv) {
  // Lock the document
  if (dv.bomList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.bomList.filter((e) => e._selected == true)[0];

    dv.lisbomdocs = await lisbomdocs.findById(selectedRow._id);
  } else {
    throw new Error("Lütfen Bir Satır Seçiniz");
  }
  let isLocked = await System.lock(
    dv.lisbomdocs.company,
    "BOMT01",
    dv.lisbomdocs.doctype + dv.lisbomdocs.bomnumber,
    global.sys_user
  );
  if (isLocked == true) {
    dv.lisDialog = "BOMT01D02";
    dv.modi = 1;
    dv.lockKeyParams.company = dv.lisbomdocs.company;
    dv.lockKeyParams.lockkey = dv.lisbomdocs.doctype + dv.lisbomdocs.bomnumber;
  } else {
    dv.lisbomdocs = {};
    throw new Error("Kilitli Belge!");
  }

  return dv;
}
