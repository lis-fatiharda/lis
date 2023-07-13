
export default async function (dv) {
  dv.reportList = await lisaccounts
    .find({
      company: lis.like(dv.sc.company),
      acctype: lis.like(dv.sc.acctype),
      account: lis.like(dv.sc.account),
      stext: lis.like(dv.sc.stext),
      
      acclevel: 2,
      _deleted: false,
    })
    .catch((err) => console.log(err));

  dv.reportList.sort((a, b) => {
    if (a.account > b.account) return 1
    if (a.account < b.account) return -1
  });




  return dv;
}
