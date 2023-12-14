export default async function (dv) {
 dv.sc.companyOpts = await lisbas001.find({ _deleted: false });
  dv.sc.busareaOpts = await lisbas003.find({
    _deleted: false,
    company: dv.sc.company,
  });
  dv.sc.acttypeOpts = await liscrm001.find({
    company: dv.sc.company,
    _deleted: false,
  });
  dv.sc.actionTypeOpts = await liscrm002.find({
    company: dv.sc.company,
    _deleted: false,
  });
  dv.sc.projectOpts = await liscrm003.find({
    company: dv.sc.company,
    _deleted: false,
  });
  dv.sc.customerOpts = await liscustomers.find({
    company: dv.sc.company,
    _deleted: false,
  });
  dv.sc.salDeptOpts = await lissal003.find({
    _deleted: false,
    company: dv.sc.company,
  });
  dv.sc.countryOpts = await lisbas005.find({ _deleted: false });

  //*** fetch saldocitems */
  dv.sc.salDocOpts = await lissal001.find({
    company: dv.sc.company,
    _deleted: false,
  });
  dv.sc.salItemOpts = await lissal002.find({
    company: dv.sc.company,
    _deleted: false,
  });
  //for (let index = 0; index < dv.scSalItemOpts.length; index++) {
  //    dv.scSalItemOpts[index].value = dv.scSalItemOpts[index].itemtype;
  //    console.log("scSalItemOpts");
  //    console.log(dv.scSalItemOpts);
  //}

  //*** */
  var tmpSkunits = await lisbas007.find(
    { _deleted: false, unittype: 0, company: dv.sc.company },
    { unit: 1 }
  );

  dv.sc.skunitOpts = [];
  tmpSkunits.forEach((e) => {
    dv.sc.skunitOpts.push(e.unit);
  });
  //*** */

  dv.sc.mattypeOpts = await lisbas009.find({
    company: dv.sc.company,
    _deleted: false,
  });

  dv.scMatstatOpts = await lisbas010.find({
    company: dv.sc.company,
    _deleted: false,
  });

  //*** fetch currencies */
  let tmpCurrencyOpts = await lisbas007.find(
    { _deleted: false, unittype: 1, company: dv.sc.company },
    { unit: 1 }
  );

  dv.scCurrencyOpts = [];
  tmpCurrencyOpts.forEach((e) => {
    dv.scCurrencyOpts.push(e.unit);
  });

  //*** */

  let salDepthForCrm = dv.sc.salDeptOpts.filter(
    (e) => e.username == global.sys_user
  );

  if (salDepthForCrm.length > 0) {
    dv.crmAssignAuth = salDepthForCrm[0].crmassignauth;
    dv.crmCrew = salDepthForCrm[0].crmcrew;
    dv.crmofferAuth = salDepthForCrm[0].crmofferauth;
    dv.crmmaterialAuth = salDepthForCrm[0].crmmaterialauth;

    if (dv.crmAssignAuth == false) {
      dv.sc.saldept = salDepthForCrm[0].saldept;
    }
  }

  //const lisinv005 from "../../../server/lisModels/lisinv005");
  dv.sc.specialstockOpts = await lisinv005.find({
    company: dv.sc.company,
    _deleted: false,
  });

  //*** Pay types */
  dv.scPaytypeOpts = await lisbas011
    .find({
      company: dv.sc.company,
      _deleted: false,
    })
    .catch((err) => {
      console.log(err);
    throw new Error(err);
    });

  return dv;
}
