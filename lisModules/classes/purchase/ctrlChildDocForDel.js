import lispurdocs from "../../../lisModels/lispurdocs.js";

export default async function ctrlChildDocForDel(plispurdocs) {

  for (let i in plispurdocs.items) {
    if (
      ((plispurdocs._deleted == true) | plispurdocs.items[i]._deleted) ==
      true
    ) {
      const childDoc = await lispurdocs.find({
        company: plispurdocs.company,
        _deleted: false,
        "items.refdoctype": plispurdocs.doctype,
        "items.refdocnum": plispurdocs.docnum,
        "items.refitemnum": plispurdocs.items[i].itemnum,
        "items._deleted": false,
      });

      console.log("childDoc", childDoc);
      if (childDoc.length > 0) {
        global.sys_message = "Belge Akışı Devam Eden Bir Döküman Silinemez!";
        return false;
      }
    }
  }

  return true;
}
