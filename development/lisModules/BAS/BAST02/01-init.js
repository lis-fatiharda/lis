export default async function (dv) {
  dv.sc.companyOpts = await lisbas001.find({ _deleted: false });

  dv.sc.busareaOpts = await lisbas003.find({
    _deleted: false,
    company: dv.sc.company,
  });
  dv.sc.sectorOpts = await lisbas004.find({ _deleted: false });
  dv.sc.countryOpts = await lisbas005.find({ _deleted: false });
  dv.sc.cityOpts = await lisbas006.find({ _deleted: false });
  let tmpCurrencyOpts = await lisbas007.find(
    { _deleted: false, unittype: 1, company: dv.sc.company },
    { unit: 1 }
  );

  dv.sc.currencyOpts = [];
  tmpCurrencyOpts.forEach((e) => {
    dv.sc.currencyOpts.push(e.unit);
  });
  dv.sc.custGrpOpts = await lisbas008.find({
    company: dv.sc.company,
    _deleted: false,
  });
  dv.sc.salDeptOpts = await lissal003.find({
    _deleted: false,
    company: dv.sc.company,
  });
  dv.sc.purDeptOpts = await lispur003.find({
    _deleted: false,
    company: dv.sc.company,
  });

  dv.sc.acctypeOpts = await lisfin002.find({
    _deleted: false,
    company: dv.sc.company,
  });

  return dv;
}
