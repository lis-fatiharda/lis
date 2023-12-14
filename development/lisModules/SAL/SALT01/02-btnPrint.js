import { v4 as UUID } from "uuid";
export default async function (dv) {

    const olisedndocs = new lisedndocs(lisedndocs.prototype.schema.tree);
    olisedndocs.company = dv.lissaldocs.company;
    olisedndocs.doctype = dv.lissaldocs.doctype;
    olisedndocs.docnum = dv.lissaldocs.docnum;
    olisedndocs.customer = dv.lissaldocs.customer;
    olisedndocs.name1 = dv.lissaldocs.name1;
    olisedndocs.docdate = dv.lissaldocs.docdate;
    olisedndocs.edndocdate = new Date();
    olisedndocs.grandtotal = dv.lissaldocs.grandtotal;
    olisedndocs.currency = dv.lissaldocs.currency;
    olisedndocs._createdby = global.sys_user;
    olisedndocs.edoctype = dv.lissaldocs.edoctype;
    olisedndocs.postway = 1;
    olisedndocs.edocstat = 1;
    olisedndocs.einvotype = dv.lissaldocs.einvotype;

    const oliscustomers = await liscustomers.findOne({
        company: dv.lissaldocs.company,
        customer: dv.lissaldocs.customer, 
        _deleted: false,
    });

    

    //--------------------------------------
    const newUuid = UUID();
    olisedndocs.einvouuid = newUuid;
    dv.lissaldocs.einvouuid = newUuid;

    if (dv.lissaldocs.edoctype < 3) {
        olisedndocs.alias = oliscustomers.einvmember.filter((e) => {
            return e.UNIT == "PK";
        })[0].ALIAS[0];
        olisedndocs.taxnum = dv.lissaldocs.irctaxnum;
        olisedndocs.edistr = await Emember.createInvFromSal(
            dv.lissaldocs,
            olisedndocs
        );
    } else {
        olisedndocs.alias = oliscustomers.edelmember.filter((e) => {
            return e.UNIT == "PK";
        })[0].ALIAS[0];
        olisedndocs.taxnum = dv.lissaldocs.grctaxnum;
        olisedndocs.edistr = await Emember.createDelFromSal(
            dv.lissaldocs,
            olisedndocs
        );
    }
    

    if (olisedndocs.edistr == undefined) new Error("UBL Oluşturulamadı!");

    //--------------------------------------
    const olisedndocsSave = new lisedndocs(olisedndocs);
    await olisedndocsSave.save().catch((err) => {
        console.log(err);
      throw new Error("Kuyruğa Gönderilemedi!");
    });
    await lissaldocs.updateOne(
        {
            company: dv.lissaldocs.company,
            busarea: dv.lissaldocs.busarea,
            doctype: dv.lissaldocs.doctype,
            docnum: dv.lissaldocs.docnum,
        },
        { $set: { isprinted: true } }
    );

    return dv;
}
