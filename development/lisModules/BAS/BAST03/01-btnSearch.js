export default async function (dv) {
    dv.materialList = await lismaterials
        .find({
            company: lis.like(dv.sc.company),
            mattype: lis.like(dv.sc.mattype),
            matstat: lis.like(dv.sc.matstat),
            sector: lis.like(dv.sc.sector),
            material: lis.like(dv.sc.material),
            mtext: lis.like(dv.sc.mtext),
        })
        .catch((err) => console.log(err));

    for (let i in dv.materialList) {
        let item = dv.materialList[i];
        let olisbas004 = await lisbas004.findOne({
            sector: item.sector,
        });
        dv.materialList[i].sector = olisbas004?.stext;
    }

    return dv;
}
