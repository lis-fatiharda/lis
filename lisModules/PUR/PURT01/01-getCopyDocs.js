
export default async function (params) {
    const olispur004 = await lispur004.find({
        fromdoctype: params.doctype,
        _deleted: false,
    });

    console.log(olispur004);
    return olispur004;
}
