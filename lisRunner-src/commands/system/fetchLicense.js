
import fs from "fs";

import path from "path";

export default async function () {
    //###########################################_envFile
    let envFile = {};
    envFile.node_VERSION = process.env.npm_config_use_node_version;
    envFile.liserp_DIR = process.env?.liserp_DIR;
    envFile.lisApi_URL = process.env?.lisApi_URL;
    envFile.lisApi_PORT = process.env?.lisApi_PORT;
    envFile.lisApiOut_PORT = process.env?.lisApiOut_PORT;
    envFile.lisSocket_PORT = process.env?.lisSocket_PORT; 
    envFile.lis_DB = process.env?.lis_DB;
    envFile.lisdb_URI = process.env?.lisdb_URI;
    let myPath = path.join(process.env.liserp_DIR, "configs/license.txt")
    //###########################################_liscenseFile
    let licenseTXT = await fs.readFileSync(myPath, 'utf8');
    let licenseFile = await lis.decrypt(licenseTXT);
    licenseFile = JSON.parse(licenseFile);
    return { licenseFile, envFile }
}
