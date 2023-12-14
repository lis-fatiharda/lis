export default async function (mv) {

  if (mv.lisfin002List.filter((e) => e._selected == true).length > 0) {
    let selectedRow = mv.lisfin002List.filter((e) => e._selected == true)[0];

    mv.lisfin002 = await lisfin002.findById(selectedRow._id);
  } else {
  throw new Error("Lütfen Bir Satır Seçiniz");
  }

  mv.lisDialog = "LISFIN002D002";
  mv.modi = 1;

  return mv;
}
