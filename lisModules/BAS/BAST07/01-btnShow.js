export default async function (dv) {
  if (dv.lisGroupsList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.lisGroupsList.filter((e) => e._selected == true)[0];

    dv.lisgroups = await lisgroups.findById(selectedRow._id);
  } else {
    throw new Error("Lütfen Bir Satır Seçiniz");
  }
  dv.lisDialog = "BAST07D02";
  dv.modi = 2;
  return dv;
}
