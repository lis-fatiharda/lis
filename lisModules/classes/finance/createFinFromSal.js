import liscustomers from "../../../lisModels/liscustomers.js";
import lisaccounts from "../../../lisModels/lisaccounts.js";
import lisfindocs from "../../../lisModels/lisfindocs.js";

import lisfin002 from "../../../lisModels/lisfin002.js";
import lissal001 from "../../../lisModels/lissal001.js";
import lissal002 from "../../../lisModels/lissal002.js";

export default async function (plissaldocs) {
    const oliscustomers = await liscustomers.findOne({
        company: plissaldocs.company,
        customer: plissaldocs.customer,
        _deleted: false,
    });
    const olisaccounts = await lisaccounts.findOne({
        company: oliscustomers.company,
        acctype: oliscustomers.acctype,
        account: oliscustomers.account,
        _deleted: false,
    });
    if (olisaccounts == undefined) throw new Error("Cari Hesap Bulunamadı!");
    let olisfindocs = new lisfindocs(
        lisfindocs.prototype.schema.tree
    ).toObject();
    const olissal001 = await lissal001.findOne({
        company: plissaldocs.company,
        doctype: plissaldocs.doctype,
    });

    lis.objectMove(plissaldocs, olisfindocs);
    olisfindocs.doctype = olissal001.findoctype;
    olisfindocs.docnum = "";
    olisfindocs.saldoctype = plissaldocs.doctype;
    olisfindocs.saldocnum = plissaldocs.docnum;

    olisfindocs.items = [];

    for (let i in plissaldocs.items) {
        let mySalItem = plissaldocs.items[i];

        const olissal002 = await lissal002.findOne({
            company: plissaldocs.company,
            doctype: plissaldocs.doctype,
            itemtype: mySalItem.itemtype,
        });
        const olisfin002 = await lisfin002.findOne({
            company: olissal002.company,
            postkey: olissal002.postkey,
        });

        if (olisfin002 == null) throw new Error("Muhasebe Belgesi Bulunamadı!");
        for (let k in olisfin002.items) {
            const myfin002_item = olisfin002.items[k];

            if (myfin002_item.acctype == "C") {
                if (olisfindocs.items.findIndex((x) => x.acctype == "C") > -1) {
                    let myRow = olisfindocs.items.findIndex(
                        (x) => x.acctype == "C"
                    );

                    if (myfin002_item.postway == false) {
                        olisfindocs.items[myRow].ddebit +=
                            mySalItem[myfin002_item.valuefield];
                    } else {
                        olisfindocs.items[myRow].dcredit +=
                            mySalItem[myfin002_item.valuefield];
                    }
                } else {
                    // create new lisfindocs_item
                    let olisfindocs_item = new lisfindocs(
                        lisfindocs.prototype.schema.tree
                    ).toObject();
                    olisfindocs_item = olisfindocs_item.items[0];
                    //
                    lis.objectMove(myfin002_item, olisfindocs_item);
                    olisfindocs_item.acctype = olisaccounts.acctype;
                    olisfindocs_item.account = olisaccounts.account;
                    olisfindocs_item.glaccount = olisaccounts.glaccount;
                    olisfindocs_item.atext = olisaccounts.stext;

                    if (myfin002_item.postway == false) {
                        olisfindocs_item.ddebit =
                            mySalItem[myfin002_item.valuefield];
                    } else {
                        olisfindocs_item.dcredit =
                            mySalItem[myfin002_item.valuefield];
                    }

                    olisfindocs_item.currency = plissaldocs.currency;
                    olisfindocs_item.curdate = plissaldocs.curdate;
                    olisfindocs_item.currate = plissaldocs.currate;

                    olisfindocs.items.push(olisfindocs_item);
                }
            }
            if (myfin002_item.acctype == "G") {
                let myAccount = await this.fetchAccount(
                    mySalItem,
                    myfin002_item.account,
                    plissaldocs
                );

                if (
                    olisfindocs.items.findIndex((x) => x.account == myAccount) >
                    -1
                ) {
                    let myRow = olisfindocs.items.findIndex(
                        (x) => x.account == myAccount
                    );

                    if (myfin002_item.postway == false) {
                        olisfindocs.items[myRow].ddebit +=
                            mySalItem[myfin002_item.valuefield];
                    } else {
                        olisfindocs.items[myRow].dcredit +=
                            mySalItem[myfin002_item.valuefield];
                    }
                } else {
                    // create new lisfindocs_item
                    let olisfindocs_item = new lisfindocs(
                        lisfindocs.prototype.schema.tree
                    ).toObject();
                    olisfindocs_item = olisfindocs_item.items[0];
                    //
                    lis.objectMove(myfin002_item, olisfindocs_item);
                    olisfindocs_item.acctype = "G";
                    olisfindocs_item.account = myAccount;
                    olisfindocs_item.glaccount = olisfindocs_item.account;

                    // fetch stext for account
                    let myAtext = await lisaccounts.findOne({
                        company: plissaldocs.company,
                        acctype: olisfindocs_item.acctype,
                        account: olisfindocs_item.account,
                    });
                    olisfindocs_item.atext = myAtext?.stext;
                    //-------------------------

                    if (myfin002_item.postway == false) {
                        olisfindocs_item.ddebit =
                            mySalItem[myfin002_item.valuefield];
                    } else {
                        olisfindocs_item.dcredit =
                            mySalItem[myfin002_item.valuefield];
                    }
                    olisfindocs_item.currency = plissaldocs.currency;
                    olisfindocs_item.curdate = plissaldocs.curdate;
                    olisfindocs_item.currate = plissaldocs.currate;

                    olisfindocs.items.push(olisfindocs_item);
                }
            }
        }
    }

    olisfindocs = await this.calcBalanceOfDoc(olisfindocs, lis);

    return olisfindocs;
}
