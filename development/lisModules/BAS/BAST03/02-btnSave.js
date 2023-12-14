export default async function (Args) {
    if (Args.modi == 0) {
        // Get Material Number**************
        Args.lismaterial.material = await Numrange.getNewNumber({
            company: Args.lismaterial.company,
            numrange: "BAST03",
            manuelNumber: Args.lismaterial.material,
        });

        // Controls before Save ****************

        if (Args.lismaterial.material == "") {
          throw new Error("Malzeme Kodu Boş Olamaz!!");
        }

        // Save the Document*********************
        await lismaterials.create(Args.lismaterial);
    } else {
        await lismaterials
            .findOneAndUpdate({ _id: Args.lismaterial._id }, Args.lismaterial, {
                new: true,
                upsert: true,
            })
            .catch((err) => {
              throw new Error(err.message);
            });
    }

    return Args;
}
