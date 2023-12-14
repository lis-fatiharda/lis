export default async function (dv) {
    dv.lisdocdocsList = await lisdocdocs.find({
        company: dv.sc.company,
        doctype: lis.like(dv.sc.doctype),
        docnum: lis.like(dv.sc.docnum),
    });

    return dv.lisdocdocsList;
}
