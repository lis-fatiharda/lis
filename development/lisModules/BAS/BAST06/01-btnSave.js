export default async function (dv) {
  switch (dv.tab) {
    case "custCards":
      for (let i in dv.lisCustomerList) {
        const oliscustomers = new liscustomers(dv.lisCustomerList[i]);
        await oliscustomers.save().catch((err) => {
        throw new Error(err.message);
        });
      }

    case "bom":
      for (let i in dv.reportList) {
        const olisbomdocs = new lisbomdocs(dv.reportList[i]);
        await olisbomdocs.save().catch((err) => {
        throw new Error(err.message);
        });
      }
    case "accounts":
      for (let i in dv.reportListFin) {
        const olisfindocs = new lisfindocs(dv.reportListFin[i]);
        await olisfindocs.save().catch((err) => {
        throw new Error(err.message);
        });
      }
    case "matCards":
      for (let i in dv.materialList) {
        /////////////////////////////////////
        if (dv.materialList.material == "") {
        throw new Error("Malzeme Kodu Boş Olamaz!!");
        }

        let ctrlMaterial = await lismaterials.find({
          company: lis.like(dv.company),
          material: lis.like(dv.materialList.material),
        });

        if (ctrlMaterial.length > 0) {
          dv.materialList[i].skunit = ctrlMaterial.skunit;
          dv.materialList[i].mattype = ctrlMaterial.mattype;

          await lismaterials
            .findOneAndUpdate(
              { _id: ctrlMaterial[0]._id },
              dv.materialList[i],
              {
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
  }

  return dv;
}
