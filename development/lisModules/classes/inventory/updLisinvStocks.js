
export default async function saveMovement(pLisinvdocs, plisinvdocsOld) {
    // Controls before save --------------------------------

    // Take back for plisinvdocsOld --------------------------------

    if (plisinvdocsOld != undefined) {
        for (let i in plisinvdocsOld.items) {
            let myLisinvItem = plisinvdocsOld.items[i];

            let olisinvstocks = await lisinvstocks.findOne({
                company: plisinvdocsOld.company,
                plant: myLisinvItem.plant,
                material: myLisinvItem.material,
                variant: myLisinvItem.variant,
                warehouse: myLisinvItem.warehouse,
                stockplace: myLisinvItem.stockplace,
                specialstock: myLisinvItem.specialstock,
                batchnum: myLisinvItem.batchnum,
            });

            if (olisinvstocks == null) {
                olisinvstocks = await lis.objectNew('lisinvstocks');
                lis.objectMove(pLisinvdocs, olisinvstocks);
                lis.objectMove(myLisinvItem, olisinvstocks);

                if (myLisinvItem.postway == 1) {
                    if (myLisinvItem.stocktype == 0)
                        olisinvstocks.aquantity += myLisinvItem.skquantity;
                    if (myLisinvItem.stocktype == 1)
                        olisinvstocks.qquantity += myLisinvItem.skquantity;
                    if (myLisinvItem.stocktype == 2)
                        olisinvstocks.bquantity += myLisinvItem.skquantity;
                    if (myLisinvItem.stocktype == 3)
                        olisinvstocks.rquantity += myLisinvItem.skquantity;

                    olisinvstocks.quantity =
                        olisinvstocks.aquantity +
                        olisinvstocks.qquantity +
                        olisinvstocks.bquantity +
                        olisinvstocks.rquantity;
                } else {
                    if (myLisinvItem.stocktype == 0)
                        olisinvstocks.aquantity -= myLisinvItem.skquantity;
                    if (myLisinvItem.stocktype == 1)
                        olisinvstocks.qquantity -= myLisinvItem.skquantity;
                    if (myLisinvItem.stocktype == 2)
                        olisinvstocks.bquantity -= myLisinvItem.skquantity;
                    if (myLisinvItem.stocktype == 3)
                        olisinvstocks.rquantity -= myLisinvItem.skquantity;

                    olisinvstocks.quantity =
                        olisinvstocks.aquantity +
                        olisinvstocks.qquantity +
                        olisinvstocks.bquantity +
                        olisinvstocks.rquantity;
                }

                await lisinvstocks.create(olisinvstocks);
            } else {

                if (myLisinvItem.postway == 1) {
                    if (myLisinvItem.stocktype == 0)
                        olisinvstocks.aquantity += myLisinvItem.skquantity;
                    if (myLisinvItem.stocktype == 1)
                        olisinvstocks.qquantity += myLisinvItem.skquantity;
                    if (myLisinvItem.stocktype == 2)
                        olisinvstocks.bquantity += myLisinvItem.skquantity;
                    if (myLisinvItem.stocktype == 3)
                        olisinvstocks.rquantity += myLisinvItem.skquantity;

                    olisinvstocks.quantity =
                        olisinvstocks.aquantity +
                        olisinvstocks.qquantity +
                        olisinvstocks.bquantity +
                        olisinvstocks.rquantity;
                } else {
                    if (myLisinvItem.stocktype == 0)
                        olisinvstocks.aquantity -= myLisinvItem.skquantity;
                    if (myLisinvItem.stocktype == 1)
                        olisinvstocks.qquantity -= myLisinvItem.skquantity;
                    if (myLisinvItem.stocktype == 2)
                        olisinvstocks.bquantity -= myLisinvItem.skquantity;
                    if (myLisinvItem.stocktype == 3)
                        olisinvstocks.rquantity -= myLisinvItem.skquantity;

                    olisinvstocks.quantity =
                        olisinvstocks.aquantity +
                        olisinvstocks.qquantity +
                        olisinvstocks.bquantity +
                        olisinvstocks.rquantity;
                }

                if (olisinvstocks.quantity == 0 & olisinvstocks.aquantity == 0 & olisinvstocks.qquantity == 0 &
                    olisinvstocks.bquantity == 0 & olisinvstocks.rquantity == 0) {
                    await lisinvstocks.deleteOne({
                        _id: olisinvstocks._id
                    })
                } else {
                    await lisinvstocks.findOneAndUpdate(
                        {
                            _id: olisinvstocks._id,
                        },
                        {
                            quantity: olisinvstocks.quantity,
                            aquantity: olisinvstocks.aquantity,
                            qquantity: olisinvstocks.qquantity,
                            bquantity: olisinvstocks.bquantity,
                            rquantity: olisinvstocks.rquantity,
                        }
                    );
                }

            }


        }
    }
    // Add records for pLisinvdocs --------------------------------

    for (let i in pLisinvdocs.items) {
        let myLisinvItem = pLisinvdocs.items[i];

        let olisinvstocks = await lisinvstocks.findOne({
            company: pLisinvdocs.company,
            plant: myLisinvItem.plant,
            material: myLisinvItem.material,
            variant: myLisinvItem.variant,
            warehouse: myLisinvItem.warehouse,
            stockplace: myLisinvItem.stockplace,
            specialstock: myLisinvItem.specialstock,
            batchnum: myLisinvItem.batchnum,
        });

        if (olisinvstocks == null) {
            olisinvstocks = await lis.objectNew('lisinvstocks');
            lis.objectMove(pLisinvdocs, olisinvstocks);
            lis.objectMove(myLisinvItem, olisinvstocks);

            if (myLisinvItem.postway == 0) {
                if (myLisinvItem.stocktype == 0)
                    olisinvstocks.aquantity += myLisinvItem.skquantity;
                if (myLisinvItem.stocktype == 1)
                    olisinvstocks.qquantity += myLisinvItem.skquantity;
                if (myLisinvItem.stocktype == 2)
                    olisinvstocks.bquantity += myLisinvItem.skquantity;
                if (myLisinvItem.stocktype == 3)
                    olisinvstocks.rquantity += myLisinvItem.skquantity;

                olisinvstocks.quantity =
                    olisinvstocks.aquantity +
                    olisinvstocks.qquantity +
                    olisinvstocks.bquantity +
                    olisinvstocks.rquantity;
            } else {
                if (myLisinvItem.stocktype == 0)
                    olisinvstocks.aquantity -= myLisinvItem.skquantity;
                if (myLisinvItem.stocktype == 1)
                    olisinvstocks.qquantity -= myLisinvItem.skquantity;
                if (myLisinvItem.stocktype == 2)
                    olisinvstocks.bquantity -= myLisinvItem.skquantity;
                if (myLisinvItem.stocktype == 3)
                    olisinvstocks.rquantity -= myLisinvItem.skquantity;

                olisinvstocks.quantity =
                    olisinvstocks.aquantity +
                    olisinvstocks.qquantity +
                    olisinvstocks.bquantity +
                    olisinvstocks.rquantity;
            }
            await lisinvstocks.create(olisinvstocks);
        } else {
            if (myLisinvItem.postway == 0) {
                if (myLisinvItem.stocktype == 0)
                    olisinvstocks.aquantity += myLisinvItem.skquantity;
                if (myLisinvItem.stocktype == 1)
                    olisinvstocks.qquantity += myLisinvItem.skquantity;
                if (myLisinvItem.stocktype == 2)
                    olisinvstocks.bquantity += myLisinvItem.skquantity;
                if (myLisinvItem.stocktype == 3)
                    olisinvstocks.rquantity += myLisinvItem.skquantity;

                olisinvstocks.quantity =
                    olisinvstocks.aquantity +
                    olisinvstocks.qquantity +
                    olisinvstocks.bquantity +
                    olisinvstocks.rquantity;
            } else {
                if (myLisinvItem.stocktype == 0)
                    olisinvstocks.aquantity -= myLisinvItem.skquantity;
                if (myLisinvItem.stocktype == 1)
                    olisinvstocks.qquantity -= myLisinvItem.skquantity;
                if (myLisinvItem.stocktype == 2)
                    olisinvstocks.bquantity -= myLisinvItem.skquantity;
                if (myLisinvItem.stocktype == 3)
                    olisinvstocks.rquantity -= myLisinvItem.skquantity;

                olisinvstocks.quantity =
                    olisinvstocks.aquantity +
                    olisinvstocks.qquantity +
                    olisinvstocks.bquantity +
                    olisinvstocks.rquantity;
            }

            if (olisinvstocks.quantity == 0 & olisinvstocks.aquantity == 0 & olisinvstocks.qquantity == 0 &
                olisinvstocks.bquantity == 0 & olisinvstocks.rquantity == 0) {
                await lisinvstocks.deleteOne({
                    _id: olisinvstocks._id
                })
            } else {
                await lisinvstocks.findOneAndUpdate(
                    {
                        _id: olisinvstocks._id,
                    },
                    {
                        quantity: olisinvstocks.quantity,
                        aquantity: olisinvstocks.aquantity,
                        qquantity: olisinvstocks.qquantity,
                        bquantity: olisinvstocks.bquantity,
                        rquantity: olisinvstocks.rquantity,
                    }
                );
            }

        }
    }
}
