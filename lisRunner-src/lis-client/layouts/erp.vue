<script setup>
import { ref, reactive, onBeforeMount, onBeforeUnmount } from "vue";
import { useQuasar, AppFullscreen } from "quasar";
import lisChat from "../pages/lisMessenger.vue";
import lisMail from "../pages/lisMail.vue";
import lisNotifications from "../pages/lisNotifications.vue";
import home from "../pages/home.vue";
import clock from "../pages/clock.vue";
import {
    fullScreenMode,
    addFavPage,
    addTab,
    delTab,
    goToTransaction,
    logOut,
    setProductLicense,
    lisInit,
    btnDownloadlisDesktop
} from "./erp-functions.js";

const $q = useQuasar();
let leftDrawerOpen = ref(true);
let isShowFavPages = ref(false);
const getLangu = ref("");

let isConnectionLost = ref(false);
var currentTab = ref(0);
var strMail = ref("");
var strCalendar = ref("");
var strMessenger = ref("");
var strProfile = ref("");
var filterStr = ref("");
var isShowCLBT04 = ref(false);
var isShowCLBT05 = ref(false);
var isShowCLBT07 = ref(false);

window.addEventListener("offline", () => {
    isConnectionLost.value = true;
});
window.addEventListener("online", () => {
    isConnectionLost.value = false;
});

let lv = {
    sys_user: localStorage.sys_user,
    olisappobjects: [],
    olisusers: [],
    lisMenu0: [],
    lisMenu1: [],
    lisMenu2: [],
    favPages: [],
    logoutConfirmation: ref(false),
    lisTabs: reactive({ tabs: [] }),
    tabIdCounter: 0,
    isShowLayout: ref(false),
};

let lisMenu1Filtered = lv.lisMenu1;
let menuToggle = ref("grain");
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

//*** Fullscreen Mode */
let isFullScreen = false;

async function setFullscreen() {
    isFullScreen = await fullScreenMode(AppFullscreen, isFullScreen);
}
//****** */

async function btnAddTab() {
    currentTab.value = await addTab(lv);
}

async function btnDelTab(tab) {
    currentTab.value = await delTab(tab, currentTab, lv);
}

async function btnGoToTransaction(page, currentTab, m, lv, $q) {
    leftDrawerOpen.value = await goToTransaction(
        page,
        currentTab,
        m,
        lv,
        $q,
        leftDrawerOpen
    );
}

function openVScode(tab) {
    console.log("openVScode");
}
function openHelp(tab) {
    console.log("openHelp");
}

function isShowModule(m1) {
    if (filterStr.value != "") {
        for (let i in m1.transactions) {
            if (
                (m1.transactions[i].code
                    .toUpperCase()
                    .indexOf(filterStr.value.toUpperCase()) >=
                    0) |
                (m1.transactions[i].stext
                    .toUpperCase()
                    .indexOf(filterStr.value.toUpperCase()) >=
                    0)
            )
                return true;
        }

        return false;
    } else {
        return true;
    }
}

