export default async function (dv) {
    let debitTable = dv.reportListDebit.filter((e) => e._selected == true);
    let creditTable = dv.reportListCredit.filter((e) => e._selected == true);
    //--

    for (let k in debitTable) {
        let debitItem = debitTable[k];

        let olisfinmatches = await lisfinmatches.find({
            company: debitItem.company,
            debitdoctype: debitItem.doctype,
            debitdocnum: debitItem.docnum,
            debititemnum: debitItem.items.itemnum,
        });

        for (let z in olisfinmatches) {
            let matchItem = olisfinmatches[z];

            let dmatchedMinus = -1 * matchItem.dmatched;
            let hmatchedMinus = -1 * matchItem.hmatched;

            await lisfindocs
                .findOneAndUpdate(
                    {
                        company: matchItem.company,
                        doctype: matchItem.debitdoctype,
                        docnum: matchItem.debitdocnum,
                        "items.itemnum": matchItem.debititemnum,
                    },
                    {
                        $inc: {
                            "items.$.dmatched": dmatchedMinus,
                            "items.$.hmatched": hmatchedMinus,
                            "items.$.dbalance": matchItem.dmatched,
                            "items.$.hbalance": matchItem.hmatched,
                        },
                    }
                )
                .catch((err) => console.log(err));

            await lisfindocs
                .findOneAndUpdate(
                    {
                        company: matchItem.company,
                        doctype: matchItem.creditdoctype,
                        docnum: matchItem.creditdocnum,
                        "items.itemnum": matchItem.credititemnum,
                    },
                    {
                        $inc: {
                            "items.$.dmatched": dmatchedMinus,
                            "items.$.hmatched": hmatchedMinus,
                            "items.$.dbalance": matchItem.dmatched,
                            "items.$.hbalance": matchItem.hmatched,
                        },
                    }
                )
                .catch((err) => console.log(err));

            await lisfinmatches.deleteMany({
                company: matchItem.company,
                debitdoctype: matchItem.debitdoctype,
                debitdocnum: matchItem.debitdocnum,
                debititemnum: matchItem.debititemnum,
                creditdoctype: matchItem.creditdoctype,
                creditdocnum: matchItem.creditdocnum,
                credititemnum: matchItem.credititemnum,
            });
        }
    }

    //---------------------------------------------------------------------------------

    for (let k in creditTable) {
        let creditItem = creditTable[k];

        let olisfinmatches = await lisfinmatches.find({
            company: creditItem.company,
            creditdoctype: creditItem.doctype,
            creditdocnum: creditItem.docnum,
            creditItemnum: creditItem.items.itemnum,
        });

        for (let z in olisfinmatches) {
            let matchItem = olisfinmatches[z];

            let dmatchedMinus = -1 * matchItem.dmatched;
            let hmatchedMinus = -1 * matchItem.hmatched;

            await lisfindocs
                .findOneAndUpdate(
                    {
                        company: matchItem.company,
                        doctype: matchItem.debitdoctype,
                        docnum: matchItem.debitdocnum,
                        "items.itemnum": matchItem.debititemnum,
                    },
                    {
                        $inc: {
                            "items.$.dmatched": dmatchedMinus,
                            "items.$.hmatched": hmatchedMinus,
                            "items.$.dbalance": matchItem.dmatched,
                            "items.$.hbalance": matchItem.hmatched,
                        },
                    }
                )
                .catch((err) => console.log(err));

            await lisfindocs
                .findOneAndUpdate(
                    {
                        company: matchItem.company,
                        doctype: matchItem.creditdoctype,
                        docnum: matchItem.creditdocnum,
                        "items.itemnum": matchItem.credititemnum,
                    },
                    {
                        $inc: {
                            "items.$.dmatched": dmatchedMinus,
                            "items.$.hmatched": hmatchedMinus,
                            "items.$.dbalance": matchItem.dmatched,
                            "items.$.hbalance": matchItem.hmatched,
                        },
                    }
                )
                .catch((err) => console.log(err));

            await lisfinmatches.deleteMany({
                company: matchItem.company,
                creditdoctype: matchItem.creditdoctype,
                creditdocnum: matchItem.creditdocnum,
                credititemnum: matchItem.credititemnum,
                creditdoctype: matchItem.creditdoctype,
                creditdocnum: matchItem.creditdocnum,
                credititemnum: matchItem.credititemnum,
            });
        }
    }

    return dv;
}
