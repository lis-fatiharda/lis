export default async function fetchCurRate(Args) {

    if (Args.pLissaldocs.currency == '') {
        return Args.pLissaldocs;
    }

    if (Args.pLissaldocs.currency != 'TRY') {
        const oliscurrencies = await liscurrencies.findOne({
            company: Args.pLissaldocs.company,
            currency: Args.pLissaldocs.currency,
            curdate: Args.pLissaldocs.curdate,
        });

        if (oliscurrencies == null) {
          throw new Error(
                `${lis.format(
                    Args.pLissaldocs.curdate,
                    "dd.MM.yyyy"
                )} Tarihi İçin ${Args.pLissaldocs.currency} Kur Bulunamadı!`
            );
        }

        if (Args.pLissaldocs.exchmethod == 0) {
            Args.pLissaldocs.currate = oliscurrencies.exchratepur;
        }

        if (Args.pLissaldocs.exchmethod == 1) {
            Args.pLissaldocs.currate = oliscurrencies.exchratesal;
        }
        if (Args.pLissaldocs.exchmethod == 2) {
            Args.pLissaldocs.currate = oliscurrencies.effexchratepur;
        }
        if (Args.pLissaldocs.exchmethod == 3) {
            Args.pLissaldocs.currate = oliscurrencies.effexchratesal;
        }
    } else {
        Args.pLissaldocs.currate = 1;
    }

    
    
    if (
        (Args.pLissaldocs.currency != Args.oldCurrency) &
        (Args.isConvert == true)
    ) {
        // oldCurrency

        let oldCurRate = 1;

        const oliscurrenciesOld = await liscurrencies.findOne({
            company: Args.pLissaldocs.company,
            currency: Args.oldCurrency,
            curdate: Args.pLissaldocs.curdate,
        });

        if (Args.pLissaldocs.exchmethod == 0) {
            oldCurRate =
                Args.oldCurrency == "TRY" ? 1 : oliscurrenciesOld.exchratepur;
        }

        if (Args.pLissaldocs.exchmethod == 1) {
            oldCurRate =
                Args.oldCurrency == "TRY" ? 1 : oliscurrenciesOld.exchratesal;
        }
        if (Args.pLissaldocs.exchmethod == 2) {
            oldCurRate =
                Args.oldCurrency == "TRY"
                    ? 1
                    : oliscurrenciesOld.effexchratepur;
        }
        if (Args.pLissaldocs.exchmethod == 3) {
            oldCurRate =
                Args.oldCurrency == "TRY"
                    ? 1
                    : oliscurrenciesOld.effexchratesal;
        }

        ///

        for (let i in Args.pLissaldocs.items) {
            Args.pLissaldocs.items[i].price =
                (Args.pLissaldocs.items[i].price * oldCurRate) /
                Args.pLissaldocs.currate;
        }
    }
    



    
    

    

    return Args.pLissaldocs;
}
