export default async function (dv) {
    dv.reportListDebit = await lisfindocs.aggregate([
        { $unwind: "$items" },
        {
            $match: {
                company: lis.like(dv.sc.company),
                busarea: lis.like(dv.sc.busarea),
                "items.acctype": lis.like(dv.sc.acctype),
                "items.account": lis.like(dv.sc.account),
                "items.glaccount": lis.like(dv.sc.glaccount),
                docdate: {
                    $gte: new Date(dv.sc.datefrom),
                    $lte: new Date(dv.sc.dateuntil),
                },

                "items.ddebit": { $gt: 0 },
                _deleted: false,
            },
        },
        { $sort: { postdate: 1 } },
    ]);

    dv.reportListCredit = await lisfindocs.aggregate([
        { $unwind: "$items" },
        {
            $match: {
                company: lis.like(dv.sc.company),

                docdate: {
                    $gte: new Date(dv.sc.datefrom),
                    $lte: new Date(dv.sc.dateuntil),
                },

                "items.acctype": lis.like(dv.sc.acctype),
                "items.account": dv.sc.account,
                "items.glaccount": lis.like(dv.sc.glaccount),
                "items.dcredit": { $gt: 0 },
                _deleted: false,
            },
        },
        { $sort: { postdate: 1 } },
    ]);

    dv.reportListDebit.map((e) => {
        if ((e.items.dbalance <= 0) & (e.items.dmatched == e.items.ddebit)) {
            e._bgColor = "#b2dfdb";
        } else if (
            (e.items.dmatched != e.items.ddebit) &
            (e.items.dmatched != 0)
        ) {
            e._bgColor = "lightyellow";
        } else {
            e._bgColor = "white";
        }
    });
    dv.reportListCredit.map((e) => {
        if ((e.items.dbalance <= 0) & (e.items.dmatched == e.items.dcredit)) {
            e._bgColor = "#b2dfdb";
        } else if (
            (e.items.dmatched != e.items.dcredit) &
            (e.items.dmatched != 0)
        ) {
            e._bgColor = "lightyellow";
        } else {
            e._bgColor = "white";
        }
    });

    return dv;
}
