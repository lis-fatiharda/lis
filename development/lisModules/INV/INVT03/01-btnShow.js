export default async function (dv) {
    if (dv.lisinvdocsList.filter((e) => e._selected == true).length > 0) {
        let selectedRow = dv.lisinvdocsList.filter(
            (e) => e._selected == true
        )[0];

        dv.lisinvdocs = await lisinvdocs.findById(selectedRow._id);
    } else {
      throw new Error("Lütfen Bir Satır Seçiniz");
    }
    dv.lisDialog = "INVT03D02";
    dv.modi = 2;

    return dv;
}
