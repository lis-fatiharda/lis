export default async function (dv) {
  if (dv.modi == 0) {
    //****************Insert********************* */

    const olismodels = new lismodels(dv.olismodels[0]);

    await olismodels
      .save()
      .then(function (e) {
        console.log(e);
      })
      .catch(function (e) {
        console.log(e);
      });
  }
  //*************Update*************************** */

  if (dv.modi == 1) {
    const olismodels = await lismodels.findOneAndUpdate(
      { model: dv.olismodels[0].model },
      dv.olismodels[0],
      { new: true, upsert: true }
    );
  }
  return dv;
}
