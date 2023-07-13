import fs from "fs"

import path from "path";

export default async function (dv) {
    
    let txtPath = path.join(
        process.env.liserp_DIR,
        "lisModules/DEV/DEVT03/components/basic/message.txt"
    );

    dv.txt = await fs.readFileSync(txtPath).toString();


    return dv;
}