export default async function (dv) {
  if (dv.lisCustomerList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.lisCustomerList.filter((e) => e._selected == true)[0];

    dv.liscustomers = await liscustomers.findById(selectedRow);
  } else {
    throw new Error("Lütfen Bir Satır Seçiniz");
  }

  // Lock the document
  let isLocked = await System.lock(
    dv.liscustomers.company,
    "BAST02",
    dv.liscustomers.customer,
    global.sys_user
  );
  if (isLocked == true) {
    dv.lisDialog = "BAST02D02";
    dv.modi = 1;
  } else {
    dv.liscustomers = [];
    throw new Error("Kilitli Belge!");
  }

  return dv;
}
