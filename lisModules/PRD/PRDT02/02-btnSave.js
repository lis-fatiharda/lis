export default async function (dv) {
  // Save the Document*********************
  if (dv.modi == 0) {
    // Save the new Document*********************
    const olisprddocs = new lisprddocs(dv.lisprddocs);
    await olisprddocs.save().catch((err) => {
      throw new Error(err.message);
    });
  } else {
    // Update The Document**************

    await lisprddocs
      .findOneAndUpdate({ _id: dv.lisprddocs._id }, dv.lisprddocs, {
        new: true,
        upsert: true,
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  dv.lisprddocs = {};

  return dv;
}
