export default async function (dv) {
  dv.lisvariantsList = await lisvariants
    .find({
      company: lis.like(dv.sc.company),
      varkey: lis.like(dv.sc.varkey),
      stext: lis.like(dv.sc.stext),

    })
    .catch((err) => console.log(err));

  return dv;
}
