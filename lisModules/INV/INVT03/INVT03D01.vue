<template>
    <div>
        <l-div v-if="dv.lisDialog == 'INVT03D01'">
            <!--Tittle Layer-->
            <l-card0>
                <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                    <l-icon size="md" name="inventory" />

                    <l-toolbar-title>{{
                        this.$gl("Stok Hareketleri", "Stock Movements")
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
                <div class="row q-pa-xs q-gutter-xs">
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
                        :label="this.$gl(`Belge Tipi`, `Document Type`)"
                        v-model="dv.sc.doctype"
                        options="lisinv007"
                        optValue="doctype"
                        optTitle="stext"
                        optCaptions="doctype"
                        width="150px"
                    />

                    <l-input
                        dense
                        v-model="dv.sc.docnum"
                        :label="this.$gl(`Belge No`, `Document No`)"
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
                    <l-select
                        :label="this.$gl(`Malz. Tipi`, `Material Type`)"
                        v-model="dv.sc.mattype"
                        options="lisbas009"
                        optValue="mattype"
                        optTitle="stext"
                        optCaptions="mattype"
                        width="180px"
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
                    
                    <l-select
                        dense
                        v-model="dv.sc.postway"
                        :label="this.$gl(`Hrk. Yönü`, `Movement`)"
                        :options="[
                            { label: this.$gl(`Giriş`, `Entry`), value: 0 },
                            { label: this.$gl(`Çıkış`, `Exit`), value: 1 },
                            { label: this.$gl(`Hepsi`, `All`), value: 2 },
                        ]"
                        optValue="value"
                        optTitle="label"
                        style="width: 150px"
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

                    <l-input
                        v-model="dv.sc.variant"
                        :label="
                            this.$gl(
                                `Varyant`,
                                `Variant`
                            )
                        "
                    />

                    <l-input
                        :label="this.$gl(`Müşteri Kodu`, `Customer Code`)"
                        style="width: 150px"
                        dense
                        v-model="dv.sc.customer"
                    >
                        <l-chip
                            class="bg-white"
                            icon="search"
                            dense
                            clickable
                            @click="isSelectCust = !isSelectCust"
                        >
                            <BAST02D01mini
                                :pComp="dv.sc.company"
                                :isShow="isSelectCust"
                                @ok="
                                    dv.sc.customer = $event.customer;
                                    isSelectCust = false;
                                "
                                @cancel="isSelectCust = false"
                            />
                        </l-chip>
                    </l-input>
                    <l-checkbox
                        :label="this.$gl(`İptal?`, `Is Canceled?`)"
                        v-model="dv.sc._deleted"
                        color="red"
                    />
                    <l-datetime
                        :label="
                            this.$gl(
                                `Belge Tarihi Başlangıç`,
                                `Document Date Start`
                            )
                        "
                        v-model="dv.sc.docdatestrt"
                    />
                    <l-datetime
                        :label="
                            this.$gl(`Belge Tarihi Bitiş`, `Document Date End`)
                        "
                        v-model="dv.sc.docdateend"
                    />
                </div>
                <!--------------------------------->
            </l-card0>
            <!--Butons Layer Layer---------------------->

            
                <l-btn color="warning" icon="search" @click="btnSearch(dv)" />
                <l-btn color="info" icon="visibility" @click="btnShow(dv)" />
                <l-btn color="primary" icon="edit" @click="btnEdit(dv)" />
                  
           
            <!--Table Layer---------------------------->

            <l-table
                name="INVT03D01"
                v-model="dv.lisinvdocsList"
                :columns="myColumnsInvt03"
                :height="'70vh'"
                :width="'100%'"
                :readonly="true"
            />
        </l-div>
        <INVT03D02
            :dv="dv"
            :tabInfo="tabInfo"
            v-if="dv.lisDialog == 'INVT03D02'"
        />
    </div>
</template>

<script>
import INVT03D02 from "./INVT03D02.vue";
export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
    components: {
        INVT03D02,
    },

    data() {
        return {
            myColumnsInvt03: [
                {
                    label: "Firma",
                    value: "company",
                    type: "string",
                },
                {
                    label: this.$gl("Belge Tipi", "Document Type"),
                    value: "doctype",
                    type: "string",
                },
                {
                    label: this.$gl("Belge No", "Document No"),
                    value: "docnum",
                    type: "string",
                },
                {
                    label: this.$gl("Belge Tarihi", "Date"),
                    value: "docdate",
                    type: "datetime",
                    textColor: "red"
                },
                {
                    label: this.$gl("Malzeme", "Material"),
                    value: "items.material",
                    type: "string",
                },
                {
                    label: this.$gl("Malzeme Adı", "Material Description"),
                    value: "items.mtext",
                    type: "string",
                },
                {
                    label: this.$gl("Tesis", "Plant"),
                    value: "items.plant",
                    type: "string",
                    bgColor: "#f9e4aac4"
                },
                {
                    label: this.$gl("Depo", "Warehouse"),
                    value: "items.warehouse",
                    type: "string",
                    bgColor: "#f9e4aac4"
                },
                {
                    label: this.$gl("Stok Yeri", "Stock Place"),
                    value: "items.stockplace",
                    type: "string",
                    bgColor: "#f9e4aac4"
                },
                {
                    label: this.$gl("Ö.St.Tipi", "Spc.St.Typ"),
                    value: "items.specialstock",
                    type: "string",
                    bgColor: "#f9e4aa69"
                },
                {
                    label: this.$gl("Parti", "Batchnum"),
                    value: "items.batchnum",
                    type: "string",
                    bgColor: "#f9e4aa69"
                },
                {
                    label: this.$gl("Har.Yönü", "Direction of Movement"),
                    value: "items.postway",
                    type: "select",
                    options: [
                        {
                            value: 0,
                            label: "Giriş",
                        },
                        {
                            value: 1,
                            label: "Çıkış",
                        },
                    ],
                },

                {
                    label: this.$gl("Stk. Tipi", "Stk. Type"),
                    value: "items.stocktype",
                    type: "select",
                    textColor: "blue",
                    options: [
                        {
                            value: 0,
                            label: "Kullanılabilir",
                        },
                        {
                            value: 1,
                            label: "Kalite",
                        },
                        {
                            value: 2,
                            label: "Bloke",
                        },
                        {
                            value: 3,
                            label: "Rezerve",
                        },
                    ],
                },
                {
                    label: this.$gl("Miktar", "Quantity"),
                    value: "items.quantity",
                    type: "number",
                    fraction: 2,
                },
                {
                    label: this.$gl("Birim", "Unit"),
                    value: "items.qunit",
                    type: "string",
                },
                {
                    label: this.$gl("S.A.Belge Tipi", "Src.Doc.type"),
                    value: "items.purdoctype",
                    type: "string",
                    textColor: "green"
                },
                {
                    label: this.$gl("S.A.Belge No", "Src.Doc.No"),
                    value: "items.purdocnum",
                    type: "string",
                    textColor: "green"
                },
                {
                    label: this.$gl("S.A.Kalem", "Src.Doc.Itm.No"),
                    value: "items.puritemnum",
                    type: "string",
                    textColor: "green"
                },
                {
                    label: this.$gl("Satış Belge Tipi", "Src.Doc.type"),
                    value: "items.saldoctype",
                    type: "string",
                    textColor: "green"
                },
                {
                    label: this.$gl("Satış Belge No", "Src.Doc.No"),
                    value: "items.saldocnum",
                    type: "string",
                    textColor: "green"
                },
                {
                    label: this.$gl("Satış Kalem", "Src.Doc.Itm.No"),
                    value: "items.salitemnum",
                    type: "string",
                    textColor: "green"
                },
                {
                    label: this.$gl("Urt.Belge Tipi", "Src.Doc.type"),
                    value: "items.prddoctype",
                    type: "string",
                    textColor: "green"
                },
                {
                    label: this.$gl("Urt.Belge No", "Src.Doc.No"),
                    value: "items.prddocnum",
                    type: "string",
                    textColor: "green"
                },
                {
                    label: this.$gl("Urt.Kalem", "Src.Doc.Itm.No"),
                    value: "items.prditemnum",
                    type: "string",
                    textColor: "green"
                },
                {
                    label: this.$gl("Tedarikçi", "Cust./Vend."),
                    value: "items.vendor",
                    type: "string",
                },
                {
                    label: this.$gl("Müşteri", "Cust./Vend."),
                    value: "items.customer",
                    type: "string",
                },
                {
                    label: this.$gl("Malz.Tipi", "Mat.Type"),
                    value: "items.mattype",
                    type: "string",
                },
                {
                    label: this.$gl("Malz.Grubu", "Mat.Grp."),
                    value: "items.matgrp",
                    type: "string",
                },
                {
                    label: this.$gl("Malzeme Varyantı", "Variant"),
                    value: "items.variant",
                    type: "string",
                },
            ],
            dv: {
                lisDialog: "INVT03D01",
                sc: {
                    company: "01",

                    plant: "",

                    warehouse: "",

                    stockplace: "",

                    specialstock: "",

                    mattype: "",

                    matgrp: "",

                    batchnum: "",
                    material: "",
                    mtext: "",
                    variant: "",
                    doctype: "",
                    docnum: "",
                    postway: 2,

                    stocktype: "",

                    customer: "",
                    _deleted: false,
                    docdatestrt: this.lis.firstDayOfMonth(),
                    docdateend: this.lis.lastDayOfMonth(),
                },
                modi: 2,
                selectedRow: "",
                lisinvdocs: [],
                lisinvdocsList: [],

                lockKeyParams: {
                    company: "",
                    lid: "INVT03",
                    lockkey: "",
                },
            },
            isSelectCust: false,
            isSelectMat: false,
        };
    }, 

    methods: {
        async btnSearch(prop) {
            this.dv = await this.lis.function("INVT03/01-btnSearch", this.dv);
        },
        async btnEdit(prop) {
            this.dv = await this.lis.function("INVT03/01-btnEdit", prop);
        },
        async btnShow(prop) {
            this.dv = await this.lis.function("INVT03/01-btnShow", prop);
        },
        async btnDelete(prop) {
            this.dv = await this.lis.function("INVT03/01-btnDelete", prop);
        },
        async init() {
            this.dv = await this.lis.function("INVT03/01-init", this.dv);
        },
    },

    async mounted() {
        //this.init(this.dv);
    },
};
</script>
