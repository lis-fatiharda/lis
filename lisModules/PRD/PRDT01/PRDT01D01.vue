

<template>
  <l-div v-if="dv.lisDialog == 'PRDT01D01'">
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="account_tree" />

        <l-toolbar-title>{{
          this.$gl(
            "İş Emri Oluşturma-Değiştirme",
            "Work Order Creation-Modification"
          )
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
          width="150px"
        />
        <l-input v-model="dv.sc.docnum" :label="this.$gl(`No`, `No`)" dense />
        <!-- <l-input :label="this.$gl(`Malzeme Kodu`, `Material`)" v-model="dv.sc.material">
                    <l-chip class="bg-white" icon="search" dense clickable @click="isSelectMat = !isSelectMat">
                        <BAST03D01mini :pComp="dv.sc.company" :isShow="isSelectMat" @ok="
                            dv.sc.material = $event.material;
                        isSelectMat = false;
                        " @cancel="isSelectMat = false" />
                    </l-chip>
                </l-input>
                <l-input :label="this.$gl(`Müşteri Kodu`, `Customer Code`)" v-model="dv.sc.customer">
                    <l-chip class="bg-white" icon="search" dense clickable @click="isSelectCust = !this.isSelectCust">
                        <BAST02D01mini :pComp="dv.sc.company" :isShow="isSelectCust" @ok="
                            dv.sc.customer = $event.customer;
                        isSelectCust = false;
                        " @cancel="isSelectCust = false" />
                    </l-chip>
                </l-input> -->

        <!-- <l-input v-model="dv.sc.stext" :label="this.$gl(`Açıklama`, `Description`)" dense style="width: 200px" /> -->
        <l-date
          :label="this.$gl(`İş Emri Tarihi`, `Work Order Date`)"
          v-model="dv.sc.validfrom"
          style="width: 160px"
        />
        <l-date
          :label="this.$gl(`İş Emri Tarihi`, `Work Order Date`)"
          v-model="dv.sc.validuntil"
          style="width: 160px"
        />

        <l-checkbox v-model="dv.sc._deleted" label="Silindi mi?" color="pink" />
      </l-div-flex>
    </l-card0>
    <!--------------------------------->

    <!--Butons Layer Layer---------------------->

    <l-btn-group>
      <l-btn color="warning" icon="search" @click="btnSearch()" />
      <l-btn color="info" icon="visibility" @click="btnShow()" />
      <l-btn color="primary" icon="edit" @click="btnEdit()" />
      <l-btn color="secondary" icon="add" @click="btnInsert()" />
      <l-btn color="negative" icon="print" @click="btnDelete()" />
    </l-btn-group>

    <l-table
      name="PRDT01D01"
      v-model="dv.prdList"
      :columns="myColumnsPrd"
      :readonly="true"
    />
  </l-div>
  <PRDT01D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'PRDT01D02'" />

</template>

<script>
import PRDT01D02 from "./PRDT01D02.vue";

export default {
  props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
  components: {
    PRDT01D02,
  },

  data() {
    return {
      isSelectMat: false,
      isSelectCust: false,
      dv: {
        lisDialog: "PRDT01D01",
        sc: {
          company: "01",
          plant: "01",
          doctype: "",
          docnum: "",
          material: "",
          stext: "",
          alternum: 0,
          validfrom: this.lis.firstDayOfMonth(),
          validuntil: this.lis.lastDayOfMonth(),
          _deleted: false,
        },
        modi: 2,
        selectedRow: "",
        lisprddocs: {},
        prdList: [],
        lockKeyParams: {
          company: "01",
          lid: "PRDT01",
          lockkey: "",
        },
      },
      myColumnsPrd: [
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
          value: "stext",
          label: this.$gl("Açıklama", "Description"),
        },
        {
          type: "datetime",
          value: "docdate",
          label: this.$gl(`İş Emri Tarihi`, `Work Order Date`),
        },
      ],
    };
  },

  methods: {
    async btnSearch() {
      this.dv = await this.lis.function("PRDT01/01-btnSearch", this.dv);
    },
    async btnEdit() {
      this.dv = await this.lis.function("PRDT01/01-btnEdit", this.dv);
    },
    async btnShow() {
      this.dv = await this.lis.function("PRDT01/01-btnShow", this.dv);
    },
    async btnInsert() {
      this.dv = await this.lis.function("PRDT01/01-btnInsert", this.dv);
    },
    async btnDelete() {
      this.dv = await this.lis.function("PRDT01/01-btnDelete", this.dv);
    },
    async init() {
      this.dv = await this.lis.function("PRDT01/01-init", this.dv);
    },
  },

  mounted() {
    this.init(this.dv);
    console.log("mounted worked");
  },
};
</script>
