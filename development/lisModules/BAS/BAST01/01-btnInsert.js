import path from "path";

export default async function (dv) {
    dv.lisDialog = "BAST01D02";
    dv.lisDialogDetail = "listDocs";
    dv.modi = 0;

    dv.olismodels = dv.olismodels.filter((e) => e._id == dv.selectedRow);

    if (dv.olismodels.length == 0) {
      throw new Error("Lütfen İlk Kayıt Oluşturacağınız Dökümanı Seçiniz!");
    }

    const supComponent = await import(
        path.join(
            process.env.liserp_DIR,
            "development/lisModels/",
            dv.olismodels[0].model + ".js"
        )
    );

    console.log(supComponent.default.prototype.schema.tree);
    dv.lisModelData.push(new supComponent.default());
    dv.lisModelDataLabel = supComponent.default.prototype.schema.tree;

    return dv;
}
