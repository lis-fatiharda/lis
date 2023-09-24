export default async function (Args) {

  let liscustomer = await liscustomers.findOne({
    company: Args.company,
    customer: Args.customer
  });

  let liscusmat = await liscusmats.findOne({
    company: Args.company,
    customer: Args.customer
  });


  return { liscustomer, liscusmat };
}
