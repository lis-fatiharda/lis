export default async function (dv) {
    dv.lisCurrencyList = await liscurrencies.find({
        curdate: {
            $gte: new Date(dv.sc.curdate1),
            $lte: new Date(dv.sc.curdate2),
        },
 
        _deleted: false,
    });

    return dv;
}
