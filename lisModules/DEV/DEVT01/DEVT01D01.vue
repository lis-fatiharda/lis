<template>
    <l-div v-if="dv.lisDialog == 'DEVT01D01'">
        <!--Tittle Layer-->

        <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
            <l-icon size="md" name="list_alt" />

            <l-toolbar-title>{{
                this.$gl("VT Model Yöneticisi", "VT Model Manager")
            }}</l-toolbar-title>

            <l-btn
                icon="cancel"
                flat
                round
                dense
                color="negative"
                @click="this.$btnGoHome(tabInfo)"
            />
        </l-toolbar>
        <!--Searching Criterias Layer----row-1-->
        <l-div0-flex>
            <l-div0-flex>
                <l-input
                    v-model="dv.sc.modul"
                    :label="this.$gl(`Modül`, `Modül`)"
                />

                <l-input
                    v-model="dv.sc.model"
                    :label="this.$gl(`Model`, `Model`)"
                />

                <l-input
                    v-model="dv.sc.stext"
                    :label="this.$gl(`Model Açıklaması`, `Model Description`)"
                />
            </l-div0-flex>
            <l-space />

            <l-div0-flex>
                <l-card>
                    <l-btn
                        icon="backup"
                        label="lisdb Backup"
                        color="teal"
                        @click="btnBackup()"
                    />

                    <l-input
                        label="Restore Edilecek Yedek İsmi"
                        v-model="dv.backupName"
                    />

                    <l-btn
                        icon="restore"
                        label="lisdb Restore"
                        color="red-8"
                        @click="btnRestore()"
                    />
                </l-card>
            </l-div0-flex>
        </l-div0-flex>

        <!--------------------------------row-2-->
        <!--------------------------------row-3-->

        <!--Butons Layer Layer---------------------->

        <l-btn-group>
            <l-btn color="warning" icon="search" @click="btnSearch()" />
            <l-btn color="primary" icon="edit" @click="btnEdit()" />
            <l-btn color="info" icon="visibility" @click="btnShow()" />
            <l-btn color="secondary" icon="add" @click="btnInsert()" />
            <l-btn color="negative" icon="delete" @click="btnDelete()" />
        </l-btn-group>

        <!--Table Layer---------------------------->
        <l-table
            v-model="dv.olismodels"
            :columns="tableColumns"
            :readonly="true"
            height="fit"
            @dblclick="btnEdit()"
            :summary="false"
        >
        </l-table>
    </l-div>
    <DEVT01D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'DEVT01D02'" />
</template>

<script>
import DEVT01D02 from "./DEVT01D02.vue";

export default {
    props: ["tabInfo"],
    components: {
        DEVT01D02,
    },

    data() {
        return {
            tableColumns: [
                {
                    label: `Modül`,
                    value: "module",
                    type: "string",
                },
                {
                    label: `Model`,
                    value: "model",
                    type: "string",
                },
                {
                    label: `Model Açıklaması`,
                    value: "stext",
                    type: "string",
                },
                {
                    label: `Destek Tablosu?`,
                    value: "type",
                    type: "checkbox",
                },
            ],
            test: "",
            dv: {
                sc: {
                    modul: "",
                    model: "",
                    stext: "",
                    moduleOpts: [],
                },
                lisDialog: "DEVT01D01",
                modi: 2,
                olismodels: [],
                selectedRow: "",
                backupName:
                    new Date().toLocaleDateString() +
                    "-" +
                    new Date().toLocaleTimeString(),
            },
        };
    },

    methods: {
        async btnBackup() {
            let myReturn = await this.lis.function("DEVT01/01-btnBackup", {
                backupName: this.dv.backupName,
            });

            this.lis.alert("p", "Veri Tabanı Yedeği Alındı");
        },
        async btnRestore() {
            let myReturn = await this.lis.function("DEVT01/01-btnRestore", {
                backupName: this.dv.backupName,
            });

            this.lis.alert("p", "Veri Tabanı Güncellendi.");
        },

        async btnSearch() {
            this.dv = await this.lis.function("DEVT01/01-btnSearch", this.dv);
        },
        async btnEdit() {
            this.dv = await this.lis.function("DEVT01/01-btnEdit", this.dv);
            this.tabInfo.blockGoToTransaction = true;
        },
        async btnShow() {
            this.dv = await this.lis.function("DEVT01/01-btnShow", this.dv);
            this.tabInfo.blockGoToTransaction = true;
        },
        async btnInsert() {
            this.dv = await this.lis.function("DEVT01/01-btnInsert", this.dv);
            this.tabInfo.blockGoToTransaction = true;
        },
        async btnDelete() {
            this.dv = await this.lis.function("DEVT01/01-btnDelete", this.dv);
        },
        async init() {
            this.dv = await this.lis.function("DEVT01/01-init", this.dv);
        },
    },
    mounted() {
        this.dv = this.init(this.dv);
        console.log("mounted worked");
    },
};
</script>
