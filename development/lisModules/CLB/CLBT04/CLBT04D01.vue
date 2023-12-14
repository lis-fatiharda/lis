<template>
    <q-bar>
            <l-icon size="md" name="list_alt" />

            <l-toolbar-title>{{
                this.$gl("Çalışma Tabloları", "Stylesheets")
            }}</l-toolbar-title>

            <l-btn
                icon="delete"
                flat
                round
                dense
                color="purple"
                @click="btnClearLocalStorage()"
            >
                <l-tooltip>Temizle</l-tooltip></l-btn
            >

            <l-btn
                icon="save"
                flat
                round
                dense
                color="positive"
                @click="btnSave()"
            >
                <l-tooltip>Değişiklikleri Kaydet</l-tooltip></l-btn
            >

            <l-btn
                v-if="isDialog != true"
                icon="cancel"
                flat
                round
                dense
                color="negative"
                @click="this.$btnGoHome(tabInfo)"
            />

            <l-btn
                v-if="isDialog == true"
                icon="cancel"
                flat
                round
                dense
                color="negative"
                @click="this.$emit('cancel', true)"
            />
        </q-bar>
    <l-div>
        
        <q-card>
            <q-tabs
                v-model="lis_styleSheets.currentTab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="left"
                narrow-indicator
            >
                <template v-for="tab in lis_styleSheets.tabs" :key="tab">
                    <q-tab :name="tab.label" :label="tab.label">
                        <q-menu touch-position context-menu dense>
                            <q-list>
                                <q-item
                                    @click="btnDelSheet(tab)"
                                    close-popup
                                    clickable
                                    dense
                                >
                                    <q-item-section> Sil </q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu></q-tab
                    >
                </template>

                <l-btn
                    flat
                    icon="add"
                    color="primary"
                    @click="pushNewSheet()"
                />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="lis_styleSheets.currentTab" animated>
                <template v-for="tab in lis_styleSheets.tabs" :key="tab">
                    <q-tab-panel :name="tab.label" class="q-pa-xs">
                        <KeepAlive>
                            <l-table
                                v-model="tab.data"
                                :columns="tab.columns"
                            />
                        </KeepAlive>
                    </q-tab-panel>
                </template>
            </q-tab-panels>
        </q-card>
    </l-div>
</template>

<script>
export default {
    props: ["isDialog", "tabInfo"],
    data() {
        return {
            lis_styleSheets: {},
        };
    },

    methods: {
        btnClearLocalStorage() {
            delete localStorage.lis_styleSheets;
            this.lis_styleSheets = {};
            this.init();
        },
        btnDelSheet(tab) {
            let tabIndex = this.lis_styleSheets.tabs.findIndex(
                (k) => k.label == tab.label
            );
            this.lis_styleSheets.tabs = this.lis_styleSheets.tabs.filter(
                (e) => e.label != tab.label
            );

            this.lis_styleSheets.currentTab =
                this.lis_styleSheets.tabs[tabIndex - 1].label;
        },
        pushNewSheet() {
            let sheet = {};

            if (this.lis_styleSheets?.tabs?.length > 0) {
                sheet.label = this.lis_styleSheets?.tabs?.length + 1 + ". Sayfa";
                sheet.columns = [];
                sheet.data = [];
            } else {
                this.lis_styleSheets = {
                    currentTab: "1. Sayfa",
                    tabs: [],
                };
                sheet.label = "1. Sayfa";
                sheet.columns = [];
                sheet.data = [];
            }

            sheet.columns.push(
                { type: "string", label: "A", value: "A" },
                { type: "string", label: "B", value: "B" },
                { type: "string", label: "C", value: "C" },
                { type: "string", label: "D", value: "D" },
                { type: "string", label: "E", value: "E" },
                { type: "string", label: "F", value: "F" },
                { type: "string", label: "G", value: "G" },
                { type: "string", label: "H", value: "H" },
                { type: "string", label: "I", value: "I" },
                { type: "string", label: "J", value: "J" },
                { type: "string", label: "K", value: "K" },
                { type: "string", label: "L", value: "L" },
                { type: "string", label: "M", value: "M" },
                { type: "string", label: "N", value: "N" },
                { type: "string", label: "O", value: "O" },
                { type: "string", label: "P", value: "P" },
                { type: "string", label: "Q", value: "Q" },
                { type: "string", label: "R", value: "R" },
                { type: "string", label: "S", value: "S" },
                { type: "string", label: "T", value: "T" },
                { type: "string", label: "U", value: "U" },
                { type: "string", label: "V", value: "V" },
                { type: "string", label: "W", value: "W" },
                { type: "string", label: "X", value: "X" },
                { type: "string", label: "Y", value: "Y" },
                { type: "string", label: "Z", value: "Z" }
            );

            for (let index = 0; index < 30; index++) {
                sheet.data.push({
                    A: "",
                    B: "",
                    C: "",
                    D: "",
                    E: "",
                    F: "",
                    G: "",
                    H: "",
                    I: "",
                    J: "",
                    K: "",
                    L: "",
                    M: "",
                    N: "",
                    O: "",
                    P: "",
                    Q: "",
                    R: "",
                    S: "",
                    T: "",
                    U: "",
                    V: "",
                    W: "",
                    X: "",
                    Y: "",
                });
            }

            this.lis_styleSheets.tabs.push(sheet);
        },

        init() {
            if (localStorage?.lis_styleSheets == undefined) {
                this.pushNewSheet();
                this.lis_styleSheets.currentTab = this.lis_styleSheets.tabs[0].label;
            } else {
                //this.lis_styleSheets = localStorage.lis_styleSheets;
                this.lis_styleSheets = JSON.parse(
                    localStorage.getItem("lis_styleSheets")
                );
            }
        },
        btnSave() {
            localStorage.setItem(
                "lis_styleSheets",
                JSON.stringify(this.lis_styleSheets)
            );
        },
    },

    mounted() {
        this.init();
    },

    beforeUnmount() {
        this.btnSave();
    },
};
</script>
