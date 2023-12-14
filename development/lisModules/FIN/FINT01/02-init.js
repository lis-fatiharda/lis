export default async function (Args) {

  if (Args.modi == 0) {

    if (Args.account != "") {
      var lisaccount = await lisaccounts.findOne({
        company: Args.company,
        acctype: Args.acctype,
        account: Args.account,
      });

      lisaccount._id = undefined;
      lisaccount.account = '';

    } else {

      var lisaccount = await lis.objectNew('lisaccounts');
      lisaccount.company = Args.company;
    }

  } else {
    var lisaccount = await lisaccounts.findOne({
      company: Args.company,
      acctype: Args.acctype,
      account: Args.account,
    });
  }




  return lisaccount;
}
