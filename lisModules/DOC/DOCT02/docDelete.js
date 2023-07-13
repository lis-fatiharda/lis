// This function downloads lis-Desktop app to client
import fs from "fs";

export default async function docDelete(params) {
    console.log("selam from docDelete", params);

    fs.exists(params.item.path, async function (exists) {
        if (exists) {
            //Show in green

            console.log("************", params.doc);
            console.log("File exists. Deleting now ...");
            fs.unlink(params.item.path, function (err) {
                if (err) return console.log(err);
                console.log("file deleted successfully");
            });

            await lisdocdocs
                .findOneAndUpdate({ _id: params.doc._id }, params.doc, {
                    new: true,
                    upsert: true,
                })
                .then((res) => {
                    console.log("lisdocdocs Güncellendi", params);
                    return params;
                })
                .catch((err) => {
                    throw new Error("lisdocdocs Güncellenemedi!", err);
                });
        } else {
            //Show in red
            console.error("File not found, so not deleting.");
            params.doc = {};
            console.log(params);
            return params;
        }
        //params.lisAttachment = params.serverPath;
    });
}
