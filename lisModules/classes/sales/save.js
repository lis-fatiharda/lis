// ? modi: -1 = create new document by reference
// ?        0 = create new document
// ?        1 - update the document

export default async function save(plissaldocs, pModi) {


    const olissal001 = await lissal001.findOne({
        company: plissaldocs.company,
        doctype: plissaldocs.doctype,
    });

    // Controls before Save ****************
    for (let i in plissaldocs.items) {
        
        if (olissal001.deltype > 0) {
            await Inventory.ctrlMaterialForMove(
                plissaldocs.company,
                plissaldocs.items[i]
            )
            await Inventory.ctrlMoveCode(
                plissaldocs.company,
                plissaldocs.items[i].material,
                olissal001.movecode,
                plissaldocs.items[i].specialstock
            );
        }

        if (plissaldocs.items[i].quantity <= 0)
            throw new Error(
                `Lütfen ${plissaldocs.items[i].itemnum} No'lu kalem için Miktar Giriniz!`
            );

        const olisbas009 = await lisbas009.findOne({
            company: plissaldocs.company,
            mattype: plissaldocs.items[i].mattype,
        });

        if (olisbas009 == null) throw new Error("Malzeme Tipi Bulunamadı!");

        const olissal002 = await lissal002.findOne({
            company: plissaldocs.company,
            doctype: plissaldocs.doctype,
            itemtype: plissaldocs.items[i].itemtype
        });

        if (olissal002 == null) throw new Error("Kalem Tipi Bulunamadı!");
    }
    // Control reference document
    await this.ctrlChildDocForDel(plissaldocs)

    await this.ctrlRefDocument(plissaldocs)

    // Update reference document
    await this.updRefDocument(plissaldocs)
    plissaldocs = await this.removeDeletedItems(plissaldocs);

    // CTRL for lisfindoc*********************

    if (plissaldocs.isfinance == true) {
        let isHaveFinDoc = lisfindocs.find({
            company: plissaldocs.company,
            saldoctype: plissaldocs.doctype,
            saldocnum: plissaldocs.docnum,
            _deleted: false,
        });

        if (isHaveFinDoc.length <= 0) plissaldocs.isfinance = false;
    }

    // Save the Document*********************

    if (pModi <= 0) {
        // Get Document Number

        plissaldocs.docnum = await Numrange.getNewNumber({
            company: olissal001.company,
            numrange: olissal001.numrange,
        })

        // Save the Document
        plissaldocs._id = undefined;
        const olissaldocs = new lissaldocs(plissaldocs);
        await olissaldocs.save().catch((err) => {
            throw new Error(err);
        });

    } else {
        // Save the Document
        await lissaldocs
            .findOneAndUpdate({ _id: plissaldocs._id }, plissaldocs, {
                new: true,
                upsert: true,
            })
            .catch((err) => {
                throw new Error(err);
            });
    }
    // Update Inventory Document
    if ((olissal001.deltype == 2) | (olissal001.deltype == 4)) {
        await Inventory.createInvFromSal(plissaldocs, pModi);
    }


    return plissaldocs;
}
