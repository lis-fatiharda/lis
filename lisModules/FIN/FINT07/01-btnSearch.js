export default async function (dv) {
  dv.reportList = await lisfindocs
    .aggregate([
      { $unwind: "$items" },
      { 
        $match: {
          company: lis.like(dv.sc.company),
          "items.futpapertype": dv.sc.futpapertype,

          docdate: {
            $gte: new Date(dv.sc.datefrom),
            $lte: new Date(dv.sc.dateuntil),
          },

          "items.acctype": lis.like(dv.sc.acctype),
          "items.account": lis.like(dv.sc.account),

          $or: [{ futpaperstat: dv.sc.inportfoy1 == true ? 1 : 99 },
            { futpaperstat: dv.sc.inportfoy2 == true ? 1 : 99 },
            { futpaperstat: dv.sc.inportfoy3 == true ? 1 : 99 },
            { futpaperstat: dv.sc.payed1 == true ? 1 : 99 },
            { futpaperstat: dv.sc.payed2 == true ? 1 : 99 },
            { futpaperstat: dv.sc.inbank1 == true ? 1 : 99 },
            { futpaperstat: dv.sc.inbank2 == true ? 1 : 99 },
            { futpaperstat: dv.sc.return1 == true ? 1 : 99 },
            { futpaperstat: dv.sc.return2 == true ? 1 : 99 },
            { futpaperstat: dv.sc.gross1 == true ? 1 : 99 },
            { futpaperstat: dv.sc.gross2 == true ? 1 : 99 },
            { futpaperstat: dv.sc.inbank2 == true ? 1 : 99 },],

          infollowing: false,
          inguarantee: false,
          cheqsent: false,
          cheqback: false,
          _deleted: false,
        },
      },
      { $sort: { postdate: 1 } },
    ])
    .catch((err) => console.log(err));

  return dv;
}
