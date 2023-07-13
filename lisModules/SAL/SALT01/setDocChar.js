
export default async function (params) {
    let oliscustomers = {};
    let eDoctype = 0;
    const olissal001 = await lissal001.findOne({ doctype: params.doctype });

    if (olissal001.deltype > 0) {
        oliscustomers = await liscustomers.findOne({
            company: params.company,
            customer: params.customer,
            _deleted: false,
        });

        if (oliscustomers.edelmember.length > 0) eDoctype = 3;
    }
    if (olissal001.invtype > 0) {
        oliscustomers = await liscustomers.findOne({
            company: params.company,
            customer: params.customer,
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
