
export default async function (dv) {
  dv.liscustomers = await liscustomers.findOne({
    company: dv.lissaldocs.company,
    customer: dv.lissaldocs.customer,
  });

  return dv.liscustomers;
}
