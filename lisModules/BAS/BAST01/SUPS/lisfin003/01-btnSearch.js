export default async function (mv) {
  mv.lisfin003List = await lisfin003
    .find({
      company: lis.like(mv.sc.company),
      registkey: lis.like(mv.sc.registkey),
      stext: lis.like(mv.sc.stext),
      status: lis.like(mv.sc.status),
      entgr: lis.like(mv.sc.entgr),
      valuearea: lis.like(mv.sc.valuearea),
      acctype: lis.like(mv.sc.acctype),
      account: lis.like(mv.sc.account),
      vatkey: lis.like(mv.sc.vatkey),
      stoppage: lis.like(mv.sc.stoppage),
      check: lis.like(mv.sc.check),
      sync: lis.like(mv.sc.sync),
    })
    .catch((err) => console.log(err));

  return mv;
}
