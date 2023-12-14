export default async function (dv) {
  // Controls before Save ****************

  // Save The Document ****************
  //await lis.begintran();
  dv.lissaldocs = await Sales.save(dv.lissaldocs, dv.modi);

  //await lis.rollbacktran();
  //dv.lissaldocs = {};
  return dv.lissaldocs;
}
