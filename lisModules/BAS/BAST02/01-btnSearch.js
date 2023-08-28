export default async function (dv) {
    dv.lisCustomerList = await liscustomers.find({
        company: lis.like(dv.sc.company),
        customer: lis.like(dv.sc.customer),
        name1: lis.like(dv.sc.name1),
        _deleted: false,
    });

    
    for (let i in dv.lisCustomerList) {
        let item = dv.lisCustomerList[i];
        let olisbas004 = await lisbas004.findOne({
            sector: item.sector,
        });
        dv.lisCustomerList[i].sector = olisbas004?.stext;
    }
    return dv;
}
