
export default async function (mv) {
  mv.lisDialog = "LISBAS017D002";
  mv.modi = 0;

  mv.lisbas017 = await new lisbas017(
    lisbas017.prototype.schema.tree
  );
  mv.lisbas017.company = mv.sc.company;

  return mv;
}
