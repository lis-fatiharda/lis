export default async function (dv) {
    const plisedndocsSelected = dv.lisedndocsList.filter(
        (e) => e._selected === true
    );

    //----fetch SESSION_ID----

    const mySession_Id = await Emember.login().catch((err) => {
        throw new Error("SESSION_ID Alınamadı!");
    });

    for (let i in plisedndocsSelected) {
        const plisedndocs = await lisedndocs.findOne({
            _id: plisedndocsSelected[i],
        });

        if (plisedndocs == null) continue;

        //----send E-Invoice to entegrator----

        if (plisedndocs.edoctype == 1) {
            await Emember.sendEinvoice(mySession_Id, plisedndocs);
        }

        //----send E-DespatchAdvice to entegrator----
        if (plisedndocs.edoctype == 2) {
            await Emember.sendEarchive(mySession_Id, plisedndocs);
        }

        //----send E-Delivery to entegrator----
        if (plisedndocs.edoctype == 3) {
            await Emember.sendEdelivery(mySession_Id, plisedndocs);
        }
    }
}
