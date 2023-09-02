
export default async function (dv) {
    if (dv.lisapikeysList.filter((e) => e._selected == true).length > 0) {
        let selectedRow = dv.lisapikeysList.filter(
            (e) => e._selected == true
        )[0];

        dv.lisapikeys = await lisapikeys.findById(selectedRow);
    } else {
        throw new Error("Lütfen Bir Satır Seçiniz");
    }

    // Lock the document
    let isLocked = await System.lock(
        dv.lisapikeys.code,
        "WSRT02",
        dv.lisapikeys.name,
        global.sys_user
    );
    if (isLocked == true) {
        dv.lisDialog = "WSRT02D02";
        dv.modi = 1;
    } else {
        dv.lisapikeys = [];
        throw new Error("Kilitli Belge!");
    }

    return dv;
}
