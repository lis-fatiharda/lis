export default function calcPrice(pSalDoc) {
    pSalDoc.gross = 0;
    pSalDoc.discamnt = 0;
    pSalDoc.subtotal = 0;
    pSalDoc.vatamnt = 0;
    pSalDoc.grandtotal = 0;
    pSalDoc.vats = [];
  //  var grandTotalBeforeDisc = 0; 
  //  var grossBeforeDisc = 0;
  //  var tmpGross = 0;
//
  //  for (let i in pSalDoc.items) {
  //      let mySalitem = pSalDoc.items[i];
  //      //gross 
  //      tmpGross =
  //          Math.round(
  //              mySalitem.quantity * (mySalitem.price / mySalitem.punit) * 100
  //          ) / 100;
  //      grossBeforeDisc += tmpGross;
  //      //vatamnt
  //      grandTotalBeforeDisc +=
  //          Math.round(tmpGross + tmpGross * (mySalitem.vatrate / 100) * 100) /
  //          100;
  //  }

    for (let i in pSalDoc.items) {
        let mySalitem = pSalDoc.items[i];
        //gross
        mySalitem.gross =
            Math.round(
                mySalitem.quantity * (mySalitem.price / mySalitem.punit) * 100
            ) / 100;
        pSalDoc.gross =
            Math.round((pSalDoc.gross + mySalitem.gross) * 100) / 100;
        //discount from Head

        mySalitem.subtotal = mySalitem.gross;

        mySalitem.discamnthead = 0;
        mySalitem.discamnt = 0;

        for (let k in pSalDoc.discount) {
            let kDisc = pSalDoc.discount[k];

            if (kDisc.type == 0) {
                kDisc.amnt =
                    Math.round(mySalitem.subtotal * (kDisc.rate / 100) * 100) /
                    100;
                mySalitem.discamnthead += kDisc.amnt;
                mySalitem.subtotal += kDisc.amnt;
            }
            if (kDisc.type == 1) {
            }
            if (kDisc.type == 2) {
                kDisc.amnt = kDisc.rate;
                mySalitem.discamnthead += kDisc.amnt;
                mySalitem.subtotal += kDisc.amnt;
            }
            if (kDisc.type == 3) {
                kDisc.amnt =
                    Math.round(kDisc.rate * mySalitem.quantity);
            }
        }

        mySalitem.discamnt = mySalitem.discamnthead;

        //discount

        for (let p in mySalitem.discount) {
            let kDisc = mySalitem.discount[p];
            if (kDisc.type == 0) {
                kDisc.amnt =
                    Math.round(mySalitem.subtotal * (kDisc.rate / 100) * 100) /
                    100;
                mySalitem.discamnt += kDisc.amnt;
                mySalitem.subtotal += kDisc.amnt;
            }
            if (kDisc.type == 1) {
            }
            if (kDisc.type == 2) {
                kDisc.amnt = kDisc.rate;
                mySalitem.discamnt += kDisc.rate;
                mySalitem.subtotal += kDisc.amnt;
            }
            if (kDisc.type == 3) {
                kDisc.amnt =
                    Math.round(kDisc.rate * mySalitem.quantity);
                mySalitem.discamnt += kDisc.amnt;
                mySalitem.subtotal += kDisc.amnt;
            }
        }

        pSalDoc.discamnt += mySalitem.discamnt;
        //subtotal

        pSalDoc.subtotal =
            Math.round((pSalDoc.subtotal + mySalitem.subtotal) * 100) / 100;

        //vatamnt
        mySalitem.vatamnt =
            Math.round(mySalitem.subtotal * (mySalitem.vatrate / 100) * 100) /
            100;

        pSalDoc.vatamnt =
            Math.round((pSalDoc.vatamnt + mySalitem.vatamnt) * 100) / 100;

        var isVatFound = false;

        for (let x in pSalDoc.vats) {
            let myVats = pSalDoc.vats[x];
            if (myVats.vatrate == mySalitem.vatrate) {
                isVatFound = true;
                myVats.subtotal += mySalitem.subtotal;
                myVats.vatamnt += mySalitem.vatamnt;
                break;
            }
        }
        if (isVatFound == false) {
            pSalDoc.vats.push({
                subtotal: mySalitem.subtotal,
                vatrate: parseInt(mySalitem.vatrate),
                vatamnt: mySalitem.vatamnt,
            });
        }

        //grandtotal

        mySalitem.grandtotal =
            Math.round((mySalitem.subtotal + mySalitem.vatamnt) * 100) / 100;
        pSalDoc.grandtotal =
            Math.round((pSalDoc.grandtotal + mySalitem.grandtotal) * 100) / 100;
    }

    return pSalDoc;
}
