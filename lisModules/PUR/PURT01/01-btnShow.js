
export default async function (dv) {
  if (dv.purDocList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.purDocList.filter((e) => e._selected == true)[0];
    dv.lispurdocs = await lispurdocs.findById(selectedRow);
  } else {
    throw new Error("Lütfen Bir Satır Seçiniz");
  }

  dv.lisVendor = await liscustomers.findOne({
    company: dv.lispurdocs.company,
    customer: dv.lispurdocs.vendor,
  });

  dv.lisDialog = "PURT01D02";
  dv.modi = 2;

  return dv;
}
