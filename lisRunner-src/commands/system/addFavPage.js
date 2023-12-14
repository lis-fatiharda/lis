export default async function addFavPage(params) {
    const tmplisusers = await lisusers.findOne({
        username: sys_user,
    });

    console.log(tmplisusers);

    let pageIndex = tmplisusers.favpages.indexOf(params.pPage);

    

    if (pageIndex == -1) {
        tmplisusers.favpages.push(params.pPage);
        console.log(tmplisusers);

        await lisusers.updateOne({ _id: tmplisusers._id }, tmplisusers);
    } else {
        tmplisusers.favpages.splice(pageIndex, 1);
        console.log(tmplisusers);

        await lisusers.updateOne({ _id: tmplisusers._id }, tmplisusers);
    }
}
