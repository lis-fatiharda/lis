export default async function btnSendPwd(Args) {

    if (Args.express != true) {
        const olisusers = await lisusers.findOne({
            email: Args.email,
        });

        // --- Controls before Login ---

        if (olisusers == null) new Error("Mail Hatalı!");
        if (olisusers.isblocked == true) new Error("Kullanıcı Blokeli!");

        //------------------------------

        let newPassword = Math.random() * 1000000;

        newPassword = newPassword.toString().substring(0, 6);

        const newPaswordHashed = lis.sha256(newPassword);

        await lisusers.updateOne(
            {
                email: olisusers.email,
            },
            {
                $set: {
                    password: newPaswordHashed,
                },
            }
        );

        await lis.sendMail({
            from: "system@liserp.com",
            to: olisusers.email,
            subject: "Lis Şifre Değişikliği",
            html: `<div>Lis kullanıcı Şifreniz değiştirildi.</div><div>Şifre : ${newPassword}</div>`,
        });
    } else {

        let olyzprojects = await lyzprojects.findOne({
            "users.email": Args.email,
        });

        if (olyzprojects == null) new Error("Mail Hatalı!");

        let newPassword = Math.random() * 1000000;

        newPassword = newPassword.toString().substring(0, 6);

        const newPaswordHashed = lis.sha256(newPassword);

        let myApiUrl = olyzprojects.apiurl + "cmd-system.updatePassword"

        await lis.callWebService(myApiUrl, { email: Args.email, password: newPaswordHashed })


        await lis.sendMail({
            from: "system@liserp.com",
            to: Args.email,
            subject: "Lis Şifre Değişikliği",
            html: `<div>Lis kullanıcı Şifreniz değiştirildi.</div><div>Şifre : ${newPassword}</div>`,
        });
    }

}
