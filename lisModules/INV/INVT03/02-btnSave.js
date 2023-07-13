export default async function (dv) {
  // Save the Document*********************
  if (dv.modi == 0) {
    // Save the new Document*********************
    const olisinvdocs = new lisinvdocs(dv.lisinvdocs);
    await olisinvdocs.save().catch((err) => {
      throw new Error(err.message);
    });
  } else {
    // Update The Document**************

    await lisinvdocs
      .findOneAndUpdate({ _id: dv.lisinvdocs._id }, dv.lisinvdocs, {
        new: true,
        upsert: true,
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  dv.lisinvdocs = {};

  return dv;
}
