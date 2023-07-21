export default async function (dv) {
  if (dv.reportList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.reportList.filter((e) => e._selected == true)[0];
    dv.lisbomdocs = await lisbomdocs.findById(selectedRow._id);
  } else {
    throw new Error("Lütfen Bir Satır Seçiniz");
  }
  dv.lisDialog = "BOMT01D02";
  dv.modi = 2;

  return dv;
}
