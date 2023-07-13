export default async function (dv) {
  if (dv.modi == 0) {
    console.log("02-init.ts new çalıştı modi:0");
    dv.lisModelData.push(new supComponent());
  }

  if (dv.modi == 1) {
    console.log("02-init.ts edit çalıştı");
    console.log(dv.modi);
  }

  if (dv.modi == 2) {
    console.log("02-init.ts show çalıştı");
    console.log(dv.modi);
  }

  return dv;
};
