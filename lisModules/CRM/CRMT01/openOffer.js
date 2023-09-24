export default async function (item) {
  // Controles Before Save

  // Get Material Number**************
  item.docnum = await NumRange.getNewNumber({
    company: item.company,
    numrange: "BAST02",
    manuelNumber: item.material,
  });

  // Set Some Infos

  item.issignature = "Yok";
  item.docstat = "Açık";

  // Save the Material Card**************

  const olissaldocs = new lissaldocs(item);
  console.log(lissaldocs);
  await olissaldocs.save().catch((err) => {
    throw new Error(err);
  });

  item.iscrmoffer = true;
  return item;
}
