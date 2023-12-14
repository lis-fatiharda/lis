import appAxios from "../../configs/appAxios";

export default async function docUpload(Pcompany, PnumRange, Ppath, doc) {
    console.log("889");
    //*** prepare formData and dataUploading */
    var dataUploading = [];
    var formData = new FormData();

    for (let i = 0; i < doc.path.length; i++) {
        await appAxios
            .post("cls-numrange.getNewNumber", {
                company: Pcompany,
                numrange: PnumRange,
            })
            .then((res) => {
                console.log("numaram", res.data); 
                formData.append(
                    `file-${i}`,
                    doc.path[i],
                    res.data + "." + doc.path[i].name.slice(-3)
                );
                dataUploading.push({
                    name: doc.path[i].name,
                    //serverpath: Ppath + res.data,
                    serverpath:
                        Ppath + res.data + "." + doc.path[i].name.slice(-3),
                });
            });
    }

    console.log("dataUploading");
    console.log(dataUploading);

    formData.append(`docman`, Ppath);

    for (let obj in formData) {
        console.log(obj);
    }

    //***  send formData to server */

    await appAxios
        .post("cls-system.docUpload", formData, {})
        .then((res) => {
            for (let i = 0; i < doc.path.length; i++) {
                doc.uploaded.push(...dataUploading);
                doc.path = [];
            }
        })
        .catch((err) => {
            alert(err);
        });

    return doc;
}
