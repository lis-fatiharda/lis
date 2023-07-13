export default async function (dv) {
  if (dv.materialList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.materialList.filter((e) => e._selected == true)[0];
    dv.lismaterials = await lismaterials.findById(selectedRow);
  } else {
    throw new Error("Lütfen Bir Satır Seçiniz");
  }
  
  dv.lisDialog = "BAST03D02";
  dv.modi = 2;

  return dv;
}
