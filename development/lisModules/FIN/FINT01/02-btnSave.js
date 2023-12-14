export default async function (Args) {
    if (Args.lisaccount.acctype == "G")
        Args.lisaccount.glaccount = Args.lisaccount.account;
    // Save the Document*********************
  if (Args.modi == 0) {
        // Save the new Document*********************

        await lisaccounts.create(Args.lisaccount);
    } else {
        // Update The Document**************

        await lisaccounts
            .findOneAndUpdate({ _id: Args.lisaccount._id }, Args.lisaccount, {
                new: true,
                upsert: true,
            })
            .catch((err) => {
              throw new Error(err.message);
            });
    }

    Args.lisaccount = {};

    return Args;
}
