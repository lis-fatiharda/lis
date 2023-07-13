export default async function (dv) {
  dv.lisDialog = "FINT02D02";
  dv.modi = 0;
  dv.lisfindocs = await new lisfindocs(lisfindocs.prototype.schema.tree);
  dv.lisfindocs.company = dv.sc.company;
  return dv;
}