
export default async function (dv) {
  dv.lisDialog = "FINT01D02";
  dv.modi = 2;
  if (dv.reportList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.reportList.filter((e) => e._selected == true)[0];

    dv.lisaccounts = await lisaccounts.findById(selectedRow._id);
  } else {
    throw new Error("Lütfen Bir Satır Seçiniz");
  }
  return dv;
}
