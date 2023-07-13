export default async function (dv) {
    // Save the Document*********************
    if (dv.modi == 0) {
        // Save the new Document*********************
        await Finance.save({ plisfindocs: dv.lisfindocs, modi: 0 });
    } else {
        // Update The Document**************
        await Finance.save({ plisfindocs: dv.lisfindocs, modi: 1 });
    }
 
    dv.lisfindocs = {};

    return dv;
}
