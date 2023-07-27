
export default async function (dv) {

    let olisbas001 = await lisbas001.findOne({
        company: dv.sc.company,
    });

    dv.sc.companyStext = olisbas001.stext;
    
    dv.ic.icon101 = await lisedndocs.count({ company: dv.sc.company, edoctype: 1, postway: false, edocstat: 1 });
    dv.ic.icon103 = await lisedndocs.count({ company: dv.sc.company, edoctype: 1, postway: false, edocstat: 3 });
    dv.ic.icon111 = await lisedndocs.count({ company: dv.sc.company, edoctype: 1, postway: true, edocstat: 1 });
    dv.ic.icon113 = await lisedndocs.count({ company: dv.sc.company, edoctype: 1, postway: true, edocstat: 3 });
    dv.ic.icon201 = await lisedndocs.count({ company: dv.sc.company, edoctype: 2, postway: false, edocstat: 1 });
    dv.ic.icon203 = await lisedndocs.count({ company: dv.sc.company, edoctype: 2, postway: false, edocstat: 3 });
    dv.ic.icon301 = await lisedndocs.count({ company: dv.sc.company, edoctype: 3, postway: false, edocstat: 1 });
    dv.ic.icon303 = await lisedndocs.count({ company: dv.sc.company, edoctype: 3, postway: false, edocstat: 3 });
    dv.ic.icon311 = await lisedndocs.count({ company: dv.sc.company, edoctype: 3, postway: true, edocstat: 1 });
    dv.ic.icon313 = await lisedndocs.count({ company: dv.sc.company, edoctype: 3, postway: true, edocstat: 3 });

    return dv;
}
