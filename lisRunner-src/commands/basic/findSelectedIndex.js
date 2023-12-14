
export default async function findSelectedIndex(pTable) {


    return pTable.findIndex((e) => e._selected == true);
}
