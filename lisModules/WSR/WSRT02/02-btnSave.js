
export default async function (dv) {
    // Create Account

    // Save the Document*********************
    if (dv.modi == 0) {
        // Save the new Document*********************

        await lisapikeys.create(dv.lisapikeys);
    } else {
        // Update The Document**************

        await lisapikeys.findOneAndUpdate(
            { _id: dv.lisapikeys._id },
            dv.lisapikeys,
            {
                new: true,
                upsert: true,
            }
        );
    }

    dv.lisapikeys = {};

    return dv;
}
