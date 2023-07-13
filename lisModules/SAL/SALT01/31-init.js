
export default async function (params) {
    const olisinvdocs = await lisinvdocs.aggregate([
        { $unwind: "$items" },
        {
            $match: {
                company: params.lissaldocs.company,
                "items.refdoctype": params.lissaldocs.doctype,
                "items.refdocnum": params.lissaldocs.docnum,
                "items.refitemnum": params.item.itemnum,
            },
        },
    ]);



    return olisinvdocs[0];
}
