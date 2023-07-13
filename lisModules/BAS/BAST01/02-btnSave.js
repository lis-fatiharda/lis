import path from "path";

export default async function (dv) {
  const supcomponent = await import(path.join(
    "../../../lisModels",
    dv.olismodels[0].model + ".js"
  ));

  //*************Update*************************** */

  for (let i = 0; i < dv.lisModelData.length; i++) {
    if ((dv.lisModelData[i]._id == "") | undefined) {
      const osupcomponent = new supcomponent.default(dv.lisModelData[i]);

      await osupcomponent
        .save()
        .then(function (e) {
          console.log("Eklendi.");
        })
        .catch(function (e) {
          console.log(e);
        });
    } else {
      await supcomponent.default.updateOne(
          { _id: dv.lisModelData[i]._id },
          dv.lisModelData[i],
          {
              new: true,
              upsert: true,
          }
      );
    }
  }

  return dv;
};
