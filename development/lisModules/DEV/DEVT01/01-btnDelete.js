import fs from "fs";

export default async function (dv) {
  dv.olismodels = dv.olismodels.filter((e) => e._id == dv.selectedRow);
  console.log(dv.olismodels[0]);
  await lismodels.deleteOne({ model: dv.olismodels[0].model });

  console.log("btnDelete çalıştı");
  console.log(dv);
  return dv;
}
