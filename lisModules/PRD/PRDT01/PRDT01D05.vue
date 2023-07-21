<template>
  <l-table
    :tableData="dv.lisprddocs.components"
    :columns="componentsColumns"
    :height="'73vh'"
    width="100%"
    @zoom="zoomMaterialRow = $event.row"
    @keydown="if ($event.key == 'Insert') this.pushNewCmp($event);"
  />
  <BAST03D01mini
    :pComp="dv.sc.company"
    :isShow="zoomMaterialRow == null ? false : true"
    @ok="
      lis.objectMove($event, dv.lisprddocs.components[zoomMaterialRow]);
      dv.lisprddocs.components[zoomMaterialRow].material = $event.material;
      dv.lisprddocs.components[zoomMaterialRow].mtext = $event.stext;
      dv.lisprddocs.components[zoomMaterialRow].qunit = $event.skunit;
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
      componentsColumns: [
        {
          type: "selectmenu",
          label: this.$gl("Tip", "Type"),
          value: "type",
          options: "lisbom002",
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
    async pushNewCmp(event) {
      console.log("pushNepushNewCmpwPrd", event);
      let myReturn = await this.lis.function("PRDT01/pushNewCmp", this.dv);
      myReturn.operation =
        this.dv.lisprddocs.components[this.dv.lisprddocs.components.length - 1]
          .operation + 10;
      this.dv.lisprddocs.components.push(myReturn);
    },
  },
};
</script>

function data() { throw new Error('Function not implemented.'); }
