export default async function (dv) {
    dv.reportList = await lisfinmatches.aggregate([
        {
            $match: {
                company: lis.like(dv.sc.company),
                acctype: lis.like(dv.sc.acctype),
                account: lis.like(dv.sc.account),
                $and: [
                    {
                        $or: [
                            {
                                debitcurrdiff: { $gt: 0 },
                            },
                            {
                                creditcurrdiff: { $gt: 0 },
                            },
                        ],
                    },
                ],
            },
        },
    ]);

    dv.reportList.map(async (e) => {
      //  let olissaldocs = await lisfindocs.aggregate([
      //      {
      //          $unwind: "$items",
      //      },
      //      {
      //          $match: {
      //              company: dv.reportList.company,
      //              doctype: dv.reportList.debitdoctype,
      //              docnum: dv.reportList.debitdocnum,
      //              itemnum: dv.reportList.debitdoctype,
      //          },
      //      },
      //  ]);
        e.vatkey = 18;
    });

    return dv;
}
