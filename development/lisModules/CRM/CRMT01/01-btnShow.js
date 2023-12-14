export default async function (dv) {
  dv.lisDialog = "crmt01d02";
  dv.modi = 2;

  dv.liscrmdocs = await liscrmdocs.findById(dv.selectedRow);
  return dv;
}
