export default async function createInvFromPur(pLispurdocs, pMod) {
    let olisinvdocs = {};
    // Get MoveCode

    const olispur001 = await lispur001.findOne({
        company: pLispurdocs.company,
        doctype: pLispurdocs.doctype,
    });

    if (olispur001.movecode == "") throw new Error("Belge Tipi Bulunamadı!");

    

    if (pMod <= 0) {
        olisinvdocs = await lis.objectNew('lisinvdocs');

        lis.objectMove(pLispurdocs, olisinvdocs);
        olisinvdocs.items = [];

        for (let i in pLispurdocs.items) {
            let olisinvdocsitems = await lis.objectNew('lisinvdocs');
            olisinvdocsitems = olisinvdocsitems.items[0];

            const olisinv006 = await Inventory.ctrlMoveCode(
                pLispurdocs.company,
                pLispurdocs.items[i].material,
                olispur001.movecode,
                pLispurdocs.items[i].itemtype,
                pLispurdocs.items[i].specialstock
            );

            lis.objectMove(pLispurdocs.items[i], olisinvdocsitems);
            olisinvdocsitems.purdoctype = pLispurdocs.doctype;
            olisinvdocsitems.purdocnum = pLispurdocs.docnum;
            olisinvdocsitems.puritemnum = pLispurdocs.items[i].itemnum;
            olisinvdocsitems.vendor = pLispurdocs.vendor;
            olisinvdocsitems.customer = pLispurdocs.customer;
            
                
            lis.objectMove(olisinv006, olisinvdocsitems);
            //
            const olismaterials = await lismaterials.findOne({
                company: pLispurdocs.company,
                material: pLispurdocs.items[i].material,
            });

            const olisbas009 = await lisbas009.findOne({
                company: pLispurdocs.company,
                mattype: olismaterials.mattype,
            });
            olisinvdocsitems.invmanag = olisbas009.invmanag;
            olisinvdocsitems.ordertype = pLispurdocs.items[i].itemtype;


            olisinvdocs.items.push(olisinvdocsitems);
        }
    }

    if (pMod == 1) {
        olisinvdocs = await lisinvdocs.findOne({
            company: pLispurdocs.company,
            purdoctype: pLispurdocs.doctype,
            purdocnum: pLispurdocs.docnum,
        });

        olisinvdocs.docdate = pLispurdocs.docdate;
        olisinvdocs._deleted = pLispurdocs._deleted;
        olisinvdocs.items = [];

        for (let i in pLispurdocs.items) {
            let olisinvdocsitems = await lis.objectNew('lisinvdocs');
            olisinvdocsitems = olisinvdocsitems.items[0];

            const olisinv006 = await Inventory.ctrlMoveCode(
                pLispurdocs.company,
                pLispurdocs.items[i].material,
                olispur001.movecode,
                pLispurdocs.items[i].itemtype,
                pLispurdocs.items[i].specialstock
            );

            lis.objectMove(olisinv006, olisinvdocsitems);
            lis.objectMove(pLispurdocs.items[i], olisinvdocsitems);
            olisinvdocsitems.purdoctype = pLispurdocs.doctype;
            olisinvdocsitems.purdocnum = pLispurdocs.docnum;
            olisinvdocsitems.puritemnum = pLispurdocs.items[i].itemnum;
            olisinvdocsitems.vendor = pLispurdocs.vendor;
            olisinvdocsitems.customer = pLispurdocs.customer;

            if (pLispurdocs.invtype == 2) {
                olisinvdocsitems.postway = 0
            }
            if (pLispurdocs.invtype == 4) {
                olisinvdocsitems.postway = 1
            }
            
            //
            const olismaterials = await lismaterials.findOne({
                company: pLispurdocs.company,
                material: pLispurdocs.items[i].material,
            });

            const olisbas009 = await lisbas009.findOne({
                company: pLispurdocs.company,
                mattype: olismaterials.mattype,
            });
            olisinvdocsitems.invmanag = olisbas009.invmanag;
            olisinvdocsitems.ordertype = pLispurdocs.items[i].itemtype;
            olisinvdocs.items.push(olisinvdocsitems);
        }
    }

    await this.saveMovement(olisinvdocs, olispur001.movecode, pMod);

    return olisinvdocs;
}
