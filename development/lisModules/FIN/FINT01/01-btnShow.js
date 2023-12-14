export default async function (dv) {
    if (dv.reportList.filter((e) => e._selected == true).length > 0) {
        let selectedRow = dv.reportList.filter((e) => e._selected == true)[0];
        dv.lisaccounts = await lisaccounts.findById(selectedRow._id);

        dv.pCompany = selectedRow.company;
        dv.pAcctype = selectedRow.acctype;
        dv.pAccount = selectedRow.account;
    } else {
      throw new Error("Lütfen Bir Satır Seçiniz");
    }

    dv.lisDialog = "FINT01D02";
    dv.modi = 2;
    return dv;
}
