
export default async function updRefDocument(plispurdocs) {

    for (let i in plispurdocs.items) {
        let pLisPurItem = plispurdocs.items[i];
        if (
            (pLisPurItem.refdoctype != "") &
            (pLisPurItem.refdocnum != "") &
            (pLisPurItem.refitemnum != 0) &
            (pLisPurItem.refdoctype != null) &
            (pLisPurItem.refdocnum != null) &
            (pLisPurItem.refitemnum != null)
        ) {
            // find reference Puritem

            const refPurItem = await lispurdocs.aggregate([
                { $unwind: "$items" },
                {
                    $match: {
                        company: plispurdocs.company,
                        doctype: pLisPurItem.refdoctype,
                        docnum: pLisPurItem.refdocnum,
                        "items.itemnum": pLisPurItem.refitemnum,
                        _deleted: false,
                    },
                },
            ]);

            // find items created by the reference item
            const purItemsForRef = await lispurdocs.aggregate([
                { $unwind: "$items" },
                {
                    $match: {
                        company: plispurdocs.company,

                        "items.refdoctype": pLisPurItem.refdoctype,
                        "items.refdocnum": pLisPurItem.refdocnum,
                        "items.refitemnum": pLisPurItem.refitemnum,
                        _deleted: false,
                    },
                },
            ]);

            let sumQuan = 0;
            for (let i in purItemsForRef) {
                if (
                    (purItemsForRef[i].doctype != plispurdocs.doctype) |
                    (purItemsForRef[i].docnum != plispurdocs.docnum) |
                    (purItemsForRef[i].items.itemnum != pLisPurItem.itemnum)
                ) {
                    sumQuan += purItemsForRef[i].items.quantity;
                }
            }

            if (
                (pLisPurItem._deleted == false) &
                (plispurdocs._deleted == false)
            )
                sumQuan += pLisPurItem.quantity;

            let lispurdocsSave = await lispurdocs
                .findById(refPurItem[0]._id)
                .catch((err) => {
                    console.log(err);
                    return false;
                });

            for (let i in lispurdocsSave.items) {
                if (
                    lispurdocsSave.items[i]._id.toString() ==
                    refPurItem[0].items._id.toString()
                ) {
                    lispurdocsSave.items[i].pquantity = sumQuan;
                }
            }

            lispurdocsSave = await this.setStatus(lispurdocsSave);

            await lispurdocs.findOneAndUpdate(
                { _id: refPurItem[0]._id },
                lispurdocsSave
            );
        }
    }
}
