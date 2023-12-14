export default async function (plissaldocs) {

    let signaturestatus = await Sales.signDocument(plissaldocs)
    
    return signaturestatus;
}
