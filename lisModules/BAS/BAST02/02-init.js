export default async function (Args) {

  if (Args.modi == 0) {

    if (Args.customer != "") {
      var liscustomer = await liscustomers.findOne({
        company: Args.company,
        customer: Args.customer
      });

      liscustomer._id = undefined;
      liscustomer.customer = '';

      let liscusmat = await lis.objectNew('liscusmats');
      liscusmat.company = Args.company;
      liscusmat = [liscusmat];
    } else {

      var liscustomer = await lis.objectNew('liscustomers');
      liscustomer.company = Args.company;
      var liscusmat = await lis.objectNew('liscusmats');
      liscusmat.company = Args.company;
      liscusmat = [liscusmat];
    }

  } else {
    var liscustomer = await liscustomers.findOne({
      company: Args.company,
      customer: Args.customer
    });

    var liscusmat = await liscusmats.find({
      company: Args.company,
      customer: Args.customer
    });
  }




  return { liscustomer, liscusmat };
}
