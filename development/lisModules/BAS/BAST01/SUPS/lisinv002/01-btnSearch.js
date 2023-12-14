export default async function (mv) {
  mv.lisinv002List = await lisinv002
    .find({
      company: lis.like(mv.sc.company),
      invuser: lis.like(mv.sc.invuser),
      
    })
    .catch((err) => console.log(err));

  return mv;
}
