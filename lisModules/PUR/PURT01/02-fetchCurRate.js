export default async function fetchCurRate(Args) {

    if (Args.pLispurdocs.currency == '') {
        return Args.pLispurdocs;
    }

    if (Args.pLispurdocs.currency != "TRY") {
        const oliscurrencies = await liscurrencies.findOne({
            company: Args.pLispurdocs.company,
            currency: Args.pLispurdocs.currency,
            curdate: Args.pLispurdocs.curdate,
        });

        if (oliscurrencies == null) {
            throw new Error(
                `${lis.format(
                    Args.pLispurdocs.curdate,
                    "dd.MM.yyyy"
                )} Tarihi İçin ${Args.pLispurdocs.currency} Kur Bulunamadı!`
            );
        }

        if (Args.pLispurdocs.exchmethod == 0) {
            Args.pLispurdocs.currate = oliscurrencies.exchratepur;
        }

        if (Args.pLispurdocs.exchmethod == 1) {
            Args.pLispurdocs.currate = oliscurrencies.exchratesal;
        }
        if (Args.pLispurdocs.exchmethod == 2) {
            Args.pLispurdocs.currate = oliscurrencies.effexchratepur;
        }
        if (Args.pLispurdocs.exchmethod == 3) {
            Args.pLispurdocs.currate = oliscurrencies.effexchratesal;
        }
    } else {
        Args.pLispurdocs.currate = 1;
    }

    if (
        (Args.pLispurdocs.currency != Args.oldCurrency) &
        (Args.isConvert == true)
    ) {
        // oldCurrency

        let oldCurRate = 1;

        const oliscurrenciesOld = await liscurrencies.findOne({
            company: Args.pLispurdocs.company,
            currency: Args.oldCurrency,
            curdate: Args.pLispurdocs.curdate,
        });

        if (Args.pLispurdocs.exchmethod == 0) {
            oldCurRate =
                Args.oldCurrency == "TRY" ? 1 : oliscurrenciesOld.exchratepur;
        }

        if (Args.pLispurdocs.exchmethod == 1) {
            oldCurRate =
                Args.oldCurrency == "TRY" ? 1 : oliscurrenciesOld.exchratesal;
        }
        if (Args.pLispurdocs.exchmethod == 2) {
            oldCurRate =
                Args.oldCurrency == "TRY"
                    ? 1
                    : oliscurrenciesOld.effexchratepur;
        }
        if (Args.pLispurdocs.exchmethod == 3) {
            oldCurRate =
                Args.oldCurrency == "TRY"
                    ? 1
                    : oliscurrenciesOld.effexchratesal;
        }

        ///

        for (let i in Args.pLispurdocs.items) {
            Args.pLispurdocs.items[i].price =
                (Args.pLispurdocs.items[i].price * oldCurRate) /
                Args.pLispurdocs.currate;
        }
    }

    return Args.pLispurdocs;
}
