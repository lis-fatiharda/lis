// add new lock according to lock parameters
// params: {
//  string : company,
//  string : lid,
//  string : lockkey,
// }
export default async function unlock({ company, lid, lockkey }) {

    await lislocks
        .deleteOne({
            company: company,
            lid: lid,
            lockkey: lockkey,
        })
        .then((res) => {
            return true;
        })
        .catch((err) => {
            return false;
        });
};
