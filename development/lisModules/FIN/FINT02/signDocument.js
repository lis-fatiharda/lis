export default async function (plisfindocs) {
  let signaturestatus = await Finance.signDocument(plisfindocs);

  return signaturestatus;
}
