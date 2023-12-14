export default async function (mv) {


  let lisfin002filtered = mv.lisfin002List.filter((e) => e._selected == true);
  for (let i in lisfin002filtered) {
    await lisfin002.deleteOne({ _id: lisfin002filtered[i]._id });

  }
  return mv;
}