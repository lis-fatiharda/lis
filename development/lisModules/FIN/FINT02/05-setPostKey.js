
export default async function (Args) {

    const olisfin002 = await lisfin002.findOne({
        company: Args.company,
        postkey: Args.postkey
    })



    return olisfin002;
}
