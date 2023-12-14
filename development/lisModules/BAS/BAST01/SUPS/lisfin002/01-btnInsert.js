
export default async function (mv) {
  mv.lisDialog = "LISFIN002D002";
  mv.modi = 0;

  mv.lisfin002 = await new lisfin002(
    lisfin002.prototype.schema.tree
  );
  mv.lisfin002.company = mv.sc.company;

  return mv;
}
