import path from "path";

export default async function objectNew(pModel) {
    console.log("objectNew", pModel);

    if (typeof pModel == "object") {
        pModel = Object.keys(pModel)[0];
    }

    let myObject = {};

    if (pModel.indexOf(".") == -1) {
        let myModel = pModel;

        const supObjPath = path.join(
            `${process.env.liserp_DIR}development/lisModels`,
            myModel + ".js"
        );

        try {
            const supObj = await import(supObjPath);

            myObject = new supObj.default(supObj.default.prototype.schema.tree);

            myObject = myObject.toObject();
        } catch (err) {
            console.log(err);
        }
    } else {
        let myModel = pModel.substring(0, pModel.indexOf("."));
        let myNested = pModel.substring(pModel.indexOf(".") + 1, 110);
        const supObjPath = path.join(
            `${process.env.liserp_DIR}development/lisModels`,
            myModel + ".js"
        );

        try {
            const supObj = await import(supObjPath);

            myObject = new supObj.default(supObj.default.prototype.schema.tree);
            myObject = myObject.toObject();

            myObject = myObject[myNested][0];
        } catch (err) {
            console.log(err);
        }
    }

    return myObject;
}
