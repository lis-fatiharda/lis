export default async function (dv) {
  if (dv.salDocList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.salDocList.filter((e) => e._selected == true)[0];
    
    dv.lissaldocs = await lissaldocs.findById(selectedRow);
  } else {
  throw new Error("Lütfen Bir Satır Seçiniz");
  }
  await Sales.ctrlAuthorization(dv.lissaldocs, 2);
  dv.liscustomers = await liscustomers.findOne({
    company: dv.lissaldocs.company,
    customer: dv.lissaldocs.customer,
  });

  dv.lisDialog = "SALT01D02";
  dv.modi = 2;

  return dv;
}
