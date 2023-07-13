
export default async function () {

  const liscustomers = await liscustomers.find({
    taxnum: { $ne: "" },
    customer: "-267-000022",
  });

  for (let i in liscustomers) {
    let myLisCustomer = liscustomers[i];
    console.log(myLisCustomer);
    await emember.checkUser(myLisCustomer);
  }

  return true;
}
