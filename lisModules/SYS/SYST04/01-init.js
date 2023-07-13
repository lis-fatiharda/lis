export default async function (dv) {
  dv.sc.companyOpts = await lisbas001.find({ _deleted: 0 });
  dv.partTypeOpts = ["Otomatik", "Manuel", "Yıl", "Ay", "Gün"];
  return dv;
}
