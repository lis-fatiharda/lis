export default async function (dv) {
  dv.bomList = await lisbomdocs
    .find({
      company: lis.like(dv.sc.company),
      plant: lis.like(dv.sc.plant),
      doctype: lis.like(dv.sc.doctype),
      docnum: lis.like(dv.sc.docnum),
      stext: lis.like(dv.sc.stext),
      docdate: {
        $gte: dv.sc.validfrom,
        $lte: dv.sc.validuntil,
      },

      _deleted: dv.sc._deleted,
    })
    .catch((err) => console.log(err));

  return dv;
}
