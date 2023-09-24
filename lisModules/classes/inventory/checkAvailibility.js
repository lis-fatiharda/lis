export default async function checkAvailibility(
    pCompany,
    pPlant,
    pWarehouse,
    pStockplace,
    pSpecialstock,
    pBatchnum,
    pStocktype,
    pDocdate,
    pMaterial,
    pVariant,
    pQuantity
) {
    const olisinvstocks = await lisinvstocks.findOne({
        company: pCompany,
        material: pMaterial,
        variant: pVariant,
        plant: pPlant,
        warehouse: pWarehouse,
        stockplace: pStockplace,
        specialstock: pSpecialstock,
        batchnum: pBatchnum,
    });

    if (olisinvstocks == null) {
        throw new Error(
            `${pMaterial} Malzemesi İçin ${lis.format(
                sys_currentDate,
                "dd.MM.yyyy"
            )} Tarihinde Yeterli Stok Bulunmamaktadır!`
        );
    }

    const olisinvdocs = await lisinvdocs.aggregate([
        {
            $unwind: "$items",
        },
        {
            $match: {
                company: pCompany,
                "items.material": pMaterial,
                "items.variant": pVariant,
                "items.plant": pPlant,
                "items.warehouse": pWarehouse,
                "items.stockplace": pStockplace,
                "items.specialstock": pSpecialstock,
                "items.batchnum": pBatchnum,
                "items.stocktype": pStocktype,
                docdate: {
                    $gte: pDocdate,
                },
                _deleted: false,
            },
        },
        {
            $sort: {
                docdate: -1,
            },
        },
    ]);

    let currentStock = 0;

    if (pStocktype == 0) {
        currentStock = olisinvstocks.aquantity;
    }
    if (pStocktype == 1) {
        currentStock = olisinvstocks.qquantity;
    }
    if (pStocktype == 2) {
        currentStock = olisinvstocks.bquantity;
    }
    if (pStocktype == 3) {
        currentStock = olisinvstocks.rquantity;
    }
    if (pQuantity > currentStock)
        throw new Error(
            `${pMaterial} Malzemesi İçin ${lis.format(
                sys_currentDate,
                "dd.MM.yyyy"
            )} Tarihinde Yeterli Stok Bulunmamaktadır!`
        );
    for (let i in olisinvdocs) {
        if (olisinvdocs[i].items.postway == 0) {
            currentStock -= olisinvdocs[i].items.skquantity;
        } else {
            currentStock += olisinvdocs[i].items.skquantity;
        }
        if (pQuantity > currentStock)
            throw new Error(
                `${pMaterial} Malzemesi İçin ${lis.format(
                    olisinvdocs[i].docdate,
                    "dd.MM.yyyy"
                )} Tarihinde Yeterli Stok Bulunmamaktadır!`
            );
    }
}
