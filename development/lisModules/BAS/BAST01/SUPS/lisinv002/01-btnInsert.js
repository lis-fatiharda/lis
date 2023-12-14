export default async function (mv) {
  mv.lisDialog = "LISINV002D002";
  mv.modi = 0;

  mv.lisinv002 = await new lisinv002(
    lisinv002.prototype.schema.tree
  );
  //mv.lisinv002.company = mv.sc.company;

  return mv;
}
