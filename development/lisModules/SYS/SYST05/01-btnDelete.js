export default async function (item) {
  
  await System.unlock({
      company: item.company,
      lid: item.lid,
      lockkey: item.lockkey,
  });

  return true;
}
