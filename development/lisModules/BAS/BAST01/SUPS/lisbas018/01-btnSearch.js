export default async function (mv) {

  mv.lisbas018List = await lisbas018
      .find({
        company: lis.like(mv.sc.company),
        attribute: lis.like(mv.sc.attribute),
        type: (mv.sc.type == null ) ?  { $gte: 0 } : mv.sc.type,
        //stext: lis.like(mv.sc.stext),

      })
      .catch((err) => console.log(err));

    return mv;

}
