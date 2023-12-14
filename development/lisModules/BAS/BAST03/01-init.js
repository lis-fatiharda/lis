export default async function (dv) {
  console.log("lisbas009.find");

  dv.sc.companyOpts = await lisbas001.find({ _deleted: false });

  dv.sc.plantOpts = await lisbas002.find({
    company: dv.sc.company,
    _deleted: false,
  }); 

  dv.sc.warehouseOpts = await lisinv003.find({
    company: dv.sc.company,
    _deleted: false,
  });

  dv.sc.stockplaceOpts = await lisinv004.find({
    company: dv.sc.company,
    _deleted: false,
  });

  dv.sc.specialstockOpts = await lisinv005.find({
    company: dv.sc.company,
    _deleted: false,
  });
  //*** */
  var tmpSkunits = await lisbas007.find(
    { _deleted: false, unittype: 0, company: dv.sc.company },
    { unit: 1 }
  );

  dv.sc.skunitOpts = [];
  tmpSkunits.forEach((e) => {
    dv.sc.skunitOpts.push(e.unit);
  });
  //*** */

  dv.sc.purOrderTypeOpts = await lispur001.find({ _deleted: false });
  dv.sc.purItemOpts = await lispur002.find({ _deleted: false });
  dv.sc.purDeptOpts = await lispur003.find({ _deleted: false });
  //********* */
  dv.sc.salDocTypeOpts = await lissal001.find({ _deleted: false });
  dv.sc.salItemOpts = await lissal002.find({ _deleted: false });
  dv.sc.salDeptOpts = await lissal003.find({ _deleted: false });

  //*** */
  var tmpCurrencyOpts = await lisbas007.find(
    { _deleted: false, unittype: 1, company: dv.sc.company },
    { unit: 1 }
  );
  //*** */

  dv.sc.currencyOpts = [];
  tmpCurrencyOpts.forEach((e) => {
    dv.sc.currencyOpts.push(e.unit);
  });

  console.log("lisbas009.find");

  dv.sc.mattypeOpts = await lisbas009.find({
    company: dv.sc.company,
    _deleted: false,
  }); 
  dv.sc.matstatOpts = await lisbas010.find({
    company: dv.sc.company,
    _deleted: false,
  });
   dv.sc.matgrpOpts = await lisbas014.find({
     company: dv.sc.company,
     _deleted: false,
   });
  dv.sc.sectorOpts = await lisbas004.find({ _deleted: false });

  return dv;
}
