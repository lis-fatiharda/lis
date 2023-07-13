export default async function (dv) {
  dv.lissaldocsPrototype = new lissaldocs(lissaldocs.prototype.schema.tree);
  //--
  dv.sc.companyOpts = await lisbas001.find({
    _deleted: false,
  });
  dv.sc.busareaOpts = await lisbas003.find({
    _deleted: false,
    company: dv.sc.company,
  });
  //*** Inventory supDocuments */
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
  dv.sc.mattypeOpts = await lisbas009.find({
    company: dv.sc.company,
    _deleted: false,
  });

  return dv;
}
