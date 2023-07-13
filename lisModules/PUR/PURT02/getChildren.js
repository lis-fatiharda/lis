export default async function getChildren(
    pCompany,
    pBusarea,
    pDoctype,
    pDocnum,
    pItemnum
) {
    console.log(
        "getChildren",
        pCompany,
        pBusarea,
        pDoctype,
        pDocnum,
        pItemnum
    );
    let myChildren = await lispurdocs.aggregate([
        { $unwind: "$items" },
        {
            $match: {
                company: pCompany,
                busarea: pBusarea,
                "items.refdoctype": pDoctype,
                "items.refdocnum": pDocnum,
                "items.refitemnum": pItemnum,
                _deleted: false,
            },
        },
    ]);
    console.log("myChildren", myChildren);
    return myChildren;
};
