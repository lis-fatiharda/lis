export default async function (dv) {
  for (let i in dv.materialList) {
    let ctrlMaterial = await lismaterials.find({
      company: lis.like(dv.company),

      material: lis.like(dv.materialList[i].material),
    });

    if (ctrlMaterial.length > 0) {
      dv.materialList[i].material = ctrlMaterial[0].material;
      dv.materialList[i].skunit = ctrlMaterial[0].skunit;
      dv.materialList[i].mattype = ctrlMaterial[0].mattype;

      await lismaterials
        .findOneAndUpdate(
          { _id: ctrlMaterial[0]._id },

          {
            stext:
              dv.materialList[i].stext === null ? "" : dv.materialList[i].stext,
            ltext:
              dv.materialList[i].ltext === null ? "" : dv.materialList[i].ltext,
            sector:
              dv.materialList[i].sector === null
                ? ""
                : dv.materialList[i].sector,
            matgrp:
              dv.materialList[i].matgrp === null
                ? ""
                : dv.materialList[i].matgrp,
            salunit:
              dv.materialList[i].salunit === null
                ? ""
                : dv.materialList[i].salunit,
            new: true,
            upsert: true,
          }
        )
        .catch((err) => {
          throw new Error(err.message);
        });
    } else {
      const olismaterials = new lismaterials(dv.materialList[i]);
      await olismaterials.save().catch((err) => {
        throw new Error(err.message);
      });
    }
  }

  return dv;
}
