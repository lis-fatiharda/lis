export default async function (dv) {
  // Lock the document
  if (dv.reportList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.reportList.filter((e) => e._selected == true)[0];
    dv.lisaccounts = await lisaccounts.findById(selectedRow._id);

    dv.pCompany = selectedRow.company;
    dv.pAcctype = selectedRow.acctype;
    dv.pAccount = selectedRow.account;
  } else {
  throw new Error("Lütfen Bir Satır Seçiniz");
  }
  
  let isLocked = await System.lock(
    dv.lisaccounts.company,
    "FINT01",
    dv.lisaccounts.acctype + dv.lisaccounts.account,
    global.sys_user
  );
  if (isLocked == true) {
    dv.lisDialog = "FINT01D02";
    dv.modi = 1;
  } else {
    dv.lisaccounts = {};
  throw new Error("Kilitli Belge!");
  }

  return dv;
}
