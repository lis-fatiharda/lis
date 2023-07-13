export default async function (dv) {
  dv.sc.companyOpts = await lisbas001.find({
    _deleted: false,
  });
  dv.sc.plantOpts = await lisbas002.find({
    company: dv.sc.company,
    _deleted: false,
  });
  // dv.sc.typeOpts = await lisbom001.find({
  //   company: dv.sc.company,
  //   _deleted: false,
  // });

  return dv;
}
