
export default async function (dv) {
    dv.liscustomers = await liscustomers.findOne({
        company: dv.lispurdocs.company,
        customer: dv.lispurdocs.customer,
    });

    return dv;
}
