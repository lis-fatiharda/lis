
export default async function (dv) {
    dv.lisapikeysList = await lisapikeys.find({
        project: lis.like(dv.sc.project),
        name: lis.like(dv.sc.name),
        _deleted: false,
    });

    return dv;
}
