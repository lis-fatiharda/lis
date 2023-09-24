export default async function ctrlInvFromSal(pLissaldocs, pMod) {

    let olissal001 = await lissal001.findOne({
        company: pLissaldocs.company,
        doctype: pLissaldocs.doctype,
    });

    let olisinvdocsOld = await lisinvdocs.findOne({ company: pLissaldocs.company, saldoctype: pLissaldocs.doctype, saldocnum: pLissaldocs.docnum, _deleted: false });

    if ((pLissaldocs.deltype == 2 & pLissaldocs._deleted == false) |
        (pLissaldocs.deltype == 4 & pLissaldocs._deleted == true)) {
        for (let i in pLissaldocs.items) {



            const olisinv006 = await this.ctrlMoveCode(
                pLissaldocs.company,
                pLissaldocs.items[i].material,
                olissal001.movecode,
                pLissaldocs.items[i].itemtype,
                pLissaldocs.items[i].specialstock
            );


            //--- Calculate skquantity -


            let mySkquantity = await this.calcSkquantity(
                pLissaldocs.company,
                pLissaldocs.items[i].material,
                pLissaldocs.items[i].quantity,
                pLissaldocs.items[i].qunit
            );

            if (olisinvdocsOld != null) {
                var olisinvdocsOldItem = olisinvdocsOld.items.filter(e => {
                    return e.plant == pLissaldocs.items[i].plant & e.warehouse == pLissaldocs.items[i].warehouse & e.stockplace == pLissaldocs.items[i].stockplace &
                        e.specialstock == pLissaldocs.items[i].specialstock & e.batchnum == pLissaldocs.items[i].batchnum
                })
            }

            let ctrlQuantity = mySkquantity - olisinvdocsOldItem?.skquantity;

            await this.checkAvailibility(
                pLissaldocs.company,
                pLissaldocs.items[i].plant,
                pLissaldocs.items[i].warehouse,
                pLissaldocs.items[i].stockplace,
                pLissaldocs.items[i].specialstock,
                pLissaldocs.items[i].batchnum,

                olisinv006.fromstocktype,
                pLissaldocs.validfrom,
                pLissaldocs.items[i].material,
                pLissaldocs.items[i].variant,
                ctrlQuantity
            );

        }
    }



    return true;
}
