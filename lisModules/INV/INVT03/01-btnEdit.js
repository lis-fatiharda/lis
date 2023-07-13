export default async function (dv) {
    if (dv.lisinvdocsList.filter((e) => e._selected == true).length > 0) {
        let selectedRow = dv.lisinvdocsList.filter(
            (e) => e._selected == true
        )[0];

        dv.lisinvdocs = await lisinvdocs.findById(selectedRow._id);
    } else {
        throw new Error("Lütfen Bir Satır Seçiniz");
    }
    let isLocked = await System.lock(
        dv.lisinvdocs.company,
        "INVT03",
        dv.lisinvdocs.doctype + dv.lisinvdocs.docnum,
        global.sys_user
    );
    if (isLocked == true) {
        dv.lisDialog = "INVT03D02";
        dv.modi = 1;
    } else {
        dv.liscustomers = [];
        throw new Error("Kilitli Belge!");
    }

    return dv;
}
