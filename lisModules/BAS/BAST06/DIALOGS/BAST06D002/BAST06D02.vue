<template>
    <div class="row">
        <l-space />
        <l-btn
            class=""
            round
            dense
            icon="save"
            color="blue-4"
            @click="btnSave()"
        />
    </div>

    <l-table
        name="BAST06D02"
        :tableData="dv.materialList"
        :columns="myColumnsMat"
        :height="'80vh'"
        :width="'100%'"
    />
</template>

<script>
export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
    components: {},

    data() {
        return {
            dv: {
                company: "01",
                materialList: [],
                lismaterials: {},
                tab: "matCards",
            },

            myColumnsMat: [
                {
                    label: this.$gl("Malzeme", "Material"),
                    value: "material",
                    type: "string",
                },
                {
                    label: this.$gl("Tipi", "Type"),
                    value: "mattype",
                    type: "string",
                },
                {
                    label: this.$gl("Açıklaması", "Description"),
                    value: "stext",
                    type: "string",
                },
                {
                    label: this.$gl("Sektör", "Sector"),
                    value: "sector",
                    type: "string",
                },
                {
                    label: this.$gl("Malzeme Grubu", "Material Group"),
                    value: "matgrp",
                    type: "string",
                },
                {
                    label: this.$gl("Stok Birimi", "Stock Unit"),
                    value: "skunit",
                    type: "string",
                },
                {
                    label: this.$gl("Çıkış Birimi", "Output Unit"),
                    value: "salunit",
                    type: "string",
                },

                {
                    label: this.$gl(
                        "Malzeme Uzun Açıklaması",
                        "Material Long Description"
                    ),
                    value: "ltext",
                    type: "string",
                },
            ],
        };
    },
    methods: {
        async btnSave() {
            console.log("btnSave çalıştı BAST06 MALZEME");

            await this.lis.function(
                "BAST06/DIALOGS/BAST06D002/02-btnSave",
                this.dv
            );
        },
        async init(prop) {
            this.dv = await this.lis.function(
                "BAST06/DIALOGS/BAST06D002/02-init",
                this.dv
            );
        },
    },
    mounted() {
        this.init(this.dv);
        console.log("mounted workedDDDDD");
    },
};
</script>
