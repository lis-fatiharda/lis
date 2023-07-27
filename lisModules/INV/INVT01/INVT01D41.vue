<template>
  <l-div-flex>
    <l-select
      :label="this.$gl(`Firma`, `Company`)"
      v-model="dv.olisinvdocs.company"
      options="lisbas001"
      optValue="company"
      optTitle="stext"
      optCaptions="company"
      
    />
    <l-input
      v-model="dv.olisinvdocs.extdoctype"
      label="Harici Belge Tipi"
      
      dense
    />
    <l-input
      v-model="dv.olisinvdocs.extdocnum"
      label="Harici Belge No"
      
      dense
    />
    <l-select
      :label="this.$gl(`Hareket Kodu`, `Transaction Code`)"
      v-model="dv.olisinvdocs.movecode"
      options="lisinv006"
      optValue="code"
      optTitle="stext"
      optCaptions="code"
      width="135px"
      :readonly="true"
    />

    <l-datetime
      :label="this.$gl(`Belge Tarihi`, `Document Date`)"
      v-model="dv.olisinvdocs.docdate"
    />

    <l-btn
      color="blue-5"
      class="align-end"
      
      dense
      icon="refresh"
      @click="init()"
    />
    <l-btn
      color="teal"
      class="align-end"
      
      dense
      icon="save"
      @click="btnSave()"
    />
  </l-div-flex>
  <l-div>
    <l-input
      v-model="dv.olisinvdocs.stext"
      label="Belge Açıklaması"
      
      dense
      autogrow
    />
  </l-div>
  <div style="padding: 0">
    <l-table
      :tableData="dv.olisinvdocs.items"
      :context="contextMenu"
      :columns="myColumns"
      width="100%"
      height="65vh"
      @keyup="if ($event.key == 'Insert') this.pushNewItem();"
      @zoom="zoomMaterialRow = $event.row"
    />

    <BAST03D01mini
      :pComp="dv.olisinvdocs.company"
      :isShow="zoomMaterialRow == null ? false : true"
      @ok="
        lis.objectMove($event, dv.olisinvdocs.items[zoomMaterialRow]);
        dv.olisinvdocs.items[zoomMaterialRow].material = $event.material;
        dv.olisinvdocs.items[zoomMaterialRow].mtext = $event.stext;
        dv.olisinvdocs.items[zoomMaterialRow].type = $event.salitemtype;
        dv.olisinvdocs.items[zoomMaterialRow].qunit = $event.salunit;
        dv.olisinvdocs.items[zoomMaterialRow].vatrate = $event.salvatkey;
        zoomMaterialRow = null;
      "
      @cancel="zoomMaterialRow = null"
    />
  </div>
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
        lisDialog: "INVT01D41",
        olisinvdocs: {},
        sc: {
          
          movecode: "BCA",
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
          label: "Tesis",
          value: "plant",
          backgroundColor: "#fff8e1",
          options: "lisbas002",
          optValue: "plant",
          optTitles: { plant: "Tesis", stext: "Açıklama" },
        },
        {
          type: "selectmenu",
          label: "Depo",
          value: "warehouse",
          backgroundColor: "#fff8e1",
          options: "lisinv003",
          optValue: "warehouse",
          optTitles: { warehouse: "Depo", stext: "Açıklama" },
        },
        {
          type: "selectmenu",
          label: "Stok Yeri",
          value: "stockplace",
          backgroundColor: "#fff8e1",
          options: "lisinv004",
          optValue: "stockplace",
          optTitles: { stockplace: "Stok Yeri", stext: "Açıklama" },
        },
        {
          type: "selectmenu",
          label: "Özel Stok Tipi",
          value: "specialstock",
          backgroundColor: "#fff8e1",
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
          backgroundColor: "#fff8e1",
        },
        {
          type: "number",

          label: "Miktar",
          value: "quantity",
          fraction: 3,
        },
        {
          type: "string",
          label: "Miktar Br.",
          value: "qunit",
        },
      ];
    },

    fetchWarehouses() {
      let tmpWarehouses = this.dv.sc.warehouseOpts.filter(
        (e) => e.plant == this.dv.sc.plant
      );
      return tmpWarehouses;
    },
  },

  methods: {
    fetchStockplaces(Pplant, Pwarehouse) {
      let tmpStockplaces = this.dv.sc.stockplaceOpts.filter(
        (e) => (e.plant == Pplant) & (e.warehouse == Pwarehouse)
      );
      return tmpStockplaces;
    },
    async pushNewItem() {
      let myReturn = await this.lis.function("INVT01/41-pushNewItem", this.dv);
      myReturn.items[0].postway = 1;
      this.dv.olisinvdocs.items.push(myReturn.items[0]);
    },
    removeItem(index) {
      if (this.olisinvdocs.items.length > 1) {
        this.olisinvdocs.items.splice(index, 1);
      }
    },
    async btnSave() {
      console.log("btnSave çalıştı");
      await this.lis.function("INVT01/41-btnSave", {
        olisinvdocs: this.dv.olisinvdocs,
        pMovecode: this.dv.sc.movecode,
      });
      this.lis.alert("p", "Hareket Belgesi Kaydedildi.");
      this.init();
    },
    cancel() {
      this.dv.lisDialog = "INVT01D01";
    },
    async init() {
      this.dv = await this.lis.function("INVT01/41-init", this.dv);
      this.dv.olisinvdocs.items[0].postway = 1;
    },
  },
  async created() {
    this.init();
  },
};
</script>

function data() { throw new Error('Function not implemented.'); }
