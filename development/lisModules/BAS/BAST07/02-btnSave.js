export default async function (dv) {
  // Save the Document*********************

  if (dv.modi == 0) {
    // Save the new Document*********************
    const olisgroups = new lisgroups(dv.lisgroups);
    await olisgroups.save().catch((err) => {
    throw new Error(err.message);
    });
  } else {
    // Update The Document**************
    dv.lisgroups.items = dv.lisgroups.items.filter((e) => e._deleted != true);
    
      await lisgroups
        .findOneAndUpdate({ _id: dv.lisgroups._id }, dv.lisgroups, {
          new: true,
          upsert: true,
        })
        .catch((err) => {
        throw new Error(err.message);
        });
    
  }
  dv.lisgroups = {};

  return dv;
}
