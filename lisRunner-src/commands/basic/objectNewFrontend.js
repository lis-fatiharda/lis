import appAxios from "../../lis-client/configs/appAxios.js";

export default async function objectNewFrontend(pModel) {
    const myObject = await appAxios.post(
        "cmp-commands/basic.objectNew",
        pModel
    );

    return myObject.data;
}
