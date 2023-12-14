import lissaldocs from "../../../lisModels/lissaldocs.js";

export default async function updRefDocument(plissaldocs) {

    for (let i in plissaldocs.items) {
        let pLisSalItem = plissaldocs.items[i];
        
        if (
            (pLisSalItem.refdoctype != "") &
            (pLisSalItem.refdocnum != "") &
            (pLisSalItem.refitemnum != 0) &
            (pLisSalItem.refdoctype != null) &
            (pLisSalItem.refdocnum != null) &
            (pLisSalItem.refitemnum != null)
        ) {
            // find reference salitem

            const refSalItem = await lissaldocs.aggregate([
                { $unwind: "$items" },
                {
                    $match: {
                        company: plissaldocs.company,
                        doctype: pLisSalItem.refdoctype,
                        docnum: pLisSalItem.refdocnum,
                        "items.itemnum": pLisSalItem.refitemnum,
                        _deleted: false,
                    },
                },
            ]);
            

            // find items created by the referans item
            const salItemsForRef = await lissaldocs.aggregate([
                { $unwind: "$items" },
                {
                    $match: {
                        company: plissaldocs.company,

                        "items.refdoctype": pLisSalItem.refdoctype,
                        "items.refdocnum": pLisSalItem.refdocnum,
                        "items.refitemnum": pLisSalItem.refitemnum,
                        _deleted: false,
                    },
                },
            ]);

            console.log("*salItemsForRef", salItemsForRef);

            let sumQuan = 0;
            for (let i in salItemsForRef) {
                if (
                    (salItemsForRef[i].doctype != plissaldocs.doctype) |
                    (salItemsForRef[i].docnum != plissaldocs.docnum) |
                    (salItemsForRef[i].items.itemnum != pLisSalItem.itemnum)
                ) {
                    sumQuan += salItemsForRef[i].items.quantity;
                }
            }

            console.log("*sumQuan", sumQuan);

            if (
                (pLisSalItem._deleted == false) &
                (plissaldocs._deleted == false)
            )
                sumQuan += pLisSalItem.quantity;

            console.log("*sumQuan", sumQuan);

            console.log("*refSalItem._id", refSalItem[0]._id);

            let lissaldocsSave = await lissaldocs
                .findById(refSalItem[0]._id)
                .catch((err) => {
                    console.log(err);
                    return false;
                });

            for (let i in lissaldocsSave.items) {
                if (
                    lissaldocsSave.items[i]._id.toString() ==
                    refSalItem[0].items._id.toString()
                ) {
                    lissaldocsSave.items[i].pquantity = sumQuan;
                }
            }

            lissaldocsSave = await this.setStatus(lissaldocsSave);

            await lissaldocs.findOneAndUpdate(
                { _id: refSalItem[0]._id },
                lissaldocsSave
            );
        }
    }
}
