export default async function (dv) {
    let debitTable = dv.reportListDebit.filter((e) => e._selected == true);
    let creditTable = dv.reportListCredit.filter((e) => e._selected == true);
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

        

        await lisfindocs
            .findOneAndUpdate(
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
            )
    }



    //--------------

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
