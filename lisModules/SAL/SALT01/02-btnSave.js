
export default async function (dv) {

  // Controls before Save ****************
  
  // Save The Document ****************
  dv.lissaldocs = await Sales.save(dv.lissaldocs, dv.modi);

  //dv.lissaldocs = {};
  return dv.lissaldocs;
}
 