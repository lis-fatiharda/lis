import lisinv006 from "../../../lisModels/lisinv006.js";
import lisbas009 from "../../../lisModels/lisbas009.js";
import lismaterials from "../../../lisModels/lismaterials.js";

export default async function ctrlMoveCode(
    pCompany,
    pMaterial,
    pMoveCode,
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
        code: pMoveCode,
        invmanag: olisbas009.invmanag,
        specialstock: pSpecialStock,
    });

    if (olisinv006 == null)
        throw new Error(
            pMoveCode +
                "-" +
                olisbas009.invmanag +
                "-" +
                pSpecialStock +
                " / Hareket Kodu Bulunamadı!"
        );

    return olisinv006;
}
