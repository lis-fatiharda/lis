import lisinvstocks from "../../../lisModels/lisinvstocks.js";

export default async function saveMovement(
    pLisinvdocs,
) {
    // Controls before save --------------------------------

    for (let i in pLisinvdocs.items) {
        let myLisinvItem = pLisinvdocs.items[i];

        let olisinvstocks = await lisinvstocks.findOne({
            company: pLisinvdocs.company,
            plant: myLisinvItem.plant,
            material: myLisinvItem.material,
            warehouse: myLisinvItem.warehouse,
            stockplace: myLisinvItem.stockplace,
            specialstock: myLisinvItem.specialstock,
            batchnum: myLisinvItem.batchnum,
        });

        if (olisinvstocks == null) {
            olisinvstocks = new lisinvstocks(
                lisinvstocks.prototype.schema.tree
            );

            olisinvstocks = olisinvstocks._doc;

            lis.objectMove(pLisinvdocs, olisinvstocks);
            lis.objectMove(myLisinvItem, olisinvstocks);

            if (myLisinvItem.postway == false) {
                if (myLisinvItem.stocktype == 0)
                    olisinvstocks.aquantity += myLisinvItem.quantity;
                if (myLisinvItem.stocktype == 1)
                    olisinvstocks.qquantity += myLisinvItem.quantity;
                if (myLisinvItem.stocktype == 2)
                    olisinvstocks.bquantity += myLisinvItem.quantity;
                if (myLisinvItem.stocktype == 3)
                    olisinvstocks.rquantity += myLisinvItem.quantity;

                olisinvstocks.quantity =
                    olisinvstocks.aquantity +
                    olisinvstocks.qquantity +
                    olisinvstocks.bquantity +
                    olisinvstocks.rquantity;
            } else {
                if (myLisinvItem.stocktype == 0)
                    olisinvstocks.aquantity -= myLisinvItem.quantity;
                if (myLisinvItem.stocktype == 1)
                    olisinvstocks.qquantity -= myLisinvItem.quantity;
                if (myLisinvItem.stocktype == 2)
                    olisinvstocks.bquantity -= myLisinvItem.quantity;
                if (myLisinvItem.stocktype == 3)
                    olisinvstocks.rquantity -= myLisinvItem.quantity;

                olisinvstocks.quantity =
                    olisinvstocks.aquantity +
                    olisinvstocks.qquantity +
                    olisinvstocks.bquantity +
                    olisinvstocks.rquantity;
            }
            olisinvstocks = new lisinvstocks(olisinvstocks);
            olisinvstocks.save();
        } else {
            if (myLisinvItem.postway == false) {
                if (myLisinvItem.stocktype == 0)
                    olisinvstocks.aquantity += myLisinvItem.quantity;
                if (myLisinvItem.stocktype == 1)
                    olisinvstocks.qquantity += myLisinvItem.quantity;
                if (myLisinvItem.stocktype == 2)
                    olisinvstocks.bquantity += myLisinvItem.quantity;
                if (myLisinvItem.stocktype == 3)
                    olisinvstocks.rquantity += myLisinvItem.quantity;

                olisinvstocks.quantity =
                    olisinvstocks.aquantity +
                    olisinvstocks.qquantity +
                    olisinvstocks.bquantity +
                    olisinvstocks.rquantity;
            } else {
                if (myLisinvItem.stocktype == 0)
                    olisinvstocks.aquantity -= myLisinvItem.quantity;
                if (myLisinvItem.stocktype == 1)
                    olisinvstocks.qquantity -= myLisinvItem.quantity;
                if (myLisinvItem.stocktype == 2)
                    olisinvstocks.bquantity -= myLisinvItem.quantity;
                if (myLisinvItem.stocktype == 3)
                    olisinvstocks.rquantity -= myLisinvItem.quantity;

                olisinvstocks.quantity =
                    olisinvstocks.aquantity +
                    olisinvstocks.qquantity +
                    olisinvstocks.bquantity +
                    olisinvstocks.rquantity;
            }
            olisinvstocks = new lisinvstocks(olisinvstocks);
            olisinvstocks.save();
        }
    }
}
