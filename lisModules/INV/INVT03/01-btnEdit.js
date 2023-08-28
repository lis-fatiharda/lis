export default async function (dv) {
    if (dv.lisinvdocsList.filter((e) => e._selected == true).length > 0) {
        let selectedRow = dv.lisinvdocsList.filter(
            (e) => e._selected == true
        )[0];

        dv.lisinvdocs = await lisinvdocs.findById(selectedRow._id);
    } else {
        throw new Error("Lütfen Bir Satır Seçiniz");
    }

    if (
        (dv.lisinvdocs.items[0].purdoctype?.length > 0) |
        (dv.lisinvdocs.items[0].saldoctype?.length > 0) |
        (dv.lisinvdocs.items[0].prddoctype?.length > 0)
    ) {
        throw new Error(
            "Entegrasyonlu Bir Hareket Düzenlenemez. Lütfen Hareketin Kaynak Belgesi Üzerinden Düzenleme Yapınız!"
        );
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
