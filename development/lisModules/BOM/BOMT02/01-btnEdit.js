export default async function (dv) {
  // Lock the document
  if (dv.lisworkcenterList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.lisworkcenterList.filter((e) => e._selected == true)[0];

    dv.lisworkcenters = await lisworkcenters.findById(selectedRow._id);
  } else {
  throw new Error("Lütfen Bir Satır Seçiniz");
  }

  let isLocked = await System.lock(
    dv.lisworkcenters.company,
    "BOMT02",
    dv.lisworkcenters.workcenter,
    global.sys_user
  );
  if (isLocked == true) {
    dv.lisDialog = "BOMT02D02";
    dv.modi = 1;
  } else {
    dv.lisworkcenters = {};
  throw new Error("Kilitli Belge!");
  }

  return dv;
}
