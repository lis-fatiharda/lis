export default async function init(dv) {
    dv.sc.companyOpts = await lisbas001.find({ _deleted: false });
    dv.sc.doctypeOpts = await lisdoc001.find({ _deleted: false });

    return dv;
}
