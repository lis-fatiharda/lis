import { Notify } from "quasar";

export default async function alert(type, message, caption) {


    let myType = "";
    if ((type == "p") | (type == "P")) myType = "positive";
    if ((type == "e") | (type == "E")) myType = "negative";
    if ((type == "w") | (type == "W")) myType = "warning";
    if ((type == "i") | (type == "I")) myType = "info";
    Notify.create({
        type: myType,
        message: message,
        caption: caption,
        actions: [{ label: "X", dense: true }],
    });
}
