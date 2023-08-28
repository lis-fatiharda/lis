
export default async function createTransfer(
    pCompany,
    pMovecode,
    pDocdate,
    pCurdate,
    pTransferTable,
    pStext
) {
    let pItemnum = 0;
    const olisinvdocs = new lisinvdocs(
        lisinvdocs.prototype.schema.tree
    ).toObject();
    olisinvdocs.items = [];

    const olisinv006 = await lisinv006.findOne({
        company: pCompany,
        movecode: pMovecode,
        postway: 2, // for transfer
    });

    if (olisinv006 == null)
        throw new Error(`${pMovecode} Hareket Kodu Bulunamadı!`);
    olisinvdocs.company = pCompany;
    olisinvdocs.doctype = olisinv006.doctype;

    const olisinv007 = await lisinv007.findOne({
        company: olisinvdocs.company,
        doctype: olisinvdocs.doctype,
    });
    if (olisinv007 == null)
        throw new Error(
            `${olisinvdocs.doctype} Envanter Belge Tipi Bulunamadı!`
        );
    olisinvdocs.docnum = await Numrange.getNewNumber({
        company: olisinvdocs.company,
        numrange: olisinv007.numrange,
    });

    olisinvdocs.docdate = pDocdate;
    olisinvdocs.curdate = pCurdate;
    olisinvdocs.stext = pStext;

    for (let row in pTransferTable) {
        const olismaterials = await lismaterials.findOne({
            company: pCompany,
            material: pTransferTable[row].material,
            _deleted: false,
        });
        if (olismaterials == null)
            throw new Error(
                `${pTransferTable[row].material} Malzeme Bulunamadı!`
            );

        const olisbas009 = await lisbas009.findOne({
            company: pCompany,
            mattype: olismaterials.mattype,
        });

        if (olisbas009 == null)
            throw new Error(
                `${olismaterials.mattype} Malzeme Tipi Bulunamadı!`
            );

        //------ Exit ---------

        let newItem = new lisinvdocs(
            lisinvdocs.prototype.schema.tree
        ).toObject();
        newItem = newItem.items[0];

        pItemnum += 10;

        //-

        lis.objectMove(olisinv006, newItem);

        newItem.postway = 1;
        newItem.itemnum = pItemnum;
        newItem.matgrp = olismaterials.matgrp;
        newItem.mattype = olismaterials.mattype;
        newItem.material = olismaterials.material;
        newItem.mtext = olismaterials.mtext;

        //** Inventory */
        newItem.movecode = pMovecode;
        newItem.invmanag = olisbas009.invmanag;
        newItem.ordertype = "N";
        newItem.plant = pTransferTable[row].plant1;
        newItem.warehouse = pTransferTable[row].warehouse1;
        newItem.stockplace = pTransferTable[row].stockplace1;
        newItem.specialstock = pTransferTable[row].specialstock1;
        newItem.batchnum = pTransferTable[row].batchnum1;
        newItem.stocktype = olisinv006.fromstocktype;
        newItem.isstocktran = true;

        newItem.quantity = pTransferTable[row].quantity;
        newItem.qunit = pTransferTable[row].qunit;
        newItem.skquantity = pTransferTable[row].quantity;
        newItem.skunit = pTransferTable[row].qunit;

        olisinvdocs.items.push(newItem);

        //------ Enterance ---------

        newItem = new lisinvdocs(lisinvdocs.prototype.schema.tree).toObject();
        newItem = newItem.items[0];

        pItemnum += 10;

        //-

        lis.objectMove(olisinv006, newItem);

        newItem.postway = 0;
        newItem.itemnum = pItemnum;
        newItem.matgrp = olismaterials.matgrp;
        newItem.mattype = olismaterials.mattype;
        newItem.material = olismaterials.material;
        newItem.mtext = olismaterials.mtext;

        //** Inventory */
        newItem.movecode = pMovecode;
        newItem.invmanag = olisbas009.invmanag;
        newItem.ordertype = "N";
        newItem.plant = pTransferTable[row].plant2;
        newItem.warehouse = pTransferTable[row].warehouse2;
        newItem.stockplace = pTransferTable[row].stockplace2;
        newItem.specialstock = pTransferTable[row].specialstock2;
        newItem.batchnum = pTransferTable[row].batchnum2;
        newItem.stocktype = olisinv006.tostocktype;
        newItem.isstocktran = true;

        newItem.quantity = pTransferTable[row].quantity;
        newItem.qunit = pTransferTable[row].qunit;
        newItem.skquantity = pTransferTable[row].quantity;
        newItem.skunit = pTransferTable[row].qunit;

        olisinvdocs.items.push(newItem);
    }

    await Inventory.saveMovement(olisinvdocs, pMovecode, 0);

    return olisinvdocs;
}
