
export default async function (Args) {
    let oliscustomers = {};
    let eDoctype = 0;
    const olissal001 = await lissal001.findOne({ doctype: Args.doctype });

    if (olissal001.deltype > 0) {
        oliscustomers = await liscustomers.findOne({
            company: Args.company,
            customer: Args.customer,
            _deleted: false,
        });

        if (oliscustomers.edelmember.length > 0) eDoctype = 3;
    }
    if (olissal001.invtype > 0) {
        oliscustomers = await liscustomers.findOne({
            company: Args.company,
            customer: Args.customer,
            _deleted: false,
        });

        if (oliscustomers.einvmember.length > 0) {
            eDoctype = 1;
        } else {
            eDoctype = 2;
        }
    }

    return { olissal001, edoctype: eDoctype };
}
