// add new lock according to lock parameters
// params: {
//  string : company,
//  string : lid,
//  string : lockkey,
//  string : createdby,
// }
async function lock(Pcompany, Plid, Plockkey, Pcreatedby) {
  let Preturn = false;

  // Control lock exists?
  const ctrllislocks = await lislocks.find({
    company: Pcompany,
    lid: Plid,
    lockkey: Plockkey,
  });
  if (ctrllislocks.length > 0) {
    throw new Error("Belge blokeli!");
  }
  // Lock the document
  let olislocks = new lislocks(lislocks.prototype.schema.tree);

  olislocks.company = Pcompany;
  olislocks.lid = Plid;
  olislocks.lockkey = Plockkey;
  olislocks._createdby = sys_user;
  olislocks.createdat = new Date().toString();
  console.log(olislocks);

  const olislocksSave = new lislocks(olislocks);

  await olislocksSave
    .save()
    .then((res) => {
      Preturn = true;
    })
    .catch((err) => {
      Preturn = false;
    });
  return Preturn;
}

export default lock;
