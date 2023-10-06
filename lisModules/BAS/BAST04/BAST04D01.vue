<template>
  <!--Tittle Layer-->
  <l-div v-if="dv.lisDialog == 'BAST04D01'">
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="list_alt" />
        <l-toolbar-title>{{
          this.$gl("Variant Anahtarları", "Vairant Keys")
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
        <l-input
          :label="this.$gl(`Varyant`, `Variant`)"
          dense
          v-model="dv.sc.varkey"
        ></l-input>

        <l-input
          :label="this.$gl(`Açıklama`, `Description`)"
          dense
          v-model="dv.sc.stext"
        ></l-input>
      </l-div-flex>
    </l-card0>

      <l-btn color="warning" icon="search" @click="btnSearch()" />
      <l-btn color="primary" icon="edit" @click="btnEdit()" />
      <l-btn color="info" icon="visibility" @click="btnShow()"/>
      <l-btn color="secondary" icon="add" @click="btnInsert()" />
      <l-btn color="negative" icon="delete" @click="btnDelete()" />
   

    <l-table
      v-model="dv.lisvariantsList"
      :columns="myColumnsBas04"
      :readonly="true"
      height="fit"
      @dblclick="btnEdit()"
    />
  </l-div>

  <BAST04D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'BAST04D02'" />
</template>

<script>
import BAST04D02 from "./BAST04D02.vue";
export default {
  props: ["lv", "goToTransaction", "tabInfo", "isShow"],
  components: { BAST04D02 },

  data() {
    return {
      dv: {
        sc: {
          company: "01",
          varkey: "",
          stext: "",
          _deleted: false,
        },

        lisDialog: "BAST04D01",
        modi: 2,
        lisvariantsList: [],
        lisvariants: {},
      },
      myColumnsBas04: [
        {
          label: this.$gl(`Firma`, `Company`),
          value: "company",
          type: "string",
        },

        {
          label: this.$gl(`Varyant Anahtarı`, `Variant Key`),
          value: "varkey",
          type: "string",
        },
        {
          label: this.$gl(`Açıklama`, `Description`),
          value: "stext",
          type: "string",
        },
      ],
    };
  },
  methods: {
    async btnSearch() {
      this.dv = await this.lis.function("BAST04/01-btnSearch", this.dv);
    },
    async btnEdit() {
      this.dv = await this.lis.function("BAST04/01-btnEdit", this.dv);
    },
    async btnShow() {
      this.dv = await this.lis.function("BAST04/01-btnShow", this.dv);
    },
    async btnInsert() {
      this.dv = await this.lis.function("BAST04/01-btnInsert", this.dv);
    },
    async btnDelete() {
      this.dv = await this.lis.function("BAST04/01-btnDelete", this.dv);
    },
  },

  created() {

        console.log("bast04d01 - $attrs", this.$attrs)
    },

  // async beforeUnmount() {
  //   await this.lis.function("cls-system.unlock", this.lockKeyParams);
  // },
};
</script>
