
export default async function (dv) {
    if (dv.lisapiKeysList.filter((e) => e._selected == true).length > 0) {
        let selectedRow = dv.lisapiKeysList.filter(
            (e) => e._selected == true
        )[0];

        dv.lisapiKeys = await lisapiKeys.findById(selectedRow);
    } else {
      throw new Error("Lütfen Bir Satır Seçiniz");
    }

    // Lock the document
    let isLocked = await System.lock(
        dv.lisapiKeys.code,
        "WSRT02",
        dv.lisapiKeys.name,
        global.sys_user
    );
    if (isLocked == true) {
        dv.lisDialog = "WSRT02D02";
        dv.modi = 1;
    } else {
        dv.lisapiKeys = [];
      throw new Error("Kilitli Belge!");
    }

    return dv;
}
