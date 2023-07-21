<template>
    <l-table
        name="SALT01D03"
        :tableData="dv.lissaldocs.items"
        :columns="itemsColumns"
        :context="contextMenu"
        @change="calcPrice()"
        @zoom="zoomMaterialRow = $event.row"
        @keydown="if ($event.key == 'Insert') this.pushNewItem($event);"
    />

    <l-dialog
        v-model="isCallFlow.isShow"
        persistent
        transition-show="slide-up"
        transition-hide="slide-down"
    >
        <l-card class="bg-grey-2" style="height: 100%">
            <SALT02D01
                :pDv="isCallFlow"
                @close="
                    isCallFlow.isShow = false;
                    v - close - popup;
                "
                :tabInfo="tabInfo"
                :lv="lv"
            />
        </l-card>
    </l-dialog>

    <q-dialog v-model="isShowItemDetail">
        <SALT01D31
        :dv="dv"
        :cpdItemTypes="cpdItemTypes"
        :item="dv.lissaldocs.items[selectedRow]"
        :tabInfo="tabInfo"
    />
    </q-dialog>
    <BAST03D01mini
        :pComp="dv.sc.company"
        :isShow="zoomMaterialRow == null ? false : true"
        @ok="
            lis.objectMove($event, dv.lissaldocs.items[zoomMaterialRow]);
            dv.lissaldocs.items[zoomMaterialRow].material = $event.material;
            dv.lissaldocs.items[zoomMaterialRow].mtext = $event.stext;
            dv.lissaldocs.items[zoomMaterialRow].itemtype = $event.salitemtype;
            dv.lissaldocs.items[zoomMaterialRow].qunit = $event.salunit;
            dv.lissaldocs.items[zoomMaterialRow].vatrate = $event.salvatkey;
            zoomMaterialRow = null;
            calcPrice();
        "
        @cancel="zoomMaterialRow = null"
    />

    <l-div-flex>
        <l-space />

        <l-input
            type="money"
            :label="this.$gl(`Brüt Toplam`, `Gross Total`)"
            v-model="dv.lissaldocs.gross"
            readonly
            filled
        />
        <l-input
            type="money"
            :label="this.$gl(`Toplam İnd./Art.`, `Total Disc./Inc.`)"
            v-model="dv.lissaldocs.discamnt"
            readonly
            filled
        />
        <l-input
            type="money"
            :label="this.$gl(`Net Toplam`, `Net Total`)"
            v-model="dv.lissaldocs.subtotal"
            readonly
            filled
        />
        <l-input
        type="money"
            :label="this.$gl(`KDV Tutarı`, `VAT Amount`)"
            v-model="dv.lissaldocs.vatamnt"
            readonly
            filled
        />
        <l-input
        type="money"
            :label="this.$gl(`Genel Toplam`, `Overall Total`)"
            v-model="dv.lissaldocs.grandtotal"
            readonly
            filled
        />
    </l-div-flex>
</template>

<script>
import SALT01D31 from "./SALT01D31.vue";
import SALT02D01 from "../SALT02/SALT02D01.vue";
import calcPrice from "./calcPrice.js";

