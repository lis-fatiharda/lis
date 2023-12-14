export default async function (dv) {
    //let asd = await global.round(5.645, 2);

    dv.salDocList = await lissaldocs.find({
        company: lis.like(dv.sc.company),
        busarea: lis.like(dv.sc.busarea),
        doctype: lis.like(dv.sc.doctype),
        docnum: lis.like(dv.sc.docnum),
        project: lis.like(dv.sc.project),
        saldept: lis.like(dv.sc.saldept),
        customer: lis.like(dv.sc.customer),
        name1: lis.like(dv.sc.name1),
        "items.material": lis.like(dv.sc.material),
        "items.mtext": lis.like(dv.sc.mtext),
        "items.variant": lis.like(dv.sc.variant),
        docstat:
            (dv.sc.docStat === null) | (dv.sc.docStat === 99)
                ? { $gte: 0 }
                : dv.sc.docStat,

        docdate: {
            $gte: dv.sc.docdate1,
            $lte: dv.sc.docdate2,
        },
        _deleted: dv._deleted,
    });


    return dv;
}
