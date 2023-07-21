export default async function (dv) {
  dv.purDocList = await lispurdocs.find({
    company: lis.like(dv.sc.company),
    busarea: lis.like(dv.sc.busarea),
    doctype: lis.like(dv.sc.doctype),
    docnum: lis.like(dv.sc.docnum),
     //project: lis.like(dv.sc.project),
     purdept: lis.like(dv.sc.purdept),
     vendor: lis.like(dv.sc.vendor),
     name1: lis.like(dv.sc.name1),
    material: lis.like(dv.sc.material),
    mtext: lis.like(dv.sc.mtext),

    docstat:
      (dv.sc.docStat === null) | (dv.sc.docStat === 99)
        ? { $gte: 0 }
        : dv.sc.docStat,

    validfrom: {
      $gte: dv.sc.docdate1,
      $lte: dv.sc.docdate2,
    },

    _deleted: dv.sc._deleted,
  });

  return dv;
}
