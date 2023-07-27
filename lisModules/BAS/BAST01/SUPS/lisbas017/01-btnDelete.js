export default async function (mv) {


  let lisbas017filtered = mv.lisbas017List.filter((e) => e._selected == true);
  for (let i in lisbas017filtered) {
    await lisbas017.deleteOne({ _id: lisbas017filtered[i]._id });

  }
  return mv;
}