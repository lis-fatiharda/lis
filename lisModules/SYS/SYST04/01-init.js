export default async function (dv) {
    dv.sc.companyOpts = await lisbas001.find({ _deleted: 0 });
    dv.partTypeOpts = [
        { value: "Otomatik" },
        { value: "Manuel" },
        { value: "Yıl" },
        { value: "Ay" },
        { value: "Gün" },
    ];
    return dv;
}
