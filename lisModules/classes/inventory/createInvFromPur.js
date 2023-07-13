import lisinvdocs from "../../../lisModels/lisinvdocs.js";
import lispur001 from "../../../lisModels/lispur001.js";

export default async function createInvFromPur(pLispurdocs, pMod) {
    let olisinvdocs = {};
    // Get MoveCode

    const olispur001 = await lispur001.findOne({
        company: pLispurdocs.company,
        doctype: pLispurdocs.doctype,
    });
   
        olisinvdocs = new lisinvdocs(lisinvdocs.prototype.schema.tree)._doc;
        //olisinvdocs = olisinvdocs._doc;

        lis.objectMove(pLispurdocs, olisinvdocs);
        olisinvdocs.items = [];

        for (let i in pLispurdocs.items) {
            let olisinvdocsitems = new lisinvdocs(
                lisinvdocs.prototype.schema.tree
            )._doc.items[0]._doc;

            //olisinvdocsitems = olisinvdocsitems._doc.items[0]._doc;
            lis.objectMove(pLispurdocs.items[i], olisinvdocsitems);
            olisinvdocsitems.refdoctype = pLispurdocs.doctype;
            olisinvdocsitems.refdocnum = pLispurdocs.docnum;
            olisinvdocsitems.refitemnum = pLispurdocs.items[i].itemnum;
            olisinvdocs.items.push(olisinvdocsitems);
        }


    await this.saveMovement(olisinvdocs, olispur001.movecode, pMod);


    return olisinvdocs;
}
