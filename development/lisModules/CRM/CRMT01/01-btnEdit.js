export default async function (dv) {
 
  dv.liscrmdocs = await liscrmdocs.findById(dv.selectedRow);

  // Lock the document
  let isLocked = await System.lock(
    dv.liscrmdocs.company,
    "CRMT01",
    dv.liscrmdocs.acttype + dv.liscrmdocs.actnum,
    global.sys_user
  );
  if (isLocked == true) {
    dv.lisDialog = "crmt01d02";
    dv.modi = 1;
  } else {
    dv.liscustomers = [];
  throw new Error("Kilitli Belge!");
  }

  return dv;
}
