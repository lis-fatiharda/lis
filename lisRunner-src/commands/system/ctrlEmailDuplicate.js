export default async function (dv) {

    let olyzprojects = await lyzprojects.findOne({
        "users.email": dv.dv.olisusers[0].email,
        "users.username": dv.dv.olisusers[0].email,
        product: "EXPRESS",
        _deleted: false,
    });

    if (olyzprojects != null) new Error("E-Posta LisExpress Sisteminde Kullanımdadır. Lütfen Farklı Bir E-Posta Giriniz!!")

    return dv;
}
