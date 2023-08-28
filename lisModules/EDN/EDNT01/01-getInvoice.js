export default async function (dv) {
    let mySession_Id = await Emember.login();
    await Emember.getInvoice(dv.sc.company, mySession_Id);

    dv.ic.icon101 = await lisedndocs.count({
        company: dv.sc.company,
        edoctype: 1,
        postway: 0,
        edocstat: 1,
    });

    return dv;
}
