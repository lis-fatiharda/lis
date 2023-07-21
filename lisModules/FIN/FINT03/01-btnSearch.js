export default async function (dv) {
  dv.reportList = await lisfindocs
    .aggregate([
      { $unwind: "$items" },
      {
        $match: {
          company: lis.like(dv.sc.company),

          docdate: {
            $gte: new Date(dv.sc.datefrom),
            $lte: new Date(dv.sc.dateuntil),
          },

          "items.acctype": lis.like(dv.sc.acctype),
          "items.account": lis.like(dv.sc.account),
          "items.glaccount": lis.like(dv.sc.glaccount),
          _deleted: false,
        },
      },
      { $sort: { postdate: 1 } },
    ])
    .catch((err) => console.log(err));

  let dcurrsum = {};
  let hcurrsum = { debit: 0, credit: 0, diff: 0 };
  for (let i in dv.reportList) {
    let myItem = dv.reportList[i];

    if (dcurrsum[myItem.items.currency] == undefined)
      dcurrsum[myItem.items.currency] = { debit: 0, credit: 0, diff: 0 };

    dcurrsum[myItem.items.currency].debit += myItem.items.ddebit;
    dcurrsum[myItem.items.currency].credit += myItem.items.dcredit;

    dcurrsum[myItem.items.currency].diff +=
      myItem.items.ddebit - myItem.items.dcredit;

    myItem.items.ddiff = Math.abs(dcurrsum[myItem.items.currency].diff);
    myItem.items.dpostway =
      dcurrsum[myItem.items.currency].diff > 0 ? "Borç" : "Alacak";

    //--

    hcurrsum.debit += myItem.items.hdebit;
    hcurrsum.credit += myItem.items.hcredit;

    hcurrsum.diff += myItem.items.hdebit - myItem.items.hcredit;
    myItem.items.hdiff = Math.abs(hcurrsum.diff);
    myItem.items.hpostway = hcurrsum.diff > 0 ? "Borç" : "Alacak";
  }

  for (let i in dcurrsum) {
    dv.reportList.push({
      items: {
        itemnum: "",
        stext: `${i} İşlem Top.`,
        currate: "",
        ddebit: dcurrsum[i].debit,
        dcredit: dcurrsum[i].credit,
        ddiff: Math.abs(dcurrsum[i].debit - dcurrsum[i].credit),
        currency: i,
        dpostway:
          dcurrsum[i].debit - dcurrsum[i].credit > 0 ? "Borç" : "Alacak",
        hdebit: hcurrsum.debit,
        hcredit: hcurrsum.credit,
        hdiff: Math.abs(hcurrsum.debit - hcurrsum.credit),

        hpostway: hcurrsum.debit - hcurrsum.credit > 0 ? "Borç" : "Alacak",
      },
      _bgColor: "#e8eaf6",
    });
  }

  return dv;
}
