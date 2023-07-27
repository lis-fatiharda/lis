export default async function (dv) {
    dv.lisCustomerList = await liscustomers
        .find({
            company: lis.like(dv.sc.company),
            busarea: lis.like(dv.sc.busarea),
            customer: lis.like(dv.sc.customer),
            name1: lis.like(dv.sc.name1),
            taxdept: lis.like(dv.sc.taxDept),
            taxnum: lis.like(dv.sc.taxNum),

            custorvend:
                (dv.sc.custOrVend === null) |
                    (dv.sc.custOrVend === 99) |
                    (dv.sc.custOrVend === "")
                    ? { $gte: 0 }
                    : dv.sc.custOrVend,
            _deleted: false,
        })
        .catch((err) => console.log(err));

    // for (let i in dv.lisCustomerList) {
    //     let item;
    //     item = dv.lisCustomerList[i];
    //     let olisbas004 = await lisbas004.findOne({
    //         sector: item.sector,
    //     });
    //     dv.lisCustomerList[i].sector = olisbas004.stext;
        
    // }
    return dv;
}
