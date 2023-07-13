
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

        //----Check E-Invoice Status----

        if (plisedndocs.edoctype == 1) {
            await emember
                .checkInvoiceStatus(mySession_Id, plisedndocs)
                .then((res) => {
                    return;
                })
                .catch(async (err) => {
                    throw new Error("E-Fatura Statüsü Güncellenemedi!");
                });
        }

        //----Check E-Archive Status----
        if (plisedndocs.edoctype == 2) {
            await emember
                .checkInvoiceStatus(mySession_Id, plisedndocs)
                .catch((err) => {
                    throw new Error("E-Arşiv Statüsü Güncellenemedi!");
                });
        }

        //----Check E-Delivery Status----
        if (plisedndocs.edoctype == 3) {
            await emember
                .checkInvoiceStatus(mySession_Id, plisedndocs)
                .catch((err) => {
                    throw new Error("E-İrsaliye Statüsü Güncellenemedi!");
                });
        }
    }
}
