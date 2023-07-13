export default async function (dv) {
  if (dv.lisworkcenterList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.lisworkcenterList.filter((e) => e._selected == true)[0];

    dv.lisworkcenters = await lisworkcenters.findById(selectedRow._id);
  } else {
    throw new Error("Lütfen Bir Satır Seçiniz");
  }
  dv.lisDialog = "BOMT02D02";
  dv.modi = 2;
  return dv;
}
