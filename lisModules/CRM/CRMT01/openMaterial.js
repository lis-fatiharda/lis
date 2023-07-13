export default async function (item) {
  // is Open Material Card?
  console.log("openMaterial");

  // Get Material Number**************
  item.material = await NumRange.getNewNumber({
    company: item.company,
    numrange: "BAST03",
    manuelNumber: item.material,
  });

  // Save the Material Card**************

  const olismaterials = new lismaterials(item);
  await olismaterials.save().catch((err) => {
    throw new Error(err);
  });

  return item;
}
