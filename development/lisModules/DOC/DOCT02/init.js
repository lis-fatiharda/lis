export default async function (dv) {
  console.log("init");
  console.log(dv);
  var documents = await lisdocdocs.find({
    company: dv.pCompany,
    doctype: dv.pDoctype,
    docnum: dv.pDocnum,
  });
  console.log(documents);
  if (documents.length == 0) {
    console.log("wwwwwwwwwwww");
    documents = [new lisdocdocs(lisdocdocs.prototype.schema.tree)];
    console.log(documents);
    documents[0]._id = undefined;
    documents[0].company = dv.pCompany;
    documents[0].doctype = dv.pDoctype;
    documents[0].docnum = dv.pDocnum;
    documents[0].items = [];
    documents[0].path = [];
  }

  console.log(documents);

  return documents;
};
