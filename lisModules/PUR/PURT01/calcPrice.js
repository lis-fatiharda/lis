export default function calcPrice(pPurDoc) {
    pPurDoc.gross = 0;
    pPurDoc.discamnt = 0;
    pPurDoc.subtotal = 0;
    pPurDoc.vatamnt = 0;
    pPurDoc.grandtotal = 0;
    pPurDoc.vats = [];
    var grandTotalBeforeDisc = 0;
    var grossBeforeDisc = 0;
    var tmpGross = 0;

    for (let i in pPurDoc.items) {
        let myPuritem = pPurDoc.items[i];
        //gross
        tmpGross =
            Math.round(
                myPuritem.quantity * (myPuritem.price / myPuritem.punit) * 100
            ) / 100;
        grossBeforeDisc += tmpGross;
        //vatamnt
        grandTotalBeforeDisc +=
            Math.round(tmpGross + tmpGross * (myPuritem.vatrate / 100) * 100) /
            100;
    }

    for (let i in pPurDoc.items) {
        let myPuritem = pPurDoc.items[i];
        //gross
        myPuritem.gross =
            Math.round(
                myPuritem.quantity * (myPuritem.price / myPuritem.punit) * 100
            ) / 100;
        pPurDoc.gross =
            Math.round((pPurDoc.gross + myPuritem.gross) * 100) / 100;
        //discount from Head

        myPuritem.subtotal = myPuritem.gross;

        myPuritem.discamnthead = 0;
        myPuritem.discamnt = 0;

        for (let k in pPurDoc.discount) {
            let kDisc = pPurDoc.discount[k];

            if (kDisc.type == 0) {
                kDisc.amnt =
                    Math.round(myPuritem.subtotal * (kDisc.rate / 100) * 100) /
                    100;
                myPuritem.discamnthead += kDisc.amnt;
                myPuritem.subtotal += kDisc.amnt;
            }
            if (kDisc.type == 1) {
            }
            if (kDisc.type == 2) {
                kDisc.amnt = kDisc.rate;
                myPuritem.discamnthead += kDisc.amnt;
                myPuritem.subtotal += kDisc.amnt;
            }
            if (kDisc.type == 3) {
                kDisc.amnt = Math.round(kDisc.rate * myPuritem.quantity);
            }
        }

        myPuritem.discamnt = myPuritem.discamnthead;

        //discount

        for (let p in myPuritem.discount) {
            let kDisc = myPuritem.discount[p];
            if (kDisc.type == 0) {
                kDisc.amnt =
                    Math.round(myPuritem.subtotal * (kDisc.rate / 100) * 100) /
                    100;
                myPuritem.discamnt += kDisc.amnt;
                myPuritem.subtotal += kDisc.amnt;
            }
            if (kDisc.type == 1) {
            }
            if (kDisc.type == 2) {
                kDisc.amnt = kDisc.rate;
                myPuritem.discamnt += kDisc.rate;
                mySalitem.subtotal += kDisc.amnt;
            }
            if (kDisc.type == 3) {
                kDisc.amnt =
                    Math.round(kDisc.rate * myPuritem.quantity);
                myPuritem.discamnt += kDisc.amnt;
                myPuritem.subtotal += kDisc.amnt;
            }
        }

        pPurDoc.discamnt += myPuritem.discamnt;
        //subtotal

        pPurDoc.subtotal =
            Math.round((pPurDoc.subtotal + myPuritem.subtotal) * 100) / 100;

        //vatamnt
        myPuritem.vatamnt =
            Math.round(myPuritem.subtotal * (myPuritem.vatrate / 100) * 100) /
            100;

        pPurDoc.vatamnt =
            Math.round((pPurDoc.vatamnt + myPuritem.vatamnt) * 100) / 100;

        var isVatFound = false;

        for (let x in pPurDoc.vats) {
            let myVats = pPurDoc.vats[x];
            if (myVats.vatrate == myPuritem.vatrate) {
                isVatFound = true;
                myVats.subtotal += myPuritem.subtotal;
                myVats.vatamnt += myPuritem.vatamnt;
                break;
            }
        }
        if (isVatFound == false) {
            pPurDoc.vats.push({
                subtotal: myPuritem.subtotal,
                vatrate: parseInt(myPuritem.vatrate),
                vatamnt: myPuritem.vatamnt,
            });
        }

        //grandtotal

        myPuritem.grandtotal =
            Math.round((myPuritem.subtotal + myPuritem.vatamnt) * 100) / 100;
        pPurDoc.grandtotal =
            Math.round((pPurDoc.grandtotal + myPuritem.grandtotal) * 100) / 100;
    }

    return pPurDoc;
}
