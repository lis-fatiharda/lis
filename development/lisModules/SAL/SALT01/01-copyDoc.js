
export default async function (params) {

    params.dv.lissaldocs = await lissaldocs.findById(params.doc._id);
    console.log(params.dv.lissaldocs);
    if (params.dv.lissaldocs.docstat == 2)
      throw new Error("Belge Statüsü Kapalı!");

    // set referans document infos to items
    params.dv.lissaldocs.isprinted = false;
    params.dv.lissaldocs.docstat = 0;
    for (let i in params.dv.lissaldocs.items) {
        let myLisSalItem = params.dv.lissaldocs.items[i];
        if (myLisSalItem.stat == 2) {
            params.dv.lissaldocs.items.splice(i, 1);
        }
        myLisSalItem.refdoctype = params.dv.lissaldocs.doctype;
        myLisSalItem.refdocnum = params.dv.lissaldocs.docnum;
        myLisSalItem.refitemnum = myLisSalItem.itemnum;
        myLisSalItem.quantity = myLisSalItem.quantity - myLisSalItem.pquantity;
    }

    // Get infos from doctype ------
    const olissal001 = await lissal001.findOne({
        company: params.doc.company,
        doctype: params.toDoctype,
    });

    params.dv.lissaldocs.doctype = olissal001.doctype;
    params.dv.lissaldocs.docnum = "";
    params.dv.lissaldocs.stext = olissal001.stext;
    params.dv.lissaldocs.offtype = olissal001.offtype;
    params.dv.lissaldocs.ordtype = olissal001.ordtype;
    params.dv.lissaldocs.deltype = olissal001.deltype;
    params.dv.lissaldocs.invtype = olissal001.invtype;
    params.dv.lissaldocs.docdate = new Date();

    // Lock the document
    let isLocked = await System.lock(
        params.doc.company,
        "SALT01",
        params.doc.doctype + params.doc.docnum,
        global.sys_user
    );
    if (isLocked == true) {
        const oliscustomers = await liscustomers.findOne({
            company: params.dv.lissaldocs.company,
            customer: params.dv.lissaldocs.customer,
        });
        return {
            lissaldocs: params.dv.lissaldocs,
            liscustomers: oliscustomers,
        };
    } else {
        params.dv.lissaldocs = [];
      throw new Error("Kilitli Belge!");
    }
}
