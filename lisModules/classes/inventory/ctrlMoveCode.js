
export default async function ctrlMoveCode(
    pCompany,
    pMaterial,
    pMoveCode,
    pOrderType,
    pSpecialStock
) {
    const olismaterials = await lismaterials.findOne({
        company: pCompany,
        material: pMaterial,
    });

    const olisbas009 = await lisbas009.findOne({
        company: pCompany,
        mattype: olismaterials.mattype,
    });

    if (olisbas009 == null) throw new Error("Malzeme Tipi Bulunamadı!");

    const olisinv006 = await lisinv006.findOne({
        company: pCompany,
        movecode: pMoveCode,
        invmanag: olisbas009.invmanag,
        ordertype: pOrderType,
        specialstock: pSpecialStock,
    });

    if (olisinv006 == null)
        throw new Error(
            pMoveCode +
                "-" +
                olisbas009.invmanag +
                "-" +
                pOrderType +
                "-" +
                pSpecialStock +
                " / Hareket Kodu Bulunamadı!"
        );

    return olisinv006;
}
