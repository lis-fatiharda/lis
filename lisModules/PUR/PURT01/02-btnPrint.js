import { v4 as UUID } from "uuid";

export default async function (dv) {
    const olisedndocs = new lisedndocs(lisedndocs.prototype.schema.tree);
    olisedndocs.company = dv.lispurdocs.company;
    olisedndocs.postway = 1;
    olisedndocs.edoctype = dv.lispurdocs.edoctype;
    olisedndocs.doctype = dv.lispurdocs.doctype;
    olisedndocs.docnum = dv.lispurdocs.docnum;
    olisedndocs.customer = dv.lispurdocs.customer;
    olisedndocs.name1 = dv.lispurdocs.name1;
    olisedndocs.docdate = new Date();
    olisedndocs.grandtotal = dv.lispurdocs.grandtotal;
    olisedndocs.currency = dv.lispurdocs.currency;
    olisedndocs._createdby = global.sys_user;

    //----------------------------

    const lisedn001 = await lisedn001.findOne({
        username: global.sys_user,
        doctype: dv.lispurdocs.doctype,
    });
    //--------------------------------------
    //  const myEinvonumber =
    //    lisedn001.gibprefix +
    //    new Date().getFullYear() +
    //    (await Numrange.getNewNumber({
    //      company: dv.lispurdocs.company,
    //      numrange: lisedn001.gibnumrange,
    //    }));
    //
    //  olisedndocs.einvonumber = myEinvonumber;
    //  dv.lispurdocs.einvonumber = myEinvonumber;
    //--------------------------------------

    const oliscustomers = await liscustomers.findOne({
        company: dv.lispurdocs.company,
        customer: dv.lispurdocs.customer,
        _deleted: false,
    });

    olisedndocs.alias = oliscustomers.einvmember.filter((e) => {
        return e.UNIT == "PK";
    })[0].ALIAS[0];

    //--------------------------------------
    const newUuid = UUID.v4();
    olisedndocs.einvouuid = newUuid;
    dv.lispurdocs.einvouuid = newUuid;
    olisedndocs.edistr = await Emember.createInvFromPur(
        dv.lispurdocs,
        olisedndocs
    );
    console.log(olisedndocs.edistr);

    //----fetch SESSION_ID----

    const mySession_Id = await Emember.login().catch((err) => {
        throw new Error("SESSION_ID Alınamadı!");
    });

    await Emember.sendEarchive(mySession_Id, olisedndocs.edistr).catch(
        (err) => {
            throw new Error("Portala Gönderilemedi!");
        }
    );

    const olisedndocsSave = new lisedndocs(lisedndocs);
    await olisedndocsSave.save().catch((err) => {
        console.log(err);
        throw new Error("Kuyruğa GÖnderilemedi!");
    });

    return dv;
}
