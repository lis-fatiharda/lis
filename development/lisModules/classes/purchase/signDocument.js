export default async function signDocument(plispurdocs) {

  if (plispurdocs.issignature == 0) {
  throw new Error("Belge İçin İmza Gerekmez !")
  }
  if (plispurdocs.issignature == 2) {
  throw new Error("Belge Zaten İmzalı !")
  }

  let olispur001 = await lispur001.findOne({
    company: plispurdocs.company,
    doctype: plispurdocs.doctype
  })

  let olispur008 = await lispur008.findOne({
    company: plispurdocs.company,
    username: global.sys_user,
    doctype: plispurdocs.doctype
  })
  //"A veya B İmzalar"

  if (olispur008.usergrp == 2) {
  throw new Error(`${plispurdocs.doctype} Belgesini İmzalama Yetkiniz Bulunmamaktadır !`)
  }


  //"B ve A Sırayla İmzalar"
  if (olispur001.signprotocol == 2) {
    if (olispur008.usergrp == 0) {
      let olispurdocs = await lispurdocs.findOne({
        company: plispurdocs.company,
        username: global.sys_user,
        doctype: plispurdocs.doctype,
        docnum: plispurdocs.docnum
      })
      //if (plispurdocs.signstat.usergrp == 1)
      if (olispurdocs.signstat.length == 0)
      throw new Error(`${plispurdocs.doctype} Belgesini Öncelikle Bölüm Şefi İmzalamalıdır !`)

    }
    if (olispur008.usergrp == 1) {
      let olispurdocs = await lispurdocs.findOne({
        company: plispurdocs.company,
        username: global.sys_user,
        doctype: plispurdocs.doctype,
        docnum: plispurdocs.docnum
      })
      //if (plispurdocs.signstat.usergrp == 1)
      if (olispurdocs.signstat.length > 0)
      throw new Error(`${plispurdocs.doctype} Belgesini Satış Müdürü İmzalayabilir !`)

    }
  }
  // "Yalnız A İmzalar"
  if (olispur001.signprotocol == 3) {
    if (olispur008.usergrp != 0) {
    throw new Error(`${plispurdocs.doctype} Belgesini Sadece Satış Müdürü İmzalayabilir!`)
    }

  }
  /////////////////////////////////////////////////
  if (olispur001.signprotocol == 2) {
    if (olispur008.usergrp == 1) {
      plispurdocs.issignature = 1;
    }
    else { plispurdocs.issignature = 2; }

  } 
  else { plispurdocs.issignature = 2; }

  /////////////////////////////////////////////////

  var grptext = "";
  if (olispur008.usergrp == 0) { grptext = "Satış Müdürü"; }
  if (olispur008.usergrp == 1) { grptext = "Bölüm Şefi"; }
  if (olispur008.usergrp == 2) { grptext = "Satış Elemanı"; }


  plispurdocs.signstat.push({
    username: global.sys_user,
    usergrp: olispur008.usergrp,
    stext: grptext,
    date: new Date(),
  })



  ////////////////////update
  await lispurdocs
    .findOneAndUpdate({ _id: plispurdocs._id }, plispurdocs, {
      new: true,
      upsert: true,
    })
    .catch((err) => {
    throw new Error(err);
    });


  return plispurdocs;
}
