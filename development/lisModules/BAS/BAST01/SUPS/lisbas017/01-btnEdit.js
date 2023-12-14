export default async function (mv) {

  if (mv.lisbas017List.filter((e) => e._selected == true).length > 0) {
    let selectedRow = mv.lisbas017List.filter((e) => e._selected == true)[0];

    mv.lisbas017 = await lisbas017.findById(selectedRow._id);
  } else {
  throw new Error("Lütfen Bir Satır Seçiniz");
  }

  mv.lisDialog = "LISBAS017D002";
  mv.modi = 1;

  return mv;
}
