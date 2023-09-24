export default async function (dv) {
    dv.lisinvdocsList = await lisinvdocs.aggregate([
        {
            $unwind: "$items",
        },
        {
            $match: {
                company: lis.like(dv.sc.company),
                doctype: lis.like(dv.sc.doctype),
                docnum: lis.like(dv.sc.docnum),
                docdate: {
                    $gte: new Date(dv.sc.docdatestrt),
                    $lte: new Date(dv.sc.docdateend),
                },
                _deleted: dv.sc._deleted,
                "items.plant": lis.like(dv.sc.plant),
                "items.warehouse": lis.like(dv.sc.warehouse),
                "items.stockplace": lis.like(dv.sc.stockplace),
                "items.specialstock": lis.like(dv.sc.specialstock),
                "items.batchnum": lis.like(dv.sc.batchnum),
                "items.mattype": lis.like(dv.sc.mattype),
                "items.matgrp": lis.like(dv.sc.matgrp),
                "items.material": lis.like(dv.sc.material),
                "items.mtext": lis.like(dv.sc.mtext),
                "items.variant": lis.like(dv.sc.variant),
                "items.customer": lis.like(dv.sc.customer),
                "items.postway": dv.sc.postway == 2 ? { $gte: 0 } : dv.sc.postway,
            },
        },
    ]);


    return dv;
}
