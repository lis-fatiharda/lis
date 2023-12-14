<template>
  <div class="row">
    <l-space />
    <l-btn class="" round dense icon="save" color="green-6" @click="btnSave()" />

  </div>
  <l-table name="BAST06D03" v-model="dv.lisCustomerList" :columns="myColumnsCus" :height="'80vh'" :width="'100%'" />
</template>

<script>
export default {
  props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
  components: {},

  data() {
    return {
      dv: {
        company: "01",
        lisCustomerList: [],
        liscustomers: {},
        tab: "custCards",

      },

      myColumnsCus: [
        {
          label: this.$gl("Firma", "Company"),
          value: "company",
          type: "string",
          default: "01",
        },
        {
          label: this.$gl("İş Alanı", "Busarea"),
          value: "busarea",
          type: "string",
          default: "S",
        },
        {
          label: this.$gl("Cari Kodu", "Current Code"),
          value: "customer",
          type: "string",
        },
        {
          label: this.$gl("Cari Adı", "Current Name"),
          value: "name1",
          type: "string",
        },
        {
          label: this.$gl("Cari Tipi", "Current Type"),
          value: "custorvend",
          type: "select",
          options: [
            { value: 0, label: "Aday" },
            { value: 1, label: "Müşteri" },
            { value: 2, label: "Tedarikçi" },
          ],
        },

        {
          label: this.$gl("Sektör", "Sector"),
          value: "sector",
          type: "string",
        },
        {
          label: "Posta Kodu",
          label: this.$gl("Posta Kodu", "Post Code"),
          value: "postcode",
          type: "string",
        },
        {
          label: this.$gl("Ülke", "Country"),
          value: "country",
          type: "string",
        },
        {
          label: this.$gl("Şehir", "City"),
          value: "city",
          type: "string",
        },
        {
          label: this.$gl("Vergi Dairesi", "Tax Administration"),
          value: "taxdept",
          type: "string",
        },
        {
          label: this.$gl("Vergi Numarası", "Tax Number"),
          value: "taxnum",
          type: "string",
        },
        {
          label: "Tel. Num.",
          value: "telnum",
          type: "string",
        },
        {
          label: "Fax. Num.",
          value: "faxnum",
          type: "string",
        },
      ],

    };
  },
  methods: {
    async btnSave() {
      console.log("btnSave çalıştı BAST06 CARİ");
      await this.lis.function("BAST06/DIALOGS/BAST06D003/03-btnSave", this.dv);
    },
    async init(prop) {
      this.dv = await this.lis.function("BAST06/DIALOGS/BAST06D003/03-init", this.dv);
    },
  },
  mounted() {
    this.init(this.dv);
    console.log("mounted workedDDDDD    cari");
  },
};
</script>
