
export default async function (dv) {

    const plisedndocsSelected = dv.lisedndocsList.filter(
        (e) => e._selected === true
    );
    
    //----fetch SESSION_ID----

    const mySession_Id = await emember.login().catch((err) => {
        throw new Error("SESSION_ID Alınamadı!");
    });

    for (let i in plisedndocsSelected) {
        const plisedndocs = plisedndocsSelected[i];

        //----send E-Invoice to entegrator----

        if (plisedndocs.edoctype == 1) {
            await emember
                .sendEinvoice(mySession_Id, plisedndocs)
                .then((res) => {
                    return;
                })
                .catch(async (err) => {
                    throw new Error("E-Fatura Portala Gönderilemedi!");
                });
        }

        //----send E-DespatchAdvice to entegrator----
        if (plisedndocs.edoctype == 2) {
            await emember
                .sendEarchive(mySession_Id, plisedndocs)
                .catch((err) => {
                    throw new Error("E-Arşiv Portala Gönderilemedi!");
                });
        }

        //----send E-Delivery to entegrator----
        if (plisedndocs.edoctype == 3) {
            await emember
                .sendEdelivery(mySession_Id, plisedndocs)
                .catch((err) => {
                    throw new Error("E-İrsaliye Portala Gönderilemedi!");
                });
        }
    }
}
