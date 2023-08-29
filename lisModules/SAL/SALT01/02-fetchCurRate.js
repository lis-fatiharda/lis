export default async function fetchCurRate(pLissaldocs) {
    const oliscurrencies = await liscurrencies.find({
        company: pLissaldocs.company,
        currency: pLissaldocs.currency,
        curdate: pLissaldocs.curdate,
    });

    if (oliscurrencies.length == 0) {
        throw new Error(
            `${lis.format(pLissaldocs.curdate, "dd.MM.yyyy")} Tarihi İçin ${
                pLissaldocs.currency
            } Kur Bulunamadı!`
        );
    }

    if (pLissaldocs.exchmethod == 0) {
        pLissaldocs.currate = oliscurrencies.exchratepur;
    }

    if (pLissaldocs.exchmethod == 1) {
        pLissaldocs.currate = oliscurrencies.exchratesal;
    }
    if (pLissaldocs.exchmethod == 2) {
        pLissaldocs.currate = oliscurrencies.effexchratepur;
    }
    if (pLissaldocs.exchmethod == 3) {
        pLissaldocs.currate = oliscurrencies.effexchratesal;
    }

    return pLissaldocs.currate;
}
