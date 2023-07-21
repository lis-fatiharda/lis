export default async function (dv) {
  dv.reportList = await lisbomdocs
    .find({
      company: lis.like(dv.sc.company),
      plant: lis.like(dv.sc.plant),
      // bomnumber: lis.like(dv.sc.bomnumber),
      // material: lis.like(dv.sc.material),
      // alternum: lis.like(dv.sc.alternum),
      // type: lis.like(dv.sc.type),
      // stext: lis.like(dv.sc.stext),
      // validfrom: {
      //   $gte: dv.sc.date,
      // },
      // validuntil: {
      //   $lte: dv.sc.date,
      // },
      // _deleted: dv.sc._deleted,
    })
    .catch((err) => console.log(err));

  return dv;
}
