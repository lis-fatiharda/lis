export default async function (params) {
    const olispur004 = await lispur004.find({
        fromdoctype: params.doctype,
        _deleted: false,
    });


    const ctrlStop = await lispurdocs.findOne({
        doctype: params.doctype,
        docnum: params.docnum,
        _deleted: false,
    })

    if (ctrlStop.isstop == true) {
        throw new Error("Durdurulmuş Belge Kopyalanamaz !");

    }
    if (ctrlStop.issignature == 1) {
        throw new Error("İmzalanmamış Belge Kopyalanamaz !");

    }
    console.log(olispur004);
    return olispur004;
}
