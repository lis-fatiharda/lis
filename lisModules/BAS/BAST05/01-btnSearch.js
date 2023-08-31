export default async function (dv) {
    dv.lisCurrencyList = await liscurrencies.find({
        curdate: {
            $gte: dv.sc.curdate1,
            $lte: dv.sc.curdate2,
        },
 
    });

    return dv;
}
