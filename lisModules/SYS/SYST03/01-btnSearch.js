export default async function (dv) {
  dv.reportList = await lisusers.findOne({
    username: lis.like(dv.sc.userName),
  });

  return dv;
}
