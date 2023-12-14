
export default async function (dv) {
  dv.reportList = await lisinvstocks.find({
    company: dv.sc.company,
    plant: lis.like(dv.sc.plant),
    warehouse: lis.like(dv.sc.warehouse),
    stockplace: lis.like(dv.sc.stockplace),
    specialstock: lis.like(dv.sc.specialstock),
    batchnum: lis.like(dv.sc.batchnum),
    material: lis.like(dv.sc.material),
    mtext: lis.like(dv.sc.mtext),
    variant: lis.like(dv.sc.variant),
    //   expirydate: {
    //     $lte: dv.sc.expirydate,
    //   },
  });

  return dv;
}
