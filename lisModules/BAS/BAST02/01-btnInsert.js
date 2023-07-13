export default async function (dv) {
  dv.lisDialog = "BAST02D02";
  dv.modi = 0;

  dv.liscustomers = {};
  dv.liscustomers = new liscustomers(liscustomers.prototype.schema.tree);
  dv.liscustomers.company = dv.sc.company;
  let newCusMat = new liscusmats(liscusmats.prototype.schema.tree);
  dv.liscusmats.push(newCusMat);

  return dv;
}
