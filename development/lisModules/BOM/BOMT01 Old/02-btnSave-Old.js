export default async function (dv) {
  // Save the Document*********************
  if (dv.modi == 0) {
    // Save the new Document*********************
    const olisbomdocs = new lisbomdocs(dv.lisbomdocs);
    await olisbomdocs.save().catch((err) => {
    throw new Error(err.message);
    });
  } else {
    // Update The Document**************

    await lisbomdocs
      .findOneAndUpdate({ _id: dv.lisbomdocs._id }, dv.lisbomdocs, {
        new: true,
        upsert: true,
      })
      .catch((err) => {
      throw new Error(err.message);
      });
  }

  dv.lisbomdocs = {};

  return dv;
}
