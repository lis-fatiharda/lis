export default async function (dv) {
  if (dv.lisvariantsList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.lisvariantsList.filter((e) => e._selected == true)[0];

    dv.lisvariants = await lisvariants.findById(selectedRow._id);
  } else {
  throw new Error("Lütfen Bir Satır Seçiniz");
  }
  dv.lisDialog = "BAST04D02";
  dv.modi = 2;
  return dv;
}
