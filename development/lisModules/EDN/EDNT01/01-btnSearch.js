
export default async function (dv) {

  let myPostway = dv.hProcessInt.toString().substring(1, 2) == 0 ? 0 : 1;
  dv.lisedndocsList = await lisedndocs
      .find({
          company: dv.sc.company,
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
          postway: myPostway,
          edocstat: dv.hProcessInt.toString().substring(2, 3),
      })
      .catch((err) => console.log(err));

  return dv;
}
