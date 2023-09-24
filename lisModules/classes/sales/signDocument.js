export default async function signDocument(plissaldocs) {

  if (plissaldocs.issignature == 0) {
    throw new Error("Belge İçin İmza Gerekmez !")
  }
  if (plissaldocs.issignature == 2) {
    throw new Error("Belge Zaten İmzalı !")
  }

  let olissal001 = await lissal001.findOne({
    company: plissaldocs.company,
    doctype: plissaldocs.doctype
  })

  let olissal008 = await lissal008.findOne({
    company: plissaldocs.company,
    username: global.sys_user,
    doctype: plissaldocs.doctype
  })
  //"A veya B İmzalar"

  if (olissal008.usergrp == 2) {
    throw new Error(`${plissaldocs.doctype} Belgesini İmzalama Yetkiniz Bulunmamaktadır !`)
  }


  //"B ve A Sırayla İmzalar"
  if (olissal001.signprotocol == 2) {
    if (olissal008.usergrp == 0) {
      let olissaldocs = await lissaldocs.findOne({
        company: plissaldocs.company,
        username: global.sys_user,
        doctype: plissaldocs.doctype,
        docnum: plissaldocs.docnum
      })
      //if (plissaldocs.signstat.usergrp == 1)
      if (olissaldocs.signstat.length == 0)
        throw new Error(`${plissaldocs.doctype} Belgesini Öncelikle Bölüm Şefi İmzalamalıdır !`)

    }
    if (olissal008.usergrp == 1) {
      let olissaldocs = await lissaldocs.findOne({
        company: plissaldocs.company,
        username: global.sys_user,
        doctype: plissaldocs.doctype,
        docnum: plissaldocs.docnum
      })
      //if (plissaldocs.signstat.usergrp == 1)
      if (olissaldocs.signstat.length > 0)
        throw new Error(`${plissaldocs.doctype} Belgesini Satış Müdürü İmzalayabilir !`)

    }
  }
  // "Yalnız A İmzalar"
  if (olissal001.signprotocol == 3) {
    if (olissal008.usergrp != 0) {
      throw new Error(`${plissaldocs.doctype} Belgesini Sadece Satış Müdürü İmzalayabilir!`)
    }

  }
  /////////////////////////////////////////////////
  if (olissal001.signprotocol == 2) {
    if (olissal008.usergrp == 1) {
      plissaldocs.issignature = 1;
    }
    else { plissaldocs.issignature = 2; }

  } 
  else { plissaldocs.issignature = 2; }

  /////////////////////////////////////////////////

  var grptext = "";
  if (olissal008.usergrp == 0) { grptext = "Satış Müdürü"; }
  if (olissal008.usergrp == 1) { grptext = "Bölüm Şefi"; }
  if (olissal008.usergrp == 2) { grptext = "Satış Elemanı"; }


  plissaldocs.signstat.push({
    username: global.sys_user,
    usergrp: olissal008.usergrp,
    stext: grptext,
    date: new Date(),
  })



  ////////////////////update
  await lissaldocs
    .findOneAndUpdate({ _id: plissaldocs._id }, plissaldocs, {
      new: true,
      upsert: true,
    })
    .catch((err) => {
      throw new Error(err);
    });


  return plissaldocs;
}
