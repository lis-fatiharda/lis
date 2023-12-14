// ? modi: -1 = create new document by reference
// ?        0 = create new document
// ?        1 - update the document
import mongoose from 'mongoose';
export default async function save(plissaldocs, pModi) {
    const olissal001 = await lissal001.findOne({
        company: plissaldocs.company,
        doctype: plissaldocs.doctype,
    });

    if (olissal001 == null) new Error("Belge Tipi Bulunamadı!");
    //--

    // Controls before Save ****************

    await this.ctrlAuthorization(plissaldocs, pModi);

    if ((plissaldocs.currency == null) | (plissaldocs.currency == "")) {
      throw new Error("Lütfen Para Birimi Giriniz!");
    }

    plissaldocs = await this.removeInvalidItems(plissaldocs);

    for (let i in plissaldocs.items) {
        if (olissal001.deltype > 0) {
            await Inventory.ctrlMaterialForMove(
                plissaldocs.company,
                plissaldocs.items[i]
            );
            await Inventory.ctrlMoveCode(
                plissaldocs.company,
                plissaldocs.items[i].material,
                olissal001.movecode,
                plissaldocs.items[i].itemtype,
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

        if (olisbas009 == null) new Error("Malzeme Tipi Bulunamadı!");

        const olissal002 = await lissal002.findOne({
            company: plissaldocs.company,
            doctype: plissaldocs.doctype,
            itemtype: plissaldocs.items[i].itemtype,
        });

        if (olissal002 == null) new Error("Kalem Tipi Bulunamadı!");
    }
    // Control reference document
    await this.ctrlChildDocForDel(plissaldocs);

    await this.ctrlRefDocument(plissaldocs);

    // Control for stock movements

    if ((olissal001.deltype == 2 & plissaldocs._deleted == false) | (olissal001.deltype == 4 & plissaldocs._deleted == true)) {
        await Inventory.ctrlInvFromSal(plissaldocs, pModi);
    }

    // Update reference document
    await this.updRefDocument(plissaldocs);
    plissaldocs = await this.removeDeletedItems(plissaldocs);

    // Save the Document*********************

    if (pModi <= 0) {
        // Get Document Number

        plissaldocs.docnum = await Numrange.getNewNumber({
            company: olissal001.company,
            numrange: olissal001.numrange,
        });

        // create the Document
        
        global.sys_session = await mongoose.startSession();
        await global.sys_session.startTransaction();

        await lissaldocs.create(plissaldocs);

        await global.sys_session.abortTransaction();
        await global.sys_session.endSession();

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
