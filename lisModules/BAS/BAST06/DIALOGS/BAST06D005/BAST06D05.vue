<template>
  <div class="row">
    <l-space />
    <l-btn class="" round dense icon="save" color="deep-purple-14" @click="btnSave()" />

  </div>
  <l-table name="BAST06D05" v-model="dv.reportListFin" :columns="myColumnsFin" :height="'80vh'" :width="'100%'" />
</template>

<script>
export default {
  props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
  components: {},

  data() {
    return {
      dv: {
        company: "01",
        reportListFin: [],
        lisaccounts: {},
        tab: "accounts",
      },
      myColumnsFin: [
        {
          label: this.$gl("Firma", "Company"),
          value: "company",
          type: "string",
          default: "01",
        },
        {
          label: this.$gl(`Hesap Tipi`, `Account Type`),
          value: "acctype",
          type: "string",
        },
        {
          label: this.$gl(`Hesap No`, `Account No`),
          value: "account",
          type: "string",
        },
        {
          label: this.$gl(`Hesap Açkl.`, `Account Descr.`),
          value: "stext",
          type: "string",
        },
        {
          label: this.$gl(`Muhasebe  Standartı`, `Accounting Standard`),
          value: "accstd",
          type: "number",
        },
        {
          label: this.$gl(`T.D Hesap`, `Uniform Account`),
          value: "glaccount",
          type: "string",
        },

        {
          label: this.$gl("Hesap Seviyesi", "Account Level"),
          value: "acclevel",
          type: "number", default: "0",
          // options: [
          //   { value: 0, label: "Ana Hesap" },
          //   { value: 1, label: "Üst Hesap" },
          //   { value: 2, label: "Direkt Güncellenebilir Hesap" },
          // ],
        },
        // {
        //   label: this.$gl(`Silinecek?`, `Is Delete?`),
        //   value: "_deleted",
        //   type: "checkbox",
        // },
        {
          label: this.$gl(`Hesap Sınıfı`, `Account Class`),
          value: "accclass",
          type: "string",
        },
        {
          label: this.$gl(`Hesap Grubu`, `Account Group`),
          value: "accgrp",
          type: "string",
        },
        {
          label: this.$gl(`Para Birimi`, `Currency`),
          value: "currency",
          type: "string",
        },
      ],
    };
  },
  methods: {
    async btnSave() {
      console.log("btnSave çalıştı HESAPPLANI");

      await this.lis.function("BAST06/DIALOGS/BAST06D005/05-btnSave", this.dv);
    },
    async init(prop) {
      this.dv = await this.lis.function("BAST06/DIALOGS/BAST06D005/05-init", this.dv);
    },
  },
  mounted() {
    this.init(this.dv);
    console.log("mounted workedDDDDD");
  },
};
</script>
