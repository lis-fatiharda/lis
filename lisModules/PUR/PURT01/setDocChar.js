
export default async function (Args) {
    let oliscustomers = {};
    let eDoctype = 0;
    const olispur001 = await lispur001.findOne({ doctype: Args.doctype });

    if (olispur001.deltype > 0) {
        oliscustomers = await liscustomers.findOne({
            company: Args.company,
            customer: Args.vendor,
            _deleted: false,
        });

        if (oliscustomers.edelmember?.length > 0) eDoctype = 3;
    }
    if (olispur001.invtype > 0) {
        oliscustomers = await liscustomers.findOne({
            company: Args.company,
            customer: Args.vendor,
            _deleted: false,
        });

        if (oliscustomers.einvmember?.length > 0) {
            eDoctype = 1;
        } else {
            eDoctype = 2;
        }
    }

    return { olispur001, edoctype: eDoctype };
}
