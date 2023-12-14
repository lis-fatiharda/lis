export default async function (dv) {

  //****************Insert********************* */
  if (dv.modi == 0) {

    await lisusers.create(dv.olisusers);
  }
  //****************Update********************* */
  if (dv.modi == 1) {
    await lisusers.findOneAndUpdate(
      { _id: dv.olisusers._id },
      dv.olisusers
    );
  }

  return dv;
}
