export default async function ctrlAuthorization(plissaldocs, pModi) {
  const olissal008 = await lissal008.findOne({
    company: plissaldocs.company,
    doctype: plissaldocs.doctype,
    username: sys_user,
  });

  if (olissal008 == null) {
  throw new Error(`${plissaldocs.doctype} Belgesi Açma Yetkiniz Yoktur!`);
  }

  if (olissal008.notinsert == true && pModi == 0)
  throw new Error(
      `${plissaldocs.doctype} Belgesi Oluşturma Yetkiniz Yoktur!`
    );
  if (olissal008.notupdate == true && pModi == 1)
  throw new Error(
      `${plissaldocs.doctype} Belgesi Düzenleme Yetkiniz Yoktur!`
    );
  if (plissaldocs._deleted == true) {
    if (olissal008.notdelete == true)
    throw new Error(`${plissaldocs.doctype} Belgesi Silme Yetkiniz Yoktur!`);
  }


  return plissaldocs;
}
