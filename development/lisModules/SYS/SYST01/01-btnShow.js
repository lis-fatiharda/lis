export default async function (dv) {
  dv.lisDialog = "SYST01D02";
  dv.modi = 2;
  dv.lisappobjects = dv.lisappobjects.filter((e) => e._id == dv.selectedRow);
  return dv;
}
