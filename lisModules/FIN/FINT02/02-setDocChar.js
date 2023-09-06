
export default async function (dv) {

    const olisfin003 = await lisfin003.findOne({
        company: dv.lisfindocs.company,
        doctype: dv.lisfindocs.doctype
    })


    dv.postKeyList = olisfin003.postkeys;

    return dv.postKeyList;
}
