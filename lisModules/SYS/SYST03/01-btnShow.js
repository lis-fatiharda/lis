export default async function (dv) {
  dv.lisDialog = "SYST03D02";
  dv.modi = 2;

  let selectedRow = dv.reportList.filter((e) => e._id == dv.selectedRow);

  dv.olisusers = await lisusers.findOne({
    _id: selectedRow
  });
  return dv;
}
