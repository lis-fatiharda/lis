export default async function (dv) {
  dv.lisinvdocs = await lisinvdocs.find();

  return dv;
}
