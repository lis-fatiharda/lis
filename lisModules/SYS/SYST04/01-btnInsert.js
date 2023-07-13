export default async function (dv) {
  dv.lisDialog = "SYST04D02";
  dv.modi = 0;
  dv.olisnumranges = new lisnumranges();
  dv.olisnumranges.numparts.push(new LisNumParts());
  return dv;
}
