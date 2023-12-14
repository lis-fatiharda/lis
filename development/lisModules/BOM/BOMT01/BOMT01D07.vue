<template>
  <l-table
    v-model="dv.lisbomdocs.equipments"
    :columns="equipmentsColumns"
    :height="'73vh'"
    width="100%"
    @zoom="zoomMaterialRow = $event.row"
    @keydown="if ($event.key == 'Insert') this.pushNewEqui($event);"
  />
  <BAST03D01mini
    :pComp="dv.sc.company"
    :isShow="zoomMaterialRow == null ? false : true"
    @ok="
      lis.objectMove($event, dv.lisbomdocs.equipments[zoomMaterialRow]);
      dv.lisbomdocs.equipments[zoomMaterialRow].material = $event.material;
      dv.lisbomdocs.equipments[zoomMaterialRow].mtext = $event.stext;
      dv.lisbomdocs.equipments[zoomMaterialRow].unit = $event.skunit;
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
      equipmentsColumns: [
        {
          type: "number",
          value: "operation",
          label: this.$gl("Operasyon No", "Operation No"),
        },
        {
          type: "string",
          value: "type",
          label: this.$gl("Aktivite Tipi", "Activity Type"),
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
          value: "value",
          label: this.$gl(
            "Tahmini Operasyon Süresi",
            "Estimated Operation Time"
          ),
        },
        {
          type: "selectmenu",
          label: this.$gl("Miktar Br.", "Quantity Unit"),
          value: "unit",
          options: "lisbas007",
          optValue: "unit",
          optTitles: { unit: "Birim", stext: "Açıklama" },
          optFilter: { unittype: 0 },
        },
        {
          type: "checkbox",
          value: "iscost",
          label: this.$gl("Maliyete Ekle", "Add to Cost"),
        },
      ],
    };
  },
  methods: {
    async pushNewEqui(event) {
      console.log("pushNewEqui", event);
      let myReturn = await this.lis.function("BOMT01/pushNewEqui", this.dv);
      myReturn.operation =
        this.dv.lisbomdocs.equipments[this.dv.lisbomdocs.equipments.length - 1]
          .operation + 10;
      this.dv.lisbomdocs.equipments.push(myReturn);
    },
  },
};
</script>

function data() { new Error('Function not implemented.'); }
