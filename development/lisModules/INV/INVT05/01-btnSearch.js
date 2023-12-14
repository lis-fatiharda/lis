export default async function (dv) {
  dv.lisinvdocs = await lisinvdocs.find(
    {
      company: lis.like(dv.sc.company),
      plant: lis.like(dv.sc.plant),
      batchnum: lis.like(dv.sc.batchnum),
    }
    // warehouse: lis.like(dv.sc.warehouse),
    // stockplace: lis.like(dv.sc.stockplace),
    // specialstock: lis.like(dv.sc.specialstock),
    // batchnum: lis.like(dv.sc.batchnum),
    // material: lis.like(dv.sc.material),
    // stext: lis.like(dv.sc.stext),
    // matgrp: lis.like(dv.sc.matgrp),
    // mattype: lis.like(dv.sc.mattype),
    // expirydate: {
    //   $lte: dv.sc.expirydate,
    // },
  );

  return dv;
}
