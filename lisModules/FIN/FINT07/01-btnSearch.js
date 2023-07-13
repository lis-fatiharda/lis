export default async function (dv) {
  dv.reportList = await lisfindocs
    .find({
      company: lis.like(dv.sc.company),
      _deleted: dv.sc._deleted,
    })
    .catch((err) => console.log(err));

  return dv;
}
