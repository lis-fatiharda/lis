
export default async function (dv) {

  if (dv.purDocList.filter((e) => e._selected == true).length > 0) {
    let selectedRow = dv.purDocList.filter((e) => e._selected == true)[0];
    dv.lispurdocs = await lispurdocs.findById(selectedRow);
  } else {
    throw new Error("Lütfen Bir Satır Seçiniz");
  }

  dv.lispurdocs = await Purchase.ctrlAuthorization(dv.lispurdocs, 1);

  if (dv.lispurdocs.docstat == 2) {
    throw new Error("Kapalı Statüdeki Belge Düzenlenemez!");
  }

  if (dv.lispurdocs.isfinance == true) {
    throw new Error("Muhasebeleşmiş Belge Düzenlenemez!");
  }

  // Lock the document
  let isLocked = await System.lock(
    dv.lispurdocs.company,
    "PURT01",
    dv.lispurdocs.doctype + dv.lispurdocs.docnum,
    global.sys_user
  );
  if (isLocked == true) {
    dv.lisDialog = "PURT01D02";
    dv.modi = 1;
    dv.lockKeyParams.company = dv.lispurdocs.company;
    dv.lockKeyParams.lockkey = dv.lispurdocs.doctype + dv.lispurdocs.docnum;
    dv.lisVendor = await liscustomers.findOne({
      company: dv.lispurdocs.company,
      customer: dv.lispurdocs.vendor,
    });
  } else {
    dv.lispurdocs = [];
    throw new Error("Kilitli Belge!");
  }

  return dv;
}
