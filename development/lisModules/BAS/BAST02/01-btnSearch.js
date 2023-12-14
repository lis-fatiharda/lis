export default async function (dv) {
    dv.lisCustomerList = await liscustomers.find({
        company: lis.like(dv.sc.company),
        customer: lis.like(dv.sc.customer),
        name1: lis.like(dv.sc.name1),
        //custorvend: dv.sc.custOrVend,
        sector: lis.like(dv.sc.sector),
        country: lis.like(dv.sc.country),    
        city: lis.like(dv.sc.city),
        taxdept: lis.like(dv.sc.taxDept),
        taxnum: lis.like(dv.sc.taxNum),
        custorvend:
            (dv.sc.custOrVend === null) | (dv.sc.custOrVend === 99)
                ? { $gte: 0 }
                : dv.sc.custOrVend,

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
