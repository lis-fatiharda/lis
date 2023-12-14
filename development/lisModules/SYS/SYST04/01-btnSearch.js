import {lisnumranges} from "../../../lisModels/lisnumranges.js"

export default async function (dv) {
    dv.numRangeList = await lisnumranges.find({
        company: dv.sc.company,
        numrange: lis.like(dv.sc.numRange),
        stext: lis.like(dv.sc.stext),
        ismanuel: dv.sc.isManuel,
        isintegrator: dv.sc.isIntegrator,
    });

    return dv;
}
