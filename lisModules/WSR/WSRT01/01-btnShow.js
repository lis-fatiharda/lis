
export default async function (dv) {
    dv.lisDialog = "WSRT01D02";
    dv.modi = 2;

    if (dv.liswebservicesList.filter((e) => e._selected == true).length > 0) {
        let selectedRow = dv.liswebservicesList.filter(
            (e) => e._selected == true
        )[0];

        dv.liswebservices = await liswebservices.findById(selectedRow._id);
    } else {
        throw new Error("Lütfen Bir Satır Seçiniz");
    }

    return dv;
}
