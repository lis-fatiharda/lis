
export default async function (dv) {
  dv.lisedndocsList = await lisedndocs
    .find({
      company: lis.like(dv.sc.company),
      doctype: lis.like(dv.sc.doctype),
      docnum: lis.like(dv.sc.docnum),
      einvonumber: lis.like(dv.sc.einvonumber),
      docdate: {
        $gte: dv.sc.docDate1,
        $lte: dv.sc.docDate2,
      },
      edocdate: {
        $gte: dv.sc.edocDate1,
        $lte: dv.sc.edocDate2,
      },
      customer: lis.like(dv.sc.customer),
      name1: lis.like(dv.sc.name1),

      edoctype: dv.hProcessInt.toString().substring(0, 1),
      qpostway: dv.hProcessInt.toString().substring(1, 2),
      edocstat: dv.hProcessInt.toString().substring(2, 3),
    })
    .catch((err) => console.log(err));

  return dv;
}
