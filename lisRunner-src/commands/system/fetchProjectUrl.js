export default async function (dv) {

    let olyzprojects = await lyzprojects.findOne({
        "users.email": dv.sys_email,
        product: "EXPRESS",
        _deleted: false,
    });

    //console.log("fetchProjectUrl", olyzprojects)

    if (olyzprojects == null) new Error("Mail veya Şifre Hatalı!")

    dv.url = olyzprojects.url;
    dv.apiurl = olyzprojects.apiurl;

    //--- Login to project ---

    return dv;
}
