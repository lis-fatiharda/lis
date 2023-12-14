<template>
  <l-table
    name="PURT01D03"
    v-model="dv.lispurdocs.items"
    :columns="itemsColumns"
    :context="contextMenu"
    @afterChange="calcPrice()"
    @zoom="zoomMaterialRow = $event.row"
    @keyup="if ($event.key == 'Insert') this.pushNewItem($event);"
  />

  <l-dialog
    v-model="isCallFlow.isShow"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <l-card class="bg-grey-2" style="height: 100%">
      <PURT02D01
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
    <PURT01D31
      :dv="dv"
      :item="dv.lispurdocs.items[selectedRow]"
      :tabInfo="tabInfo"
    />
  </q-dialog>

  <q-dialog v-model="isShowItemVar">
    <setVariant
      :dv="dv"
      :item="dv.lispurdocs.items[selectedRowVar]"
      :tabInfo="tabInfo"
      @ok="isShowItemVar = false"
    />
  </q-dialog>

  <BAST03D01mini
    :pComp="dv.sc.company"
    :isShow="zoomMaterialRow == null ? false : true"
    @ok="
      lis.objectMove($event, dv.lispurdocs.items[zoomMaterialRow]);
      dv.lispurdocs.items[zoomMaterialRow].material = $event.material;
      dv.lispurdocs.items[zoomMaterialRow].mtext = $event.stext;
      dv.lispurdocs.items[zoomMaterialRow].itemtype = $event.puritemtype;
      dv.lispurdocs.items[zoomMaterialRow].qunit = $event.purunit;
      dv.lispurdocs.items[zoomMaterialRow].vatrate = $event.purvatkey;
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
      v-model="dv.lispurdocs.gross"
      readonly
      filled
    />
    <l-input
      type="money"
      :label="this.$gl(`Brüt Toplam`, `Gross Total`)"
      v-model="dv.lispurdocs.discamnt"
      readonly
      filled
    />
    <l-input
      type="money"
      :label="this.$gl(`Brüt Toplam`, `Gross Total`)"
      v-model="dv.lispurdocs.subtotal"
      readonly
      filled
    />
    <l-input
      type="money"
      :label="this.$gl(`Brüt Toplam`, `Gross Total`)"
      v-model="dv.lispurdocs.vatamnt"
      readonly
      filled
    />
    <l-input
      type="money"
      :label="this.$gl(`Brüt Toplam`, `Gross Total`)"
      v-model="dv.lispurdocs.grandtotal"
      readonly
      filled
    />
  </l-div-flex>
</template>

<script>
import PURT01D31 from "./PURT01D31.vue";
import PURT02D01 from "../PURT02/PURT02D01.vue";
import calcPrice from "./calcPrice.js";
import setVariant from "./../../BAS/BAST04/setVariant.vue";
export default {
  props: ["dv", "tabInfo"],
  components: {
    PURT01D31,
    PURT02D01,
    setVariant,
  },

  data() {
    return {
      isCallFlow: { isShow: false },
      isShowItemDetail: false,
      isShowItemVar: false,
      selectedRow: 0,
      selectedRowVar: 0,
      zoomMaterialRow: null,

      contextMenu: [
        {
          name: "Kalem Detayı",
          callback: async () => {
            this.selectedRow = this.dv.lispurdocs.items.findIndex(
              (e) => e._selected == true
            );
            this.dv.lispurdocs.items[this.selectedRow].showDetail =
              !this.dv.lispurdocs.items[this.selectedRow].showDetail;

            this.isShowItemDetail = true;
          },
        },
        {
          name: "Gelişim",
          callback: async () => {
            let selectedRow = this.dv.lispurdocs.items.filter(
              (e) => e._selected == true
            );
            this.isCallFlow = {
              isShow: true,
              calledBy: "PURT01D03",
              company: this.dv.lispurdocs.company,
              busarea: this.dv.lispurdocs.busarea,
              doctype: this.dv.lispurdocs.doctype,
              docnum: this.dv.lispurdocs.docnum,
              itemnum: selectedRow[0].itemnum,
            };
          },
        },
        { name: "separator" },
        {
          name: "Malzeme Varyantı",
          callback: async () => {
            this.selectedRowVar = this.dv.lispurdocs.items.findIndex(
              (e) => e._selected == true
            );

            console.log("selectedRowVar", this.selectedRowVar);
            this.isShowItemVar = true;
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
          options: "lispur002",
          optValue: "itemtype",
          optFilter: {
            doctype: this.dv.lispurdocs.doctype,
          },
          optTitles: {
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
          options: "lismaterials.matunits",
          optValue: "unit",
          optTitles: { unit: "Birim" },
          optFilter: {
            company: this.dv.lispurdocs.company,
            material: "$material",
          },
        },

        {
          type: "selectmenu",
          label: this.$gl("Tesis", "Plant"),
          value: "plant",
          options: "lismaterials.matstock",
          optValue: "plant",
          optTitles: { plant: "Tesis", stext: "Açıklama" },
          optFilter: {
            company: this.dv.lispurdocs.company,
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
            company: this.dv.lispurdocs.company,
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
            company: this.dv.lispurdocs.company,
            material: "$material",
            "matstock.plant": "$plant",
            "matstock.warehouse": "$warehouse",
          },
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
          (e.doctype == this.dv.lispurdocs.doctype) &
          (e.company == this.dv.lispurdocs.company)
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
    calcPrice() {
      this.dv.lispurdocs = calcPrice(this.dv.lispurdocs);
    },
    fetchWarehouses(Pplant) {
      let tmpWarehouses = this.dv.sc.warehouseOpts.filter(
        (e) => e.plant == Pplant
      );
      return tmpWarehouses;
    },
    fetchStockplaces(Pplant, Pwarehouse) {
      let tmpStockplaces = this.dv.sc.stockplaceOpts.filter(
        (e) => (e.plant == Pplant) & (e.warehouse == Pwarehouse)
      );
      return tmpStockplaces;
    },
    async pushNewItem(event) {
      console.log(event);
      let myReturn = await this.lis.function("PURT01/pushNewItem", this.dv);
      myReturn.itemnum =
        this.dv.lispurdocs.items[this.dv.lispurdocs.items.length - 1].itemnum +
        10;
      this.dv.lispurdocs.items.push(myReturn);
    },
    async removeItem(index) {
      this.dv.lispurdocs.items.splice(index, 1);
    },
  },
};
</script>
