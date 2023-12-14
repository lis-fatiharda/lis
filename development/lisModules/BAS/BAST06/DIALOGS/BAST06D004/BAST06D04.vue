<template>
  <div class="row">
    <l-space/>
  <l-btn class="" round dense icon="save" color="deep-orange-6" @click = "btnSave()" />
    
  </div>
    <l-table name="BAST06D04" v-model="dv.reportList" :columns="myColumnsBom" :height="'80vh'" :width="'100%'" />
  
</template>

<script>
export default {
  props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
  components: {},

  data() {
    return {
      dv: {
        company: "01",
        reportList: [],
        lisbomdocs: {},
        tab: "bom",
      },

      myColumnsBom: [
        {
          type: "string",
          value: "company",
          label: this.$gl("Firma", "Company"),
        },
        {
          type: "string",
          value: "plant",
          label: this.$gl("Tesis", "Plant"),
        },
        {
          type: "number",
          value: "alternum",
          label: this.$gl("Alt.No", "Alt.No"),
        },
        {
          type: "string",
          value: "bomnumber",
          label: this.$gl("Ürün Ağacı No", "Bom Number"),
        },
        {
          type: "string",
          value: "material",
          label: this.$gl("Malzeme", "Material"),
        },
        {
          type: "string",
          value: "stext",
          label: this.$gl("Açıklama", "Description"),
        },
        {
          type: "datetime",
          value: "docdate",
          label: this.$gl(`Başlangıç Tarihi`, `Start Date`),
        },
        {
          type: "datetime",
          value: "validuntil",
          label: this.$gl(`Bitiş Tarihi`, `End Date`),
        },
        {
          type: "string",
          value: "type",
          label: this.$gl("Tip", "Type"),
        },
      ],

    };
  },
  methods: {
    async btnSave() {
      console.log("btnSave çalıştı BAST06 BOM");

      await this.lis.function("BAST06/DIALOGS/BAST06D004/04-btnSave", this.dv);
    },
    async init(prop) {
      this.dv = await this.lis.function("BAST06/DIALOGS/BAST06D004/04-init", this.dv);
    },
  },
  mounted() {
    this.init(this.dv);
    console.log("mounted workedDDDDD");
  },
};
</script>
