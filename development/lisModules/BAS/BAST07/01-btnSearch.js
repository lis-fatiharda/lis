export default async function (dv) {
  dv.lisGroupsList = await lisgroups
    .find({
      company: lis.like(dv.sc.company),
      group: lis.like(dv.sc.group),
      stext: lis.like(dv.sc.stext),
    })
    .catch((err) => console.log(err));

  return dv;
}
