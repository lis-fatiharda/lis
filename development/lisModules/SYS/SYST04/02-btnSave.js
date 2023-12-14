import { lisnumranges } from "../../../lisModels/lisnumranges.js";

export default async function (dv) {
    if (dv.modi == 0) {
        const olisnumranges = new lisnumranges(dv.olisnumranges);
        await olisnumranges
            .save()
            .then((res) => {})
            .catch((err) => {
                throw err;
            });
    } else {
        await lisnumranges.findOneAndUpdate(
            { _id: dv.olisnumranges._id },
            dv.olisnumranges,
            { new: true, upsert: true }
        );
    }

    dv.olisnumranges = {};

    return dv;
}
