
export default async function init() {
    //*** Discounts */

    const discOptsH = await lissal005.find({
        company: dv.sc.company,
        usage: 0,
        _deleted: false,
    });
    const discOpts = await lissal005.find({
        company: dv.sc.company,
        usage: 1,
        _deleted: false,
    });

    return { discOptsH, discOpts };
}
