export default async function (dv) {
  dv.crmDocList = await liscrmdocs.find({
    company: lis.like(dv.sc.company),
    busarea: lis.like(dv.sc.busarea),
    acttype: lis.like(dv.sc.acttype),
    actnum: lis.like(dv.sc.actnum),
    project: lis.like(dv.sc.project),
    saldept: lis.like(dv.sc.saldept),
    customer: lis.like(dv.sc.customer),
    name1: lis.like(dv.sc.name1),
    actdate: {
      $gte: dv.sc.actdate1,
      $lte: dv.sc.actdate2,
    },

    _deleted: dv.sc._deleted,
  });

  return dv;
}
