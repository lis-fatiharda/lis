import lissaldocs from "../../../lisModels/lissaldocs.js";

export default async function ctrlChildDocForDel(plissaldocs) {
    for (let i in plissaldocs.items) {
        if (
            ((plissaldocs._deleted == true) | plissaldocs.items[i]._deleted) ==
            true
        ) {
            const childDoc = await lissaldocs.find({
                company: plissaldocs.company,
                _deleted: false,
                "items.refdoctype": plissaldocs.doctype,
                "items.refdocnum": plissaldocs.docnum,
                "items.refitemnum": plissaldocs.items[i].itemnum,
                "items._deleted": false,
            });

            if (childDoc.length > 0) {
                global.sys_message =
                    "Belge Akışı Devam Eden Bir Döküman Silinemez!";
                return false;
            }
        }
    }

    return true;
}
