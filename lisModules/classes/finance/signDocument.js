export default async function signDocument(plisfindocs) {
  if (plisfindocs.issignature == 0) {
    throw new Error("Belge İçin İmza Gerekmez !");
  }
  if (plisfindocs.issignature == 2) {
    throw new Error("Belge Zaten İmzalı !");
  }

  let olisfin003 = await lisfin003.findOne({
    company: plisfindocs.company,
    doctype: plisfindocs.doctype,
  });

  let olisfin008 = await lisfin008.findOne({
    company: plisfindocs.company,
    username: global.sys_user,
    doctype: plisfindocs.doctype,
  });
  //"A veya B İmzalar"

  if (olisfin008.usergrp == 2) {
    throw new Error(
      `${plisfindocs.doctype} Belgesini İmzalama Yetkiniz Bulunmamaktadır !`
    );
  }

  //"B ve A Sırayla İmzalar"
  if (olisfin003.signprotocol == 2) {
    if (olisfin008.usergrp == 0) {
      let olisfindocs = await lisfindocs.findOne({
        company: plisfindocs.company,
        username: global.sys_user,
        doctype: plisfindocs.doctype,
        docnum: plisfindocs.docnum,
      });
      //if (plisfindocs.signstat.usergrp == 1)
      if (olisfindocs.signstat.length == 0)
        throw new Error(
          `${plisfindocs.doctype} Belgesini Öncelikle Bölüm Şefi İmzalamalıdır !`
        );
    }
    if (olisfin008.usergrp == 1) {
      let olisfindocs = await lisfindocs.findOne({
        company: plisfindocs.company,
        username: global.sys_user,
        doctype: plisfindocs.doctype,
        docnum: plisfindocs.docnum,
      });
      //if (plisfindocs.signstat.usergrp == 1)
      if (olisfindocs.signstat.length > 0)
        throw new Error(
          `${plisfindocs.doctype} Belgesini Finans Müdürü İmzalayabilir !`
        );
    }
  }
  // "Yalnız A İmzalar"
  if (olisfin003.signprotocol == 3) {
    if (olisfin008.usergrp != 0) {
      throw new Error(
        `${plisfindocs.doctype} Belgesini Sadece Finans Müdürü İmzalayabilir!`
      );
    }
  }
  /////////////////////////////////////////////////
  if (olisfin003.signprotocol == 2) {
    if (olisfin008.usergrp == 1) {
      plisfindocs.issignature = 1;
    } else {
      plisfindocs.issignature = 2;
    }
  } else {
    plisfindocs.issignature = 2;
  }

  /////////////////////////////////////////////////

  var grptext = "";
  if (olisfin008.usergrp == 0) {
    grptext = "Finans Müdürü";
  }
  if (olisfin008.usergrp == 1) {
    grptext = "Bölüm Şefi";
  }
  if (olisfin008.usergrp == 2) {
    grptext = "Finans Elemanı";
  }

  plisfindocs.signstat.push({
    username: global.sys_user,
    usergrp: olisfin008.usergrp,
    stext: grptext,
    date: new Date(),
  });

  ////////////////////update
  await lisfindocs
    .findOneAndUpdate({ _id: plisfindocs._id }, plisfindocs, {
      new: true,
      upsert: true,
    })
    .catch((err) => {
      throw new Error(err);
    });

  return plisfindocs;
}
