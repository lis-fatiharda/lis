export default async function (dv) {
  dv.lisworkcenters = await lisworkcenters.findOne({
    company: dv.lisworkcenters.company,
    plant: dv.lisworkcenters.plant,
    workcenter: dv.lisworkcenters.workcenter,
  });

  // Fill the Select-----------------------------------------------------------
  dv.sc.companyOpts = await lisbas001.find({
    _deleted: false,
  });
  dv.sc.plantOpts = await lisbas002.find({
    company: dv.sc.company,
    _deleted: false,
  });
  dv.sc.mainworkcenterOpts = await lisworkcenters.find({
    company: dv.sc.company,
    _deleted: false,
  });
  dv.sc.workcenterOpts = await lisworkcenters.find({
    company: dv.sc.company,
    _deleted: false,
  });
  // dv.sc.mainworkcenterOpts = await lisbom002.find({
  //   company: dv.sc.company,
  //   _deleted: false,
  // });
  // dv.sc.workrespOpts = await lisbom003.find({
  //   company: dv.sc.company,
  //   _deleted: false,
  // });

  return dv;
}
