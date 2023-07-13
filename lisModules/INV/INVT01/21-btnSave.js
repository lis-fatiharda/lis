export default async function ({ olisinvdocs, pMovecode }) {

    olisinvdocs = await Inventory.saveMovement(olisinvdocs, pMovecode, 0).catch(
        (err) => {
            throw new Error(err.message);
        } 
    );

    return olisinvdocs;
}
