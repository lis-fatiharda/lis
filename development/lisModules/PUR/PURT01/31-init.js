
export default async function (params) {
    const olisinvdocs = await lisinvdocs.aggregate([
        { $unwind: "$items" },
        {
            $match: {
                company: params.lispurdocs.company,
                "items.refdoctype": params.lispurdocs.doctype,
                "items.refdocnum": params.lispurdocs.docnum,
                "items.refitemnum": params.item.itemnum,
            },
        },
    ]);



    return olisinvdocs[0];
}
