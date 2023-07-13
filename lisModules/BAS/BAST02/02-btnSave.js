
export default async function (dv) {

  // Create Account

  if (dv.liscustomers.acctype != "" & dv.liscustomers.glaccount != "" & dv.liscustomers.account == "") {
    Customer.createAccount(dv.liscustomers);
  }



  // Save the Document*********************
  if (dv.modi == 0) {
    // Get customer Number**************
    dv.liscustomers.customer = await NumRange.getNewNumber({
      company: dv.sc.company,
      numrange: "BAST02",
      manuelNumber: dv.liscustomers.customer,
    });

    // Save the new Document*********************
    const oliscustomers = new liscustomers(dv.liscustomers);
    await oliscustomers.save().catch((err) => {
      throw new Error(err.message);
    });
  } else {
    // Update The Document**************

    await liscustomers
      .findOneAndUpdate({ _id: dv.liscustomers._id }, dv.liscustomers, {
        new: true,
        upsert: true,
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  if ((dv.liscustomers.taxnum != "") & (dv.liscustomers.taxnum != null)) {
    await Emember.checkUser(dv.liscustomers);
  }

  dv.liscustomers = {};

  return dv;
}
