<template>
  <l-div v-if="dv.lisDialog == 'PRDT02D01'">
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="account_tree" />

        <l-toolbar-title>{{
          this.$gl("İş Bitiş Onayı", "Workend Confirmation")
        }}</l-toolbar-title>

        <l-btn
          icon="cancel"
          flat
          round
          dense
          color="negative"
          @click="this.$btnGoHome(tabInfo)"
        />
      </l-toolbar>
      <l-div-flex>
        <l-select
          :label="this.$gl(`Firma`, `Company`)"
          v-model="dv.sc.company"
          options="lisbas001"
          optValue="company"
          optTitle="stext"
          optCaptions="company"
          width="120px"
        />
        <l-select
          :label="this.$gl(`Tesis`, `Plant`)"
          v-model="dv.sc.plant"
          options="lisbas002"
          optValue="plant"
          optTitle="stext"
          optCaptions="plant"
          width="120px"
        />
        <l-select
          :label="this.$gl(`Tipi`, `Type`)"
          v-model="dv.sc.doctype"
          options="lisprd001"
          optValue="type"
          optTitle="stext"
          optCaptions="type"
          width="130px"
        />
        <l-input v-model="dv.sc.docnum" :label="this.$gl(`No`, `No`)" dense />

        <l-input
          v-model="dv.sc.stext"
          :label="this.$gl(`Açıklama`, `Description`)"
          dense
          style="width: 200px"
        />
        <l-input
          v-model="dv.sc.confirmation"
          :label="this.$gl(`Onay No`, `Confirmation`)"
          dense
          style="width: 150px"
        />
        <l-datetime
          :label="this.$gl(`Başlangıç Tarihi`, `Start Date`)"
          v-model="dv.sc.workstart"
          style="width: 160px"
        />
        <l-datetime
          :label="this.$gl(`Bitiş Tarihi`, `End Date`)"
          v-model="dv.sc.workend"
          style="width: 160px"
        />

        <l-checkbox v-model="dv.sc._deleted" label="Silindi mi?" color="pink" />
      </l-div-flex>
    </l-card0>
    <!--------------------------------->

    <!--Butons Layer Layer---------------------->

    <l-btn-group>
      <l-btn color="warning" icon="search" @click="btnSearch()" />
      <l-btn  color="info" icon="visibility" @click="btnShow()" />
      <l-btn color="primary" icon="edit" @click="btnEdit()" />
      <l-btn color="secondary" icon="add" @click="btnInsert()" />
      <!-- <l-btn color="negative" icon="print" @click="btnDelete()" /> -->
    </l-btn-group>

    <l-table
      name="PRDT02D01"
      :tableData="dv.prdListConf"
      :columns="myColumnsPrdConf"
      :height="'73vh'"
      width="100%"
      :readonly="true"
    />
  </l-div>
  <PRDT02D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'PRDT02D02'" />
</template>

<script>
import PRDT02D02 from "./PRDT02D02.vue";

export default {
  props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
  components: {
    PRDT02D02,
  },

  data() {
    return {
      isSelectMat: false,
      isSelectCust: false,
      dv: {
        lisDialog: "PRDT02D01",
        sc: {
          company: "01",
          plant: "01",
          doctype: "",
          docnum: "",
          material: "",
          stext: "",
          confirmation: "",
          workstart: this.lis.firstDayOfMonth(),
          workend: this.lis.lastDayOfMonth(),

          _deleted: false,
        },
        modi: 2,
        selectedRow: "",
        lisprddocs: {},
        prdListConf: [],
        lockKeyParams: {
          company: "01",
          lid: "PRDT02",
          lockkey: "",
        },
      },
      myColumnsPrdConf: [
        {
          type: "string",
          value: "company",
          label: this.$gl("Firma", "Company"),
        },
        {
          type: "string",
          value: "doctype",
          label: this.$gl("Tip", "Type"),
        },

        {
          type: "string",
          value: "docnum",
          label: this.$gl("No", "No"),
        },
        {
          type: "string",
          value: "operations.operation",
          label: this.$gl("Opr.No", "Opr.No"),
        },
        {
          type: "string",
          value: "operations.workcenter",
          label: this.$gl("İş Merkezi", "Work Center"),
        },
        {
          type: "string",
          value: "operations.stext",
          label: this.$gl("Açıklama", "Description"),
        },
        // {
        //   type: "string",
        //   value: "customer",
        //   label: this.$gl("Müşteri", "Customer"),
        // },
        // {
        //   type: "string",
        //   value: "workcenter",
        //   label: this.$gl("İş Merkezi", "Work Center"),
        // },
        {
          type: "string",
          value: "operations.confirmation",
          label: this.$gl("Onay No", "Confirmation"),
        },
        // {
        //   type: "number",
        //   value: "confirmpos",
        //   label: this.$gl("Onay Sırası", "Confirm Pos."),
        // },
        // {
        //   type: "number",
        //   value: "prods.[0].quantity",
        //   fraction: 2,
        //   label: this.$gl("Miktar", "Quantity"),
        // },

        // {
        //   type: "string",
        //   value: "qunit",
        //   label: this.$gl("Birim", "Unit"),
        // },
        
        // {
        //   type: "datetime",
        //   value: "workstart",
        //   label: this.$gl(`Başlama Tarihi`, `Start Date`),
        // },
      ],
    };
  },

  methods: {
    async btnSearch() {
      this.dv = await this.lis.function("PRDT02/01-btnSearch", this.dv);
    },
    async btnEdit() {
      this.dv = await this.lis.function("PRDT02/01-btnEdit", this.dv);
    },
    async btnShow() {
      this.dv = await this.lis.function("PRDT02/01-btnShow", this.dv);
    },
    async btnInsert() {
      this.dv = await this.lis.function("PRDT02/01-btnInsert", this.dv);
    },
    async btnDelete(prop) {
      this.dv = await this.lis.function("PRDT02/01-btnDelete", prop);
    },
    async init(prop) {
      this.dv = await this.lis.function("PRDT02/01-init", this.dv);
    },
  },

  mounted() {
    this.init(this.dv);
    console.log("mounted worked");
  },
};
</script>
