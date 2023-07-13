export default async function (dv) {
    dv.reportList = await lisaccounts
        .find({
            company: lis.like(dv.sc.company),
            acctype: lis.like(dv.sc.acctype),
            account: lis.like(dv.sc.account),
            stext: lis.like(dv.sc.stext),
            currency: lis.like(dv.sc.currency),
            glaccount: lis.like(dv.sc.glaccount),
            accclass: lis.like(dv.sc.accclass),
            accgrp: lis.like(dv.sc.accgrp),
            acclevel: dv.sc.acclevel == 99 ? { $gte: 0 } : dv.sc.acclevel,
            _deleted: dv.sc._deleted,
        })
        .catch((err) => console.log(err));

    dv.reportList.sort((a, b) => {
        if (a.account > b.account) return 1;
        if (a.account < b.account) return -1;
    });

    return dv;
}
