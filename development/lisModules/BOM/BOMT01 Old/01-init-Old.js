export default async function (dv) {
  dv.sc.companyOpts = await lisbas001.find({
    _deleted: false,
  });
  dv.sc.companyOpts.map((e) => (e.value = e.company));

  return dv;
}
