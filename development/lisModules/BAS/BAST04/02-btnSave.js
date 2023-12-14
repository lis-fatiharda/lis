export default async function (dv) {
  // Save the Document*********************
 


  if (dv.modi == 0) {
    // Save the new Document*********************
    const olisvariants = new lisvariants(dv.lisvariants);
    await olisvariants.save().catch((err) => {
    throw new Error(err.message);
    });
  } else {
    // Update The Document**************

    await lisvariants
      .findOneAndUpdate({ _id: dv.lisvariants._id }, dv.lisvariants, {
        new: true,
        upsert: true,
      })
      .catch((err) => {
      throw new Error(err.message);
      });
  }

  dv.lisvariants = {};

  return dv;
}
