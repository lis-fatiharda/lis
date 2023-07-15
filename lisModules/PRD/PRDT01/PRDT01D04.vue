<template>
  <l-table
    :tableData="dv.lisprddocs.prods"
    :columns="prodsColumns"
    :height="'73vh'"
    width="100%"
    :context="contextMenu"
    @zoom="zoomMaterialRow = $event.row"
  />
  <BAST03D01mini
    :pComp="dv.sc.company"
    :isShow="zoomMaterialRow == null ? false : true"
    @ok="
      lis.objectMove($event, dv.lisprddocs.prods[zoomMaterialRow]);
      dv.lisprddocs.prods[zoomMaterialRow].material = $event.material;
      dv.lisprddocs.prods[zoomMaterialRow].mtext = $event.stext;
      dv.lisprddocs.prods[zoomMaterialRow].qunit = $event.skunit;
      zoomMaterialRow = null;
    "
    @cancel="zoomMaterialRow = null"
  />
</template>

<script>
export default {
  props: ["dv", "tabInfo"],
  data() {
    return {
      zoomMaterialRow: null,
      contextMenu: [
        {
          name: "Satır Ekle",
          callback: async () => {
            this.pushNewPrd();
          },
        },
      ],
      prodsColumns: [
        {
          type: "selectmenu",
          label: this.$gl("Tip", "Type"),
          value: "type",
          options: "lisbom003",
          optValue: "type",
          optTitles: { type: "Eleman Tipi", stext: "Açıklama" },
        },

        {
          type: "number",
          value: "operation",
          label: this.$gl("Operasyon No", "Operation No"),
        },
        {
          type: "zoom",
          value: "material",
          label: this.$gl("Malzeme", "Material"),
        },
        {
          type: "string",
          value: "stext",
          label: this.$gl("Açıklama", "Description"),
        },

        {
          type: "number",
          value: "quantity",
          fraction: 2,
          label: this.$gl("Miktar", "Quantity"),
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
          label: this.$gl("Depo", "Warehouse"),
          value: "warehouse",
          options: "lisinv003",
          optValue: "warehouse",
          optTitles: { warehouse: "Depo", stext: "Açıklama" },
          optFilter: {
            company: this.dv.lisprddocs.company,
            plant: this.dv.lisprddocs.plant,
          },
        },
        {
          type: "selectmenu",
          label: this.$gl("Stok Yeri", "Stock Place"),
          value: "stockplace",
          options: "lisinv004",
          optValue: "stockplace",
          optTitles: { stockplace: "Stok Yeri", stext: "Açıklama" },
          optFilter: {
            company: this.dv.lisprddocs.company,
            plant: this.dv.lisprddocs.plant,
          },
        },
      ],
    };
  },
  methods: {
    async pushNewPrd(event) {
      console.log("pushNewPrd", event);
      let myReturn = await this.lis.function("PRDT01/pushNewPrd", this.dv);
      myReturn.prods =
        this.dv.lisprddocs.prods[this.dv.lisprddocs.prods.length - 1].prods +
        10;
      this.dv.lisprddocs.prods.push(myReturn);
    },
  },
};
</script>

function data() { throw new Error('Function not implemented.'); }
