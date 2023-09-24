export default async function (dv) {
  dv.lisGroupsList = await lisgroups.aggregate([
    {
      $unwind: "$items",
    },
    {
      $match: {
        "items.username": lis.like(dv.olisusers.username),
      },
    },
  ]);
  return dv;
}
