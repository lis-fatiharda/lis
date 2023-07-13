
export default async function (params) {

    params.dv.lispurdocs = await lispurdocs.findById(params.doc._id);
    console.log(params.dv.lispurdocs);
    if (params.dv.lispurdocs.docstat == 2)
        throw new Error("Belge Statüsü Kapalı!");

    // set referans document infos to items
    params.dv.lispurdocs.isprinted = false;
    params.dv.lispurdocs.docstat = 0;
    for (let i in params.dv.lispurdocs.items) {
        let myLisPurItem = params.dv.lispurdocs.items[i];
        if (myLisPurItem.stat == 2) {
            params.dv.lispurdocs.items.splice(i, 1);
        }
        myLisPurItem.refdoctype = params.dv.lispurdocs.doctype;
        myLisPurItem.refdocnum = params.dv.lispurdocs.docnum;
        myLisPurItem.refitemnum = myLisPurItem.itemnum;
        myLisPurItem.quantity = myLisPurItem.quantity - myLisPurItem.pquantity;
    }

    // Get infos from doctype ------
    const olispur001 = await lispur001.findOne({
        company: params.doc.company,
        doctype: params.toDoctype,
    });

    params.dv.lispurdocs.doctype = olispur001.doctype;
    params.dv.lispurdocs.docnum = "";
    params.dv.lispurdocs.stext = olispur001.stext;
    
    params.dv.lispurdocs.reqtype = olispur001.reqtype;
    params.dv.lispurdocs.offtype = olispur001.offtype;
    params.dv.lispurdocs.ordtype = olispur001.ordtype;
    params.dv.lispurdocs.deltype = olispur001.deltype;
    params.dv.lispurdocs.invtype = olispur001.invtype;




    params.dv.lispurdocs.validfrom = new Date();

    // Lock the document
    let isLocked = await System.lock(
        params.doc.company,
        "PURT01",
        params.doc.doctype + params.doc.docnum,
        global.sys_user
    );
    if (isLocked == true) {
        return params.dv.lispurdocs;
    } else {
        params.dv.lispurdocs = [];
        throw new Error("Kilitli Belge!");
    }
}
