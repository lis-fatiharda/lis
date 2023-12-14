
export default async function (params) {
  const olissal004 = await lissal004.find({
    fromdoctype: params.doctype,
    _deleted: false,
  });
  const ctrlStop = await lissaldocs.findOne({
    doctype : params.doctype,
    docnum : params.docnum,
    _deleted: false,
})

if(ctrlStop.isstop == true){
  throw new Error("Durdurulmuş Belge Kopyalanamaz !");
   
}
if(ctrlStop.issignature == 1){
  throw new Error("İmzalanmamış Belge Kopyalanamaz !");
   
}
  console.log(olissal004);
  return olissal004;
};