export default {
    props: ["dv", "tabInfo"],
    components: {
        SALT01D31,
        SALT02D01,
    },
    data() {
        return {
            isCallFlow: { isShow: false },
            selectedRow: 0,
            zoomMaterialRow: null,
            isShowItemDetail: false,

            contextMenu: [
                {
                    name: "Kalem Detayı",
                    callback: async () => {
                        this.selectedRow = this.dv.lissaldocs.items.findIndex(
                            (e) => e._selected == true
                        );
                        this.isShowItemDetail = true;
                    },
                },
                {
                    name: "Gelişim",
                    callback: async () => {
                        let selectedRow = this.dv.lissaldocs.items.filter(
                            (e) => e._selected == true
                        );
                        this.isCallFlow = {
                            isShow: true,
                            calledBy: "SALT01D03",
                            company: this.dv.lissaldocs.company,
                            busarea: this.dv.lissaldocs.busarea,
                            doctype: this.dv.lissaldocs.doctype,
                            docnum: this.dv.lissaldocs.docnum,
                            itemnum: selectedRow[0].itemnum,
                        };
                    },
                },

                { name: "separator" },
                {
                    name: "Satır Ekle",
                    callback: async () => {
                        this.pushNewItem();
                    },
                },
            ],
        };
    },

    computed: {
        itemsColumns() {
            return [
                {
                    type: "number",

                    label: this.$gl("Kalem", "Item"),
                    value: "itemnum",
                },
                {
                    type: "selectmenu",
                    label: this.$gl("Kalem Tipi", "Item Type"),
                    value: "itemtype",
                    options: "lissal002",
                    optValue: "itemtype",
                    optTitles: {
                        doctype: "Belge Tipi",
                        itemtype: "Kalem Tipi",
                        stext: "Açıklama",
                    },
                },
                
                {
                    type: "zoom",
                    label: this.$gl("Malzeme Kodu", "Material"),
                    value: "material",
                },
                {
                    type: "string",
                    label: this.$gl("Malzeme Adı", "Material Name"),
                    value: "mtext",
                },
                {
                    type: "number",

                    label: this.$gl("Miktar", "Quantity"),
                    value: "quantity",
                    fraction: 3,
                },
                {
                    type: "selectmenu",
                    label: this.$gl("Miktar Br.", "Quantity Unit"),
                    value: "qunit",
                    options: "lisbas007",
                    optValue: "unit",
                    optTitles: { unit: "Birim", stext: "Açıklama" },
                    optFilter: { unittype: 0 },
                },
                {
                    type: "selectmenu",
                    label: this.$gl("Tesis", "Plant"),
                    value: "plant",
                    options: "lisbas002",
                    optValue: "plant",
                    optTitles: { plant: "Tesis", stext: "Açıklama" },
                    optFilter: { company: this.dv.lissaldocs.company },
                },
                {
                    type: "selectmenu",
                    label: this.$gl("Depo", "Warehouse"),
                    value: "warehouse",
                    options: "lisinv003",
                    optValue: "warehouse",
                    optTitles: { warehouse: "Depo", stext: "Açıklama" },
                    optFilter: {
                        company: this.dv.lissaldocs.company,
                        plant: this.dv.lissaldocs.plant,
                    },
                },
                {
                    type: "selectmenu",
                    label: this.$gl("Stok Yeri", "stockplace"),
                    value: "stockplace",
                    options: "lisinv004",
                    optValue: "stockplace",
                    optTitles: { stockplace: "Stok Yeri", stext: "Açıklama" },
                },
                {
                    type: "selectmenu",
                    label: this.$gl("Ö.St.tipi", "Special Stok"),
                    value: "specialstock",
                    options: "lisinv005",
                    optValue: "specialstock",
                    optTitles: {
                        specialstock: "Özel Stok Tipi",
                        stext: "Açıklama",
                    },
                },
                {
                    type: "string",
                    label: this.$gl("Parti", "Batchnum"),
                    value: "batchnum",
                },

                {
                    type: "number",
                    label: this.$gl("Fiyat", "Price"),
                    value: "price",
                    _textColor: "darkblue",
                    fraction: 2,
                    backgroundColor: "#fff8e1",
                },
                {
                    type: "number",
                    label: this.$gl("Fiyat Br.", "Price Unt."),
                    value: "punit",
                    _textColor: "darkblue",
                },

                {
                    label: this.$gl("Brüt", "Gross"),
                    type: "number",
                    value: "gross",
                    fraction: 2,
                    backgroundColor: "#e0f2f1",
                },
                {
                    label: this.$gl("İndirim", "Discount"),
                    value: "discamnt",
                    type: "number",
                    fraction: 2,
                    backgroundColor: "#e0f2f1",
                },
                {
                    label: "Net",
                    value: "subtotal",
                    type: "number",
                    fraction: 2,
                    backgroundColor: "#e0f2f1",
                },
                {
                    label: this.$gl("KDV", "VAT"),
                    value: "vatrate",
                    type: "number",
                },
                {
                    label: this.$gl("KDV Tutarı", "VAT Amount"),
                    value: "vatamnt",
                    type: "number",
                    fraction: 2,
                    backgroundColor: "#e0f2f1",
                },
                {
                    label: this.$gl("Genel Toplam", "Grand Total"),
                    value: "grandtotal",
                    type: "number",
                    fraction: 2,
                    backgroundColor: "#e0f2f1",
                },
                {
                    label: this.$gl("Sil", "Delete"),
                    value: "_deleted",
                    type: "checkbox",
                },
            ];
        },

        cpdItemTypes() {
            let tmpTypes = this.dv.sc.docitemtypeOpts.filter(
                (e) =>
                    (e.doctype == this.dv.lissaldocs.doctype) &
                    (e.company == this.dv.lissaldocs.company)
            );
            let supTable = [];
            for (let i = 0; i < tmpTypes.length; i++) {
                supTable.push({
                    Kalem: tmpTypes[i].value,
                    Açıklama: tmpTypes[i].stext,
                });
            }
            return supTable;
        },
        cpdPlant() {
            let supTable1 = [];
            for (let i = 0; i < this.dv.sc.plantOpts; i++) {
                supTable1.push({
                    Tesis: this.dv.sc.plantOpts[i].plant,
                    Aciklama: this.dv.sc.plantOpts[i].stext,
                });
            }
            return supTable1;
        },
        cpdWareHouse() {
            let supTable2 = [];
            for (let i = 0; i < this.dv.sc.warehouseOpts; i++) {
                supTable2.push({
                    Depo: this.dv.sc.warehouseOpts[i].warehouse,
                    Aciklama: this.dv.sc.warehouseOpts[i].stext,
                });
            }
            return supTable2;
        },
        cpdStockPlace() {
            let supTable = [];
            for (let i = 0; i < this.dv.sc.stockplaceOpts; i++) {
                supTable.push({
                    Stok_Yeri: this.dv.sc.stockplaceOpts[i].stockplace,
                    Aciklama: this.dv.sc.stockplaceOpts[i].stext,
                });
            }
            return supTable;
        },
    },
    methods: {
        async pushNewItem(event) {
            console.log("pushNewItem", event);
            let myReturn = await this.lis.function(
                "SALT01/pushNewItem",
                this.dv
            );
            myReturn.itemnum =
                this.dv.lissaldocs.items[this.dv.lissaldocs.items.length - 1]
                    .itemnum + 10;
            this.dv.lissaldocs.items.push(myReturn);
        },
        delRow(event) {
            console.log("delRow", event);
        },
        calcPrice(event) {
            this.dv.lissaldocs = calcPrice(this.dv.lissaldocs);
        },
        fetchWarehouses(Pplant) {
            let tmpWarehouses = this.dv.sc.warehouseOpts.filter(
                (e) => e.plant == Pplant
            );
            let supTable = [];
            for (let i = 0; i < tmpWarehouses.length; i++) {
                supTable.push({
                    Depo: tmpWarehouses[i].value,
                    Açıklama: tmpWarehouses[i].stext,
                });
            }
            return supTable;
        },
        fetchStockplaces(Pplant, Pwarehouse) {
            let tmpStockplaces = this.dv.sc.stockplaceOpts.filter(
                (e) => (e.plant == Pplant) & (e.warehouse == Pwarehouse)
            );
            let supTable = [];
            for (let i = 0; i < tmpStockplaces.length; i++) {
                supTable.push({
                    Stok_Yeri: tmpStockplaces[i].value,
                    Açıklama: tmpStockplaces[i].stext,
                });
            }
            return supTable;
        },
        async removeItem(index) {
            this.dv.lissaldocs.items.splice(index, 1);
        },
    },
};
</script>
