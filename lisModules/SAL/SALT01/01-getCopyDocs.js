
export default async function (params) {
  const olissal004 = await lissal004.find({
    fromdoctype: params.doctype,
    _deleted: false,
  });

  console.log(olissal004);
  return olissal004;
};
