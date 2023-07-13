export default async function (dv) {
  dv.lisDialog = "FINT02D02";
  dv.modi = 2;
  if (dv.reportList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.reportList.filter((e) => e._selected == true)[0];

    dv.lisfindocs = await lisfindocs.findById(selectedRow._id);
  } else {
    throw new Error("Lütfen Bir Satır Seçiniz");
  }
  return dv;
}
