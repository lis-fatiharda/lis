
import URL from "url";

export default async function validate(req, res, next) {

    //? Web service request

    if (req.body.apiKey != undefined) {
        let myUrl = URL.parse(req.url, true);

        let wsMethod = myUrl.path;
        wsMethod = wsMethod.replace("/lisApi/", "");

        console.log("---wsMethod---", wsMethod);

        const olisapiKeys = await lisapiKeys.findOne({
            apiKey: req.body.apiKey,
            docdate: {
                $lte: new Date(),
            },
            //  validuntil: {
            //      $gte: new Date(),
            //  },
            isblocked: false,
            _deleted: false,
        });



        if (olisapiKeys == null) {
            // res.sendStatus(401);
            res.send("Api Key Geçerli Değil!");

            return;
        }



        let isRight = olisapiKeys.wsmethods.filter((e) => {
            return e.wsmethod == wsMethod;
        });

        console.log("isRight", isRight);

        if (isRight.length == 0) {
            res.send("WS Method Yetkisi Yok!");

            return;
        }

        console.log("wsMethod", wsMethod);

        let oliswebservices = await liswebservices.findOne({ wsmethod: wsMethod, _deleted: false });

        console.log("oliswebservices", oliswebservices);

        if (oliswebservices == null) {
            res.send("WS Methodu Bulunamadı!");
            return;
        }



        if (oliswebservices?.isblocked == true) {
            res.send("WS Methodu Blokeli!");
            return;
        }

        req.url = req.url.replace(oliswebservices.wsmethod, oliswebservices.lisfunction);


        global.sys_user = olisapiKeys.username;
        global.sys_token = olisapiKeys.apiKey;

        return next();
    }

    //######################################

    //? System request

    let myUrl = URL.parse(req.url, true);

    if (myUrl.path.indexOf("cmd-system") > -1) {

        let tmpAuth = req.headers.authorization;

        if (tmpAuth != undefined) {
            let userInfos = tmpAuth.slice(0, tmpAuth.indexOf("|"));
            let tmpsys_user = userInfos.slice(0, userInfos.indexOf("$"));
            global.sys_user = tmpsys_user != undefined ? tmpsys_user : "";
            
            let tmpLis_token = userInfos.slice(
                userInfos.indexOf("$") + 1,
                userInfos.length
            );
            global.sys_token = tmpLis_token != undefined ? tmpLis_token : "";
        
        
        
        } else {
            global.sys_user = "System";


        }


        return next();
    }

    //  if (
    //      ((req.url.slice(12, req.url.indexOf(".")) == "system") &
    //          (req.url.slice(req.url.indexOf(".") + 1, 40) == "btnLogin")) |
    //      ((req.url.slice(12, req.url.indexOf(".")) == "system") &
    //          (req.url.slice(req.url.indexOf(".") + 1, 40) == "btnSendPwd"))
    //  ) {
    //      return next();
    //  }

    //######################################

    //? lisFunction request

    let tmpAuth = req.headers.authorization;

    if (tmpAuth == undefined) {
        res.sendStatus(401);
        return;
    }

    let userInfos = tmpAuth.slice(0, tmpAuth.indexOf("|"));
    let locationInfos = tmpAuth.slice(tmpAuth.indexOf("|") + 1, tmpAuth.length);

    let tmpsys_user = userInfos.slice(0, userInfos.indexOf("$"));
    let tmpLis_token = userInfos.slice(
        userInfos.indexOf("$") + 1,
        userInfos.length
    );

    global.sys_user = tmpsys_user != undefined ? tmpsys_user : "";
    global.sys_token = tmpLis_token != undefined ? tmpLis_token : "";

    //--

    let userLatitude = locationInfos.slice(0, locationInfos.indexOf("$"));
    let userLongitude = locationInfos.slice(
        locationInfos.indexOf("$") + 1,
        locationInfos.length
    );

    //console.log("Enlem : " + userLatitude);
    //console.log("Boylam : " + userLongitude);



    const ctrlToken = await lisuserlogins.find({
        token: global.sys_token,
    });
    //console.log(ctrlToken);
    //console.log(ctrlToken.length);

    if (ctrlToken.length == 0) {
        res.sendStatus(401);
        return;
    }
    //-- Write user Location
    await lisuserlogins.updateOne(
        { token: global.sys_token },
        { $set: { latitude: userLatitude, longitude: userLongitude } }
    );

    return next();
}
