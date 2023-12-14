import Axios from "axios";
export default async function callWebService(pUrl, pObject) {
    var isError = false;
    await Axios.post(pUrl, pObject)
        .then((res) => {
            return res.data;
        })
        .catch(async(err) => {
          throw new Error(err);
        });
}
