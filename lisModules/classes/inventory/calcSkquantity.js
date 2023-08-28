export default async function calcSkquantity(
    pCompany,
    pMaterial,
    pQuantity,
    pUnit
) {
    let skQuantity = 0;

    let olismatunits = await lismaterials.aggregate([
        {
            $unwind: "$matunits",
        },
        {
            $match: {
                company: pCompany,
                material: pMaterial,
                "matunits.unit": pUnit,
            },
        },
    ]);

    if (olismatunits.length <= 0) {
        throw new Error(
            `${pMaterial} Malzemesi İçin ${pUnit} Birimi Bulunamadı!`
        );
    }

    //-----
    
    skQuantity =
        (pQuantity * olismatunits[0].matunits.value) /
        olismatunits[0].matunits.perunit;

    return skQuantity;
}
