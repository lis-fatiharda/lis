export default async function (dv) {
  dv.prdList = await lisprddocs
    .find({
      company: lis.like(dv.sc.company),
      plant: lis.like(dv.sc.plant),
      "prods.material" : lis.like(dv.sc.material),
      doctype: lis.like(dv.sc.doctype),
      docnum: lis.like(dv.sc.docnum),
      stext: lis.like(dv.sc.stext),
      validfrom: {
        $gte: dv.sc.date,
      },
      validuntil: {
        $lte: dv.sc.date,
      },
      _deleted: dv.sc._deleted,
    })
    .catch((err) => console.log(err));

  return dv;
}
