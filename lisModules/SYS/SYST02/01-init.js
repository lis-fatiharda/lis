
export default async function (dv) {
  dv.lisuserlogins = await lisuserlogins.find();

  dv.sys_userLicense = global.sys_userLicense;
  dv.sys_projectCode = global.sys_projectCode;

  dv.sys_dbUri = global.sys_dbUri;

  dv.sys_lisServerIp = global.sys_lisServerIp;
  dv.sys_lisApiPort = global.sys_lisApiPort;
  dv.sys_lisSocketPort = global.sys_lisSocketPort;
  dv.sys_lisApiOutPort = global.sys_lisApiOutPort;
  dv.sys_lisApiOutPort = global.sys_lisRunnerVersion;

  return dv;
}
