
export default async function (dv) {
  if (dv.modi == 0) {
    //****************Insert********************* */
    dv.lisappobjects[0].transactions.forEach(function (e) {
      if ((e.pathName == null) | (e.pathName == "")) {
        e.route = null;
      } else {
        let tmpPath = "/" + e.pathName;

        e.component =
          dv.lisappobjects[0].module + "/" + e.code + "/" + e.pathName;
      }

    });
    //*************
    const olisAppObject = new lisappobjects(dv.lisappobjects[0]);
    await olisAppObject
      .save()
      .then(function (e) {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });

  }
  //*************Update*************************** */

  if (dv.modi == 1) {

    dv.lisappobjects[0].transactions.forEach(function (e) {

      if ((e.pathName == null) | (e.pathName == "")) {
        e.route = null;
      } else {
        let tmpPath = "/" + e.pathName;

        e.component =
          dv.lisappobjects[0].module + "/" + e.code + "/" + e.pathName;
      }

    });

    dv.lisappobjects[0].transactions = dv.lisappobjects[0].transactions.filter(
        (e) => e.deleted == false
    );

    const lisAppObject = await lisappobjects.findOneAndUpdate(
      { _id: dv.lisappobjects[0]._id },
      dv.lisappobjects[0],
      { new: true, upsert: true }
    );
    //await const lisAppObject = await lisappobjects.findOne({ id = dv.lisappobjects[0].id})
   
  }
  return dv;
}
