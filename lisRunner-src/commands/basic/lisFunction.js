import appAxios from "../../lis-client/configs/appAxios";
import lisAlert from "./alert.js";
export default async function lisFunction(pFunction, pObject) {
    var myReturn = {};
    var isError = false;
    await appAxios
        .post(pFunction, pObject)
        .then((res) => {
            myReturn = res;
            return myReturn.data;
        })
        .catch((err) => {
            lisAlert("e", err.response.data);

            isError = true;
        }); 

    if (isError == false) {
        return myReturn.data;
    } else {
        throw new Error("Error occurred");
    }
}
