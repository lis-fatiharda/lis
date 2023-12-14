
export default async function (dv) {
    // Create Account

    // Save the Document*********************
    if (dv.modi == 0) {
        // Save the new Document*********************

        await lisapiKeys.create(dv.lisapiKeys);
    } else {
        // Update The Document**************

        await lisapiKeys.findOneAndUpdate(
            { _id: dv.lisapiKeys._id },
            dv.lisapiKeys,
            {
                new: true,
                upsert: true,
            }
        );
    }

    dv.lisapiKeys = {};

    return dv;
}
