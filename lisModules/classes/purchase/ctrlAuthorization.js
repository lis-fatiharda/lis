export default async function ctrlAuthorization(plispurdocs, pModi) {
    const olispur008 = await lispur008.findOne({
        company: plispurdocs.company,
        doctype: plispurdocs.doctype,
        username: sys_user,
    });

    if (olispur008 == null) throw new Error(`${plispurdocs.doctype} Belgesi Açma Yetkiniz Yoktur!`);

    if ((olispur008.notinsert == true) && (pModi == 0)) throw new Error(`${plispurdocs.doctype} Belgesi Oluşturma Yetkiniz Yoktur!`);
    if ((olispur008.notupdate == true) && (pModi == 1)) throw new Error(`${plispurdocs.doctype} Belgesi Düzenleme Yetkiniz Yoktur!`);

    if (plispurdocs._deleted == true) { if ((olispur008.notdelete == true)) throw new Error(`${plispurdocs.doctype} Belgesi Silme Yetkiniz Yoktur!`); }



    return plispurdocs;
}
