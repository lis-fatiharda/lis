
import path from "path";

export default async function (dv) {
    dv.olismodels = dv.olismodels.filter((e) => e._id == dv.selectedRow);
    const supcomponent = await import(path.join(
        "../../../lisModels",
        dv.olismodels[0].model + ".js"
    ));
 
    let ctrlTable = await supcomponent.default.find({
        company: dv.source
    });

    if (ctrlTable.length > 0) {

        for (let i = 0; i < ctrlTable.length; i++) {
            let myObject = ctrlTable[i]

            myObject.company = dv.target;
            myObject._id = undefined;

            let osupcomponent = new supcomponent.default(myObject);

            await osupcomponent
                .save()
                .then(function (e) {
                    console.log("Eklendi.");
                })
                .catch(function (e) {
                    console.log(e);
                });
        }
    }
    return dv;
}
