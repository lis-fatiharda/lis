import fs from "fs";
import path from "path";
import obfuscate from "./obfuscate.js"
import obfuscateHTML from "./obfuscateHTML.js"

let liserp_DIR = '/opt/liserp/';

async function getDirLoop(pFolderSource, pfolderTarget) {

    let thisDir = fs.readdirSync(pFolderSource);

    if (fs.existsSync(pfolderTarget) == false) {
        fs.mkdirSync(pfolderTarget)
    }

    for (let index in thisDir) {

        let myPath = path.join(pFolderSource, thisDir[index]);
        let myPathTarget = path.join(pfolderTarget, thisDir[index]);

        

        let stat1 = fs.statSync(myPath);

        if (stat1.isFile() == true) {

            let myCode = fs.readFileSync(myPath).toString();

            if (myPath.indexOf('.json') > -1 | myPath.indexOf('.bat') > -1 | myPath.indexOf('.sass') > -1 | myPath.indexOf('.vue') > -1 | myPath.indexOf('.env') > -1) {
                fs.writeFileSync(myPathTarget, myCode);
            } else {
                if (myPath.indexOf('.vue') > -1) {
                    //let myCodeObfuscated = obfuscateHTML(myPath);
                    //fs.writeFileSync(myPathTarget, myCodeObfuscated);
                    fs.writeFileSync(myPathTarget, myCode);
                } else {
                    let myCodeObfuscated = obfuscate(myCode);
                    fs.writeFileSync(myPathTarget, myCodeObfuscated);
                }

            }


        } else {
            await getDirLoop(myPath, myPathTarget);
        }
    }

}

export default async function obfuscateAll(Args) {


    if (fs.existsSync(path.join(liserp_DIR, Args.pFolderSource)) == false) {
        fs.mkdirSync(path.join(liserp_DIR, Args.pFolderSource))
    }
    let srcDir = path.join(liserp_DIR, Args.pFolderSource);

    if (fs.existsSync(path.join(liserp_DIR, Args.pfolderTarget)) == false) {
        fs.mkdirSync(path.join(liserp_DIR, Args.pfolderTarget))
    }
    let trgDir = path.join(liserp_DIR, Args.pfolderTarget);

    await getDirLoop(srcDir, trgDir);

    return true;
}

obfuscateAll({
    pFolderSource: 'lisRunner-src/commands',
    pfolderTarget: 'lisRunner/commands'
});

obfuscateAll({
    pFolderSource: 'lisRunner-src/lis-client',
    pfolderTarget: 'lisRunner/lis-client'
});

obfuscateAll({
    pFolderSource: 'lisRunner-src/lis-server',
    pfolderTarget: 'lisRunner/lis-server'
});

obfuscateAll({
    pFolderSource: 'lisRunner-src/lis-socket',
    pfolderTarget: 'lisRunner/lis-socket'
});