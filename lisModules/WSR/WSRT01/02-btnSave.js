
export default async function (dv) {
    // Create Account

    // Save the Document*********************
    if (dv.modi == 0) {
        // Save the new Document*********************

        await liswebservices.create(dv.liswebservices);
    } else {
        // Update The Document**************

        await liswebservices.findOneAndUpdate(
            { _id: dv.liswebservices._id },
            dv.liswebservices,
            {
                new: true,
                upsert: true,
            }
        );
    }

    dv.liswebservices = {};

    return dv;
}
