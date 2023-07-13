export default async function (dv) {
  dv.sc.module = "BAS";
  dv.sc.moduleOpts = await lisappobjects.find();
 
  return dv;
};
