export default async function (dv) {
  for (let i in dv.reportList) {
    let ctrlBom = await lisbomdocs.find({
      company: lis.like(dv.sc.company),
      plant: lis.like(dv.reportList[i].plant),
      bomnumber: lis.like(dv.reportList[i].bomnumber),
      material: lis.like(dv.reportList[i].material),
      alternum: lis.like(dv.reportList[i].alternum),
      type: lis.like(dv.reportList[i].type),
      stext: lis.like(dv.reportList[i].stext),
      docdate: {
        $gte: dv.sc.date,
      },
      validuntil: {
        $lte: dv.sc.date,
      },
    });

    if (ctrlBom.length > 0) {
      dv.reportList[i].company = ctrlBom[0].company;
      dv.reportList[i].busarea = ctrlBom[0].busarea;
      dv.reportList[i].customer = ctrlBom[0].customer;

      await lisbomdocs
        .findOneAndUpdate(
          { _id: ctrlBom[0]._id },

          {
            // name1: dv.reportList[i].name1,
            // custorvend: dv.reportList[i].custorvend,
            // sector: dv.reportList[i].sector,
            // postcode: dv.reportList[i].postcode,
            // country: dv.reportList[i].country,
            // city: dv.reportList[i].city,
            // taxnum: dv.reportList[i].taxnum,
            // taxdept: dv.reportList[i].taxdept,
            // telnum: dv.reportList[i].telnum,
            // faxnum: dv.reportList[i].faxnum,
            // _deleted : false,
            new: true,
            upsert: true,
          }
        )
        .catch((err) => {
        throw new Error(err.message);
        });
    } else {
      const olisbomdocs = new lisbomdocs(dv.reportList[i]);
      await olisbomdocs.save().catch((err) => {
      throw new Error(err.message);
      });
    }
  }
}

return dv;
