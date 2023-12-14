export default async function (dv) {
    
    //****************************************Search tables */

    let debitTable = await lisfindocs.aggregate([
        { $unwind: "$items" },
        {
            $match: {
                company: lis.like(dv.sc.company),
                busarea: lis.like(dv.sc.busarea),
                "items.acctype": lis.like(dv.sc.acctype),
                "items.account": lis.like(dv.sc.account1),
                "items.glaccount": lis.like(dv.sc.glaccount),
                postdate: {
                    $gte: new Date(dv.sc.datefrom),
                    $lte: new Date(dv.sc.dateuntil),
                },

                "items.ddebit": { $gt: 0 },
                _deleted: false,
            },
        },
        { $sort: { postdate: 1 } },
    ]);

    let creditTable = await lisfindocs.aggregate([
        { $unwind: "$items" },
        {
            $match: {
                company: lis.like(dv.sc.company),
                busarea: lis.like(dv.sc.busarea),
                "items.acctype": lis.like(dv.sc.acctype),
                "items.account": lis.like(dv.sc.account1),
                "items.glaccount": lis.like(dv.sc.glaccount),
                postdate: {
                    $gte: new Date(dv.sc.datefrom),
                    $lte: new Date(dv.sc.dateuntil),
                },

                "items.dcredit": { $gt: 0 },
                _deleted: false,
            },
        },
        { $sort: { postdate: 1 } },
    ]);
    
    //****************************************start match */
    //--

    for (let k in debitTable) {
        let debitItem = debitTable[k];

        if (debitItem.items.dbalance <= 0) continue;

        for (let k in creditTable) {
            let creditItem = creditTable[k];
            let dMatchAmount = 0;
            let hMatchAmount = 0;

            if (creditItem.items.dbalance <= 0) continue;

            if (debitItem.items.dbalance > creditItem.items.dbalance) {
                dMatchAmount = creditItem.items.dbalance;
                debitItem.items.dbalance -= dMatchAmount;
                creditItem.items.dbalance -= dMatchAmount;

                debitItem.items.dmatched += dMatchAmount;
                creditItem.items.dmatched += dMatchAmount;

                hMatchAmount = creditItem.items.hbalance;
                debitItem.items.hbalance -= hMatchAmount;
                creditItem.items.hbalance -= hMatchAmount;

                debitItem.items.hmatched += hMatchAmount;
                creditItem.items.hmatched += hMatchAmount;

                // calc currdiffamnt

                let debitcurrdiff = 0;
                let creditcurrdiff = 0;

                if (hMatchAmount - dMatchAmount * debitItem.items.currate > 0) {
                    debitcurrdiff =
                        hMatchAmount - dMatchAmount * debitItem.items.currate;
                } else {
                    creditcurrdiff =
                        hMatchAmount - dMatchAmount * debitItem.items.currate;
                }

                let olisfinmatches = new lisfinmatches({
                    company: creditItem.company,
                    acctype: debitItem.items.acctype,
                    account: debitItem.items.account,
                    atext: debitItem.items.atext,
                    debitdoctype: debitItem.doctype,
                    debitdocnum: debitItem.docnum,
                    debititemnum: debitItem.items.itemnum,
                    creditdoctype: creditItem.doctype,
                    creditdocnum: creditItem.docnum,
                    credititemnum: creditItem.items.itemnum,
                    dmatched: dMatchAmount,
                    hmatched: hMatchAmount,
                    debitcurrdiff: debitcurrdiff,
                    creditcurrdiff: creditcurrdiff,
                });

                olisfinmatches.save().catch((err) => console.log(err));

                await lisfindocs.findOneAndUpdate(
                    {
                        "items._id": creditItem.items._id,
                    },
                    {
                        $set: {
                            "items.$.dmatched": creditItem.items.dmatched,
                            "items.$.hmatched": creditItem.items.hmatched,
                            "items.$.dbalance": creditItem.items.dbalance,
                            "items.$.hbalance": creditItem.items.hbalance,
                        },
                    }
                );
            } else {
                dMatchAmount = debitItem.items.dbalance;
                debitItem.items.dbalance -= dMatchAmount;
                creditItem.items.dbalance -= dMatchAmount;

                debitItem.items.dmatched += dMatchAmount;
                creditItem.items.dmatched += dMatchAmount;

                hMatchAmount = debitItem.items.hbalance;
                debitItem.items.hbalance -= hMatchAmount;
                creditItem.items.hbalance -= hMatchAmount;

                debitItem.items.hmatched += hMatchAmount;
                creditItem.items.hmatched += hMatchAmount;

                let olisfinmatches = new lisfinmatches({
                    company: creditItem.company,
                    debitdoctype: debitItem.doctype,
                    debitdocnum: debitItem.docnum,
                    debititemnum: debitItem.items.itemnum,
                    creditdoctype: creditItem.doctype,
                    creditdocnum: creditItem.docnum,
                    credititemnum: creditItem.items.itemnum,
                    dmatched: dMatchAmount,
                    hmatched: hMatchAmount,
                });

                olisfinmatches.save().catch((err) => console.log(err));

                await lisfindocs.findOneAndUpdate(
                    {
                        "items._id": creditItem.items._id,
                    },
                    {
                        $set: {
                            "items.$.dmatched": creditItem.items.dmatched,
                            "items.$.hmatched": creditItem.items.hmatched,
                            "items.$.dbalance": creditItem.items.dbalance,
                            "items.$.hbalance": creditItem.items.hbalance,
                        },
                    }
                );
            }
        }

        await lisfindocs.findOneAndUpdate(
            {
                "items._id": debitItem.items._id,
            },
            {
                $set: {
                    "items.$.dmatched": debitItem.items.dmatched,
                    "items.$.hmatched": debitItem.items.hmatched,
                    "items.$.dbalance": debitItem.items.dbalance,
                    "items.$.hbalance": debitItem.items.hbalance,
                },
            }
        );
    }


    return dv;
}
