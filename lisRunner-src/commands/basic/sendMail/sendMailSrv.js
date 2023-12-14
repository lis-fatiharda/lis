import nodeMailer from "nodemailer";

export default async function sendMail(Args) {
    if (Args.from != "system@liserp.com") {
        const olisclb004 = await lisclb004.findOne({
            email: Args.from,
            username: sys_user,
        });

        if (olisclb004 == null)
          throw new Error(
                `Mail : ${Args.from} İçin Kullanıcı : ${sys_user} Yetkisi Tanımlı Değil!`
            );

        //let testAccount = await nodeMailer.createTestAccount();

        const olisclb003 = await lisclb003.findOne({
            email: Args.from,
        });

        // create reusable transporter object using the default SMTP transport
        let transporter = nodeMailer.createTransport({
            host: olisclb003.host,
            port: olisclb003.port,
            secure: olisclb003.secure, // true for 465, false for other ports
            auth: {
                user: Args.from, // generated ethereal user
                pass: Args.password, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter
            .sendMail({
                from: Args.from, // sender address
                to: Args.to, // list of receivers
                cc: Args.cc,
                subject: Args.subject, // Subject line
                text: Args.text, // plain text body
                html: Args.html, // html body
            })
            .catch(async (error) => {
              throw new Error(error);
            });
    } else {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodeMailer.createTransport({
            host: "srvc96.turhost.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "system@liserp.com", // generated ethereal user
                pass: "Kj8|@{O-", // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter
            .sendMail({
                from: "system@liserp.com", // sender address
                to: Args.to, // list of receivers
                //cc: Args.cc,
                subject: Args.subject, // Subject line
                text: Args.text, // plain text body
                html: Args.html, // html body
            })
            .catch(async (error) => {
              throw new Error(error);
            });
    }
}
