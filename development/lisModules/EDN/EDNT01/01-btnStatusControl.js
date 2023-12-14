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
        if (plisedndocs.edoctype == 1) {
            //----Check E-Invoice Status----

            await Emember
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
            await Emember
                .checkInvoiceStatus(mySession_Id, plisedndocs)
                .catch((err) => {
                  throw new Error("E-Arşiv Statüsü Güncellenemedi!");
                });
        }

        //----Check E-Delivery Status----
        if (plisedndocs.edoctype == 3) {
            await Emember
                .checkInvoiceStatus(mySession_Id, plisedndocs)
                .catch((err) => {
                  throw new Error("E-İrsaliye Statüsü Güncellenemedi!");
                });
        }
    }
}
