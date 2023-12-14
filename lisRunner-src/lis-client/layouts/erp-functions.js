import appAxios from "../configs/appAxios";
import home from "../pages/home.vue";
import message from "../../commands/basic/message.js";
import router from "../configs/router";
import docDownload from "../../commands/system/docDownload.js";

import {
    defineAsyncComponent
} from "vue";
import { data } from "vue-barcode";

export async function fullScreenMode(AppFullscreen, isFullScreen) {
    if (isFullScreen == false) {
        await AppFullscreen.request();
        return true;
    } else {
        await AppFullscreen.exit();
        return false;
    }
};

export async function addFavPage(pPage) {
    let params = { pPage: pPage };
    await appAxios
        .post("cmd-system.addFavPage", params)
        .then((res) => { })
        .catch((err) => { });
};

export async function addTab(lv) {
    if (lv.lisTabs.tabs.length < 9) {
        lv.tabIdCounter++;

        lv.lisTabs.tabs.push({
            id: lv.tabIdCounter,
            name: "home",
            icon: "home",
            label: "Ana Sayfa",
            component: home,
            moduleColor: "grey",
            favColor: "grey",
            blockGoToTransaction: false,
        });
        return lv.tabIdCounter;
    }
};

export async function delTab(tab, currentTab, lv) {
    if (tab.blockGoToTransaction == false) {
        let index = lv.lisTabs.tabs.indexOf(tab);
        if ((index > -1) & (lv.lisTabs.tabs.length > 1)) {
            lv.lisTabs.tabs.splice(index, 1);
            if (currentTab.value != 0) {
                return lv.lisTabs.tabs[index - 1].id;
            }
        }
    }
};

export async function goToTransaction(page, currentTab, m, lv, $q, leftDrawerOpen) {
    let tmpTab = lv.lisTabs.tabs.filter((i) => i.id == currentTab);
    let index = lv.lisTabs.tabs.indexOf(tmpTab[0]);

    if (lv.lisTabs.tabs[index].blockGoToTransaction == false) {
        const AsyncComp = defineAsyncComponent(() =>
            import(`../../../development/lisModules/${page.component}.vue`)
        );

        lv.lisTabs.tabs[index] = {
            id: tmpTab[0].id,
            name: page.code,
            icon: "",
            label: page.code,

            component: AsyncComp,
            moduleColor: m.moduleColor,
            favColor: m.moduleColor,
            blockGoToTransaction: false,
        };

        if (($q.platform.is.desktop != true) & (leftDrawerOpen.value == true)) {
            return false;
        }
    }
};


export async function logOut() {
    if (
        (await message(
            "c",
            "LISERP",
            "Çıkış Yapmak İstediğinize Emin misiniz?"
        )) == true
    ) {
        const tmpdv = {
            token: localStorage.sys_token,
            username: localStorage.sys_user,
        };

        await appAxios
            .post("cmd-system.btnLogout", tmpdv)
            .then((res) => {
                localStorage.sys_token = "";
                router.push("/login");

                //window.location.reload();
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}


export async function setProductLicense() {

    let myReturn = await appAxios
        .post("cmd-system.fetchLicense", {}).catch((err) => {
            console.log("localStorageerrerr", err)
        });

    Object.assign(localStorage, myReturn?.data?.licenseFile);
    Object.assign(localStorage, myReturn?.data?.envFile);

    if (localStorage.product_LICENCE == "EXPRESS") {

        if (
            (localStorage.lisApi_URL == undefined) |
            (localStorage.lisApi_URL == "") |
            (localStorage.sys_token == undefined) |
            (localStorage.sys_token == "") |
            (localStorage.sys_user == undefined) |
            (localStorage.sys_user == "")
        ) {
            localStorage.sys_token = "";
            router.push("/login");
            return;
        }
    }

    if (localStorage.product_LICENCE == "PREMIUM") {

        if (
            (localStorage.lisApi_URL == undefined) |
            (localStorage.lisApi_URL == "") |
            (localStorage.sys_token == undefined) |
            (localStorage.sys_token == "")
        ) {
            localStorage.sys_token = "";
            router.push("/login");
            return;
        }
    }
}



export async function lisInit(lv) {

    const res = await appAxios
        .post("cmd-system.lisInit", lv).catch((err) => {
            console.log("catchcatch")
            router.push("/login");
        });

    lv.olisappobjects = [...res.data.olisappobjects];
    lv.olisusers = [...res.data.olisusers];

    //**Creating Menu */
    lv.lisMenu0 = res.data.olisappobjects.filter((x) => x.group == 0);
    lv.lisMenu1 = res.data.olisappobjects.filter((x) => x.group == 1);

    for (let i in res.data.favPages) {
        let myFavPage = res.data.favPages[i];

        for (let k in myFavPage.transactions) {
            let myTransaction = myFavPage.transactions[k];
            let newFavPage = {};
            newFavPage.code = myTransaction.code;
            newFavPage.component = myTransaction.component;
            newFavPage.stext = myTransaction.stext;
            newFavPage.stexte = myTransaction.stexte;
            newFavPage.pathName = myTransaction.pathName;
            newFavPage.moduleColor = myFavPage.moduleColor;

            lv.favPages.push(newFavPage);
        }
    }

    lv.isShowLayout.value = true;

    if (lv.olisusers[0].isSuperUser == 0) {
    }

    return lv;
}


export async function btnDownloadlisDesktop() {
    docDownload("LIS.rar", `${envFile.liserp_DIR}lisDesktop/lisDesktop.rar`);
}