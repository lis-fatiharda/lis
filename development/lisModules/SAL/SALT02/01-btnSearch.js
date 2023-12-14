import getChildren from "./getChildren.js";
import getRoots from "./getRoots.js";

export default async function (dv) {
  let olissaldocs = await lissaldocs.aggregate([
    { $unwind: "$items" },
    {
      $match: {
        company: lis.like(dv.sc.company),
        busarea: lis.like(dv.sc.busarea),
        doctype: lis.like(dv.sc.doctype),
        docnum: lis.like(dv.sc.docnum),
        "items.itemnum":
          dv.sc.itemnum == 0 ? { $gte: 0 } : parseInt(dv.sc.itemnum),
      },
    },
  ]);

  dv.itemFlowList = [];
  console.log("olissaldocs", olissaldocs);

  for (let a in olissaldocs) {
    let firstRoot = olissaldocs[a];
    let firstRootRef = {};
    let myItem1 = [];
    let counter = 4;
    firstRootRef = firstRoot;
    // find the first root documen items
    while (counter > 0) {
      console.log("counter", counter);
      firstRoot = await getRoots(
        firstRoot.company,
        firstRoot.busarea,
        firstRoot.items.refdoctype,
        firstRoot.items.refdocnum,
        firstRoot.items.refitemnum
      );

      if (firstRoot == false) {
        break;
      } else {
        firstRootRef = firstRoot;

        counter--;
      }
    }

    myItem1 = firstRootRef;

    const myItem2 = await getChildren(
      myItem1.company,
      myItem1.busarea,
      myItem1.doctype,
      myItem1.docnum,
      myItem1.items.itemnum
    );
    if (myItem2.length > 0) {
      myItem1.children = myItem2;

      for (let b in myItem2) {
        let myItem3 = await getChildren(
          myItem2[b].company,
          myItem2[b].busarea,
          myItem2[b].doctype,
          myItem2[b].docnum,
          myItem2[b].items.itemnum
        );

        if (myItem3.length > 0) {
          myItem2[b].children = myItem3;

          for (let c in myItem3) {
            let myItem4 = await getChildren(
              myItem3[c].company,
              myItem3[c].busarea,
              myItem3[c].doctype,
              myItem3[c].docnum,
              myItem3[c].items.itemnum
            );

            if (myItem4.length > 0) {
              myItem3[c].children = myItem4;
            }
          }
        }
      }
    }

    dv.itemFlowList.push(myItem1);
    console.log("dv.itemFlowList", dv.itemFlowList);
  }

  return dv;
}
