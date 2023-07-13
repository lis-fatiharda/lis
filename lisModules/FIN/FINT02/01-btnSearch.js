export default async function (dv) {
  dv.reportList = await lisfindocs
    .find({
      company: lis.like(dv.sc.company),
      doctype: lis.like(dv.sc.doctype),
      docnum: lis.like(dv.sc.docnum),
      postnum: lis.like(dv.sc.postnum),
      acctype: lis.like(dv.sc.acctype),
      account: lis.like(dv.sc.account),
      atext: lis.like(dv.sc.atext),
      currency: lis.like(dv.sc.currency),
      glaccount: lis.like(dv.sc.glaccount),
      accclass: lis.like(dv.sc.accclass),
      accgrp: lis.like(dv.sc.accgrp),
      postdate: {
        $gte: dv.sc.postdatestart,
        $lte: dv.sc.postdateend,
      },
      docdate: {
        $gte: dv.sc.docdatestart,
        $lte: dv.sc.docdateend,
      },
      hpostamnt: {
        $gte: dv.sc.amntmin,
        $lte: dv.sc.amntmax > 0 ? dv.sc.amntmax : 999999999,
      },
      _deleted: dv.sc._deleted,
    })
    .catch((err) => console.log(err));

  return dv;
}
