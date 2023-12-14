import BAG from "mssql";
const BAG_config = {
  server: "178.18.201.83",
  database: "BAGDB604",
  user: "IAS",
  password: "IAS",
  port: 1433,
  options: {
    trustServerSertificate: true,
    encrypt: false,
  },
};
//async function testBag() {
//  try {
//    console.log("Deneniyor");
//    const BAG_config = {
//      server: "178.18.201.83",
//      database: "BAGDB604",
//      user: "IAS",
//      password: "IAS",
//      port: 1433,
//      options: {
//        trustServerSertificate: true,
//        encrypt : false
//      }
//    };
//    await BAG.connect(BAG_config);
//    console.log(BAG.query('select * from IASUSERS'));
//
//  } catch (err) {
//    console.log(err);
//    console.log("ERRORR");
//  }
//}

export default async function (dv) {
  console.log("Geldim");
  var where = "20020729";
  try {
    await BAG.connect(BAG_config);
    (dv.lisusers = await BAG.query(
      `select * from BAGRECETE where PRODMATERIAL = '${where}'`
    )),
      //dv.lisusers = [dv.lisusers.recordset]

      console.log(dv.lisusers);
  } catch (error) {
    console.log(error);
  }

  return dv;
}
