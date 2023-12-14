
export default async function getMenuTransactions(params) {

  const olisusers = await lisusers.find({
      username: sys_user,
      isdelete: false,
  });
  olisusers[0].trights = olisusers[0].trights.filter((e) => e != "");
  olisusers[0].scrights = olisusers[0].scrights.filter((e) => e != "");
  olisusers[0].favpages = olisusers[0].favpages.filter((e) => e != "");
  
  var olisappobjects = [];
  if (olisusers.length > 0) {
    if (olisusers[0].issuperuser == true) {
      olisappobjects = await lisappobjects.find(
        {},
        {},
        {
          sort: { group: 1, module: 1 },
        }
      );
    } else {
      olisappobjects = await lisappobjects.find(
        { "transactions.code": { $in: olisusers[0].trights }, isdelete: false },
        {},
        { sort: { group: 1, module: 1 } }
      );

      olisappobjects.forEach((e) => {
        e.transactions = e.transactions.filter(
          (k) => olisusers[0].trights.indexOf(k.code) != -1
        );
      });
    }

    var favPages = await lisappobjects.find(
      { "transactions.code": { $in: olisusers[0].favpages } },
      {},
      { sort: { group: 1, module: 1 } }
    );

    favPages.forEach((e) => {
      e.transactions = e.transactions.filter(
        (k) => olisusers[0].favpages.indexOf(k.code) != -1
      );
    });
  }
  
  return { olisappobjects, olisusers, favPages };
};
