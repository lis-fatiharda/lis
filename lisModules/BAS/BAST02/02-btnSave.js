export default async function (Args) {
    

    // Save the Document*********************
    if (Args.modi == 0) {
        // Get customer Number**************

        let olisbas001 = await lisbas001.findOne({
            company: Args.liscustomer.company,
        });
        if (Args.liscustomer.custorvend == 0) {
            var numrang = olisbas001.candnumrange;
        }
        if (Args.liscustomer.custorvend == 1) {
            var numrang = olisbas001.cusnumrange;
        }
        if (Args.liscustomer.custorvend == 2) {
            var numrang = olisbas001.vennumrange;
        }

        //let olisbas001 = num.custorvend == 0 ? "candnumrange" : num.custorvend == 1 ? "cusnumrange" : "vennumrange";
        Args.liscustomer.customer = await Numrange.getNewNumber({
            company: Args.liscustomer.company,
            numrange: numrang,
            manuelNumber: Args.liscustomer.customer,
        });

        // Save the new Document*********************

        await liscustomers.create(Args.liscustomer);

        // Save the liscusmats*********************

        Args.liscusmat.customer = Args.liscustomer.customer;
        await liscusmats.create(Args.liscusmat);



    } else {
        // Update The Document**************

        await liscustomers
            .findOneAndUpdate({ _id: Args.liscustomer._id }, Args.liscustomer, {
                new: true,
                upsert: true,
            });
        
        await liscusmats
            .findOneAndUpdate({ _id: Args.liscusmats._id }, Args.liscusmats, {
                new: true,
                upsert: true,
            })
    }

    if ((Args.liscustomer.taxnum != "") & (Args.liscustomer.taxnum != null)) {
        await Emember.checkUser(Args.liscustomer);
    }

    // Create Account

    if (
        (Args.liscustomer.acctype?.length > 0) &
        (Args.liscustomer.glaccount?.length > 0) &
        ((Args.liscustomer.account == undefined) |
            (Args.liscustomer.account == ""))
    ) {
        Customer.createAccount(Args.liscustomer);
    }

    return Args;
}
