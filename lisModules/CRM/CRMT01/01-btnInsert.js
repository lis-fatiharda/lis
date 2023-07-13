export default async function (dv) {

  dv.lisDialog = "crmt01d02";
  dv.modi = 0;

  dv.liscrmdocs = await new liscrmdocs(liscrmdocs.prototype.schema.tree);
  dv.liscrmdocs.offers[0] = await new lissaldocs(
    lissaldocs.prototype.schema.tree
  );

  dv.liscrmdocs.company = dv.sc.company;

  return dv;
}
