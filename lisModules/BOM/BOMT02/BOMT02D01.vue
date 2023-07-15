<template>
  <l-div v-if="dv.lisDialog == 'BOMT02D01'">
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="account_tree" />

        <l-toolbar-title>{{
          this.$gl("İş Merkezleri", "Work Centers")
        }}</l-toolbar-title>
        <l-btn
          v-if="isChild != undefined"
          flat
          round
          dense
          icon="done"
          color="teal"
          @click="ok()"
        >
          <l-tooltip> Seçilen Malzeme Bilgilerini Getir </l-tooltip>
        </l-btn>
        <l-btn
          v-if="isChild != undefined"
          flat
          round
          dense
          icon="cancel"
          color="negative"
          @click="cancel()"
        />

        <l-btn
          icon="cancel"
          flat
          round
          dense
          color="negative"
          @click="this.$btnGoHome(tabInfo)"
          v-if="isChild == undefined"
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
          :label="this.$gl(`İş Merkezi`, `Work Center`)"
          v-model="dv.sc.workcenter"
          options="destektablo"
          optValue="workcenter"
          optTitle="stext"
          optCaptions="workcenter"
          width="150px"
        />

        <l-select
          :label="this.$gl(`Üst İş Merkezi`, `Main Work Center`)"
          v-model="dv.sc.workcenter"
          options="destektablo"
          optValue="workcenter"
          optTitle="stext"
          optCaptions="workcenter"
          width="150px"
        />

        <l-select
          :label="this.$gl(`İş Merkezi Sorumlusu`, `Workcenter Responsible`)"
          v-model="dv.sc.responsible"
          options="lisbom004"
          optValue="responsible"
          optTitle="stext"
          optCaptions="responsible"
          width="200px"
        />

        <l-input v-model="dv.sc.stext" label="Açıklama" dense />
        <l-checkbox v-model="dv.sc._deleted" label="Silindi mi?" color="pink" />
      </l-div-flex>
    </l-card0>

    <!--Searching Criterias Layer------>

    <!--------------------------------->

    <!--Butons Layer Layer---------------------->

    <l-btn-group>
      <l-btn color="warning" icon="search" @click="btnSearch(dv)" />
      <l-btn
        color="info"
        icon="visibility"
        v-if="isChild == undefined"
        @click="btnShow(dv)"
      />
      <l-btn
        color="primary"
        icon="edit"
        v-if="isChild == undefined"
        @click="btnEdit(dv)"
      />
      <l-btn
        color="secondary"
        icon="add"
        v-if="isChild == undefined"
        @click="btnInsert(dv)"
      />
      <l-btn
        color="negative"
        icon="print"
        v-if="isChild == undefined"
        @click="btnDelete(dv)"
      />
    </l-btn-group>

    <!--Table Layer---------------------------->
    <l-table
      name="BOMT02D01"
      :tableData="dv.lisworkcenterList"
      :columns="myColumnsWorkC"
      :height="'73vh'"
      width="100%"
      :readonly="true"
    />
  </l-div>
  <BOMT02D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'BOMT02D02'" />
</template>

<script>
import BOMT02D02 from "./BOMT02D02.vue";

export default {
  props: ["lv", "goToTransaction", "currentTab", "tabInfo", "isChild"],
  components: {
    BOMT02D02,
  },

  data() {
    return {
      dv: {
        lisDialog: "BOMT02D01",
        sc: {
          company: "01",
          companyOpts: [],
          plant: "01",
          plantOpts: [],
          workcenter: "",
          workcenterOpts: [],
          mainworkcenter: "",
          mainworkcenterOpts: [],
          workresp: "",
          responsible: "",
          workrespOpts: [],
          type: "",
          typeOpts: [],
          costcenter: "",
          costcenterOpts: [],
          capgrp: "",
          capgrpOpts: [],
          oprcontrol: "",
          oprcontrolOpts: [],
          stext: "",
          _deleted: false,
        },
        lisworkcenters: {},
        lisworkcenterList: [],
        modi: 2,
        selectedRow: "",
        reportList: [],
      },
      myColumnsWorkC: [
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
          type: "string",
          value: "workcenter",
          label: this.$gl("İş Merkezi", "Work Center"),
        },
        {
          type: "string",
          value: "stext",
          label: this.$gl("İş Mrk. Açıkl.", "Work Cent. Descrp."),
        },
        {
          type: "string",
          value: "mainworkcenter",
          label: this.$gl("Üst İş Merkezi", "Main Work Center"),
        },
        {
          type: "string",
          value: "costcenter",
          label: this.$gl("Mlyt. Merk.", "Cost Center"),
        },
        {
          type: "string",
          value: "workresp",
          label: this.$gl("İş Mrk. Sormls", "Main Work Center"),
        },
      ],
    };
  },

  methods: {
    async btnSearch(prop) {
      this.dv = await this.lis.function("BOMT02/01-btnSearch", prop);
    },
    async btnEdit(prop) {
      this.dv = await this.lis.function("BOMT02/01-btnEdit", prop);
    },
    async btnShow(prop) {
      this.dv = await this.lis.function("BOMT02/01-btnShow", prop);
    },
    async btnInsert(prop) {
      this.dv = await this.lis.function("BOMT02/01-btnInsert", prop);
    },
    async btnDelete(prop) {
      this.dv = await this.lis.function("BOMT02/01-btnDelete", prop);
    },
    async init(prop) {
      this.dv = await this.lis.function("BOMT02/01-init", this.dv);
    },
    ok() {
      let slct = this.dv.lisworkcenterList.filter((e) => e._selected == true);
      console.log("slct", slct);
      if (slct.length == 1) {
        //this.dv.lisworkcenters = slct[0];
        this.$emit("ok", slct[0]);
        console.log("slct[0]", slct[0]);
        isChild = false;
      } else {
        this.lis.alert("e", "Bir Malzeme Kartı Seçilmedi!");
      }
    },
    cancel() {
      this.$emit("cancel", false);
    },
  },

  mounted() {
    this.init(this.dv);
    if (this.isChild != undefined) {
    }
  },
};
</script>
