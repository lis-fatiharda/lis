import fs from "fs";

export default async function (dv) {
  dv.lisappobjects = dv.lisappobjects.filter((e) => e._id == dv.selectedRow);
  console.log(dv.lisappobjects[0]);
  await lisappobjects.deleteOne({ module: dv.lisappobjects[0].module });
  dv.lisappobjects = [...(await lisappobjects.find())];
  dv.lisappobjects.forEach((e) => {
    e._selected = false;
  });

  console.log("btnDelete çalıştı");
  console.log(dv);
  return dv;
}
