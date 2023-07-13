export default async function (dv) {
  dv.lisDialog = "SYST01D02";
  dv.modi = 1;
  dv.lisappobjects = dv.lisappobjects.filter((e) => e._id == dv.selectedRow);
  console.log("btnEdit çalıştı");
  console.log(dv);
  return dv;
}
