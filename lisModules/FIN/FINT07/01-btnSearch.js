export default async function (dv) {
  dv.reportList = await lisfindocs
    .aggregate([
      { $unwind: "$items" },
      {
        $match: {
          company: lis.like(dv.sc.company),

          docdate: {
            $gte: new Date(dv.sc.datefrom),
            $lte: new Date(dv.sc.dateuntil),
          },

          "items.acctype": lis.like(dv.sc.acctype),
          "items.account": lis.like(dv.sc.account),
          _deleted: false,
        },
      },
      { $sort: { postdate: 1 } },
    ])
    .catch((err) => console.log(err));

  return dv;
}
