export default async function (dv) {
  if (dv.salDocList.filter((e) => e._selected == true).length > 0) {
    let selectedRowId = dv.salDocList.filter((e) => e._selected == true)[0]._id;

    dv.lissaldocs = await lissaldocs.findById(selectedRowId);
  } else {
    throw new Error("Lütfen Bir Satır Seçiniz");
  }
  await Sales.ctrlAuthorization(dv.lissaldocs, 1);

  if (dv.lissaldocs.isprinted == true) {
    throw new Error("Kuyruğa Gönderilmiş Belge Düzenlenemez!");
  }

  if (dv.lissaldocs.isfinance == true) {
    throw new Error("Muhasebeleşmiş Belge Düzenlenemez!");
  }

  if (dv.lissaldocs.docstat == 2) {
    throw new Error("Kapalı Statüdeki Belge Düzenlenemez!");
  }

  // Lock the document
  let isLocked = await System.lock(
    dv.lissaldocs.company,
    "SALT01",
    dv.lissaldocs.doctype + dv.lissaldocs.docnum,
    global.sys_user
  );
  if (isLocked == true) {
    dv.lisDialog = "SALT01D02";
    dv.modi = 1;
    dv.lockKeyParams.company = dv.lissaldocs.company;
    dv.lockKeyParams.lockkey = dv.lissaldocs.doctype + dv.lissaldocs.docnum;
    dv.liscustomers = await liscustomers.findOne({
      company: dv.lissaldocs.company,
      customer: dv.lissaldocs.customer,
    });
  } else {
    dv.lissaldocs = [];
    throw new Error("Kilitli Belge!");
  }

  return dv;
}
