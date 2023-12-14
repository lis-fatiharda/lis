export default async function (dv) {
  dv.lisDialog = "FINT02D02";
  dv.modi = 2;
  if (dv.reportList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.reportList.filter((e) => e._selected == true)[0];

    dv.lisfindocs = await lisfindocs.findById(selectedRow._id);

    dv.pCompany = selectedRow.company;
    dv.pDoctype = selectedRow.doctype;
    dv.pDocnum = selectedRow.docnum;
  } else {
  throw new Error("Lütfen Bir Satır Seçiniz");
  }

  await Finance.ctrlAuthorization(dv.lisfindocs, 2);

  return dv;
}
