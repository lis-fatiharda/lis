
export default async function (mv) {
  mv.lisDialog = "LISBAS018D002";
  mv.modi = 0;

  mv.lisbas018 = await new lisbas018(
    lisbas018.prototype.schema.tree
  );
  mv.lisbas018.company = mv.sc.company;

  return mv;
}
