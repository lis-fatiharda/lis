import liscustomers from "../../../../../lisModels/liscustomers.js";
//import lisbomdocs from "../../../lisModels/lisbomdocs.js";
//import lisfindocs from "../../../lisModels/lisfindocs.js";
//import lismaterials from "../../../lisModels/lismaterials.js";
export default async function (dv) {
  dv.lisCustomerList.push(await new liscustomers(
    liscustomers.prototype.schema.tree
  ));
  //dv.reportList.push(await new lisbomdocs(lisbomdocs.prototype.schema.tree));
  //dv.reportListFin.push(await new lisfindocs(lisfindocs.prototype.schema.tree));
  //dv.materialList.push(await new lismaterials(lismaterials.prototype.schema.tree));

  return dv;
}
