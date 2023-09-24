<template>
  <l-div>
    <!--Tittle Layer-->

    <q-bar :class="`bg-${tabInfo.moduleColor}`">
      <l-toolbar-title>{{
        this.$gl("Kullanıcı Grupları", "User Groups")
      }}</l-toolbar-title>
      <l-btn
        v-if="dv.modi != 2"
        icon="save"
        flat
        round
        dense
        color="teal"
        @click="btnSave()"
      />
      <l-btn
        icon="cancel"
        flat
        round
        dense
        color="negative"
        @click="cancel()"
      />
    </q-bar>

    <l-card>
      <l-card-section horizontal>
        <l-div-flex>
          <l-select
            :label="this.$gl(`Firma`, `Company`)"
            v-model="dv.lisgroups.company"
            options="lisbas001"
            optValue="company"
            optTitle="stext"
            optCaptions="company"
            width="120px"
          />
          <l-input
            :label="this.$gl(`Kullanıcı Grubu`, `User Group`)"
            dense
            v-model="dv.lisgroups.group"
          ></l-input>
          <l-input
            :label="this.$gl(`Açıklama`, `Description`)"
            dense
            v-model="dv.lisgroups.stext"
          ></l-input>
        </l-div-flex>
      </l-card-section>
    </l-card>
    <!--Searching Criterias Layer-->
  </l-div>

  <l-dialog v-model="isShowUser" persistent>
    <l-card0>
      <SYST03D01
        :dv="dv"
        :tabInfo="tabInfo"
        :isChild="true"
        @cancel="isShowUser = false"
        @ok="okZoom($event)"
      />
    </l-card0>
  </l-dialog>
  <l-table
    name="BAST07D02"
    v-model="dv.lisgroups.items"
    :columns="myColumnsGroupUsers"
    :context="contextMenu"
    @zoom="fetchZoom($event)"
    @keydown="if ($event.key == 'Insert') this.pushNewItem($event);"
  />
</template>

<script>
import SYST03D01 from "../../SYS/SYST03/SYST03D01.vue";
export default {
  props: ["lv", "dv", "goToTransaction", "tabInfo"],
  components: {
    SYST03D01,
  },
  data() {
    return {
      zoomRow: null,
      isShowUser: false,
      contextMenu: [
        {
          name: "Satır Ekle",
          callback: async () => {
            this.pushNewItem();
          },
        },
      ],
      myColumnsGroupUsers: [
        {
          label: this.$gl("Kullanıcı Adı", "User Name"),
          type: "zoom",
          value: "username",
        },
        {
          label: this.$gl("Adı", "Name"),
          type: "string",
          value: "name",
        },
        {
          label: this.$gl("Soyadı", "Surname"),
          type: "string",
          value: "surname",
        },
      ],
    };
  },

  methods: {
    async btnSave() {
      await this.lis.function("BAST07/02-btnSave", this.dv);
      this.cancel();
    },
    async cancel() {
      this.dv.lisDialog = "BAST07D01";
    },
    fetchZoom(event) {
      this.zoomRow = event.row;
      this.isShowUser = true;
      console.log("this.zoomRow", this.zoomRow);
    },
    okZoom(event) {
      console.log("$event", event);
      this.dv.lisgroups.items[this.zoomRow].username = event.username;
      this.dv.lisgroups.items[this.zoomRow].name = event.name;
      this.dv.lisgroups.items[this.zoomRow].surname = event.surname;
      this.isShowUser = false;
    },
    // async init() {
    //   this.dv.lisUsersGroupsList = await this.lis.function("BAST07/02-init", this.dv);
    // },

    async pushNewItem(event) {
      console.log("pushNewItem", event);
      let myReturn = await this.lis.function("BAST07/pushNewItem", this.dv);
      this.dv.lisgroups.items.push(myReturn);
    },
  },

  // mounted() {
  //   this.init(this.dv);
  // },
};
</script>
