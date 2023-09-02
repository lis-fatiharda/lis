
export default async function (dv) {
    if (dv.liswebservicesList.filter((e) => e._selected == true).length > 0) {
        let selectedRow = dv.liswebservicesList.filter(
            (e) => e._selected == true
        )[0];

        dv.liswebservices = await liswebservices.findById(selectedRow);
    } else {
        throw new Error("Lütfen Bir Satır Seçiniz");
    }

    // Lock the document
    let isLocked = await System.lock(
        dv.liswebservices.code,
        "WSRT01",
        dv.liswebservices.name,
        global.sys_user
    );
    if (isLocked == true) {
        dv.lisDialog = "WSRT01D02";
        dv.modi = 1;
    } else {
        dv.liswebservices = [];
        throw new Error("Kilitli Belge!");
    }

    return dv;
}
