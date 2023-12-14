export default async function (dv) {
  dv.lisDialog = "BOMT02D02";
  dv.modi = 0;

  dv.lisworkcenters = await new lisworkcenters(
    lisworkcenters.prototype.schema.tree
  );
  dv.lisworkcenters.company = dv.sc.company;

  return dv;
}
