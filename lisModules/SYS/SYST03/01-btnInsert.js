export default async function (dv) {
  dv.lisDialog = "SYST03D02";
  dv.modi = 0;

  dv.olisusers = [];
  dv.olisusers.push(new lisusers());

  return dv;
}
