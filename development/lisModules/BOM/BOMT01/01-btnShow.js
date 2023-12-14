export default async function (dv) {
  if (dv.bomList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.bomList.filter((e) => e._selected == true)[0];
    dv.lisbomdocs = await lisbomdocs.findById(selectedRow._id);
  } else {
  throw new Error("Lütfen Bir Satır Seçiniz");
  }
  dv.lisDialog = "BOMT01D02";
  dv.modi = 2;

  return dv;
}
