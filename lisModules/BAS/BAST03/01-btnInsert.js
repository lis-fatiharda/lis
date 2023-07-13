export default async function (dv) {
  dv.lismaterials = new lismaterials(lismaterials.prototype.schema.tree);
  dv.lismaterials.company = dv.sc.company;

  dv.lisDialog = "BAST03D02";
  dv.modi = 0;

  return dv;
}
