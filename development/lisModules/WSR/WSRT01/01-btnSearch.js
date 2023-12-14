
export default async function (dv) {
    dv.liswebservicesList = await liswebservices.find({
        project: lis.like(dv.sc.project),
        name: lis.like(dv.sc.name),
        _deleted: false,
    });

    return dv;
}
