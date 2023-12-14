export default async function (dv) {
  if (dv.lisCustomerList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.lisCustomerList.filter((e) => e._selected == true)[0];

    dv.pCompany = selectedRow.company;
    dv.pCustomer = selectedRow.customer;
  } else {
  throw new Error("Lütfen Bir Satır Seçiniz");
  }

  // Lock the document
  let isLocked = await System.lock(
    dv.pCompany,
    "BAST02",
    dv.pCustomer,
    global.sys_user
  );
  if (isLocked == true) {
    dv.lisDialog = "BAST02D02";
    dv.modi = 1;
  } else {
  throw new Error("Kilitli Belge!");
  }

  return dv;
}
