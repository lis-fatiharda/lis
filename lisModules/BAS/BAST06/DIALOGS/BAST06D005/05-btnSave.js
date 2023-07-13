export default async function (dv) {
  for (let i in dv.reportListFin) {
    let ctrlAccounts = await lisaccounts.find({
      company: lis.like(dv.company),
      acctype: lis.like(dv.reportListFin[i].acctype),
      account: lis.like(dv.reportListFin[i].account),
    });

    if (ctrlAccounts.length > 0) {
      dv.reportListFin[i].acctype = ctrlAccounts[0].acctype;
      dv.reportListFin[i].account = ctrlAccounts[0].account;

      await lisaccounts
        .findOneAndUpdate(
          { _id: ctrlAccounts[0]._id },

          {
            stext:
              dv.reportListFin[i].stext === null
                ? ""
                : dv.reportListFin[i].stext,
            glaccount:
              dv.reportListFin[i].glaccount === null
                ? ""
                : dv.reportListFin[i].glaccount,
            acclevel:
              dv.reportListFin[i].acclevel === null
                ? 0
                : dv.reportListFin[i].acclevel,
            accclass:
              dv.reportListFin[i].accclass === null
                ? ""
                : dv.reportListFin[i].accclass,
            accgrp:
              dv.reportListFin[i].accgrp === null
                ? ""
                : dv.reportListFin[i].accgrp,
            currency:
              dv.reportListFin[i].currency === null
                ? ""
                : dv.reportListFin[i].currency,

            new: true,
            upsert: true,
          }
        )
        .catch((err) => {
          throw new Error(err.message);
        });
    } else {
      const olisaccounts = new lisaccounts(dv.reportListFin[i]);
      await olisaccounts.save().catch((err) => {
        throw new Error(err.message);
      });
    }
  }
  return dv;
}
