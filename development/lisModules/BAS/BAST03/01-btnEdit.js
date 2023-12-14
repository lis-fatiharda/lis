export default async function (dv) {
  if (dv.materialList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.materialList.filter((e) => e._selected == true)[0];
    dv.lismaterials = await lismaterials.findById(selectedRow);

    dv.pCompany = selectedRow.company;
    dv.pMaterial = selectedRow.material;
  } else {
  throw new Error("Lütfen Bir Satır Seçiniz");
  }
  // Lock the document
  let isLocked = await System.lock(
    dv.lismaterials.company,
    "BAST03",
    dv.lismaterials.material,
    global.sys_user
  );
  if (isLocked == true) {
    dv.lisDialog = "BAST03D02";
    dv.modi = 1;
  } else {
    dv.lismaterials = [];
  throw new Error("Kilitli Belge!");
  }

  return dv;
}
