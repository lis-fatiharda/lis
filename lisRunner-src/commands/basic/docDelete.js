
// This function downloads lis-Desktop app to client
import fs from "fs";
function docDelete(params) {


    

    fs.exists(params.serverpath, function (exists) {
        if (exists) {
            //Show in green
           // console.log("File exists. Deleting now ...");
            fs.unlink(params.serverpath, function (err) {
                if (err) return console.log(err);
            //    console.log("file deleted successfully");
            }); 
        } else {
            //Show in red
            console.error("File not found, so not deleting.");
        }
    });
    //params.lisAttachment = params.serverPath;
    return params;
}

export default docDelete;
