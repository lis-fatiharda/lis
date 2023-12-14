export default async function (Args) {
    
    if (Args.modi == 0) {
        if (Args.docnum != "") {
            var lisfindoc = await lisfindocs.findOne({
                company: Args.company,
                doctype: Args.doctype,
                docnum: Args.docnum,
            });

            lisfindoc._id = undefined;
            lisfindoc.docnum = "";
        } else {
            var lisfindoc = await lis.objectNew("lisfindocs");
            lisfindoc.company = Args.company;
        }
    } else {
        var lisfindoc = await lisfindocs.findOne({
            company: Args.company,
            doctype: Args.doctype,
            docnum: Args.docnum,
        });
    }

    return lisfindoc;
}
