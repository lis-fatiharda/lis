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
        "items.plant": lis.like(dv.sc.plant),
        "items.warehouse": lis.like(dv.sc.warehouse),
        "items.stockplace": lis.like(),
        "items.specialstock": lis.like(dv.sc.specialstock),
        "items.batchnum": lis.like(dv.sc.batchnum),
        "items.mattype": lis.like(dv.sc.mattype),
        "items.matgrp": lis.like(dv.sc.matgrp),
        "items.material": lis.like(dv.sc.material),
        "items.stext": lis.like(dv.sc.stext),
        "items.customer": lis.like(dv.sc.customer),
      },
    },
  ]);

  return dv;
}
