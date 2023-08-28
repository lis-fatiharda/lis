export default async function createInvFromSal(pLissaldocs, pMod) {
    let olisinvdocs = {};

    let olissal001 = await lissal001.findOne({
        company: pLissaldocs.company,
        doctype: pLissaldocs.doctype,
    });

    if (olissal001.movecode == "") throw new Error("Belge Tipi Bulunamadı!");

    if (pMod <= 0) {
        olisinvdocs = new lisinvdocs(
            lisinvdocs.prototype.schema.tree
        ).toObject();

        lis.objectMove(pLissaldocs, olisinvdocs);
        olisinvdocs.items = [];

        for (let i in pLissaldocs.items) {
            let olisinvdocsitems = new lisinvdocs(
                lisinvdocs.prototype.schema.tree
            )._doc.items[0].toObject();

            const olisinv006 = await Inventory.ctrlMoveCode(
                pLissaldocs.company,
                pLissaldocs.items[i].material,
                olissal001.movecode,
                pLissaldocs.items[i].itemtype,
                pLissaldocs.items[i].specialstock
            );

            lis.objectMove(pLissaldocs.items[i], olisinvdocsitems);
            olisinvdocsitems.saldoctype = pLissaldocs.doctype;
            olisinvdocsitems.saldocnum = pLissaldocs.docnum;
            olisinvdocsitems.salitemnum = pLissaldocs.items[i].itemnum;
            olisinvdocsitems.vendor = pLissaldocs.vendor;
            olisinvdocsitems.customer = pLissaldocs.customer;
            lis.objectMove(olisinv006, olisinvdocsitems);
            //
            const olismaterials = await lismaterials.findOne({
                company: pLissaldocs.company,
                material: pLissaldocs.items[i].material,
            });

            const olisbas009 = await lisbas009.findOne({
                company: pLissaldocs.company,
                mattype: olismaterials.mattype,
            });
            olisinvdocsitems.invmanag = olisbas009.invmanag;
            olisinvdocsitems.ordertype = pLissaldocs.items[i].itemtype;
            olisinvdocs.items.push(olisinvdocsitems);
        }
    }
    if (pMod == 1) {
        olisinvdocs = await lisinvdocs.findOne({
            company: pLissaldocs.company,
            saldoctype: pLissaldocs.doctype,
            saldocnum: pLissaldocs.docnum,
        });

        olisinvdocs.items = [];

        for (let i in pLissaldocs.items) {
            let olisinvdocsitems = new lisinvdocs(
                lisinvdocs.prototype.schema.tree
            )._doc.items[0].toObject();

            const olisinv006 = await Inventory.ctrlMoveCode(
                pLissaldocs.company,
                pLissaldocs.items[i].material,
                olissal001.movecode,
                pLissaldocs.items[i].itemtype,
                pLissaldocs.items[i].specialstock
            );

            lis.objectMove(pLissaldocs.items[i], olisinvdocsitems);
            olisinvdocsitems.saldoctype = pLissaldocs.doctype;
            olisinvdocsitems.saldocnum = pLissaldocs.docnum;
            olisinvdocsitems.salitemnum = pLissaldocs.items[i].itemnum;
            olisinvdocsitems.vendor = pLissaldocs.vendor;
            olisinvdocsitems.customer = pLissaldocs.customer;
            lis.objectMove(olisinv006, olisinvdocsitems);
            //
            const olismaterials = await lismaterials.findOne({
                company: pLissaldocs.company,
                material: pLissaldocs.items[i].material,
            });

            const olisbas009 = await lisbas009.findOne({
                company: pLissaldocs.company,
                mattype: olismaterials.mattype,
            });
            olisinvdocsitems.invmanag = olisbas009.invmanag;
            olisinvdocsitems.ordertype = pLissaldocs.items[i].itemtype;
            olisinvdocs.items.push(olisinvdocsitems);
        }
    }

    await this.saveMovement(olisinvdocs, olissal001.movecode, pMod);

    return olisinvdocs;
}