function isShowPage(page) {
    if (filterStr.value != "") {
        if (
            (page.code.toUpperCase().indexOf(filterStr.value.toUpperCase()) >=
                0) |
            (page.stext.toUpperCase().indexOf(filterStr.value.toUpperCase()) >=
                0)
        ) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

function changeLangu() {
    console.log("changeLangu");
    if (document.documentElement.getAttribute("lang") == "tr-TR") {
        document.documentElement.setAttribute("lang", "en");
        //this.$i18n.locale = 'en'
        getLangu.value = "en";
        console.log(document.documentElement.getAttribute("lang"));
    } else {
        document.documentElement.setAttribute("lang", "tr-TR");
        console.log(document.documentElement.getAttribute("lang"));
        getLangu.value = "tr";
        //this.$i18n.locale = 'tr'
    }
}

onBeforeMount(async () => {
    document.documentElement.setAttribute("lang", "tr-TR");
    getLangu.value = "tr";
    await setProductLicense();
    menuToggle.value = "grain";
    leftDrawerOpen.value = false;
    strMail.value = window.screen.width > 500 ? "E-Mail" : "";
    strCalendar.value = window.screen.width > 500 ? "Ajanda" : "";
    strMessenger.value = window.screen.width > 500 ? "Mesaj" : "";
    strProfile.value = window.screen.width > 500 ? localStorage.sys_user : "";
    lv = await lisInit(lv);
    lisMenu1Filtered = lv.lisMenu1;
});
onBeforeUnmount(async () => {
    localStorage.sys_token = "";
});
</script>

<template>
    <div
        id="app"
        background-color="#f4f3ef"
        v-if="lv.isShowLayout.value == true"
        style="height: 100vh"
    >
        <q-layout
            view="hHh lpR fFf"
            style="background-color: #f4f3ef; height: 100%"
        >
            <q-header reveal bordered class="bg-white">
                <q-bar class="text-black bg-white non-selectable">
                    <q-btn
                        flat
                        dense
                        @click="
                            leftDrawerOpen = !leftDrawerOpen;
                            isShowFavPages = false;
                        "
                        split
                        rounded
                        aria-label="Menu"
                        icon="menu"
                    >
                    </q-btn>

                    <div class="q-gutter-xs">
                        <q-btn
                            dense
                            flat
                            round
                            icon="lens"
                            size="8.5px"
                            color="green"
                            @click="isShowCLBT04 = true"
                            ><q-tooltip>{{
                                this.$gl(
                                    "Çalışma Tablolarım",
                                    "My Spreadsheets"
                                )
                            }}</q-tooltip>
                            <q-dialog
                                full-width
                                v-model="isShowCLBT04"
                                persistent
                            >
                                <div class="bg-white">
                                    <CLBT04D01
                                        :isDialog="true"
                                        @cancel="isShowCLBT04 = false"
                                    />
                                </div>
                            </q-dialog>
                        </q-btn>
                        <q-btn
                            dense
                            flat
                            round
                            icon="lens"
                            size="8.5px"
                            color="yellow"
                            @click="isShowCLBT05 = true"
                            ><q-tooltip>{{
                                this.$gl("Notlarım", "My Notes")
                            }}</q-tooltip>
                            <q-dialog
                                full-width
                                v-model="isShowCLBT05"
                                persistent
                            >
                                <div class="bg-white">
                                    <CLBT05D01
                                        :isDialog="true"
                                        @cancel="isShowCLBT05 = false"
                                    />
                                </div>
                            </q-dialog>
                        </q-btn>

                        <q-btn
                            dense
                            flat
                            round
                            icon="lens"
                            size="8.5px"
                            color="red"
                            ><q-tooltip>{{
                                this.$gl("Yapılacaklar Listem", "To do list")
                            }}</q-tooltip>
                        </q-btn>
                    </div>
                    <clock v-if="$q.platform.is.desktop == true" />

                    <q-space />

                    <div class="q-gutter-sm q-pa-xs">
                        <q-btn dense flat>
                            <div class="q-pa-xs text-subtitle">
                                {{ strProfile }}
                            </div>

                            <q-avatar size="26px">
                                <img
                                    src="https://cdn.quasar.dev/img/boy-avatar.png"
                                />
                            </q-avatar>

                            <q-menu
                                transition-show="scale"
                                transition-hide="scale"
                            >
                                <q-list style="min-width: 100px">
                                    <q-item
                                        clickable
                                        @click="isShowCLBT07 = true"
                                    >
                                        <q-item-section
                                            >{{ this.$gl("Profil", "Profile") }}
                                            <q-dialog
                                                full-width
                                                v-model="isShowCLBT07"
                                                persistent
                                            >
                                                <div class="bg-white">
                                                    <CLBT07D01
                                                        :isDialog="true"
                                                        @cancel="
                                                            isShowCLBT07 = false
                                                        "
                                                    />
                                                </div>
                                            </q-dialog>
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable>
                                        <q-item-section
                                            @click="btnDownloadlisDesktop()"
                                            >{{
                                                this.$gl(
                                                    "Lis Masaüstü İndir",
                                                    "Download Lis Desktop"
                                                )
                                            }}</q-item-section
                                        >
                                    </q-item>
                                    <q-item clickable>
                                        <q-item-section
                                            @click="btnDownloadlisDesktop()"
                                            >{{
                                                this.$gl(
                                                    "Lis Mobil Kurulum",
                                                    "Lis Mobile Setup"
                                                )
                                            }}</q-item-section
                                        >
                                    </q-item>
                                    <q-item>
                                        <q-btn
                                            :label="
                                                this.$gl('Dil :', 'Language :')
                                            "
                                            dense
                                            flat
                                            @click="changeLangu()"
                                            >{{ getLangu.toUpperCase() }}</q-btn
                                        >
                                    </q-item>
                                    <q-separator />
                                    <q-item clickable color="danger">
                                        <q-item-section @click="logOut()">{{
                                            this.$gl("Çıkış", "Log out")
                                        }}</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>
                        <q-btn
                            round
                            dense
                            flat
                            color="white-8"
                            icon="notifications"
                        >
                            <q-badge
                                color="red"
                                text-color="white"
                                floating
                                rounded
                            >
                                3
                            </q-badge>
                            <q-tooltip>{{
                                this.$gl("Bildirimler", "Notifications")
                            }}</q-tooltip>
                            <q-menu
                                style="
                                    width: 40%;
                                    height: 80%;
                                    min-width: 330px;
                                "
                                transition-show="slide-down"
                                transition-hide="slide-up"
                            >
                                <lisNotifications></lisNotifications>
                            </q-menu>
                        </q-btn>
                        <q-btn
                            dense
                            flat
                            icon="fullscreen"
                            @click="setFullscreen()"
                        >
                            <q-tooltip>
                                {{ this.$gl("Tam Ekran", "Fullscreen") }}
                            </q-tooltip></q-btn
                        >
                    </div>
                </q-bar>
            </q-header>

            <q-drawer
                v-model="leftDrawerOpen"
                bordered
                :width="240"
                style="background: #f3f2f1"
                side="left"
                behavior="desktop"
                :overlay="$q.platform.is.desktop == true ? false : true"
            >
                <q-tabs
                    v-model="menuToggle"
                    dense
                    align="justify"
                    :breakpoint="0"
                >
                    <q-tab
                        name="settings"
                        icon="settings"
                        :style="
                            menuToggle == 'settings'
                                ? 'background: #f3f2f1'
                                : 'background: #d1d2df'
                        "
                    />
                    <q-tab
                        name="grain"
                        icon="grain"
                        :style="
                            menuToggle == 'grain'
                                ? 'background: #f3f2f1'
                                : 'background: #d1d2df'
                        "
                    />
                </q-tabs>
                <q-separator />
                <q-tab-panels
                    v-model="menuToggle"
                    class="q-gutter-xs"
                    style="background: #f3f2f1"
                    animated
                >
                    <q-tab-panel name="settings" style="background: #f3f2f1">
                        <q-list>
                            <q-expansion-item
                                translate="no"
                                v-for="m0 in lv.lisMenu0"
                                :key="m0.module"
                                group="mygrp"
                                class="overflow-hidden"
                                style="border-radius: 10px; background: #f3f2f1"
                                header-class="text-primary"
                                expand-separator
                                :name="m0.module"
                                :caption="m0.module.toUpperCase()"
                                :label="this.$gl(m0.stext, m0.stexte)"
                                default-closed
                            >
                                <q-item
                                    v-for="page in m0.transactions"
                                    :key="page.code"
                                    @click="
                                        btnGoToTransaction(
                                            page,
                                            currentTab,
                                            m0,
                                            lv,
                                            $q
                                        )
                                    "
                                    v-ripple
                                    clickable
                                    class="q-pa-xs q-gutter-xs"
                                >
                                    <q-chip
                                        :color="m0.moduleColor"
                                        size="sm"
                                        translate="no"
                                        >{{ page.code.toUpperCase() }}</q-chip
                                    >

                                    <q-item-section>
                                        <q-item-label>{{
                                            this.$gl(page.stext, page.stexte)
                                        }}</q-item-label>
                                    </q-item-section>

                                    <q-menu touch-position context-menu>
                                        <q-list dense style="min-width: 100px">
                                            <q-item
                                                @click="addFavPage(page.code)"
                                                clickable
                                                v-close-popup
                                            >
                                                <q-item-section>
                                                    {{
                                                        this.$gl(
                                                            "Favori Uygulamalarıma Ekle",
                                                            "Add to my favorites"
                                                        )
                                                    }}
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-menu>
                                </q-item>
                            </q-expansion-item>
                        </q-list>
                        <l-separator />
                        <q-btn
                            label="Müşteri Portalı"
                            color="primary"
                            outline
                            class="text-caption"
                            style="width: 100%"
                        />
                    </q-tab-panel>

                    <q-tab-panel
                        name="grain"
                        class="q-pa-xs"
                        style="background: #f3f2f1"
                    >
                        <q-input
                            dense
                            standout="bg-white text-black"
                            input-class="text-black"
                            v-model="filterStr"
                        >
                            <template v-slot:append>
                                <q-icon
                                    v-if="filterStr === ''"
                                    name="search"
                                    color="black"
                                />
                                <q-icon
                                    v-else
                                    name="clear"
                                    class="cursor-pointer"
                                    @click="filterStr = ''"
                                    color="black"
                                />
                            </template>
                        </q-input>

                        <q-list>
                            <q-expansion-item
                                translate="no"
                                v-for="m1 in lisMenu1Filtered"
                                :key="m1.module"
                                expand-separator
                                expand-icon-class="text-primary"
                                :caption="m1.module.toUpperCase()"
                                :label="this.$gl(m1.stext, m1.stexte)"
                                default-closed
                                dense
                                v-show="isShowModule(m1)"
                            >
                                <q-item
                                    v-for="page in m1.transactions"
                                    v-show="isShowPage(page)"
                                    :key="page.code"
                                    @click="
                                        btnGoToTransaction(
                                            page,
                                            currentTab,
                                            m1,
                                            lv,
                                            $q
                                        )
                                    "
                                    v-ripple
                                    clickable
                                    class="bg-white"
                                    dense
                                    ><q-chip
                                        :color="m1.moduleColor"
                                        size="sm"
                                        translate="no"
                                        >{{ page.code.toUpperCase() }}</q-chip
                                    >

                                    <q-item-section>
                                        <q-item-label>{{
                                            this.$gl(page.stext, page.stexte)
                                        }}</q-item-label>
                                    </q-item-section>

                                    <q-menu touch-position context-menu>
                                        <q-list dense style="min-width: 100px">
                                            <q-item
                                                @click="addFavPage(page.code)"
                                                clickable
                                                v-close-popup
                                            >
                                                <q-item-section
                                                    >{{
                                                        this.$gl(
                                                            "Favori Uygulamalarıma Ekle",
                                                            "Add to my favorites"
                                                        )
                                                    }}
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-menu>
                                </q-item>
                            </q-expansion-item>
                        </q-list>
                    </q-tab-panel>
                </q-tab-panels>
            </q-drawer>

            <!--  *******  -->
            <q-page-container style="height: 100%">
                <q-banner
                    class="text-white bg-red"
                    v-if="isConnectionLost == true"
                >
                    İnternet Bağlantınız Kesildi!
                </q-banner>

                <!--Transition name="slide-fade"-->
                <!--KeepAlive-->
                <!--Suspense-->
                <template v-for="tab in lv.lisTabs.tabs" :key="tab.id">
                    <q-page v-show="tab.id == currentTab" style="height: 100%">
                        <component
                            style="height: 100%"
                            :is="tab.component"
                            :lv="lv"
                            @goToTransaction="
                                btnGoToTransaction(
                                    {
                                        component: $event.component,
                                        code: $event.code,
                                    },
                                    currentTab,
                                    { moduleColor: $event.moduleColor },
                                    lv,
                                    $q
                                )
                            "
                            @addFavPage="addFavPage($event)"
                            :currentTab="currentTab"
                            :tabInfo="tab"
                        ></component>
                    </q-page>
                </template>
                <!--/-Suspense-->
                <!--/-KeepAlive-->
                <!--/!--Transition-->
                <l-scroller
                    :position="'bottom-right'"
                    :icon="'keyboard_arrow_up'"
                    color="primary"
                />
            </q-page-container>
            <!--  *******  -->
            <q-footer reveal bordered class="bg-grey-1">
                <q-bar class="text-black bg-grey-1 rounded-borders">
                    <q-btn flat :label="strMail" icon="mail">
                        <q-menu
                            style="width: 40%; height: 60%; min-width: 330px"
                            transition-show="slide-up"
                            transition-hide="slide-down"
                            persistent
                        >
                            <lisMail></lisMail>
                        </q-menu>
                    </q-btn>
                    <q-btn
                        flat
                        :label="strCalendar"
                        icon="event"
                        @click="
                            btnGoToTransaction(
                                {
                                    component: 'CLB/CLBT02/CLBT02D01',
                                    code: 'CLBT02',
                                },
                                currentTab,
                                { moduleColor: 'yellow-9' },
                                lv,
                                $q
                            )
                        "
                    ></q-btn>
                    <q-space />

                    <q-tabs
                        v-model="currentTab"
                        dense
                        transition="fade"
                        active-color="primary"
                        indicator-color="primary"
                        align="justify"
                        narrow-indicator
                    >
                        <div v-for="tab in lv.lisTabs.tabs" :key="tab.id">
                            <q-tab
                                :name="tab.id"
                                :label="tab.name"
                                :class="
                                    tab.id == currentTab
                                        ? 'text-primary'
                                        : 'text-grey-7'
                                "
                            >
                                <q-menu touch-position context-menu dense>
                                    <q-list>
                                        <q-item
                                            @click="openVScode(tab)"
                                            close-popup
                                            clickable
                                            dense
                                        >
                                            <q-item-section>
                                                Geliştirme Ortamı
                                            </q-item-section>
                                        </q-item>
                                        <q-item
                                            @click="openHelp(tab)"
                                            close-popup
                                            clickable
                                            dense
                                        >
                                            <q-item-section>
                                                Geliştirme Yardım
                                            </q-item-section>
                                        </q-item>
                                        <q-separator />
                                        <q-item
                                            @click="btnDelTab(tab)"
                                            close-popup
                                            clickable
                                            dense
                                        >
                                            <q-item-section>
                                                Sekmeyi Kapat
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-tab>
                        </div>
                        <q-btn
                            rounded
                            dense
                            @click="btnAddTab()"
                            icon="add"
                            size="xs"
                            color="grey-3"
                            class="text-grey-7"
                        />
                    </q-tabs>

                    <!--  *******  -->
                    <q-space />
                    <q-btn flat :label="strMessenger" icon="message">
                        <q-menu
                            style="width: 40%; height: 60%; min-width: 330px"
                            transition-show="slide-up"
                            transition-hide="slide-down"
                            persistent
                            min-width="300px"
                        >
                            <lisChat></lisChat>
                        </q-menu>
                    </q-btn>
                </q-bar>
            </q-footer>
        </q-layout>
    </div>
</template>

<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 20%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>

<style scoped lang="scss">
::v-deep(.dock-demo) {
    .dock-window {
        width: 100%;
        height: 100%;
        position: relative;
        background-image: url("https://www.primefaces.org/wp-content/uploads/2021/02/primevue-blog.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        z-index: 1;
    }

    .p-dock {
        z-index: 1000;
    }

    .p-menubar {
        padding-top: 0;
        padding-bottom: 0;
        border-radius: 0;

        .menubar-root {
            font-weight: bold;
            padding: 0 1rem;
        }

        .p-menuitem-link {
            padding: 0.5rem 0.75rem;
        }

        .p-menubar-root-list
            > .p-menuitem
            > .p-menuitem-content
            > .p-menuitem-link {
            padding: 0.5rem 0.75rem;

            > .p-submenu-icon {
                display: none;
            }
        }

        .p-menubar-end {
            span,
            i {
                padding: 0 0.75rem;
            }
        }

        .p-submenu-list {
            z-index: 2;
        }
    }
}
</style>
