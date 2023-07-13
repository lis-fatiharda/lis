export default async function (dv) {
    console.log("dv****", dv);
    //import lismaterials from "../../../lisModels/lismaterials.js";

    console.log("dv", dv);
    dv.materialList = await lismaterials.find({
            company: lis.like(dv.sc.company),
            mattype: lis.like(dv.sc.mattype),
            matstat: lis.like(dv.sc.matstat),
            sector: lis.like(dv.sc.sector),
            material: lis.like(dv.sc.material),
            stext: lis.like(dv.sc.stext),
        })
        .catch((err) => console.log(err));

    console.log(dv);

    return dv;
}
