export default async function btnChangePk(dv) {
    let selectedRow = dv.lisedndocsList.findIndex((e) => e._selected == true);
    let pkList = [];

    const oliscustomer = await liscustomers.findOne({
        company: dv.lisedndocsList[selectedRow].company,
        customer: dv.lisedndocsList[selectedRow].customer,
        _deleted: false,
    });

    if (dv.lisedndocsList[selectedRow].edoctype == 1) {
        //E-Invoice
        for (let k in oliscustomer.einvmember) {
            pkList.push(oliscustomer.einvmember[k].ALIAS[0]);
        }
    }
    if (dv.lisedndocsList[selectedRow].edoctype == 3) {
        //E-Delivery
        for (let k in oliscustomer.edelmember) {
            pkList.push(oliscustomer.edelmember[k].ALIAS[0]);
        }
    }

    return pkList;
}
