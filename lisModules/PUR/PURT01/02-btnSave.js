
export default async function (dv) {
  // Controls before Save ****************

  // Save The Document ****************

  dv.lispurdocs = await Purchase.save(dv.lispurdocs, dv.modi);

  return dv.lispurdocs;
}
