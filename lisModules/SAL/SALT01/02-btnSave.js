
export default async function (dv) {

  // Controls before Save ****************
  // if (dv.lissaldocs.currency == null) {
  //   throw new Error("Lütfen Para Birimini Doldurunuz !");
  // }
  // Save The Document ****************
  await Sales.save(dv.lissaldocs, dv.modi);

  //dv.lissaldocs = {};
  return dv.lissaldocs;
}
