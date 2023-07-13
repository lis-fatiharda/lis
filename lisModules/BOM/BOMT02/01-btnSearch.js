export default async function (dv) {
  dv.lisworkcenterList = await lisworkcenters
    .find({
      company: lis.like(dv.sc.company),
      // plant: lis.like(dv.sc.plant),
      // workcenter: lis.like(dv.sc.workcenter),
      // mainworkcenter: lis.like(dv.sc.mainworkcenter),
      // workresp: lis.like(dv.sc.workresp),
      // stext: lis.like(dv.sc.stext),
      // _deleted: dv.sc._deleted,
    })
    .catch((err) => console.log(err));

  return dv;
}
