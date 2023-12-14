<template>
  <l-table
    v-model="dv.lisbomdocs.components"
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
      lis.objectMove($event, dv.lisbomdocs.components[zoomMaterialRow]);
      dv.lisbomdocs.components[zoomMaterialRow].material = $event.material;
      dv.lisbomdocs.components[zoomMaterialRow].mtext = $event.stext;
      dv.lisbomdocs.components[zoomMaterialRow].qunit = $event.skunit;
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
            company: this.dv.lisbomdocs.company,
            plant: this.dv.lisbomdocs.plant,
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
            company: this.dv.lisbomdocs.company,
            plant: this.dv.lisbomdocs.plant,
          },
        },
      ],
    };
  },
  methods: {
    async pushNewCmp(event) {
      console.log("pushNewCmp", event);
      let myReturn = await this.lis.function("BOMT01/pushNewCmp", this.dv);
      myReturn.operation =
        this.dv.lisbomdocs.components[this.dv.lisbomdocs.components.length - 1]
          .operation + 10;
      this.dv.lisbomdocs.components.push(myReturn);
    },
  },
};
</script>

function data() { new Error('Function not implemented.'); }
