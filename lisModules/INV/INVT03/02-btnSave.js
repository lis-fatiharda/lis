
export default async function (dv) {
    // Save the Document*********************
    if (dv.modi == 1) {
        // Save the new Document*********************

        await Inventory.saveMovement(
            dv.lisinvdocs,
            dv.lisinvdocs.items[0].movecode,
            1
        );
    }

    return dv;
}
