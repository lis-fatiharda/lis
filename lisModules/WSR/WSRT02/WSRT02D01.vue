<template>
    <l-div v-if="dv.lisDialog == 'WSRT02D01'">
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="assignment_ind" />

                <l-toolbar-title>Api Key Tanımlama</l-toolbar-title>

                <l-btn
                    icon="cancel"
                    flat
                    round
                    dense
                    color="negative"
                    @click="this.$btnGoHome(tabInfo)"
                />
            </l-toolbar>
            <!--Search Layer Layer---------------------->

            <l-div-flex>
                <l-input label="Kullanıcı Adı" v-model="dv.sc.username">
                </l-input>

                <l-checkbox label="Blokeli" v-model="dv.sc.isblocked" />
            </l-div-flex>
        </l-card0>
        <!--Butons Layer Layer---------------------->

        <l-btn color="warning" icon="search" @click="btnSearch(dv)" />
        <l-btn color="info" icon="visibility" @click="btnShow(dv)" />

        <l-btn color="primary" icon="edit" @click="btnEdit(dv)" />
        <l-btn color="secondary" icon="add" @click="btnInsert(dv)" />

        <l-table
            v-model="dv.lisapiKeysList"
            :columns="myColumns"
            :readonly="true"
        />
    </l-div>
    <WSRT02D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'WSRT02D02'" />
    <div v-show="false">
        <WSRT02D01PDF :dv="dv" />
    </div>
</template>

<script>
import WSRT02D02 from "./WSRT02D02.vue";

export default {
    props: ["tabInfo"],
    components: {
        WSRT02D02,
    },

    data() {
        return {
            myColumns: [
                {
                    label: "Kullanıcı Adı",
                    value: "username",
                    type: "string",
                },
                {
                    label: "Gereçlilik Tarih Başlangıcı",
                    value: "validfrom",
                    type: "date",
                },
                {
                    label: "Gereçlilik Tarih Bitişi",
                    value: "validuntil",
                    type: "date",
                },
            ],
            dv: {
                lisDialog: "WSRT02D01",
                modi: 2,
                sc: {
                    wsmethod: "",
                    lisfunction: "",
                    isblocked: false,
                },
                lisapiKeysList: [],
                lisapiKeys: {},
                selectedRow: "",
            },
        };
    },

    methods: {
        async btnSearch(prop) {
            this.dv = await this.lis.function("WSRT02/01-btnSearch", prop);
        },
        async btnEdit(prop) {
            this.dv = await this.lis.function("WSRT02/01-btnEdit", prop);
            this.tabInfo.blockGoToTransaction = true;
        },
        async btnShow(prop) {
            this.dv = await this.lis.function("WSRT02/01-btnShow", prop);
            this.tabInfo.blockGoToTransaction = true;
        },
        async btnInsert(prop) {
            this.dv = await this.lis.function("WSRT02/01-btnInsert", prop);
            this.tabInfo.blockGoToTransaction = true;
        },

        async btnPrint() {
            this.lis.printPDF("WSRT02D01PDF", "Cari Kartlar Raporu");
        },

        async init() {
            this.dv = await this.lis.function("WSRT02/01-init", this.dv);
        },
    },

    // mounted() {
    //     this.init(this.dv);
    // },
};
</script>
