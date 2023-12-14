import path from "path";

export default async function (dv) {
    console.log(path.join("../../../lisModels", dv.olismodels[0].model));
    const SupComponent = await import(
        path.join("../../../lisModels", dv.olismodels[0].model + ".js")
    );
    dv.lisModelData.push(new SupComponent.default());

    return dv.lisModelData;
}
