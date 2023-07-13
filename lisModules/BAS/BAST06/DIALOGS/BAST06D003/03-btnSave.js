import liscustomers from "../../../../../lisModels/liscustomers.js";

export default async function (dv) {
  for (let i in dv.lisCustomerList) {
    let ctrlCustomer = await liscustomers.find({
      company: lis.like(dv.company),
      busarea: lis.like(dv.lisCustomerList[i].busarea),
      customer: lis.like(dv.lisCustomerList[i].customer),
    });

    if (ctrlCustomer.length > 0) {
      dv.lisCustomerList[i].company = ctrlCustomer[0].company;
      dv.lisCustomerList[i].busarea = ctrlCustomer[0].busarea;
      dv.lisCustomerList[i].customer = ctrlCustomer[0].customer;

      await liscustomers
        .findOneAndUpdate(
          { _id: ctrlCustomer[0]._id },

          {
            name1:
              dv.lisCustomerList[i].name1 === null
                ? ""
                : dv.lisCustomerList[i].name1,
            custorvend:
              dv.lisCustomerList[i].custorvend === null
                ? 0
                : dv.lisCustomerList[i].custorvend,
            sector:
              dv.lisCustomerList[i].sector === null
                ? ""
                : dv.lisCustomerList[i].sector,
            postcode:
              dv.lisCustomerList[i].postcode === null
                ? ""
                : dv.lisCustomerList[i].postcode,
            country:
              dv.lisCustomerList[i].country === null
                ? ""
                : dv.lisCustomerList[i].country,
            city:
              dv.lisCustomerList[i].city === null
                ? ""
                : dv.lisCustomerList[i].city,
            taxnum:
              dv.lisCustomerList[i].taxnum === null
                ? ""
                : dv.lisCustomerList[i].taxnum,
            taxdept:
              dv.lisCustomerList[i].taxdept === null
                ? ""
                : dv.lisCustomerList[i].taxdept,
            telnum:
              dv.lisCustomerList[i].telnum === null
                ? ""
                : dv.lisCustomerList[i].telnum,
            faxnum:
              dv.lisCustomerList[i].faxnum === null
                ? ""
                : dv.lisCustomerList[i].faxnum,
            new: true,
            upsert: true,
          }
        )
        .catch((err) => {
          throw new Error(err.message);
        });
    } else {
      const oliscustomers = new liscustomers(dv.lisCustomerList[i]);
      await oliscustomers.save().catch((err) => {
        throw new Error(err.message);
      });
    }
  }
  return dv;
}
