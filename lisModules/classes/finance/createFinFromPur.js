
export default async function (plispurdocs) {
    const oliscustomers = await liscustomers.findOne({
        company: plispurdocs.company,
        customer: plispurdocs.vendor,
        _deleted: false,
    });
    const olisaccounts = await lisaccounts.findOne({
        company: oliscustomers.company,
        acctype: oliscustomers.acctype,
        account: oliscustomers.account,
        _deleted: false,
    });
    if (olisaccounts == undefined) throw new Error("Cari Hesap Bulunamadı!");
    let olisfindocs = lis.objectNew('lisfindocs');
    const olispur001 = await lispur001.findOne({
        company: plispurdocs.company,
        doctype: plispurdocs.doctype,
    });

    if (olispur001.findoctype.length <= 0)
        throw new Error("Muhasebe Belgesi Tanımlı Değil!");
    lis.objectMove(plispurdocs, olisfindocs);
    olisfindocs.doctype = olispur001.findoctype;
    olisfindocs.docnum = "";
    olisfindocs.purdoctype = plispurdocs.doctype;
    olisfindocs.purdocnum = plispurdocs.docnum;

    olisfindocs.items = [];

    for (let i in plispurdocs.items) {
        let mypurItem = plispurdocs.items[i];

        const olispur002 = await lispur002.findOne({
            company: plispurdocs.company,
            doctype: plispurdocs.doctype,
            itemtype: mypurItem.itemtype,
        });
        if (olispur002 == null) throw new Error(`Kalem Tipi Bulunamadı!`);
        const olisfin002 = await lisfin002.findOne({
            company: olispur002.company,
            postkey: olispur002.postkey,
        });

        if (olisfin002 == null) throw new Error("Muhasebe Belgesi Bulunamadı!");
        for (let k in olisfin002.items) {
            const myfin002_item = olisfin002.items[k];

            if (myfin002_item.acctype == "C") {
                if (olisfindocs.items.findIndex((x) => x.acctype == "C") > -1) {
                    let myRow = olisfindocs.items.findIndex(
                        (x) => x.acctype == "C"
                    );

                    if (myfin002_item.postway == 0) {
                        olisfindocs.items[myRow].ddebit +=
                            mypurItem[myfin002_item.valuefield];
                    } else {
                        olisfindocs.items[myRow].dcredit +=
                            mypurItem[myfin002_item.valuefield];
                    }
                } else {
                    // create new lisfindocs_item
                    let olisfindocs_item = lis.objectNew('lisfindocs.items');
                    //
                    lis.objectMove(myfin002_item, olisfindocs_item);
                    
                    olisfindocs_item.acctype = olisaccounts.acctype;
                    olisfindocs_item.account = olisaccounts.account;
                    olisfindocs_item.glaccount = olisaccounts.glaccount;
                    olisfindocs_item.atext = olisaccounts.stext;

                    if (myfin002_item.postway == 0) {
                        olisfindocs_item.ddebit =
                            mypurItem[myfin002_item.valuefield];
                    } else {
                        olisfindocs_item.dcredit =
                            mypurItem[myfin002_item.valuefield];
                    }

                    olisfindocs_item.currency = plispurdocs.currency;
                    olisfindocs_item.curdate = plispurdocs.curdate;
                    olisfindocs_item.currate = plispurdocs.currate;

                    olisfindocs.items.push(olisfindocs_item);
                }
            }
            if (myfin002_item.acctype == "G") {
                let myAccount = await this.fetchAccount(
                    mypurItem,
                    myfin002_item,
                    plispurdocs
                );

                if (
                    olisfindocs.items.findIndex((x) => x.account == myAccount) >
                    -1
                ) {
                    let myRow = olisfindocs.items.findIndex(
                        (x) => x.account == myAccount
                    );

                    if (myfin002_item.postway == 0) {
                        olisfindocs.items[myRow].ddebit +=
                            mypurItem[myfin002_item.valuefield];
                    } else {
                        olisfindocs.items[myRow].dcredit +=
                            mypurItem[myfin002_item.valuefield];
                    }
                } else {
                    // create new lisfindocs_item
                    let olisfindocs_item = lis.objectNew('lisfindocs.items');
                    //
                    lis.objectMove(myfin002_item, olisfindocs_item);
                    olisfindocs_item.acctype = "G";
                    olisfindocs_item.account = myAccount;
                    olisfindocs_item.glaccount = olisfindocs_item.account;

                    // fetch stext for account
                    let myAtext = await lisaccounts.findOne({
                        company: plispurdocs.company,
                        acctype: olisfindocs_item.acctype,
                        account: olisfindocs_item.account,
                    });
                    olisfindocs_item.atext = myAtext?.stext;
                    //-------------------------

                    if (myfin002_item.postway == 0) {
                        olisfindocs_item.ddebit =
                            mypurItem[myfin002_item.valuefield];
                    } else {
                        olisfindocs_item.dcredit =
                            mypurItem[myfin002_item.valuefield];
                    }
                    olisfindocs_item.currency = plispurdocs.currency;
                    olisfindocs_item.curdate = plispurdocs.curdate;
                    olisfindocs_item.currate = plispurdocs.currate;

                    if (mypurItem[myfin002_item.valuefield] > 0) {
                        olisfindocs.items.push(olisfindocs_item);
                    }
                }
            }
        }
    }

    olisfindocs = await this.calcBalanceOfDoc(olisfindocs, lis);

    return olisfindocs;
}
