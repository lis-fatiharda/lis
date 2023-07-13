export default async function (dv) {
 
  dv.materialList.push(await new lismaterials(lismaterials.prototype.schema.tree));

  return dv;
}
