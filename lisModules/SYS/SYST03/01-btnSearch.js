export default async function (dv) {
  dv.reportList = await lisusers.find({
    username: lis.like(dv.sc.userName),
  });

  return dv;
}
