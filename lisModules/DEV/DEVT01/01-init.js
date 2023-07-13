export default async function (dv) {
    //import lisappobjects from "../../../lisModels/lisappobjects.js";
    var arrayModules = await lisappobjects.find();
    arrayModules.forEach((e) => {
        dv.sc.moduleOpts.push({module: e.module, stext: e.stext});
    });

    return dv;
}
