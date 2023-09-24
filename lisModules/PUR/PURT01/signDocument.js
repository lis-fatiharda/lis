export default async function (plispurdocs) {

    let signaturestatus = await Purchase.signDocument(plispurdocs)
    
    return signaturestatus;
}
