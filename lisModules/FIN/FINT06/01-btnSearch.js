export default async function (dv) {
    dv.reportList = await lisfindocs.aggregate([
        {
            $unwind: "$items",
        },
        {
            $match: {
                company: lis.like(dv.sc.company),
                busarea: lis.like(dv.sc.busarea),
                "items.acctype": lis.like(dv.sc.acctype),
                "items.account": lis.like(dv.sc.account1),
                "items.glaccount": lis.like(dv.sc.glaccount),
                $and: [
                    {
                        $or: [
                            {
                                "items.dbalance": {
                                    $gt: 0,
                                },
                            },
                        ],
                    },
                ],

                docdate: {
                    $gte: new Date(dv.sc.datefrom),
                    $lte: new Date(dv.sc.dateuntil),
                },
                _deleted: false,
            },
        },
        {
            $project: {
                acctype: "$items.acctype",
                account: "$items.account",
                atext: "$items.atext",
                balancedebit: {
                    $cond: {
                        if: {
                            $gt: [
                                {
                                    $subtract: [
                                        "$items.ddebit",
                                        "$items.dmatched",
                                    ],
                                },
                                0,
                            ],
                        },
                        then: {
                            $subtract: ["$items.ddebit", "$items.dmatched"],
                        },
                        else: 0,
                    },
                },
                balancecredit: {
                    $cond: {
                        if: {
                            $gt: [
                                {
                                    $subtract: [
                                        "$items.dcredit",
                                        "$items.dmatched",
                                    ],
                                },
                                0,
                            ],
                        },
                        then: {
                            $subtract: ["$items.dcredit", "$items.dmatched"],
                        },
                        else: 0,
                    },
                },
                diff: {
                    $subtract: [
                        {
                            $cond: {
                                if: {
                                    $gt: [
                                        {
                                            $subtract: [
                                                "$items.ddebit",
                                                "$items.dmatched",
                                            ],
                                        },
                                        0,
                                    ],
                                },
                                then: {
                                    $subtract: [
                                        "$items.ddebit",
                                        "$items.dmatched",
                                    ],
                                },
                                else: 0,
                            },
                        },
                        {
                            $cond: {
                                if: {
                                    $gt: [
                                        {
                                            $subtract: [
                                                "$items.dcredit",
                                                "$items.dmatched",
                                            ],
                                        },
                                        0,
                                    ],
                                },
                                then: {
                                    $subtract: [
                                        "$items.dcredit",
                                        "$items.dmatched",
                                    ],
                                },
                                else: 0,
                            },
                        },
                    ],
                },
                currency: "$items.currency",
            },
        },
        {
            $group: {
                _id: "$account",
                acctype: {
                    $first: "$acctype",
                },
                account: {
                    $first: "$account",
                },
                atext: {
                    $first: "$atext",
                },
                balancedebit: {
                    $sum: "$balancedebit",
                },
                balancecredit: {
                    $sum: "$balancecredit",
                },
                diff: {
                    $sum: "$diff",
                },
                currency: {
                    $first: "$currency",
                },
            },
        },
        {
            $sort: {
                account: 1,
            },
        },
    ]);

    //   dv.reportList.map((e) => {
    //
    //   });

    return dv;
}
