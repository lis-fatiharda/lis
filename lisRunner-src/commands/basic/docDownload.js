import appAxios from "../../lis-client/configs/appAxios.js";

export default async function docDownload(docName, serverPath) {
    let Pbody = { docName: docName, lisAttachment: serverPath };
    await appAxios({
        method: "post",
        url: "cls-system.docDownload",
        responseType: "blob",
        data: Pbody,
    })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", docName); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
        .catch((err) => {
            console.log("Download ERROR!!!", err);
        });
}
