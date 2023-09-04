
export default async function (dv) {
  // Controls before Save ****************
  // if (dv.lispurdocs.currency == null) {
  //   throw new Error("Lütfen Para Birimini Doldurunuz !");
  // }

  // for (let i in dv.lispurdocs.items) {
  //   if (dv.lispurdocs.items[i].qunit == null) {
  //     throw new Error(
  //       `Lütfen ${lispurdocs.items[i].itemnum} No'lu kalem için Miktar Birimini Giriniz!`
  //     );
  //   }
  // }
  // Save The Document ****************
  dv.lispurdocs = await Purchase.ctrlAuthorization(dv.lispurdocs, dv.modi);
  dv.lispurdocs = await Purchase.save(dv.lispurdocs, dv.modi);

  return dv.lispurdocs;
}
