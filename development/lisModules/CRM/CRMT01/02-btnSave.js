export default async function (dv) {
  

  if (dv.modi == 0) {
    // Controls before Save ****************
    console.log("if");

    // Get Activity Number**************
    dv.liscrmdocs.actnum = await NumRange.getNewNumber({
      company: dv.sc.company,
      numrange: "CRM01",
      manuelNumber: "",
    });

    if (dv.liscrmdocs.actnum == "") {
    throw new Error("Aktivite No Boş Olamaz!!");
    }

    console.log("numara aldık...............");
    console.log(dv.liscrmdocs.actnum);

    // is Open Customer Card?
    if (
      ((dv.liscrmdocs.customer == "") | (dv.liscrmdocs.customer == undefined)) &
      (dv.liscrmdocs.name1 != "")
    ) {
      console.log("cari kart aç");
      const oliscustomers = new liscustomers(
        liscustomers.prototype.schema.tree
      );

      console.log(liscustomers);
      Object.assign(oliscustomers, dv.liscrmdocs);
      liscustomers.custper[0].gender = dv.liscrmdocs.cpgender;
      liscustomers.custper[0].name = dv.liscrmdocs.cpname;
      liscustomers.custper[0].secondname = dv.liscrmdocs.cpsecondname;
      liscustomers.custper[0].surname = dv.liscrmdocs.cpsurname;
      liscustomers.custper[0].department = dv.liscrmdocs.cpdepartment;
      liscustomers.custper[0].position = dv.liscrmdocs.cpposition;
      liscustomers.custper[0].phone = dv.liscrmdocs.cpphone;
      liscustomers.custper[0].email = dv.liscrmdocs.cpemail;
      console.log(liscustomers);
      // Get customer Number**************
      console.log("Müşteri No Al");
      liscustomers.customer = await NumRange.getNewNumber({
        company: dv.sc.company,
        numrange: "BAS02",
        manuelNumber: dv.liscrmdocs.customer,
      });
      const lisCustomerSave = new liscustomers(liscustomers);
      lisCustomerSave.save().catch((err) => {
      throw new Error(err);
      });
      dv.liscrmdocs.customer = liscustomers.customer;
    }

    // Save the Document*********************
    const oliscrmdocs = new liscrmdocs(dv.liscrmdocs);
    await oliscrmdocs
      .save()
      .then((res) => {
        console.log("Aktivite Kaydedildi.");
      })
      .catch((err) => {
        console.log("Aktivite Kaydedilemedi. Hata!");
      throw new Error(err);
      });
  } else {
    console.log("else");
    console.log(dv.liscrmdocs);
    // Document save
    await liscrmdocs
      .findOneAndUpdate({ _id: dv.liscrmdocs._id }, dv.liscrmdocs, {
        new: true,
        upsert: true,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      throw new Error(err);
      });
  }

  dv.liscrmdocs = {};

  return dv;
}
