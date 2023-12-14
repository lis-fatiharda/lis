export default async function (dv) {
  debugger;
  //*** Inventory supDocuments */
  //--
  dv.sc.companyOpts = await lisbas001.find({
    _deleted: false,
  });
  dv.sc.busareaOpts = await lisbas003.find({
    _deleted: false,
    company: dv.sc.company,
  });

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
  dv.sc.specialStockOpts = await lisinv005.find({
    company: dv.sc.company,
    _deleted: false,
  });

  //*** */
  dv.sc.purDoctypeOpts = await lispur001.find({
    company: dv.sc.company,
    deltype: { $gt: 0 },
    _deleted: false,
  });

  dv.lisinvdocs = await new lisinvdocs(lisinvdocs.prototype.schema.tree);

  return dv;
}
