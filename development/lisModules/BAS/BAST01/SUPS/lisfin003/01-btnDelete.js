export default async function (mv) {


  let lisfin003filtered = mv.lisfin003List.filter((e) => e._selected == true);
  for (let i in lisfin003filtered) {
    await lisfin003.deleteOne({ _id: lisfin003filtered[i]._id });

  }
  return mv;
}