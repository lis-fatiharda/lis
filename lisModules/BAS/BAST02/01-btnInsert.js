export default async function (dv) {
  dv.lisDialog = "BAST02D02";
  dv.modi = 0;
  if (dv.lisCustomerList.filter(e => e._selected == true).length > 0) {
    let selectedRow = dv.lisCustomerList.filter((e) => e._selected == true)[0];
    dv.pCompany = selectedRow.company;
    dv.pCustomer = selectedRow.customer;

  } else {
    dv.pCompany = dv.sc.company;
    dv.pCustomer = "";
    //let newCusMat = lis.objectNew('liscusmats');
    //dv.liscustomers.push(newCusMat);
  }

  return dv;
}
