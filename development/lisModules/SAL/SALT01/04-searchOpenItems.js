
export default async function (dv) {
    const olissal004 = await lissal004.find(
        {
            company: dv.lissaldocs.company,
            todoctype: dv.lissaldocs.doctype,
        },
        { fromdoctype: 1 }
    );

    var refDocs = [];

    for (let i in olissal004) {
        refDocs.push(olissal004[i].fromdoctype);
    }

    let openItems = await lissaldocs
        .aggregate([
            { $unwind: "$items" },
            {
                $match: {
                    customer: dv.lissaldocs.customer,
                    _deleted: false,
                    $and: [
                        { doctype: { $in: refDocs } },
                        {
                            doctype: lis.like(dv.sc.doctype),
                        },
                      { "items.stat": { $lt: 2 } },
                      //  {"items.quantity": { $gt: "$items.pquantity"}}
                    ],

                    docnum: lis.like(dv.sc.docnum),

                    docstat: { $lt: 2 },
                },
            },

            { $project: { doctype: 1, docnum: 1, items: 1 } },
        ])
        .catch((err) => {
          throw new Error(err.message);
        });

    console.log("openItems");
    console.log(openItems);

    let openItemsReturn = [];

    for (let i in openItems) {
        if (
            (openItems[i].items.stat < 2) &
            (openItems[i].items.quantity > openItems[i].items.pquantity)
        ) {
            openItems[i].items.refdoctype = openItems[i].doctype;
            openItems[i].items.refdocnum = openItems[i].docnum;
            openItems[i].items.refitemnum = openItems[i].items.itemnum;
            openItems[i].items.quantity =
                openItems[i].items.quantity - openItems[i].items.pquantity;
            openItemsReturn.push(openItems[i].items);
        }
    }
    console.log("openItemsReturn");
    console.log(openItemsReturn);
    return openItemsReturn;
}
