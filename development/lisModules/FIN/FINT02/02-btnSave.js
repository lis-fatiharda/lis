export default async function (Args) {
    // Save the Document*********************
    if (Args.modi == 0) {
        // Save the new Document*********************
        await Finance.save({ plisfindocs: Args.lisfindoc, modi: 0 });
    } else {
        // Update The Document**************
        await Finance.save({ plisfindocs: Args.lisfindoc, modi: 1 });
    }
 
    Args.lisfindoc = {};

    return Args;
}
