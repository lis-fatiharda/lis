// This function is login button of login component
// ? pMod: 0: New | 1: Edit | 2: Show | 3: Delete

export default async function saveMovement(pLisinvdocs, pMovecode, pMod) {

        // Controls before save --------------------------------

        for (let i in pLisinvdocs.items) {
            await this.ctrlMaterialForMove(
                pLisinvdocs.company,
                pLisinvdocs.items[i]
            );

            const olisinv006 = await this.ctrlMoveCode(
                pLisinvdocs.company,
                pLisinvdocs.items[i].material,
                pMovecode,
                pLisinvdocs.items[i].specialstock
            );

            //--- Assign doctype-
            pLisinvdocs.doctype = olisinv006.doctype;

            //--- Assign stocktypes-
            if (pLisinvdocs.items[i].postway == false) {
                pLisinvdocs.items[i].stocktype = olisinv006.tostocktype;
            } else {
                pLisinvdocs.items[i].stocktype = olisinv006.fromstocktype;
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

        let lisinvdocsSave = new lisinvdocs(pLisinvdocs);

        await lisinvdocsSave.save();

        // Update lisinvstocks ---------------------------------

        await this.updLisinvStocks(pLisinvdocs, pMovecode);
    }
    if (pMod == 1) {
        
        const olisinvdocsOld = await lisinvdocs.findOne({
            company: pLisinvdocs.company,
            doctype: pLisinvdocs.doctype,
            docnum: pLisinvdocs.docnum,
        });

        let lisinvdocsSave = new lisinvdocs(pLisinvdocs);

        await lisinvdocs.findOneAndUpdate(
            { _id: olisinvdocsOld._id },
            lisinvdocsSave
        );

        await this.updLisinvStocks(pLisinvdocs, pMovecode, olisinvdocsOld);

    }
    
    if (pMod == 3) {
    }
    return pLisinvdocs;
}
