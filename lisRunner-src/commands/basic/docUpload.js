import appAxios from "../../lis-client/configs/appAxios.js";

export default async function docUpload(pCompany, pNumrange, pPath, doc) {
    console.log("889");
    //*** prepare formData and dataUploading */
    var dataUploading = [];
    var formData = new FormData();

    for (let i = 0; i < doc.path.length; i++) {
        await appAxios
            .post("cls-numrange.getNewNumber", {
                company: pCompany,
                numrange: pNumrange,
            })
            .then((res) => {
                console.log("numaram", res.data);
                formData.append(
                    `file-${i}`,
                    doc.path[i],
                    res.data + "." + doc.path[i].name.slice(-3)
                );
                dataUploading.push({
                    stext: doc.path[i].name,
                    //serverpath: pPath + res.data,
                    path: pPath + res.data + "." + doc.path[i].name.slice(-3),
                });
            });
    }

    console.log("dataUploading");
    console.log(dataUploading);

    formData.append(`docman`, pPath);

    for (let obj in formData) {
        console.log(obj);
    }

    //***  send formData to server */

    await appAxios
        .post("cls-system.docUpload", formData, {})
        .then((res) => {
            for (let i = 0; i < doc.path.length; i++) {
                doc.items.push(...dataUploading);
                doc.path = [];
            }
        })
        .catch((err) => {
            alert(err);
        });

    return doc;
}
