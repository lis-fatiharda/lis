// add new lock according to lock parameters
// params: {
//  string : company,
//  string : lid,
//  string : lockkey,
// }
import lislocks from "../../../lisModels/lislocks.js";
export default async function unlock(params) {
    console.log("Pcompany, Plid, Plockkey");

    console.log(params);

    await lislocks
        .deleteOne({
            company: params.company,
            lid: params.lid,
            lockkey: params.lockkey,
        })
        .then((res) => {
            return true;
        })
        .catch((err) => {
            return false;
        });
};
