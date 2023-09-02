
export default async function (dv) {
    dv.lisDialog = "WSRT02D02";
    dv.modi = 2;

    if (dv.lisapikeysList.filter((e) => e._selected == true).length > 0) {
        let selectedRow = dv.lisapikeysList.filter(
            (e) => e._selected == true
        )[0];

        dv.lisapikeys = await lisapikeys.findById(selectedRow._id);
    } else {
        throw new Error("Lütfen Bir Satır Seçiniz");
    }

    return dv;
}
