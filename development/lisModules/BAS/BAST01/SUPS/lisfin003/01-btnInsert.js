export default async function (mv) {
  mv.lisDialog = "LISFIN003D002";
  mv.modi = 0;

  mv.lisfin003 = await new lisfin003(
    lisfin003.prototype.schema.tree
  );
  mv.lisfin003.company = mv.sc.company;

  return mv;
}
