export default async function (dv) {
  dv.lisUsersList = await lisusers.find({
    _deleted: false,
  });
  return dv.lisUsersList;
}
