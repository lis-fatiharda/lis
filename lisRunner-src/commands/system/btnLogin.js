// This function is login button of login component

import { v4 as UUID } from "uuid";

export default async function btnLogin(dv) {

    let olisusers = null;

    if (sys_productLicense == "PREMIUM") {
        olisusers = await lisusers.findOne({
            $or: [{ username: dv.sys_userVmail }, { email: dv.sys_userVmail }],
            password: dv.passwordHashed,
        });
    }
    if (sys_productLicense == "EXPRESS") {
        olisusers = await lisusers.findOne({
            email: dv.sys_email,
            password: dv.passwordHashed,
        });
    }

    // --- Controls before Login ---

    if (olisusers == null) throw new Error("Kullanıcı İsmi veya Şifre Yanlış!");
    if (olisusers.isblocked == true) throw new Error("Kullanıcı Blokeli!");

    dv.sys_user = olisusers.username;
    dv.sys_email = olisusers.email;

    const ctrlUserLogin = await lisuserlogins.find(
        { username: dv.sys_user },
        null,
        { sort: { logindate: 1 } }
    );

    if (ctrlUserLogin.length >= olisusers.loginright) {
        await lisuserlogins.deleteMany({ _id: ctrlUserLogin[0]._id });
    }

    const ctrlUserLicense = await lisuserlogins.find();

    if (ctrlUserLicense.length >= global.sys_userLicense) {
        throw new Error("Kullanıcı Sayısı Aşıldı!");
    }

    dv.sys_token = UUID();

    await lisuserlogins.create({
        username: olisusers.username,
        token: dv.sys_token,
        logindate: new Date(),
    });

    return dv;
}
