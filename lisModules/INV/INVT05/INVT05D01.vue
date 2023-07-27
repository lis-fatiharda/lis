<template>
    <div>
        <l-div v-if="dv.lisDialog == 'INVT05D01'">
            <!--Tittle Layer-->
            <l-card0>
                <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                    <l-icon size="md" name="inventory" />

                    <l-toolbar-title>{{
                        this.$gl(
                            "Malzeme Stokları (Detaylı)",
                            "Material Stocks (Detailed)"
                        )
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

                <!--Searching Criterias Layer------>
                <l-div-flex>
                    <l-select
                        :label="this.$gl(`Firma`, `Company`)"
                        v-model="dv.sc.company"
                        options="lisbas001"
                        optValue="company"
                        optTitle="stext"
                        optCaptions="company"
                        width="120px"
                    />

                    <l-select
                        :label="this.$gl(`Tesis`, `Plant`)"
                        v-model="dv.sc.plant"
                        options="lisbas002"
                        optValue="plant"
                        optTitle="stext"
                        optCaptions="plant"
                        width="120px"
                    />

                    <l-select
                        :label="this.$gl(`Depo`, `Warehouse`)"
                        v-model="dv.sc.warehouse"
                        options="lisinv003"
                        optValue="warehouse"
                        optTitle="stext"
                        optCaptions="warehouse"
                        width="150px"
                    />
                    <l-select
                        :label="this.$gl(`Stok Yeri`, `Stockplace`)"
                        v-model="dv.sc.stockplace"
                        options="lisinv004"
                        optValue="stockplace"
                        optTitle="stext"
                        optCaptions="stockplace"
                        width="150px"
                    />
                    <l-select
                        :label="this.$gl(`Ö.St.Tipi`, `Specialstock`)"
                        v-model="dv.sc.specialstock"
                        options="lisinv005"
                        optValue="specialstock"
                        optTitle="stext"
                        optCaptions="specialstock"
                        width="120px"
                    />

                    <l-input
                        dense
                        v-model="dv.sc.batchnum"
                        :label="this.$gl(`Parti No`, `Batch Number`)"
                    />
                    <l-input
                        :label="this.$gl(`Malzeme Kodu`, `Material`)"
                        dense
                        v-model="dv.sc.material"
                    >
                        <l-chip
                            class="bg-white"
                            icon="search"
                            dense
                            clickable
                            @click="isSelectMat = !isSelectMat"
                        >
                            <BAST03D01mini
                                :pComp="dv.sc.company"
                                :isShow="isSelectMat"
                                @ok="
                                    dv.sc.material = $event.material;
                                    isSelectMat = false;
                                "
                                @cancel="isSelectMat = false"
                            />
                        </l-chip>
                    </l-input>
                    <l-input
                        dense
                        v-model="dv.sc.mtext"
                        :label="
                            this.$gl(
                                `Malzeme Açıklaması`,
                                `Material Description`
                            )
                        "
                    />
                    <l-select
                        :label="this.$gl(`Tip`, `Type`)"
                        v-model="dv.sc.mattype"
                        options="lisbas009"
                        optValue="mattype"
                        optTitle="stext"
                        optCaptions="mattype"
                        width="150px"
                    />
                    <l-select
                        :label="this.$gl(`Malz. Grp.`, `Material Group`)"
                        v-model="dv.sc.matgrp"
                        options="lisbas014"
                        optValue="matgrp"
                        optTitle="stext"
                        optCaptions="matgrp"
                        width="150px"
                    />
                    <l-datetime
                        :label="this.$gl(`Son Kull. Trh.`, `Expiration Date`)"
                        v-model="dv.sc.expirydate"
                        style="width: 160px"
                    />
                </l-div-flex>
                <!--------------------------------->
            </l-card0>
            <!--Butons Layer Layer---------------------->

                <l-btn color="warning" icon="search" @click="btnSearch(dv)" />

                <l-btn color="teal" icon="swap_horiz">
                    <l-tooltip>Stok - Hareket Kontrolü</l-tooltip></l-btn
                >

            <l-table
                :tableData="dv.lisinvdocsItems"
                :columns="myColumnsInvt04"
                :height="'75vh'"
                :width="'100%'"
                :readonly="true"
            />
        </l-div>
        <INVT05D02
            :dv="dv"
            :tabInfo="tabInfo"
            v-if="dv.lisDialog == 'INVT05D02'"
        />
    </div>
</template>

<script>
import INVT05D02 from "./INVT05D02.vue";

export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
    components: {
        INVT05D02,
    },
    data() {
        return {
            myColumnsInvt04: [
                {
                    label: "Depo",
                    value: "warehouse",
                    type: "string",
                },
                {
                    label: "Stok Yeri",
                    value: "stockplace",
                    type: "string",
                },
                {
                    label: "Ö.St.Tipi",
                    value: "specialstocktype",
                    type: "string",
                },
                {
                    label: "Parti",
                    value: "batchnum",
                    type: "string",
                },
                {
                    label: "Malzeme",
                    value: "material",
                    type: "string",
                },
                {
                    label: "Malzeme Açıklaması",
                    value: "stext",
                    type: "string",
                },
                {
                    label: "Toplam Miktar",
                    value: "quantity",
                    type: "number",
                    fraction: 2,
                },
                {
                    label: "Birim",
                    value: "unit",
                    type: "string",
                },

                {
                    label: "Kullanılabilir Miktar",
                    value: "aquantity",
                    type: "number",
                    fraction: 2,
                },
                {
                    label: "Kalite Miktar",
                    value: "qquantity",
                    type: "number",
                    fraction: 2,
                },
                {
                    label: "Bloke Miktar",
                    value: "bquantity",
                    type: "number",
                    fraction: 2,
                },
                {
                    label: "Rezerve Miktar",
                    value: "rquantity",
                    type: "number",
                    fraction: 2,
                },
                {
                    label: "Fiyat",
                    value: "price",
                    type: "number",
                    fraction: 2,
                },
                {
                    label: "Fiyat Birimi",
                    value: "punit",
                    type: "string",
                },

                {
                    label: "Malz.Tipi",
                    value: "mattype",
                    type: "string",
                },
                {
                    label: "Malz.Grp",
                    value: "matgrp",
                    type: "string",
                },
            ],
            dv: {
                lisDialog: "INVT05D01",
                sc: {
                    company: "01",

                    plant: null,

                    warehouse: null,

                    stockplace: null,

                    specialstock: null,

                    batchnum: "",
                    material: "",
                    mtext: "",
                    postway: 0,
                    quantity: 0.0,
                    aquantity: 0.0,
                    qquantity: 0.0,
                    bquantity: 0.0,
                    rquantity: 0.0,
                    expirydate: this.lis.firstDayOfMonth(),
                },
                modi: 2,
                selectedRow: "",
                lisinvstocks: [],
                lisinvdocsItems: [],
                lisinvstocksItems: [],
            },
            isSelectMat: false,
        };
    },

    methods: {
        async btnSearch(prop) {
            this.dv = await this.lis.function("INVT04/01-btnSearch", prop);
            // await this.$Axios.post("INVT04/01-btnSearch", prop).then((res) => {
            //   this.dv = res.data;

            this.dv.lisinvdocsItems = [];
            for (let i in this.dv.lisinvdocs) {
                let invDoc = this.dv.lisinvdocs[i];
                for (let k in invDoc.items) {
                    let invItem = invDoc.items[k];
                    //--
                    invItem.company = invDoc.company;
                    invItem.doctype = invDoc.doctype;
                    invItem.docnum = invDoc.docnum;
                    invItem.docdate = invDoc.docdate;
                    invItem.stext = invDoc.stext;

                    this.dv.lisinvdocsItems.push(invItem);
                }
            }
            //});
        },
        async btnEdit(prop) {
            this.dv = await this.lis.function("INVT04/01-btnEdit", prop);
            // await this.$Axios.post("INVT04/01-btnEdit", prop).then((res) => {
            //   this.dv = res.data;
            // });
        },
        async btnShow(prop) {
            this.dv = await this.lis.function("INVT04/01-btnShow", prop);
            // await this.$Axios.post("INVT04/01-btnShow", prop).then((res) => {
            //   this.dv = res.data;
            // });
        },
        async btnDelete(prop) {
            this.dv = await this.lis.function("INVT04/01-btnDelete", prop);
            // await this.$Axios.post("INVT04/01-btnDelete", prop).then((res) => {
            //   this.dv = res.data;
            // });
        },
        async init() {
            this.dv = await this.lis.function("INVT04/01-init", this.dv);
        },
        async init(prop) {
            this.dv = await this.lis.function("INVT04/01-init", this.dv);

            this.dv.noVatReasons.map((e) => (e.value = e.taxcode));
        },
    },

    async mounted() {
        //this.dv = await this.lis.function("INVT04/01-init", this.dv);
        this.init(this.dv);
    },
};
</script>
