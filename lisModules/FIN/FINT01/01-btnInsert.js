
export default async function (dv) {
  dv.lisDialog = "FINT01D02";
  dv.modi = 0;
  dv.lisaccounts = await new lisaccounts(lisaccounts.prototype.schema.tree);
  dv.lisaccounts.company = dv.sc.company;
  return dv;
}
