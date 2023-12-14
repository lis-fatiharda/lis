export default async function (dv) {
  if (dv.prdList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.prdList.filter((e) => e._selected == true)[0];
    dv.lisprddocs = await lisprddocs.findById(selectedRow._id);
  } else {
  throw new Error("Lütfen Bir Satır Seçiniz");
  }
  dv.lisDialog = "PRDT01D02";
  dv.modi = 2;

  return dv;
}
