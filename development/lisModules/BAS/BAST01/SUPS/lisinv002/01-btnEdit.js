export default async function (mv) {

  if (mv.lisinv002List.filter((e) => e._selected == true).length > 0) {
    let selectedRow = mv.lisinv002List.filter((e) => e._selected == true)[0];

    mv.lisinv002 = await lisinv002.findById(selectedRow._id);
  } else {
  throw new Error("Lütfen Bir Satır Seçiniz");
  }

  mv.lisDialog = "LISINV002D002";
  mv.modi = 1;

  return mv;
}
