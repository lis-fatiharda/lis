// add new lock according to lock parameters
// Args: {
//  string : service, // ? Defined on clb support object
//  string : from, // ? Defined on clb support object
//  string : to,
//  string : cc,
//  string : subject,
//  string : text,
//  string : html,
// }

export default async function sendMail(Args) {
    
    await this.lisFunction("cmp-commands/basic/sendMail.sendMailSrv", Args);
    this.alert("p", "Mail Gönderildi.")
}
