export default async function (dv) {
  // Save the Document*********************
  if (dv.modi == 0) {
    // Save the new Document*********************
    const olisworkcenters = new lisworkcenters(dv.lisworkcenters);
    await olisworkcenters.save().catch((err) => {
      throw new Error(err.message);
    });
  } else {
    // Update The Document**************

    await lisworkcenters
      .findOneAndUpdate({ _id: dv.lisworkcenters._id }, dv.lisworkcenters, {
        new: true,
        upsert: true,
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  dv.lisworkcenters = {};

  return dv;
}
