export default async function (dv) {
  dv.lisDialog = "BAST04D02";
  dv.modi = 0;

  dv.lisvariants = await new lisvariants(lisvariants.prototype.schema.tree);
  //dv.lisvariants.company = dv.sc.company;

  return dv;
}
