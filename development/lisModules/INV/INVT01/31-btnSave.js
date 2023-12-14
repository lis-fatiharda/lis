export default async function (dv) {
    const olisinvdocs = await Inventory.createTransfer(
        dv.company,
        dv.movecode,
        dv.docdate,
        dv.curdate,
        dv.transferTable,
        dv.stext
    );

    return olisinvdocs;
}
