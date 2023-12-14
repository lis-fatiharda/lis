import lisusers from "../../../lisModels/lisusers.js";

export default async function (dv) {
    console.log(global.round);
    const olisusers = await lisusers.find({ username: global.sys_user });

    dv.olismodels = [];
    if (olisusers[0].issuperuser == true) {
        console.log("111");
        dv.olismodels = await lismodels.find({
            type: 1,
            module: dv.sc.module,
        });
        console.log("dv.olismodels", dv.olismodels);
    } else {
      let PscRights = olisusers[0].scrights;
      
      
        dv.olismodels = await lismodels.find({
            type: 1,
            module: dv.sc.module,
            model: lis.like(dv.sc.modelCode),
            model: {
                $in: olisusers[0].scrights,
            },
            stext: lis.like(dv.sc.modelTxt),
        });
    }
    console.log(dv);

    return dv;
}
