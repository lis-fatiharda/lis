<template>
    <l-div-flex>
        <l-select
            :label="this.$gl(`Firma`, `Company`)"
            v-model="dv.lisinvdocs.company"
            options="lisbas001"
            optValue="company"
            optTitle="stext"
            optCaptions="company"
        />
        <l-input
            v-model="dv.lisinvdocs.extdoctype"
            label="Harici Belge Tipi"
            dense
        />
        <l-input
            v-model="dv.lisinvdocs.extdocnum"
            label="Harici Belge No"
            dense
        />
        <l-select
            :label="this.$gl(`Hareket Kodu`, `Transaction Code`)"
            v-model="dv.movecode"
            options="lisinv006"
            optValue="code"
            optTitle="stext"
            optCaptions="unit"
            width="135px"
            :readonly="true"
        />

        <l-datetime
            :label="this.$gl(`Belge Tarihi`, `Document Date`)"
            v-model="dv.lisinvdocs.docdate"
        />

        <l-btn
            color="blue-5"
            class="align-end"
            icon="refresh"
            @click="init()"
        />
        <l-btn color="teal" class="align-end" icon="save" @click="btnSave()" />
    </l-div-flex>
    <l-div>
        <l-input
            v-model="dv.lisinvdocs.stext"
            label="Belge Açıklaması"
            autogrow
        />
    </l-div>
    <l-table
        v-model="dv.lisinvdocs.items"
        :columns="myColumns"
    />

    <BAST03D01mini
        :pComp="dv.lisinvdocs.company"
        :isShow="zoomMaterialRow == null ? false : true"
        @ok="
            lis.objectMove($event, dv.lisinvdocs.items[zoomMaterialRow]);
            dv.lisinvdocs.items[zoomMaterialRow].material = $event.material;
            dv.lisinvdocs.items[zoomMaterialRow].mtext = $event.stext;
            dv.lisinvdocs.items[zoomMaterialRow].type = $event.salitemtype;
            dv.lisinvdocs.items[zoomMaterialRow].qunit = $event.salunit;
            dv.lisinvdocs.items[zoomMaterialRow].vatrate = $event.salvatkey;
            zoomMaterialRow = null;
        "
        @cancel="zoomMaterialRow = null"
    />
</template>

<script>
export default {
    props: ["tabInfo"],
    data() {
        return {
            tab: "no",
            zoomMaterialRow: null,
            contextMenu: [
                {
                    name: "Satır Ekle",
                    callback: this.pushNewItem,
                },
            ],
            dv: {
                lisDialog: "INVT01D21",
                lisinvdocs: {},
                movecode: "BGA",
                sc: {
                    companyOpts: [],
                    plantOpts: [],
                    warehouseOpts: [],
                    stockplaceOpts: [],
                },
            },
        };
    },
    computed: {
        myColumns() {
            return [
                {
                    type: "zoom",
                    label: "Malzeme Kodu",
                    value: "material",
                },
                {
                    type: "string",
                    label: "Malzeme Adı",
                    value: "mtext",
                },
                {
                    type: "selectmenu",
                    label: this.$gl("Tesis", "Plant"),
                    value: "plant",
                    options: "lismaterials.matstock",
                    optValue: "plant",
                    optTitles: { plant: "Tesis", stext: "Açıklama" },
                    optFilter: {
                        company: this.dv.lisinvdocs.company,
                        material: "$material",
                    },
                },

                {
                    type: "selectmenu",
                    label: this.$gl("Depo", "Warehouse"),
                    value: "warehouse",
                    options: "lismaterials.matstock",
                    optValue: "warehouse",
                    optTitles: { warehouse: "Depo", stext: "Açıklama" },
                    optFilter: {
                        company: this.dv.lisinvdocs.company,
                        material: "$material",
                        "matstock.plant": "$plant",
                    },
                },

                {
                    type: "selectmenu",
                    label: this.$gl("Stok Yeri", "stockplace"),
                    value: "stockplace",
                    options: "lismaterials.matstock",
                    optValue: "stockplace",
                    optTitles: { stockplace: "Stok Yeri", stext: "Açıklama" },
                    optFilter: {
                        company: this.dv.lisinvdocs.company,
                        material: "$material",
                        "matstock.plant": "$plant",
                        "matstock.warehouse": "$warehouse",
                    },
                },
                {
                    type: "selectmenu",
                    label: "Özel Stok Tipi",
                    value: "specialstock",
                    _bgColor: "#fff8e1",
                    options: "lisinv005",
                    optValue: "specialstock",
                    optTitles: {
                        specialstock: "Özel Stok Tipi",
                        stext: "Açıklama",
                    },
                },
                {
                    type: "string",
                    label: "Parti",
                    value: "batchnum",
                    _bgColor: "#fff8e1",
                },
                {
                    type: "number",
                    label: "Miktar",
                    value: "quantity",
                    fraction: 3,
                },
                {
                    type: "selectmenu",
                    label: this.$gl("Miktar Br.", "Quantity Unit"),
                    value: "qunit",
                    options: "lismaterials.matunits",
                    optValue: "unit",
                    optTitles: { unit: "Birim" },
                    optFilter: {
                        company: this.dv.lisinvdocs.company,
                        material: "$material",
                    },
                }
            ];
        },
    },

    methods: {
        async pushNewItem() {
            this.dv.lisinvdocs.items.push(
                await this.lis.objectNew("lisinvdocs.items")
            );
        },
        removeItem(index) {
            if (this.lisinvdocs.items.length > 1) {
                this.lisinvdocs.items.splice(index, 1);
            }
        },
        async btnSave() {
            await this.lis.function("INVT01/21-btnSave", {
                lisinvdocs: this.dv.lisinvdocs,
                pMovecode: this.dv.sc.movecode,
            });
            this.lis.alert("p", "Hareket Belgesi Kaydedildi.");
            this.init();
        },
        cancel() {
            this.dv.lisDialog = "INVT01D01";
        },
        async init() {
            this.dv.lisinvdocs = await this.lis.objectNew("lisinvdocs");
        },
    },
    async mounted() {
        this.init();
    },
};
</script>

function data() { throw new Error('Function not implemented.'); }
