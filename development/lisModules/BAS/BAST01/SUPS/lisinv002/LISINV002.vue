<template>
  <div>
    <l-div v-if="mv.lisDialog == 'LISINV002'">
      <!--Tittle Layer-->
      <l-card>
        <q-bar class="bg-blue-grey-3"> Destek Tablosu - lisinv002 </q-bar>
        <q-bar :class="`bg-${tabInfo.moduleColor}`">
          <l-toolbar-title>{{
            this.$gl(
              "Envanter Yönetimi Kullanıcı Hakları",
              "Inventory Management User Rights"
            )
          }}</l-toolbar-title>

          <l-btn
            icon="cancel"
            flat
            round
            dense
            color="negative"
            @click="cancel()"
          />
        </q-bar>

        <l-div-flex>
          <l-select
            :label="this.$gl(`Firma`, `Company`)"
            v-model="mv.sc.company"
            options="lisbas001"
            optValue="company"
            optTitle="stext"
            optCaptions="company"
            width="120px"
          />
          <!-- <l-input dense label="Kullanıcı" v-model="mv.sc.invuser" /> -->
          <l-input
            :label="this.$gl(`Kullanıcı`, `User`)"
            v-model="mv.sc.invuser"
          >
            <l-chip
              class="bg-white"
              icon="search"
              dense
              clickable
              @click="isSelectUser = !isSelectUser"
            >
              <SYST03D01mini
              
                :tabInfo="tabInfo"
                :isShow="isSelectUser"
                @ok="
                  mv.sc.invuser = $event.username;
                  isSelectUser = false;
                "
                @cancel="isSelectUser = false"
              />
            </l-chip>
          </l-input>
        </l-div-flex>
      </l-card>

      <!--Searching Criterias Layer------>

      <!--------------------------------->

      <!--Butons Layer Layer---------------------->

      <l-btn color="warning" icon="search" @click="btnSearch(mv)" />
      <l-btn color="primary" icon="edit" @click="btnEdit(mv)" />
      <l-btn color="secondary" icon="add" @click="btnInsert(mv)" />
      <l-btn color="negative" icon="delete" @click="btnDelete(mv)" />

      <l-table
        name="LISINV002"
        v-model="mv.lisinv002List"
        :columns="myColumnsInv002"
        :context="contextMenu"
        :height="'70vh'"
        :width="'100%'"
        :readonly="true"
      />
    </l-div>
    <LISINV002D002
      :mv="mv"
      :dv="dv"
      :lv="lv"
      :tabInfo="tabInfo"
      v-if="mv.lisDialog == 'LISINV002D002'"
    />
  </div>
</template>

<script>
import LISINV002D002 from "./LISINV002D002.vue";

export default {
  props: ["lv", "dv", "goToTransaction", "currentTab", "tabInfo"],
  components: {
    LISINV002D002,
  },

  data() {
    return {
      isSelectUser: false,
      mv: {
        sc: {
          company: "01",
          invuser: "",

          //   status: [],

          //   isdirectupd: false,
        },

        lisDialog: "LISINV002",
        modi: 2,
        lisinv002List: [],
        lisinv002: {},
        //myColumnsinv02rights: [],
      },
      myColumnsInv002: [
        {
          label: this.$gl(`Kullanıcı Adı`, `Username`),
          value: "invuser",
          type: "string",
        },
        {
          label: this.$gl(`Adı`, `Name`),
          value: "name",
          type: "string",
        },

        {
          label: this.$gl(`Soyadı`, `Surname`),
          value: "surname",
          type: "string",
        },
      ],
    };
  },

  methods: {
    async btnSearch() {
      this.mv = await this.lis.function(
        "BAST01/SUPS/lisinv002/01-btnSearch",
        this.mv
      );
    },
    async btnEdit() {
      this.mv = await this.lis.function(
        "BAST01/SUPS/lisinv002/01-btnEdit",
        this.mv
      );
    },
    async btnInsert() {
      this.mv = await this.lis.function(
        "BAST01/SUPS/lisinv002/01-btnInsert",
        this.mv
      );
    },
    async btnDelete() {
      this.mv = await this.lis.function(
        "BAST01/SUPS/lisinv002/01-btnDelete",
        this.mv
      );
      this.btnSearch();
    },
    // async init(prop) {
    //   this.mv = await this.lis.function("lisinv002/01-init", this.mv);
    // },

    async cancel() {
      this.dv.lisDialog = "BAST01D01";
    },
  },

  //   mounted() {
  //     this.init(this.mv);
  //     console.log("mounted worked");
  //   },
  async beforeUnmount() {
    await this.lis.function("cls-system.unlock", {
      company: "01",
      lid: "BAST01",
      lockkey: this.dv.olismodels[0].model,
    });
    this.tabInfo.blockGoToTransaction = false;
  },
};
</script>
