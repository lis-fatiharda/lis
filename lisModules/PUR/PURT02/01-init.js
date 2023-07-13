export default async function (dv) {
    dv.sc.companyOpts = await lisbas001.find({
        _deleted: false,
    });
    dv.sc.busareaOpts = await lisbas003.find({
        _deleted: false,
        company: dv.sc.company,
    });

    //*** */
    dv.sc.doctypeOpts = await lispur001.find({
        company: dv.sc.company,
        _deleted: false,
    });

    return dv;
};
