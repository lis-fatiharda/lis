export default async function (dv) {
  dv.lisDialog = "SYST01D02";
  dv.modi = 0;

  dv.lisappobjects = [];

  dv.lisappobjects.push(new lisappobjects(lisappobjects.prototype.schema.tree));

  dv.lisappobjects[0].module = "";
  console.log("btnNew.ts çalıştı");

  return dv;
}
