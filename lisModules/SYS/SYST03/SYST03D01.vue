<template>
  <l-div v-if="dv.lisDialog == 'SYST03D01'">
    <!--Tittle Layer-->

    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="assignment_ind" />

        <l-toolbar-title>{{
          this.$gl(`Sistem Kullanıcıları`, `System Users`)
        }}</l-toolbar-title>
        <l-btn
          v-if="isChild != undefined"
          icon="done"
          flat
          round
          dense
          color="teal"
          @click="ok()"
        />
        <l-btn
          v-if="isChild != undefined"
          icon="cancel"
          flat
          round
          dense
          color="negative"
          @click="cancel()"
        />
        <l-btn
          v-if="isChild == undefined"
          icon="cancel"
          flat
          round
          dense
          color="negative"
          @click="this.$btnGoHome(tabInfo)"
        />
      </l-toolbar>
      <!--Searching Criterias Layer----row-1-->
      <l-div-flex>
        <div class="col-3">
          <l-input
            :label="this.$gl(`Kullanıcı Adı`, `User name`)"
            v-model="dv.sc.userName"
          />
        </div>
      </l-div-flex>
      <!--------------------------------row-2-->
      <!--------------------------------row-3-->
    </l-card0>
    <!--Butons Layer Layer---------------------->

    <l-btn-group>
      <l-btn color="warning" icon="search" @click="btnSearch(dv)" />
      <l-btn
        v-if="isChild == undefined"
        color="primary"
        icon="edit"
        @click="btnEdit(dv)"
      />
      <l-btn
        v-if="isChild == undefined"
        color="info"
        icon="visibility"
        @click="btnShow(dv)"
      />
      <l-btn
        v-if="isChild == undefined"
        color="secondary"
        icon="add"
        @click="btnInsert(dv)"
      />
    </l-btn-group>

    <l-table
      name="SYST03D01"
      v-model="dv.reportList"
      :columns="myColumnsreportList"
    />
  </l-div>
  <SYST03D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'SYST03D02'" />
</template>

<script>
import SYST03D02 from "./SYST03D02.vue";

export default {
  props: ["tabInfo", "isChild"],
  components: {
    SYST03D02,
  },

  data() {
    return {
      myColumnsreportList: [
        {
          label: this.$gl("Kullanıcı Adı", "User Name"),
          type: "string",
          value: "username",
        },
        {
          label: this.$gl("Süper Kullanıcı", "Super User"),
          type: "string",
          value: "issuperuser",
        },
        {
          label: this.$gl("Blokeli", "Is Blocked"),
          type: "string",
          value: "isblocked",
        },
      ],
      dv: {
        sc: {
          userName: "",
        },
        lisDialog: "SYST03D01",
        modi: 2,
        olisusers: {},
        reportList: [],
        lisGroupsList: [],
        selectedRow: "",
        project_CODE: localStorage.project_CODE,
      },
    };
  },

  methods: {
    async btnSearch(prop) {
      this.dv = await this.lis.function("SYST03/01-btnSearch", prop);
    },
    async btnEdit(prop) {
      this.dv = await this.lis.function("SYST03/01-btnEdit", prop);
      this.tabInfo.blockGoToTransaction = true;
    },
    async btnShow(prop) {
      this.dv = await this.lis.function("SYST03/01-btnShow", prop);
      this.tabInfo.blockGoToTransaction = true;
    },
    async btnInsert(prop) {
      this.dv = await this.lis.function("SYST03/01-btnInsert", prop);
      this.tabInfo.blockGoToTransaction = true;
    },
    async btnDelete(prop) {
      this.dv = await this.lis.function("SYST03/01-btnDelete", prop);
    },
    async init(prop) {
      this.dv = await this.lis.function("SYST03/01-init", prop);
    },
    ok() {
      let select = this.dv.reportList.filter((e) => e._selected == true);
      if (select.length == 1) {
        console.log("select", select[0]);
        this.$emit("ok", select[0]);
        //isShowUser = false;
      } else {
        this.lis.alert("e", "Bir Kullanıcı Seçilmedi!");
      }
    },
    cancel() {
      this.$emit("cancel", false);
    },
  },

  mounted() {
    this.init(this.dv);
    console.log("mounted worked");
  },
};
</script>
