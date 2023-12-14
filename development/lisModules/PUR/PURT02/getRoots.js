export default async function getRoots(
    pCompany,
    pBusarea,
    pDoctype,
    pDocnum,
    pItemnum
) {
    let myRoots = await lispurdocs.aggregate([
        { $unwind: "$items" },
        {
            $match: {
                company: pCompany,
                busarea: pBusarea,
                doctype: pDoctype,
                docnum: pDocnum,
                "items.itemnum": pItemnum,
                _deleted: false,
            },
        },
    ]);
    if (myRoots.length > 0) {
        return myRoots[0];
    } else {
        return false;
    }
}
