<template>
  <!--Tittle Layer-->
  <l-div v-if="dv.lisDialog == 'BAST07D01'">
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="list_alt" />
        <l-toolbar-title>{{
          this.$gl("Kullanıcı Grupları", "User Groups")
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
          :label="this.$gl(`Grup`, `Group`)"
          dense
          v-model="dv.sc.group"
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
      <!-- <l-btn color="negative" icon="delete" @click="btnDelete(dv)" /> -->


    <l-table
      v-model="dv.lisGroupsList"
      :columns="myColumnsGroups"
      :readonly="true"
      height="fit"
      @dblclick="btnEdit()"
    />
  </l-div>

  <BAST07D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'BAST07D02'" />
</template>

<script>

import BAST07D02 from "./BAST07D02.vue";
export default {
  props: ["lv", "goToTransaction", "tabInfo", "isShow"],
  components: { BAST07D02 },

  data() {
    return {
      dv: {
        sc: {
          company: "01",
          group: "",
          stext: "",
          _deleted: false,
        },

        lisDialog: "BAST07D01",
        modi: 2,
        lisGroupsList: [],
        //lisUsersGroupsList: [],
        lisusers: {},
        lisgroups: {},
      },
      myColumnsGroups: [
        {
          label: this.$gl(`Firma`, `Company`),
          value: "company",
          type: "string",
        },

        {
          label: this.$gl(`Grup`, `Group`),
          value: "group",
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
      this.dv = await this.lis.function("BAST07/01-btnSearch", this.dv);
    },
    async btnEdit() {
      this.dv = await this.lis.function("BAST07/01-btnEdit", this.dv);
    },
    async btnShow() {
      this.dv = await this.lis.function("BAST07/01-btnShow", this.dv);
    },
    async btnInsert() {
      this.dv = await this.lis.function("BAST07/01-btnInsert", this.dv);
      console.log("this.dv",this.dv);
    },
    async btnDelete() {
      this.dv = await this.lis.function("BAST07/01-btnDelete", this.dv);
    },
  },
  

};
</script>
