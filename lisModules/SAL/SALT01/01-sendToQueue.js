import btnPrint from "./02-btnPrint.js";

export default async function (dv) {
    let salDocListSelected = dv.salDocList.filter(
        (e) => (e._selected == true) & (e.isprinted != true)
    );

    if (salDocListSelected.length <= 0)
        throw new Error("Lütfen Bir Satır Seçiniz");

    for (let k in salDocListSelected) {
        dv.lissaldocs = await lissaldocs.findById(salDocListSelected[k]._id);

        if (dv.lissaldocs.isprinted == true) continue;

        // Lock the document
        let isLocked = await System.lock(
            dv.lissaldocs.company,
            "SALT01",
            dv.lissaldocs.doctype + dv.lissaldocs.docnum,
            global.sys_user
        );
        if (isLocked == true) {
            dv.lockKeyParams.company = dv.lissaldocs.company;
            dv.lockKeyParams.lockkey =
                dv.lissaldocs.doctype + dv.lissaldocs.docnum;
        } else {
            continue;
        }

        // Send the document

        await btnPrint(dv).catch(async (err) => {
            await System.unlock(dv.lockKeyParams);
            throw new Error(err.message);
        });

        // Unlock the document

        System.unlock(dv.lockKeyParams);
    }

    return dv;
}
