export default async function (dv) {
    let lisedndocsDeleted = dv.lisedndocsList.filter(
        (e) => e._selected == true
    );

    if (lisedndocsDeleted.length == 0)
        throw new Error("Lütfen Bir Satır Seçiniz!");

    await lisedndocs
        .deleteOne({ _id: lisedndocsDeleted[0]._id })
        .catch((err) => {
            console.log(err);
            throw new Error("Kuyruktan Silinemedi!");
        });

    await lissaldocs
        .updateOne(
            {
                company: lisedndocsDeleted[0].company,
                doctype: lisedndocsDeleted[0].doctype,
                docnum: lisedndocsDeleted[0].docnum,
            },
            { $set: { isprinted: false, einvonumber: "" } }
        )
        .catch((err) => {
            console.log(err);
            throw new Error("Satış Belgesi Güncellenemedi!");
        });

    return true;
}
