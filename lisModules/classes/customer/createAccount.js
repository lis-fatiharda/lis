
export default async function (pliscustomer) {


    
    const myAccount = await lisaccounts.findOne({ company: pliscustomer.company, acctype: pliscustomer.acctype, account: pliscustomer.customer, _deleted: false });

    if (myAccount == null ) {
        
        let olisaccounts = await lis.objectNew('lisaccounts')

        olisaccounts.company = pliscustomer.company;
        olisaccounts.acctype = pliscustomer.acctype;

        pliscustomer.account = pliscustomer.customer;
        olisaccounts.account = pliscustomer.account;
        olisaccounts.glaccount = pliscustomer.glaccount;
        olisaccounts.acctype = pliscustomer.acctype; 
        olisaccounts.stext = pliscustomer.name1;
        olisaccounts.currency = pliscustomer.currency; 

        olisaccounts.accstd = 0;
        olisaccounts.acclevel = 2;
        olisaccounts.accgrp = "AKTF"; 
        olisaccounts.exchmethod = 0;
        olisaccounts.isproject = 0;
        olisaccounts.iscostcenter = 0;
        olisaccounts.iscostobject = 0;

        await lisaccounts.create(olisaccounts);


        await liscustomers.findOneAndUpdate({ _id: pliscustomer._id }, { account: pliscustomer.account }).catch((error) => {
            throw new Error(error);
        });

    }

    return true;
}
