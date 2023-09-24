export default async function (dv) {
  dv.lisDialog = "BAST07D02";
  dv.modi = 0;
  dv.company = "01";

  dv.lisgroups = await new lisgroups(lisgroups.prototype.schema.tree);
  dv.lisgroups.company = "01";

  return dv;
}
