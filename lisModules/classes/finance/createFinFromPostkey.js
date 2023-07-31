
export default async function ({plisfindocs, cv}) { 

   

    plisfindocs.items = [];

 
    const olisfin002 = await lisfin002.findOne({ company: plisfindocs.company, postkey: cv.postkey })

        for (let k in olisfin002.items) {
            const myfin002_item = olisfin002.items[k];

            if (myfin002_item.acctype == "C") {

                if (plisfindocs.items.findIndex((x) => x.acctype == "C") > -1) {
                    let myRow = plisfindocs.items.findIndex((x) => x.acctype == "C");

                    if (myfin002_item.postway == false) {
                        plisfindocs.items[myRow].ddebit +=
                            cv[myfin002_item.valuefield];
                    } else {
                        plisfindocs.items[myRow].dcredit +=
                            cv[myfin002_item.valuefield];
                    }
                    

                } else { 

                    // create new lisfindocs_item
                    let plisfindocs_item = (new lisfindocs(lisfindocs.prototype.schema.tree)).toObject();
                    plisfindocs_item = plisfindocs_item.items[0];
                    //
                    lis.objectMove(myfin002_item, plisfindocs_item);

                    let oliscustomers = await liscustomers.findOne({ company: plisfindocs.company, customer: cv.customer })
                    let olisaccounts = await lisaccounts.findOne({ company: oliscustomers.company, acctype: oliscustomers.acctype, account: oliscustomers.account, _deleted: false })
                    plisfindocs_item.acctype = olisaccounts.acctype;
                    plisfindocs_item.account = olisaccounts.account;
                    plisfindocs_item.glaccount = olisaccounts.glaccount;
                    plisfindocs_item.atext = olisaccounts.stext;
                    plisfindocs_item.currency = cv.currency;
                    plisfindocs_item.currate = cv.currate;
                    

                    if (myfin002_item.postway == false) {
                        plisfindocs_item.ddebit = cv[myfin002_item.valuefield];
                    } else {
                        plisfindocs_item.dcredit = cv[myfin002_item.valuefield];
                    }

                    plisfindocs_item.currency = cv.currency;
                    plisfindocs_item.curdate = cv.curdate;
                    plisfindocs_item.currate = cv.currate;

                    plisfindocs.items.push(plisfindocs_item);

                }

                

            }
            if (myfin002_item.acctype == "G") {

                let myAccount = await this.fetchAccount(cv, myfin002_item, plisfindocs);

                if (plisfindocs.items.findIndex((x) => x.account == myAccount) > -1) {
                    let myRow = plisfindocs.items.findIndex((x) => x.account == myAccount);

                    if (myfin002_item.postway == false) {
                        plisfindocs.items[myRow].ddebit +=
                            cv[myfin002_item.valuefield];
                    } else {
                        plisfindocs.items[myRow].dcredit +=
                            cv[myfin002_item.valuefield];
                    }

                } else {

                    // create new lisfindocs_item
                    let plisfindocs_item = new lisfindocs(lisfindocs.prototype.schema.tree).toObject();
                    plisfindocs_item = plisfindocs_item.items[0];
                //
                    lis.objectMove(myfin002_item, plisfindocs_item);
                    plisfindocs_item.acctype = 'G';
                    plisfindocs_item.account = myAccount;
                    plisfindocs_item.glaccount = plisfindocs_item.account;

                    // fetch stext for account
                    let myAtext = await lisaccounts.findOne({ company: plisfindocs.company, acctype: plisfindocs_item.acctype, account: plisfindocs_item.account })
                    plisfindocs_item.atext = myAtext?.stext;
                    //-------------------------


                    if (myfin002_item.postway == false) {
                        plisfindocs_item.ddebit = cv[myfin002_item.valuefield];
                    } else {
                        plisfindocs_item.dcredit = cv[myfin002_item.valuefield];
                    }
                    plisfindocs_item.currency = cv.currency;
                    plisfindocs_item.curdate = cv.curdate;
                    plisfindocs_item.currate = cv.currate;

                    plisfindocs.items.push(plisfindocs_item);
                    
                }
            }


        }

    

    plisfindocs = await this.calcBalanceOfDoc(plisfindocs, lis);

    return plisfindocs;
}