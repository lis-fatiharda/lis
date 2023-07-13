export default async function (mv) {

  if (mv.lisfin003List.filter((e) => e._selected == true).length > 0) {
    let selectedRow = mv.lisfin003List.filter((e) => e._selected == true)[0];

    mv.lisfin003 = await lisfin003.findById(selectedRow._id);
  } else {
    throw new Error("Lütfen Bir Satır Seçiniz");
  }

  mv.lisDialog = "LISFIN003D002";
  mv.modi = 1;

  return mv;
}
