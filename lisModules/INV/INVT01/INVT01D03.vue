<template>
  <l-div-flex>
    <l-card style="width: 49%; min-width: 320px">
      <l-select class="q-gutter-xs" :label="this.$gl(`Firma`, `Company`)" v-model="dv.olisinvdocs.company"
        options="lisbas001" optValue="company" optTitle="stext" optCaptions="company" width="305px" />
      <!-- class="row q-pa-xs q-gutter-xs" -->
      <l-select class="q-gutter-xs" :label="this.$gl(
        `Transfer Tipi`,
        `Transfer Type`
      )
        // ekranda gelsin diye itemnum yazdım alakasız bir alan
        " v-model-value="dv.olisinvdocs.itemnum" :options="[
    { label: this.$gl(`Tesisler Arası`, `Between Plants`), value: 0 },
    { label: this.$gl(`Depolar Arası`, `Between Warehouses`), value: 1 },
    { label: this.$gl(`Stok Yerleri Arası`, `Between Stock Places`), value: 2 },
    { label: this.$gl(`Malzemeden Malzemeye`, `Material To Material`), value: 3 },
    ,
  ]" optValue="value" optTitle="label" map-options style="width: 305px" />
      <l-select class="q-gutter-xs" :label="this.$gl(`Hareket Kodu`, `Transaction Code`)"
        v-model="dv.olisinvdocs.movecode" options="lisinv006" optValue="code" optTitle="stext" optCaptions="unit"
        width="305px" />
      <l-input class="q-gutter-xs" label="Belge Açıklaması" v-model="dv.olisinvdocs.stext" style="width: 305px" />

    </l-card>
    <l-card style="width: 49%; min-width: 320px">

      <l-datetime :label="this.$gl(`Belge Tarihi`, `Document Date`)" v-model="dv.olisinvdocs.docdate"
        style="width: 305px" />
      <l-datetime :label="this.$gl(`Kayıt Tarihi`, `Record Date`)" v-model="dv.olisinvdocs.createdat"
        style="width: 305px" />
      <!-- ekranda gelsin diye createdat yazdım böyle bi alan yok -->
      <!-- class="row q-pa-xs q-gutter-xs" -->


    </l-card>
  </l-div-flex>
  <l-table name="INVT01D03" :tableData="dv.lisinvdocsListTrns" :columns="myColumnsInvtTrns" :height="'70vh'"
    :width="'100%'" :context="contextMenu" @zoom="zoomMaterialRow = $event.row"
    @keydown="if ($event.key == 'Insert') this.pushNewTrns($event);" />
  <BAST03D01mini :pComp="dv.sc.company" :isShow="zoomMaterialRow == null ? false : true" @ok="
      lis.objectMove($event, dv.lisinvdocsListTrns[zoomMaterialRow]);
    dv.lisinvdocsListTrns[zoomMaterialRow].material = $event.material;
    dv.lisinvdocsListTrns[zoomMaterialRow].stext = $event.stext;
    dv.lisinvdocsListTrns[zoomMaterialRow].qunit = $event.skunit;
    zoomMaterialRow = null;
    " @cancel="zoomMaterialRow = null" />
</template>

<script>
export default {
  props: ["tabInfo"],
  data() {
    return {
      contextMenu: [
        {
          name: "Satır Ekle",
          callback: async () => {
            this.pushNewTrns();
          },
        },
      ],
      zoomMaterialRow: null,
      dv: {
        lisDialog: "INVT01D03",
        olisinvdocs: {},
        lisinvdocsListTrns: [],
        sc: {
          company: "01",
          //   plantOpts: [],
          //   warehouseOpts: [],
          //   stockplaceOpts: [],
          //   movecode: "BGA",
        },
      },
      myColumnsInvtTrns: [
        {
          label: this.$gl("Malzeme", "Material"),
          value: "material",
          type: "zoom",
        },
        {
          label: this.$gl("Açıklama", "Description"),
          value: "stext",
          type: "string",
        },
        {
          label: this.$gl("Miktar", "Quantity"),
          value: "quantity",
          type: "number",
          friction: 2
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
          label: this.$gl("Kaynak Tesis", "Source Plant"),
          options: "lisbas002",
          optValue: "plant",
          optTitles: { plant: "Tesis", stext: "Açıklama" },
        },
        {
          type: "selectmenu",
          label: this.$gl("Hedef Tesis", "Target Plant"),
          value: "plant",
          options: "lisbas002",
          optValue: "plant",
          optTitles: { plant: "Tesis", stext: "Açıklama" },
        },
        {
          type: "selectmenu",
          label: this.$gl("Kaynak Depo", "Source Warehouse"),
          options: "lisinv003",
          optValue: "warehouse",
          optTitles: { warehouse: "Depo", stext: "Açıklama" },

        },
        {
          type: "selectmenu",
          label: this.$gl("Hedef Depo", "Target Warehouse"),
          value: "warehouse",
          options: "lisinv003",
          optValue: "warehouse",
          optTitles: { warehouse: "Depo", stext: "Açıklama" },

        },
        {
          type: "selectmenu",
          label: this.$gl("Kaynak Stok Yeri", "Source Stock Place"),
          options: "lisinv004",
          optValue: "stockplace",
          optTitles: { stockplace: "Stok Yeri", stext: "Açıklama" },

        },
        {
          type: "selectmenu",
          label: this.$gl("Hedef Stok Yeri", "Target Stock Place"),
          value: "stockplace",
          options: "lisinv004",
          optValue: "stockplace",
          optTitles: { stockplace: "Stok Yeri", stext: "Açıklama" },

        },
        {
          type: "selectmenu",
          label: this.$gl("Kyn.Ö.St.tipi", "Src Special Stok"),
          options: "lisinv005",
          optValue: "specialstock",
          optTitles: {
            specialstock: "Özel Stok Tipi",
            stext: "Açıklama",
          },
        },
        {
          type: "selectmenu",
          label: this.$gl("Hdf.Ö.St.tipi", "Targ.Special Stok"),
          value: "specialstock",
          options: "lisinv005",
          optValue: "specialstock",
          optTitles: {
            specialstock: "Özel Stok Tipi",
            stext: "Açıklama",
          },
        },
        {
          label: this.$gl("Kaynak Parti", "Source Batchnum"),
          //value: "quantity",
          type: "string",
        },
        {
          label: this.$gl("Hedef Parti", "Target Batchnum"),
          value: "batchnum",
          type: "string",
        },

      ]

    };
  },
  methods: {

    async pushNewTrns(event) {
      console.log("31-pushNewItem", event);
      let myReturn = await this.lis.function("INVT01/31-pushNewItem", this.dv);
      console.log("myReturn", myReturn);
      this.dv.lisinvdocsListTrns.push(myReturn);
    },
    async init() {
      this.dv = await this.lis.function("INVT01/31-init", this.dv);
    },
  },
  async mounted() {
    this.init();
  },
};
</script>

function data() { throw new Error('Function not implemented.'); }
