
export default async function (dv) {
  dv.lisuserlogins = await lisuserlogins.find();

  dv.sys_userLicense = global.sys_userLicense;
  dv.sys_projectCode = global.sys_projectCode;

  dv.sys_dbUri = global.sys_dbUri;

  dv.lisApi_URL = global.sys_lisApi_URL;

  dv.sys_lisApiPort = global.sys_lisApi_PORT;
  dv.sys_lisSocketPort = global.sys_lisSocket_PORT;
  dv.sys_lisApiOutPort = global.sys_lisApiOut_PORT;

  return dv;
}


