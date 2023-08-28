// This function is login button of login component
// ? pMod: 0: New | 1: Edit | 2: Show | 3: Delete

export default async function saveMovement(pLisinvdocs, pMovecode, pMod) {
    // Controls before save --------------------------------

    let olisinvdocsOld = {};

    for (let i in pLisinvdocs.items) {
        await this.ctrlMaterialForMove(
            pLisinvdocs.company,
            pLisinvdocs.items[i]
        );

        const olisinv006 = await this.ctrlMoveCode(
            pLisinvdocs.company,
            pLisinvdocs.items[i].material,
            pMovecode,
            pLisinvdocs.items[i].ordertype,
            pLisinvdocs.items[i].specialstock
        );

        //--- Assign doctype-
        pLisinvdocs.doctype = olisinv006.doctype;

        //--- Assign stocktypes-
        if (pLisinvdocs.items[i].postway == 0) {
            pLisinvdocs.items[i].stocktype = olisinv006.tostocktype;
        } else {
            pLisinvdocs.items[i].stocktype = olisinv006.fromstocktype;
        }

        //--- Calculate skquantity -

        const olismaterials = await lismaterials.findOne({
            company: pLisinvdocs.company,
            material: pLisinvdocs.items[i].material,
            _deleted: false
        });

        pLisinvdocs.items[i].skunit = olismaterials.skunit;
        pLisinvdocs.items[i].skquantity = await this.calcSkquantity(
            pLisinvdocs.company,
            pLisinvdocs.items[i].material,
            pLisinvdocs.items[i].quantity,
            pLisinvdocs.items[i].qunit
        );

        //--- Check availibility of material-

        if (pLisinvdocs.items[i].postway == 1) {
            await this.checkAvailibility(
                pLisinvdocs.company,
                pLisinvdocs.items[i].plant,
                pLisinvdocs.items[i].warehouse,
                pLisinvdocs.items[i].stockplace,
                pLisinvdocs.items[i].specialstock,
                pLisinvdocs.items[i].batchnum,

                pLisinvdocs.items[i].stocktype,
                pLisinvdocs.docdate,
                pLisinvdocs.items[i].material,
                pLisinvdocs.items[i].variant,
                pLisinvdocs.items[i].skquantity
            );
        }
    }
    if (pMod <= 0) {
        // Get Document Number ---------------------------------------

        const olisinv007 = await lisinv007.findOne({
            company: pLisinvdocs.company,
            doctype: pLisinvdocs.doctype,
        });

        pLisinvdocs.docnum = await Numrange.getNewNumber({
            company: pLisinvdocs.company,
            numrange: olisinv007.numrange,
        });

        // Save Movement ---------------------------------------

        await lisinvdocs.create(pLisinvdocs);

        // Update lisinvstocks ---------------------------------
    }
    if (pMod == 1) {
        olisinvdocsOld = await lisinvdocs.findOne({ _id: pLisinvdocs._id });

        let lisinvdocsSave = new lisinvdocs(pLisinvdocs);

        await lisinvdocs.findOneAndUpdate(
            { _id: pLisinvdocs._id },
            lisinvdocsSave
        );
    }

    if (pMod == 3) {
    }

    await this.updLisinvStocks(pLisinvdocs, olisinvdocsOld);
    return pLisinvdocs;
}
