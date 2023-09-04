
export default async function (dv) {
    dv.lisapiKeysList = await lisapiKeys.find({
        project: lis.like(dv.sc.project),
        name: lis.like(dv.sc.name),
        _deleted: false,
    });

    return dv;
}
