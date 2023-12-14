import lisaccounts from "../../../lisModels/lisaccounts.js";

export default async function (plisfindocs) {

    for (let i in plisfindocs.items) {
        let myItem = plisfindocs.items[i];

        let ctrlAccount = await lisaccounts.findOne({ company: plisfindocs.company, acctype: myItem.acctype, account: myItem.account });

        if (ctrlAccount == null) {
          throw new Error(`'${myItem.account}' Hesap Bulunamadı`);
        }


    }

    return true;
}