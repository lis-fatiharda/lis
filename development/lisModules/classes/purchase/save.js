// ? modi: -1 = create new document by reference
// ?        0 = create new document
// ?        1 - update the document

export default async function save(plispurdocs, pModi) {
    const olispur001 = await lispur001.findOne({
        company: plispurdocs.company,
        doctype: plispurdocs.doctype,
    });

    if (olispur001 == null) new Error("Belge Tipi Bulunamadı!");

    // Controls before Save ****************

    await this.ctrlAuthorization(plispurdocs, pModi);

    if ((plispurdocs.currency == null) | (plispurdocs.currency == "")) {
      throw new Error("Lütfen Para Birimini Giriniz!");
    }

    plispurdocs = await this.removeInvalidItems(plispurdocs);

    for (let i in plispurdocs.items) {
        if (olispur001.deltype > 0) {
            await Inventory.ctrlMaterialForMove(
                plispurdocs.company,
                plispurdocs.items[i]
            );

            await Inventory.ctrlMoveCode(
                plispurdocs.company,
                plispurdocs.items[i].material,
                olispur001.movecode,
                plispurdocs.items[i].itemtype,
                plispurdocs.items[i].specialstock
            );
        }


        if (plispurdocs.items[i].quantity <= 0)
          throw new Error(
                `Lütfen ${plispurdocs.items[i].itemnum} No'lu kalem için Miktar Giriniz!`
            );
        const olisbas009 = await lisbas009.findOne({
            company: plispurdocs.company,
            mattype: plispurdocs.items[i].mattype,
        });

        if (olisbas009 == null) new Error("Malzeme Tipi Bulunamadı!");

        const olispur002 = await lispur002.findOne({
            company: plispurdocs.company,
            doctype: plispurdocs.doctype,
            itemtype: plispurdocs.items[i].itemtype,
        });

        if (olispur002 == null) new Error("Kalem Tipi Bulunamadı!");
    }
    // Control reference document
    await this.ctrlChildDocForDel(plispurdocs);

    await this.ctrlRefDocument(plispurdocs);

    // Control for stock movements

    if ((olispur001.deltype == 2) | (olispur001.deltype == 4)) {
        await Inventory.ctrlInvFromPur(plispurdocs, pModi);
    }

    // Update reference document

    await this.updRefDocument(plispurdocs);

    plispurdocs = await this.removeDeletedItems(plispurdocs);

    // Save the Document*********************

    if (pModi <= 0) {
        // Get Document Number

        plispurdocs.docnum = await Numrange.getNewNumber({
            company: olispur001.company,
            numrange: olispur001.numrange,
        });

        // Save the Document

        await lispurdocs.create(plispurdocs);
    } else {
        await lispurdocs.findOneAndUpdate(
            { _id: plispurdocs._id },
            plispurdocs,
            {
                new: true,
                upsert: true,
            }
        );
    }
    // Update Inventory Document
    if ((olispur001.deltype == 2) | (olispur001.deltype == 4)) {
        await Inventory.createInvFromPur(plispurdocs, pModi);
    }

    return plispurdocs;
}
