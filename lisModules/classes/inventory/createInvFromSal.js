export default async function createInvFromPur(pLissaldocs, pMod) {
    let olisinvdocs = {};

    let olissal001 = await lissal001.findOne({
        company: pLissaldocs.company,
        doctype: pLissaldocs.doctype,
    });

    if (olissal001.movecode == "") throw new Error("Hareket Kodu Bulunamadı!");

    olisinvdocs = new lisinvdocs(lisinvdocs.prototype.schema.tree).toObject();
    //olisinvdocs = olisinvdocs._doc;

    lis.objectMove(pLissaldocs, olisinvdocs);
    olisinvdocs.items = [];

    for (let i in pLissaldocs.items) {
        let olisinvdocsitems = new lisinvdocs(
            lisinvdocs.prototype.schema.tree
        )._doc.items[0].toObject();

        //olisinvdocsitems = olisinvdocsitems._doc.items[0]._doc;
        lis.objectMove(pLissaldocs.items[i], olisinvdocsitems);
        olisinvdocsitems.refdoctype = pLissaldocs.doctype;
        olisinvdocsitems.refdocnum = pLissaldocs.docnum;
        olisinvdocsitems.refitemnum = pLissaldocs.items[i].itemnum;
        olisinvdocs.items.push(olisinvdocsitems);
    }

    this.saveMovement(olisinvdocs, olissal001.movecode, pMod);
    return olisinvdocs;
}
