<template>
  <l-card0>
    <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
      <l-icon size="md" name="account_tree" />

      <l-toolbar-title>{{
        this.$gl("Operasyon Aktivitesi", "Operation Activities")
      }}</l-toolbar-title>

      <div class="q-gutter-xs">
        <l-btn icon="cancel" color="negative" @click="cancel()" />
      </div>
    </l-toolbar>
  </l-card0>
  <l-div>
    <l-table
     name = "PRDT01D11"
    v-model="dv.lisprddocs.activities"
    :columns="activitiesColumns"
    :context="contextMenu"
    @zoom="zoomMaterialRow = $event.row"
    @keydown="if ($event.key == 'Insert') this.pushNewAct($event);"
  />
  </l-div>
  

</template>

<script>
export default {
  props: ["dv", "tabInfo"],
  data() {
    return {
      contextMenu: [
        {
          name: "Satır Ekle",
          callback: async () => {
            this.pushNewAct();
          },
        }
      ],
      activitiesColumns: [
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
        // {
        //   type: "zoom",
        //   value: "material",
        //   label: this.$gl("Malzeme", "Material"),
        // },
        // {
        //   type: "string",
        //   value: "stext",
        //   label: this.$gl("Açıklama", "Description"),
        // },
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
        }
      ],
      
    };
  },
  methods: {
    async pushNewAct(event) {
      console.log("pushNewAct", event);
      let myReturn = await this.lis.function("PRDT01/pushNewAct", this.dv);
      console.log("myReturn", myReturn);
      myReturn.operation =
        this.dv.lisprddocs.activities[this.dv.lisprddocs.activities.length - 1]
          .operation + 10;
      this.dv.lisprddocs.activities.push(myReturn);
    },
    cancel() {
      this.$emit("cancel", false);
    },
  },
};
</script>

function data() { new Error('Function not implemented.'); }
