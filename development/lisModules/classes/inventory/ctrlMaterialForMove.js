
export default async function ctrlMaterialForMove(pCompany, pItem) {
    let olismaterials = await lismaterials.findOne({
        company: pCompany,
        material: pItem.material,
    });

    if (olismaterials === null) new Error("Malzeme Kartı Bulunamadı!");

    //----------------------------------------------------------------
    let ctrlmatPlant = olismaterials.matstock.findIndex(
        (e) => e.plant == pItem.plant
    );
    if (ctrlmatPlant == -1) new Error("Malzeme Tesisi Tanımlı Değil!");

    //----------------------------------------------------------------
    let ctrlmatWarehouse = olismaterials.matstock.findIndex(
        (e) => e.plant == pItem.plant && e.warehouse == pItem.warehouse
    );
    if (ctrlmatWarehouse == -1)
      throw new Error("Malzeme Deposu Tanımlı Değil!");
    //----------------------------------------------------------------
    let ctrlmatStockplace = olismaterials.matstock.findIndex(
        (e) =>
            e.plant == pItem.plant &&
            e.warehouse == pItem.warehouse &&
            e.stockplace == pItem.stockplace
    );
    if (ctrlmatStockplace == -1)
      throw new Error("Malzeme Stokyeri Tanımlı Değil!");
    
    const olisbas009 = await lisbas009.findOne({
        company: pCompany,
        mattype: pItem.mattype,
    });

    if (olisbas009 == null) new Error("Malzeme Tipi Bulunamadı!");

    return true;
}
