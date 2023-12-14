export default async function (dv) {
  dv.lisDialog = "SYST04D02";
  dv.modi = 2;
  dv.olisnumranges = {
    ...dv.numRangeList.filter((e) => e._id == dv.selectedRow)[0],
  };
  return dv;
}
