
export default async function (dv) {
    dv.lisDialog = "WSRT02D02";
    dv.modi = 2;

    if (dv.lisapiKeysList.filter((e) => e._selected == true).length > 0) {
        let selectedRow = dv.lisapiKeysList.filter(
            (e) => e._selected == true
        )[0];

        dv.lisapiKeys = await lisapiKeys.findById(selectedRow._id);
    } else {
      throw new Error("Lütfen Bir Satır Seçiniz");
    }

    return dv;
}
