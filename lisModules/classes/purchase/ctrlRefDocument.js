import lispurdocs from "../../../lisModels/lispurdocs.js";

export default async function ctrlRefDocument(plispurdocs) {
  for (let i in plispurdocs.items) {
    let pLisPurItem = plispurdocs.items[i];
    if (
        (pLisPurItem.refdoctype != "") &
        (pLisPurItem.refdocnum != "") &
        (pLisPurItem.refitemnum != 0) &
        (pLisPurItem.refdoctype != null) &
        (pLisPurItem.refdocnum != null) &
        (pLisPurItem.refitemnum != null) &
        (pLisPurItem._deleted == false)
    ) {
        // find reference Puritem

        const refPurItem = await lispurdocs.aggregate([
            { $unwind: "$items" },
            {
                $match: {
                    company: plispurdocs.company,
                    doctype: pLisPurItem.refdoctype,
                    docnum: pLisPurItem.refdocnum,
                    _deleted: false,
                    "items.itemnum": pLisPurItem.refitemnum,
                },
            },
        ]);

        if (refPurItem.length == 0) {
            throw new Error("Referans Kalem Bulunamadı!");
        }

        // find items created by the referans item
        const purItemsForRef = await lispurdocs.aggregate([
            { $unwind: "$items" },
            {
                $match: {
                    company: plispurdocs.company,
                    _deleted: false,
                    "items.refdoctype": pLisPurItem.refdoctype,
                    "items.refdocnum": pLisPurItem.refdocnum,
                    "items.refitemnum": pLisPurItem.refitemnum,
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

        sumQuan += pLisPurItem.quantity;

        let availQuanForRef = 0;
        if (refPurItem[0].items.istolerance == true) {
            availQuanForRef =
                (refPurItem[0].items.quantity * refPurItem[0].items.uppertol) /
                100;
        } else {
            availQuanForRef = refPurItem[0].items.quantity;
        }

        let availQuan = availQuanForRef - sumQuan;

        if (availQuan < 0) {
            global.sys_message = `${pLisPurItem.material} Malzemesi İçin Tolerans Miktarı Aşıldı!`;
            return false;
        }
    }
  }
}
