import lismodels from "../../development/lisModels/lismodels.js";
import fs from "fs";
import path from "path";
import fetchLicense from "../commands/system/fetchLicense.js"

export default async function () {

    let { licenseFile } = await fetchLicense();

    global.sys_productLicense = licenseFile.product_LICENCE;
    global.sys_userLicense = licenseFile.user_LICENCE;
    global.sys_moduleLicense = licenseFile.module_LICENCE;
    global.sys_projectCode = licenseFile.project_CODE;

    global.sys_projectCode = licenseFile.project_CODE;


    global.sys_lisApi_URL = process.env.lisApi_URL
    global.sys_lisApi_PORT = process.env.lisApi_PORT
    global.sys_lisApiOut_PORT = process.env.lisApiOut_PORT
    global.sys_lisSocket_PORT = process.env.lisSocket_PORT

    global.sys_dbUri = process.env.lisdb_URI


    global.sys_currentDate = new Date();
    global.sys_maxDate = new Date(2100, 11, 31);
    global.sys_minDate = new Date(1900, 1, 1);

    // Models
    let olismodels = await lismodels.find({
        _deleted: false,
    });


    for (let i in olismodels) {
        try {
            let tmpModel = await import(
                `../../development/lisModels/${olismodels[i].model}.js`
            );
            global[`${olismodels[i].model}`] = tmpModel.default;
        } catch (error) {
            console.error(error);
        }
    }


    // Classes
    let classDir = path.join(process.env.liserp_DIR, "development/lisModules/classes/");

    fs.readdir(classDir, (err, files) => { 
        files.forEach(async (file) => {

            try {
                let tmpClass = await import(
                    path.join(
                        process.env.liserp_DIR,
                        "development/lisModules/classes/",
                        `${file}/A-${file}.js` 
                    )
                );

                let myClass = new tmpClass.default();
                global[`${file.charAt(0).toUpperCase() + file.slice(1)}`] =
                    myClass;
            } catch (error) { 
                console.error(error);
            }
        });
    });

}
