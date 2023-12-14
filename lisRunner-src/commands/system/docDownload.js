import appAxios from "../../lis-client/configs/appAxios";

export default async function docDownload(docName, serverPath) {
    console.log("downloadDoc");
    console.log(docName);
    console.log(serverPath);
    let Pbody = { docName: docName, lisAttachment: serverPath };
    await appAxios({
        method: "post",
        url: "cls-system.docDownload",
        responseType: "blob",
        data: Pbody,
    }).then((response) => {
        console.log(typeof response.data);
            console.log("geldi download", response.data);
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
