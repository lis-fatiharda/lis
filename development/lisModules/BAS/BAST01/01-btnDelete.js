import path from "path";


export default async function (dv) {

  const supcomponent = await import(path.join(
    "../../../lisModels",
    dv.olismodels[0].model + ".js"
  ));
  await supcomponent.default.deleteOne({ _id: dv.lisModelDataDetail[0]._id });

  dv.lisModelData = dv.lisModelData.filter(e => e._id != dv.lisModelDataDetail[0]._id)
 

  return dv.lisModelData;
}