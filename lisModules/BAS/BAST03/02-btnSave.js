export default async function (dv) {
    if (dv.modi == 0) {
        // Get Material Number**************
        dv.lismaterials.material = await Numrange.getNewNumber({
            company: dv.sc.company,
            numrange: "BAST03",
            manuelNumber: dv.lismaterials.material,
        });

        // Controls before Save ****************

        if (dv.lismaterials.material == "") {
            throw new Error("Malzeme Kodu Boş Olamaz!!");
        }

        // Save the Document*********************
        await lismaterials.create(dv.lismaterials);
    } else {
        await lismaterials
            .findOneAndUpdate({ _id: dv.lismaterials._id }, dv.lismaterials, {
                new: true,
                upsert: true,
            })
            .catch((err) => {
                throw new Error(err.message);
            });
    }

    dv.lismaterials = {};

    return dv;
}
