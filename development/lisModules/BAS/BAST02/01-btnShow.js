export default async function (dv) {
  dv.lisDialog = "BAST02D02";
  dv.modi = 2;

  if (dv.lisCustomerList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.lisCustomerList.filter((e) => e._selected == true)[0];

    dv.pCompany = selectedRow.company;
    dv.pCustomer = selectedRow.customer;
    
  } else {
  throw new Error("Lütfen Bir Satır Seçiniz");
  }

  return dv;
}
