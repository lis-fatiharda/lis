import path from "path";

export default async function (dv) {
    dv.olismodels = dv.olismodels.filter((e) => e._id == dv.selectedRow);
    const supcomponent = await import(path.join(
        "../../../lisModels",
        dv.olismodels[0].model + ".js"
    ));

    let ctrlTable = await supcomponent.default.find({
        company: dv.target2

    });

    if (ctrlTable.length > 0) {

        await supcomponent.default.deleteMany({ company: dv.target2 });
    }

    return dv;
}
