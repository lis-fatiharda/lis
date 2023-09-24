export default async function (dv) {
  
  if (dv.lisaccounts.acctype == "G")
    dv.lisaccounts.glaccount = dv.lisaccounts.account;
  // Save the Document*********************
  if (dv.modi == 0) {
    // Save the new Document*********************
    const olisaccounts = new lisaccounts(dv.lisaccounts);
    await olisaccounts.save().catch((err) => {
      throw new Error(err.message);
    });
  } else {
    // Update The Document**************

    await lisaccounts
      .findOneAndUpdate({ _id: dv.lisaccounts._id }, dv.lisaccounts, {
        new: true,
        upsert: true,
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  dv.lisaccounts = {};

  return dv;
}
