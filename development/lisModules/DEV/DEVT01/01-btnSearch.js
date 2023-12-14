

export default async function (dv) {
    dv.olismodels = await lismodels.find({
        module: lis.like(dv.sc.modul),
        model: lis.like(dv.sc.model),
        stext: lis.like(dv.sc.stext),
    });

    return dv;
}
