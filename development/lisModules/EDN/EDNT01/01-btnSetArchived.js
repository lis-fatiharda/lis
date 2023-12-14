export default async function (dv) {
    let lisedndocsSelected = dv.lisedndocsList.filter(
        (e) => e._selected == true
    );

    if (lisedndocsSelected.length == 0)
      throw new Error("Lütfen Bir Satır Seçiniz!");

    for (let m in lisedndocsSelected) {
        await lisedndocs.updateOne(
            {
                _id: lisedndocsSelected[m]._id,
            },
            { $set: { edocstat: 4 } }
        );
    }
}
