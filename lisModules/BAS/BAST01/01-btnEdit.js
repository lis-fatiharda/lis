import path from "path";
import fs from "fs";
export default async function (dv) {

    dv.olismodels = dv.olismodels.filter((e) => e._id == dv.selectedRow);
    // Lock the document
    await System.lock(
        "01",
        "BAST01",
        dv.olismodels[0].model,
        global.sys_user
    ).catch((err) => {
        throw new Error(err);
    });

    // Get support document dynamic or static dialog

    let staticSups = fs.readdirSync(
        path.join(process.env.liserp_DIR, "lisModules/BAS/BAST01/SUPS/")
    );

    if (staticSups.findIndex((e) => e == dv.olismodels[0].model) > -1) {
        dv.lisDialog = dv.olismodels[0].model.toString().toUpperCase();
    } else {
        dv.lisDialog = "BAST01D02";
    }

    //----------------------------------------------

    dv.lisDialogDetail = "listDocs";
    dv.modi = 1;
    dv.lockKeyParams.company = "01";
    dv.lockKeyParams.lid = "BAST01";
    dv.lockKeyParams.lockkey = dv.olismodels[0].model;

    const supComponent = await import(
        path.join(
            process.env.liserp_DIR,
            "lisModels/",
            dv.olismodels[0].model + ".js"
        )
    );

    dv.lisModelData = await supComponent.default.find({ _deleted: false });

    dv.lisModelDataLabel = supComponent.default.prototype.schema.tree;

    return dv;
}
