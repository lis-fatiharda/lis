export default async function (dv) {
  // dv.lisCustomerList.push(await new liscustomers(
  //   liscustomers.prototype.schema.tree
  // ));
  dv.reportList.push(await new lisbomdocs(lisbomdocs.prototype.schema.tree));
  //dv.reportListFin.push(await new lisfindocs(lisfindocs.prototype.schema.tree));
  //dv.materialList.push(await new lismaterials(lismaterials.prototype.schema.tree));

  return dv;
}
