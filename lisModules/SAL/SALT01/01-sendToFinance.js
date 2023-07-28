export default async function (dv) {
    let salDocListSelected = dv.salDocList.filter(
        (e) => (e._selected == true) & (e.invtype > 0) & (e.isfinance != true)
    );

    if (salDocListSelected.length <= 0)
        throw new Error("Lütfen Bir Satır Seçiniz");

    for (let k in salDocListSelected) {
        dv.lissaldocs = await lissaldocs.findById(salDocListSelected[k]._id);

        if (dv.lissaldocs.isfinance == true) continue;

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

        // Create Finance Document
        dv.lissaldocs.isfinance = true;

        dv.lisfindocs = await Finance.createFinFromSal(dv.lissaldocs).catch(
            async (err) => {
                await System.unlock(dv.lockKeyParams);
                throw new Error(err.message);
            }
        );

        // Save The Finance Document

        await Finance.save({
            plisfindocs: dv.lisfindocs,
            modi: 0,
        });

        await lissaldocs.updateOne(
            { _id: dv.lissaldocs._id },
            { $set: { isfinance: true } }
        );

        // Unlock the document

        System.unlock(dv.lockKeyParams);
    }

    return dv;
}
