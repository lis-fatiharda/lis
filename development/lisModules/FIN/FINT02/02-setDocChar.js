
export default async function (pLisfindoc) {

    const olisfin003 = await lisfin003.findOne({
        company: pLisfindoc.company,
        doctype: pLisfindoc.doctype
    })

    return olisfin003;
}
