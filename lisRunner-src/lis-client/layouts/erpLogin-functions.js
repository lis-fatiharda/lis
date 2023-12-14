import router from "../configs/router";
import appAxios from "../configs/appAxios";

export function goToWebSite() {
    window.open("https://liserp.com", "_self");
};
export async function fetchProjectUrl() {
    let theReturn = undefined;
    await Axios.post(
        "https://lyz.liserp.com/lisApi/cmd-system.fetchProjectUrl",
        this.dv
    )
        .then((res) => {
            this.dv = res.data;
            theReturn = true;
        })
        .catch((err) => {
            this.$q.notify({
                message: err.response.data,
                type: "negative",
            });

            theReturn = false;
        });

    return theReturn;
}
export async function btnSendPwd() {
    if (localStorage.product_LICENCE == "PREMIUM") {
        this.dv.isShowDatabase = true;
    } else {
        await this.fetchProjectUrl();
        let apiPath = this.dv.apiurl + "cmd-system.btnSendPwd";
        await Axios.post(apiPath, {
            email: this.dv.sys_email,
            express: true,
        })
            .then((res) => {
                this.lis.alert(
                    "p",
                    "Kurtarma Şifresi Mailine önderildi."
                );
                this.isForgetPwd = false;
                this.dv.sys_email = "";
            })
            .catch((err) => {
                this.$q.notify({
                    message: err.response.data,
                    type: "negative",
                });
            });
    }
};
export async function btnLogin() {
    if (localStorage.product_LICENCE == "PREMIUM") {
        this.dv.passwordHashed = await this.lis.sha256(
            this.dv.password
        );
        this.dv.password = "";

        this.dv = await this.lis.function(
            "cmd-system.btnLogin",
            this.dv
        );

        if (
            (this.dv.sys_token != "") &
            (this.dv.sys_token != undefined)
        ) {
            localStorage.sys_user = this.dv.sys_user;
            localStorage.sys_email = this.dv.sys_email;
            localStorage.sys_token = this.dv.sys_token;
            localStorage.sys_loginDate = this.dv.sys_loginDate;
            localStorage.sys_dataBase = this.dv.sys_dataBase;

            router.push("/");
        } else {
            this.$q.notify({
                message: "Token Bilgisi Okunamadı!", 
                type: "negative",
            });
        }
    } else {

        let myReturn = await this.fetchProjectUrl();


        if (myReturn == false) return;

        //---- ikinci istek projeye login

        this.dv.passwordHashed = await this.lis.sha256(
            this.dv.password
        );
        this.dv.password = "";

        let apiPath = this.dv.apiurl + "cmd-system.btnLogin";


        await Axios.post(apiPath, this.dv)
            .then((res) => {
                this.dv = res.data;

                localStorage.sys_user = this.dv.sys_user;
                localStorage.sys_email = this.dv.sys_email;
                localStorage.sys_token = this.dv.sys_token;
                localStorage.envFile.lisApi_URL = this.dv.apiurl;
 
                router.push("/");
            })
            .catch((err) => {
                console.log(err);
                this.$q.notify({
                    message: err.response.data,
                    type: "negative",
                });
            });
    }
};

export async function mountedFunc(dv) {

    let myReturn = await appAxios
        .post("cmd-system.fetchLicense", {}).catch((err) => {
            console.log("localStorageerrerr", err)
        });


    Object.assign(localStorage, myReturn?.data?.licenseFile);
    Object.assign(localStorage, myReturn?.data?.envFile);

    dv.product_LICENCE = localStorage.product_LICENCE;

    //-

    if (window.screen.width > 500) {
        dv.showLogo = true;
    } else {
        dv.showLogo = false;
    }

    if (localStorage.product_LICENCE == "PREMIUM") {
        dv.sys_userVmail = localStorage.sys_userVmail;
        dv.sys_dataBase = "lisdb";
        dv.isShowDatabase = true;
    } else {
        dv.sys_userVmail = "";
        localStorage.sys_userVmail = "";
        dv.isShowDatabase = false;
    }
    return dv;
};