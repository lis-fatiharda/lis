import appAxios from "../../lis-client/configs/lisFunc-axios.js";
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
            this.$q.notify({
                type: "negative",
                message: err.response.data,
                actions: [{ label: "X", color: "white", dense: true }],
            });
            isError = true;
        });

    if (isError == false) {
        return myReturn.data;
    } else {
      throw new Error("Error occurred");
    }
}
