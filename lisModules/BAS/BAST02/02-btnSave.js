
export default async function (dv) {

  // Create Account

  if (dv.liscustomers.acctype != "" & dv.liscustomers.glaccount != "" & dv.liscustomers.account == "") {
    Customer.createAccount(dv.liscustomers);
  }



  // Save the Document*********************
  if (dv.modi == 0) {
    // Get customer Number**************
    let num = await liscustomers.findOne({
      company: dv.sc.company,
      custorvend: dv.liscustomers.custorvend,
    })
    let nmrng = await lisbas001.findOne({
      company: dv.sc.company,
    })
    if (num.custorvend == 0) {
      var numrang = nmrng.candnumrange;
    };
    if (num.custorvend == 1) {
      var numrang = nmrng.cusnumrange;
    };
    if (num.custorvend == 2) {
      var numrang = nmrng.vennumrange;
    };

    //let nmrng = num.custorvend == 0 ? "candnumrange" : num.custorvend == 1 ? "cusnumrange" : "vennumrange";
    dv.liscustomers.customer = await Numrange.getNewNumber({
      company: dv.sc.company,
      //numrange: "BAST02",
      numrange: numrang,
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
