import fs from "fs";
import path from "path";

export default async function (dv) {
    dv.lisDialog = "DEVT01D02";
    dv.modi = 1;
    dv.olismodels = dv.olismodels.filter((e) => e._selected == true);
    let modelDocPath = dv.olismodels[0].model + ".js";
    
    modelDocPath = path.join(
        process.env.liserp_DIR,
        "lisModels/",
        modelDocPath
    );
    console.log(modelDocPath);
    dv.olismodels[0].modelTxt = await fs.readFileSync(modelDocPath).toString();

    return dv;
}
