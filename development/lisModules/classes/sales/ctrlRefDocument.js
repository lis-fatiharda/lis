import lissaldocs from "../../../lisModels/lissaldocs.js";

export default async function ctrlRefDocument(plissaldocs) {
    console.log("ctrlRefDocument");

    for (let i in plissaldocs.items) {
        let pLisSalItem = plissaldocs.items[i];
        console.log("pLisSalItem", pLisSalItem);
        if (
            (pLisSalItem.refdoctype != "") &
            (pLisSalItem.refdocnum != "") &
            (pLisSalItem.refitemnum != 0) &
            (pLisSalItem.refdoctype != null) &
            (pLisSalItem.refdocnum != null) &
            (pLisSalItem.refitemnum != null) &
            (pLisSalItem._deleted == false)
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

            console.log("refSalItem", refSalItem);

            if (refSalItem.length == 0) {
              throw new Error("Referans Kalem Bulunamadı!");
            }

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

            console.log("salItemsForRef", salItemsForRef);

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

            console.log("sumQuan", sumQuan);

            sumQuan += pLisSalItem.quantity;

            console.log("sumQuan", sumQuan);

            let availQuanForRef = 0;
            if (refSalItem[0].items.istolerance == true) {
                availQuanForRef =
                    (refSalItem[0].items.quantity *
                        refSalItem[0].items.uppertol) /
                    100;
            } else {
                availQuanForRef = refSalItem[0].items.quantity;
            }

            let availQuan = availQuanForRef - sumQuan;

            if (availQuan < 0) {
                global.sys_message = `${pLisSalItem.material} Malzemesi İçin Tolerans Miktarı Aşıldı!`;
                return false;
            }
        }
    }


}
