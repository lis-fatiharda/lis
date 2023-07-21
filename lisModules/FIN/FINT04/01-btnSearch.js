
export default async function (dv) {


    dv.reportList = [];
    let accList = await lisaccounts
        .find({
            acctype: "G",
            account: lis.like(dv.sc.account),
            glaccount: lis.like(dv.sc.glaccount),
            _deleted: false,
        })
        .catch((err) => console.log(err));

    accList.sort((a, b) => {
        if (a.account > b.account) return 1;
        if (a.account < b.account) return -1;
    });

    for (let i in accList) {
        let myAccount = accList[i];

        let accountPast = await lisfindocs.aggregate([
            {
                $unwind: "$items",
            },
            {
                $match: {
                    company: myAccount.company,
                    //   busarea: myAccount.busarea,
                    //   acctype: myAccount.acctype,
                    "items.account": lis.like(myAccount.account),
                    "items.glaccount": lis.like(myAccount.glaccount),

                    docdate: {
                        $lt: dv.sc.datefrom,
                    },

                    _deleted: false,
                },
            },
            {
                $group: {
                    _id: "$items.company",
                    debit: { $sum: "$items.hdebit" },
                    credit: { $sum: "$items.hcredit" },
                },
            },
        ]);
        
        let accountCurrent = await lisfindocs.aggregate([
            {
                $unwind: "$items",
            },
            {
                $match: {
                    company: myAccount.company,
                    //   busarea: myAccount.busarea,
                    //   acctype: myAccount.acctype,
                    //"items.account": { $regex: myAccount.account + ".*" },
                    //"items.glaccount": { $regex: myAccount.glaccount + ".*" },
                    "items.account": lis.like(myAccount.account),
                    "items.glaccount": lis.like(myAccount.glaccount),
                    docdate: {
                        $gte: new Date(dv.sc.datefrom),
                        $lte: new Date(dv.sc.dateuntil),
                    },

                    _deleted: false,
                },
            },
            {
                $group: {
                    _id: "$items.company",
                    debit: { $sum: "$items.hdebit" },
                    credit: { $sum: "$items.hcredit" },
                },
            },
        ]);

        if (myAccount.acclevel == 0) {
            myAccount._bgColor = "#e0f7fa";
        }
        if (myAccount.acclevel == 1) {
            myAccount._bgColor = "#fff8e1";
        }

        dv.reportList.push({
            account: myAccount.account,
            glaccount: myAccount.glaccount,
            stext: myAccount.stext,
            xdebit:
                accountPast[0]?.debit == undefined ? 0 : accountPast[0]?.debit,
            xcredit:
                accountPast[0]?.credit == undefined
                    ? 0
                    : accountPast[0]?.credit,

            xbalancedebit:
                accountPast[0]?.debit > accountPast[0]?.credit
                    ? accountPast[0]?.debit - accountPast[0]?.credit
                    : 0,

            xbalancecredit:
                accountPast[0]?.credit > accountPast[0]?.debit
                    ? accountPast[0]?.credit - accountPast[0]?.debit
                    : 0,

            //-----

            debit:
                accountCurrent[0]?.debit == undefined
                    ? 0
                    : accountCurrent[0]?.debit,
            credit:
                accountCurrent[0]?.credit == undefined
                    ? 0
                    : accountCurrent[0]?.credit,

            balancedebit:
                accountCurrent[0]?.debit > accountCurrent[0]?.credit
                    ? accountCurrent[0]?.debit - accountCurrent[0]?.credit
                    : 0,

            balancecredit:
                accountCurrent[0]?.credit > accountCurrent[0]?.debit
                    ? accountCurrent[0]?.credit - accountCurrent[0]?.debit
                    : 0,

            //-----

            

            _bgColor: myAccount._bgColor,
        });
    }

    dv.reportList.map((e) => {
        e.tdebit = e.xdebit + e.debit;
        e.tcredit = e.xcredit + e.credit;

        if (e.tdebit > e.tcredit) {
            e.tbalancedebit = e.tdebit - e.tcredit;
            e.tbalancecredit = 0;   
        } else {
            e.tbalancecredit = e.tcredit - e.tdebit;
            e.tbalancedebit = 0; 
        }
    });

    return dv;
}
