export default async function (dv) {
    dv.lisCustomerList = await liscustomers
        .find({
            company: lis.like(dv.sc.company),
            

            
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
