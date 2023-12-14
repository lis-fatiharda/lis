export default async function (dv) {
  if (dv.lisinvdocsItems.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.lisinvdocsItems.filter((e) => e._selected == true)[0];
    dv.lisinvdocs = await lisinvdocs.findById(selectedRow);
  } else {
  throw new Error("Lütfen Bir Satır Seçiniz");
  }
  dv.lisDialog = "INVT02D02";
  dv.modi = 2;

  return dv;
}
