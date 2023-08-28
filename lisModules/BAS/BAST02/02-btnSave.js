export default async function (dv) {
    // Create Account

    if (
        (dv.liscustomers.acctype?.length > 0) &
        (dv.liscustomers.glaccount?.length > 0) &
        ((dv.liscustomers.account == undefined) |
            (dv.liscustomers.account == ""))
    ) {
        Customer.createAccount(dv.liscustomers);
    }

    // Save the Document*********************
    if (dv.modi == 0) {
        // Get customer Number**************
        let num = await liscustomers.findOne({
            company: dv.sc.company,
            custorvend: dv.liscustomers.custorvend,
        });
        let nmrng = await lisbas001.findOne({
            company: dv.sc.company,
        });
        if (num.custorvend == 0) {
            var numrang = nmrng.candnumrange;
        }
        if (num.custorvend == 1) {
            var numrang = nmrng.cusnumrange;
        }
        if (num.custorvend == 2) {
            var numrang = nmrng.vennumrange;
        }

        //let nmrng = num.custorvend == 0 ? "candnumrange" : num.custorvend == 1 ? "cusnumrange" : "vennumrange";
        dv.liscustomers.customer = await Numrange.getNewNumber({
            company: dv.sc.company,
            numrange: numrang,
            manuelNumber: dv.liscustomers.customer,
        });

        // Save the new Document*********************

        await liscustomers.create(dv.liscustomers);

    } else {
        // Update The Document**************

        await liscustomers
            .findOneAndUpdate({ _id: dv.liscustomers._id }, dv.liscustomers, {
                new: true,
                upsert: true,
            })
    }

    if ((dv.liscustomers.taxnum != "") & (dv.liscustomers.taxnum != null)) {
        await Emember.checkUser(dv.liscustomers);
    }

    dv.liscustomers = {};

    return dv;
}
