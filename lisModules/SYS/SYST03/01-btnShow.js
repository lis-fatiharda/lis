export default async function (dv) {
  dv.lisDialog = "SYST03D02";
  dv.modi = 2;
  dv.olisusers = dv.reportList.filter((e) => e._id == dv.selectedRow);

  return dv;
}
