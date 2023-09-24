export default async function ctrlAuthorization(plisfindocs, pModi) {
  const olisfin007 = await lisfin007.findOne({
    company: plisfindocs.company,
    doctype: plisfindocs.doctype,
    username: sys_user,
  });

  if (olisfin007 == null) {
    throw new Error(`${plisfindocs.doctype} Belgesi Açma Yetkiniz Yoktur!`);
  }

  if (olisfin007.notinsert == true && pModi == 0)
    throw new Error(
      `${plisfindocs.doctype} Belgesi Oluşturma Yetkiniz Yoktur!`
    );
  if (olisfin007.notupdate == true && pModi == 1)
    throw new Error(
      `${plisfindocs.doctype} Belgesi Düzenleme Yetkiniz Yoktur!`
    );
  if (plisfindocs._deleted == true) {
    if (olisfin007.notdelete == true)
      throw new Error(
        `${plisfindocs.doctype} Belgesi Silme Yetkiniz Yoktur!`
      );
  }


  return plisfindocs;
}
