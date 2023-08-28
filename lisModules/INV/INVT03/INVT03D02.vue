<template>
    <l-div>
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="inventory" />

                <l-toolbar-title>{{
                    this.$gl("Stok Hareketi Detayı", "Stock Movement Detail")
                }}</l-toolbar-title>

                <div class="q-gutter-xs">
                    <l-btn outline @click="cancel()">
                        Hareketleri Geri Al
                    </l-btn>

                    <l-btn
                        v-if="dv.modi != 2"
                        icon="save"
                        color="teal"
                        @click="btnSave()"
                    />
                    <l-btn icon="cancel" color="negative" @click="cancel()" />
                </div>
            </l-toolbar>

            <l-div-flex>
                <l-input
                    v-model="dv.lisinvdocs.company"
                    :label="this.$gl(`Firma`, `Company`)"
                    readonly
                    style="width: 100"
                />

                <l-input
                    v-model="dv.lisinvdocs.doctype"
                    :label="this.$gl(`Belge Tipi`, `Document Type`)"
                    readonly
                    style="width: 50"
                />
                <l-input
                    v-model="dv.lisinvdocs.docnum"
                    :label="this.$gl(`Belge No`, `Document No`)"
                    readonly
                    style="width: 50"
                />

                <l-input
                    v-model="dv.lisinvdocs.stext"
                    :label="
                        this.$gl(`Belge Açıklaması`, `Document Description`)
                    "
                    style="width: 350px"
                />
                <l-input
                    v-model="dv.lisinvdocs.extdoctype"
                    :label="this.$gl(`Hrci. Blge Tpi`, `Ext.Doc.Type`)"
                    :readonly="dv.modi == 2 ? false : true"
                    style="width: 120px"
                />
                <l-input
                    v-model="dv.lisinvdocs.extdocnum"
                    :label="this.$gl(`Hrci. Blge No`, `Ext.Doc.No`)"
                    :readonly="dv.modi == 2 ? false : true"
                />
                <l-input
                    :label="this.$gl(`E-İrs. Tipi`, `E-Waybill Type`)"
                    v-model="dv.lisinvdocs.edeltype"
                    readonly
                />
                <l-input
                    :label="this.$gl(`E-İrs. No`, `E-Waybill No`)"
                    v-model="dv.lisinvdocs.edelnumber"
                    readonly
                />
                <l-input
                    :label="this.$gl(`E-İrs. UUID`, `E-Waybill UUID`)"
                    v-model="dv.lisinvdocs.edeluuid"
                    readonly
                />
                <l-datetime
                    v-model="dv.lisinvdocs.docdate"
                    :label="this.$gl(`Belge Tarihi`, `Document Date`)"
                    style="max-width: 220px"
                    :readonly="dv.modi == 2 ? false : true"
                />

                <l-input
                    v-model="dv.lisinvdocs._createdby"
                    :label="this.$gl(`Belgeyi Oluşturan`, `Createdby`)"
                    readonly
                />
            </l-div-flex>
        </l-card0>

        <l-table
            v-model="dv.lisinvdocs.items"
            :columns="myColumnsInvt03D02"
            @afterChange="setChange($event)"
        />
    </l-div>
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
    data() {
        return {
            lockKeyParams: {
                company: this.dv.lisinvdocs.company,
                lid: "INVT03",
                lockkey: this.dv.lisinvdocs.doctype + this.dv.lisinvdocs.docnum,
            },
            myColumnsInvt03D02: [
                {
                    label: this.$gl("Kalem", "Item"),
                    value: "itemnum",
                    type: "string",
                    readonly: true,
                },

                {
                    label: this.$gl("Malzeme", "Material"),
                    value: "material",
                    type: "string",
                    readonly: true,
                },
                {
                    label: this.$gl(
                        "Malzeme Açıklaması",
                        "Material Description"
                    ),
                    value: "stext",
                    type: "string",
                    readonly: true,
                },
                {
                    label: this.$gl("Tesis", "Plant"),
                    value: "plant",
                    type: "string",
                    readonly: true,
                },
                {
                    label: this.$gl("Depo", "Warehouse"),
                    value: "warehouse",
                    type: "string",
                    readonly: true,
                },
                {
                    label: this.$gl("Stok Yeri", "Stock Place"),
                    value: "stockplace",
                    type: "string",
                    readonly: true,
                },
                {
                    label: this.$gl("Ö.St.Tipi", "Spc.St.Typ"),
                    value: "specialstock",
                    type: "string",
                    readonly: true,
                },
                {
                    label: this.$gl("Parti", "Batchnum"),
                    value: "batchnum",
                    type: "string",
                    readonly: true,
                },
                {
                    label: this.$gl("Har.Yönü", "Direction of Movement"),
                    value: "postway",
                    type: "select",
                    readonly: true,
                    options: [
                        {
                            label: this.$gl(`Giriş`, `Entry`),
                            value: 0,
                        },
                        {
                            label: this.$gl(`Çıkış`, `Exit`),
                            value: 1,
                        },
                    ],
                },
                {
                    label: this.$gl("Stk. Tipi", "Stk. Type"),
                    value: "stocktype",
                    type: "select",
                    readonly: true,
                    options: [
                        {
                            label: this.$gl(`Kullanılabilir`, `Available`),
                            value: 0,
                        },
                        {
                            label: this.$gl(`Kalite`, `Quality`),
                            value: 1,
                        },
                        {
                            label: this.$gl(`Bloke`, `Blocked`),
                            value: 2,
                        },
                        {
                            label: this.$gl(`Rezerve`, `Reserved`),
                            value: 3,
                        },
                    ],
                },
                {
                    label: this.$gl("Miktar", "Quantity"),
                    value: "quantity",
                    type: "number",
                    fraction: 2,
                    _textColor: "blue",
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
                    _textColor: "blue",
                },
                {
                    label: this.$gl("Stok Miktarı", "Stock Quantity"),
                    value: "skquantity",
                    type: "number",
                    fraction: 2,
                    readonly: true,
                },
                {
                    label: this.$gl("Stok Birim", "Stock Unit"),
                    value: "skunit",
                    type: "string",
                    readonly: true,
                },
            ],
        };
    },

    methods: {
        setChange(event) {
            console.log("setChange", event);

            if (this.dv.lisinvdocs.items[event.row].isstocktran == true) {
                let myIndex = this.dv.lisinvdocs.items.findIndex(
                    (e) =>
                        (e.material ==
                            this.dv.lisinvdocs.items[event.row].material) &
                        //   (e.variant == this.dv.lisinvdocs.items[event.row].variant) &

                        (e.specialstock ==
                            this.dv.lisinvdocs.items[event.row].specialstock) &
                        (e.batchnum ==
                            this.dv.lisinvdocs.items[event.row].batchnum) & 
                            (e[event.prop] !=
                            this.dv.lisinvdocs.items[event.row][event.prop])
                );


                this.dv.lisinvdocs.items[myIndex][event.prop] =
                    this.dv.lisinvdocs.items[event.row][event.prop];
            }
        },
        async btnSave() {
            await this.lis.function("INVT03/02-btnSave", this.dv);
            this.cancel();
        },
        cancel() {
            this.tabInfo.blockGoToTransaction = false;
            this.dv.lisDialog = "INVT03D01";
        },
        async init() {
            await this.lis.function("INVT03/02-init", this.dv);
        },
    },
    mounted() {
        this.init(this.dv);
        this.tabInfo.blockGoToTransaction = true;
    },
    async beforeUnmount() {
        await this.lis.function("cls-system.unlock", this.lockKeyParams);
    },
};
</script>

function data() { throw new Error('Function not implemented.'); }
