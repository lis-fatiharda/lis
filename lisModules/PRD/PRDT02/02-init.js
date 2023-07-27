export default async function (dv) {
  dv.lisprddocs = await lisprddocs.findOne({
    company: dv.lisprddocs.company,
    doctype: dv.lisprddocs.doctype,
    docnum: dv.lisprddocs.docnum,
  });

  // Fill the Select-----------------------------------------------------------
  // dv.sc.companyOpts = await lisbas001.find({
  //   _deleted: false,
  // });

  // dv.sc.bomnumber = await lisbomdocs.find({
  //   company: dv.sc.company,
  //   _deleted: false,
  // });
  // dv.sc.material = await lisbomdocs.find({
  //   company: dv.sc.company,
  //   _deleted: false,
  // });
  // dv.sc.alternum = await lisbomdocs.find({
  //   company: dv.sc.company,
  //   _deleted: false,
  // });

  return dv;
}
