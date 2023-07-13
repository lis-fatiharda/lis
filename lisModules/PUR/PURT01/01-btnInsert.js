
export default async function (dv) {
  dv.lisDialog = "PURT01D02";
  dv.modi = 0;

  dv.lispurdocs = await new lispurdocs(lispurdocs.prototype.schema.tree);
  dv.lispurdocs.company = dv.sc.company;
  dv.lispurdocs.validfrom = new Date().toLocaleString();
  return dv;
};
