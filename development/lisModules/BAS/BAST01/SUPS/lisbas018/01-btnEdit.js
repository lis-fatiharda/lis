export default async function (mv) {

  if (mv.lisbas018List.filter((e) => e._selected == true).length > 0) {
    let selectedRow = mv.lisbas018List.filter((e) => e._selected == true)[0];

    mv.lisbas018 = await lisbas018.findById(selectedRow._id);
  } else {
  throw new Error("Lütfen Bir Satır Seçiniz");
  }

  mv.lisDialog = "LISBAS018D002";
  mv.modi = 1;

  return mv;
}
