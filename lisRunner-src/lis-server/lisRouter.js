import { Router } from "express";
import { join } from "path";
import middlewareAuth from "./middleware-auth.js";
let fncPath = "";
let clsPath = "";
let cmpPath = "";

const lisRouter = Router();

//---
var sendAndSleep = function (response, counter) {
    if (counter > 10) {
        response.end();
    } else {
        response.write(" ;i=" + counter);
        counter++;
        setTimeout(function () {
            sendAndSleep(response, counter);
        }, 1000);
    }
};
//---

//***********************ERP*********************************** */

lisRouter.all("/lisApi/*", middlewareAuth, async (req, res, next) => {

    //--------------------------------------------------------------
    //******COMPONENT METHODS WORKS***** */

    if (req.url.slice(8, 12) == "cmd-") {

        console.log("cmdcmd", req.url)

        fncPath = req.url.slice(req.url.indexOf(".") + 1, 50);
        cmpPath = join(
            join(
                `${process.env.liserp_DIR}lisRunner/commands/`,
                req.url.slice(12, req.url.indexOf(".")),
                fncPath + ".js"
            )
        );
        //console.log("cmpPath", cmpPath);
        //console.log("fncPath", fncPath);

        try {
            const lisFunction = await import(cmpPath);
            res.body = await lisFunction
                .default(req.body, req.files, req.headers)
                .catch((err) => {
                    res.status(400).send(err.message);
                });

            res.send(res.body);
        } catch (error) {
            res.status(400).send(error.message);
            //console.log("LisApi Function error");
            //console.log(error);
            return;
        } finally {
            res.end();
        }

        return;
    }

    if (req.url.slice(8, 12) == "cmp-") {

        fncPath = req.url.slice(req.url.indexOf(".") + 1, 50);
        cmpPath = join(
            join(
                `${process.env.liserp_DIR}lisRunner/lis-client/components`,
                req.url.slice(12, req.url.indexOf(".")),
                fncPath + ".js"
            )
        );

        //console.log("cmpPath", cmpPath);
        //console.log("fncPath", fncPath);

        try {
            const lisFunction = await import(cmpPath);
            res.body = await lisFunction
                .default(req.body, req.files, req.headers) 
                .catch((err) => {
                    res.status(400).send(err.message);
                });

            res.send(res.body);
        } catch (error) {
            res.status(400).send(error.message);
            //console.log("LisApi Function error");
            //console.log(error);
            return;
        } finally { 
            res.end();
        }
        
        return;
    }


    //******CLASSES METHODS WORKS***** */
    //console.log("clsPath", clsPath);
    if (req.url.slice(8, 12) == "cls-") {
        fncPath = req.url.slice(req.url.indexOf(".") + 1, 50);
        clsPath = join(
            join(
                `${process.env.liserp_DIR}development/lisModules/`,
                "classes",
                req.url.slice(12, req.url.indexOf(".")),
                "A-" + req.url.slice(12, req.url.indexOf(".")) + ".js"
            )
        );
        //console.log("clsPath", clsPath);
        //console.log("fncPath", fncPath);

        try {
            const LisClass = await import(clsPath);
            const lisClass = new LisClass.default();

            //console.log("***req.body***", req.body)

            res.body = await eval(
                "lisClass." + fncPath + "(req.body,req.files,req.headers)"
            );
        } catch (error) {
            res.status(400).send(error.message);
            //console.log("LisApi Function error");
            //console.log(error);
            return;
        }
        try {
            if (res.body.lisAttachment) {
                //console.log("indiriliyor..", res.body.lisAttachment);
                //when using text/plain it did not stream
                res.download(join(res.body.lisAttachment));
                //sendAndSleep(res, 1);
            } else {
                //console.log("LisApi Gönderiliyor..");
                res.send(res.body);
            }
        } catch (error) {
            //console.log(error);
            res.end();
        }

        //******DIALOGS METHODS WORKS***** */
    } else {
        //console.log("req.url.slice(1, 5)", req.url.slice(8, 100));

        fncPath = join(
            `${process.env.liserp_DIR}development/lisModules/`,
            req.url.slice(8, 11),
            "/",
            req.url.slice(8, 100) + ".js"
        );
        //console.log("fncPath", fncPath);

        try {
            const lisFunction = await import(fncPath);
            res.body = await lisFunction
                .default(req.body, req.files, req.headers)
                .catch((err) => {
                    //console.log("err.message");
                    //console.log(err.message);
                    res.status(400).send(err.message);
                });
            res.send(res.body);
        } catch (error) {
            res.status(400).send(error.message);
        } finally {
            res.end();
        }
    }
    //------------
});

//***********************e-mutabakat*********************************** */

lisRouter.all("/emutabakat/*", async (req, res, next) => {        
    
        fncPath = req.url.slice(req.url.indexOf(".") + 1, 50);
        clsPath = join(
            `${process.env.SRC_DIR}lisModules/`,
            "classes/emutabakat/A-emutabakat"
        );
        //console.log("clsPath", clsPath);
        //console.log("fncPath", fncPath);

        try {
            const LisClass = await import(clsPath);
            const lisClass = new LisClass();
            res.body = await eval(
                "lisClass." + fncPath + "(req.body,req.files,req.headers)"
            );
        } catch (error) {
            res.status(400).send(error.message);
            //console.log("LisApi Function error");
            //console.log(error);
            return;
        }
        try {
            if (res.body.lisAttachment) {
                //console.log("indiriliyor..", res.body.lisAttachment);
                //when using text/plain it did not stream
                res.download(join(res.body.lisAttachment));
                //sendAndSleep(res, 1);
            } else {
                //console.log("LisApi Gönderiliyor..");
                res.send(res.body);
            }
        } catch (error) { 
            //console.log(error);
            res.end();
        }
    
});

export default lisRouter;
