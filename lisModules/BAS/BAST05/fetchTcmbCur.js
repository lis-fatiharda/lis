import Axios from "axios";
import xml2js from "xml2js";
const Parser = xml2js.Parser();
 
export default async function (dv) { 
    console.log("1111")
    try {  
        Axios.get("https://www.tcmb.gov.tr/kurlar/today.xml")
            .then((res) => {
                console.log("222");
                Parser.parseString(res.data, async function (err, result) {
                    for (let i in result.Tarih_Date.Currency) {
                        const myCurrency = result.Tarih_Date.Currency[i];
 
                        if (
                            (myCurrency.$.CurrencyCode == "USD") |
                            (myCurrency.$.CurrencyCode == "EUR") |
                            (myCurrency.$.CurrencyCode == "GBP") |
                            (myCurrency.$.CurrencyCode == "CHF")
                        ) {
                            //console.log("myCurrency",myCurrency);
                            let lisCurrencyFetched = {
                                _id: undefined,
                                company: dv.sc.company,
                                curdate: new Date(),
                                exchvalue: myCurrency.Unit[0],
                                currency: myCurrency.$.CurrencyCode,
                                exchratepur: myCurrency.ForexBuying[0],
                                exchratesal: myCurrency.ForexSelling[0],
                                effexchratepur: myCurrency.BanknoteBuying[0],
                                effexchratesal: myCurrency.BanknoteSelling[0],
                                tocurrency: "TRY",
                                isenable: false,
                            };

                            console.log(
                                "lisCurrencyFetched",
                                lisCurrencyFetched
                            );

                            //console.log("lisCurrencyFetched", lisCurrencyFetched);

                            // delete the currency if exists
                            await liscurrencies
                                .deleteOne({
                                    company: lisCurrencyFetched.company,
                                    currency: lisCurrencyFetched.currency,
                                    curdate: new Date(),
                                    //tocurrency: lisCurrencyFetched.tocurrency,
                                })
                                .then((res) => {
                                    //console.log("silindi", lisCurrencyFetched.currency);
                                })
                                .catch((err) => {
                                    //console.log(
                                    //    "errrrrrrr",
                                    //    lisCurrencyFetched.currency
                                    //);
                                });

                            // save the new currency
                    
                            await liscurrencies.create(lisCurrencyFetched);
                        }
                    }
                });
            })
            .catch((error) => {
                throw new Error(error); 
            });
    } catch (error) {
        console.log(error)
    }
    

    return true;
}
