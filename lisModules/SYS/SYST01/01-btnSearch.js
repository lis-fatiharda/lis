export default async function (dv) {
  dv.lisappobjects = await lisappobjects.find();
  dv.sc.module = "bas";

  dv.lisappobjects.forEach((e) => {
    e._selected = false;
  });

  console.log(dv);
  return dv;
}
