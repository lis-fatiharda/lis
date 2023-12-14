export default async function (dv) {
 
  dv.sc.companyOpts = await lisbas001.find({ _deleted: false });

  dv.lislocks = await lislocks.find({ company: dv.sc.company });

  return dv;
}
