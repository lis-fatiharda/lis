export default async function (dv) {
  dv.lisbomdocs = await lisbomdocs.findOne({
    company: dv.lisbomdocs.company,

    bomnumber: dv.lisbomdocs.bomnumber,
    alternum: dv.lisbomdocs.alternum,
  });

  // Fill the Select-----------------------------------------------------------
  dv.sc.companyOpts = await lisbas001.find({
    _deleted: false,
  });

  dv.sc.bomnumber = await lisbomdocs.find({
    company: dv.sc.company,
    _deleted: false,
  });
  dv.sc.material = await lisbomdocs.find({
    company: dv.sc.company,
    _deleted: false,
  });
  dv.sc.alternum = await lisbomdocs.find({
    company: dv.sc.company,
    _deleted: false,
  });

  return dv;
}
