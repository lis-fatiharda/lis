export default async function (dv) {
    let lisedndocsSelected = dv.lisedndocsList.filter(
        (e) => e._selected == true
    );

    let mySession_Id = await Emember.login();

    for (let k in lisedndocsSelected) {
        await Emember.respondInvoice(
            mySession_Id,
            lisedndocsSelected[k].uuid,
            "RED",
            ""
        );
    }
    return dv;
}
