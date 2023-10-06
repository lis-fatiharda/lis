<template>
    <l-div v-if="dv.lisDialog == 'syst01d01'">
      <!--Tittle Layer-->

      <l-card0>
        <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
          <l-icon size="md" name="assignment_ind" />

          <l-toolbar-title>{{
            this.$gl("Lis Uygulama Nesneleri", "Lis Application Objects")
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

        <!--Searching Criterias Layer----row-1-->
        <l-div-flex>
          <l-input
            
            dense
            v-model="dv.sc.module"
            :label="this.$gl(`Modul`, `Module`)"
          />

          <l-input
            
            dense
            v-model="dv.sc.text"
            :label="this.$gl(`sctext`, `sctext`)"
          />
        </l-div-flex>
        <!--------------------------------row-2-->
        <!--------------------------------row-3-->
      </l-card0>
      <!--Butons Layer Layer---------------------->

          <l-btn color="warning"  icon="search" @click="btnSearch(dv)" />
          <l-btn color="primary"  icon="edit" @click="btnEdit(dv)" />
          <l-btn color="info"  icon="visibility" @click="btnShow(dv)" />
          <l-btn color="secondary"  icon="add" @click="btnInsert(dv)" />
          <l-btn color="negative"  icon="delete" @click="btnDelete(dv)" />
 

      <!--Table Layer---------------------------->
      <q-markup-table flat bordered dense>
        <thead>
          <tr class="bg-blue-grey-2">
            <th class="text-left">{{ this.$gl(`Seç`, `Select`) }}</th>
            <th class="text-left">{{ this.$gl("Modul", "Module") }}</th>
            <th class="text-left">
              {{ this.$gl("Modul Açıklaması", "Module Description") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in dv.lisappobjects"
            :key="item.id"
            @click="dv.selectedRow = item._id"
            :class="dv.selectedRow == item._id ? 'bg-light-blue-1' : 'bg-white'"
          >
            <td class="text-left">
              <l-chip dense :label="index + 1" rounded glossy />
            </td>
            <td class="text-left" :for="item.id" bordered>
              {{ item.module }}
            </td>
            <td class="text-left">{{ this.$gl(item.stext, item.stexte) }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </l-div>
    <SYST01D02
      :dv="dv"
      :tabInfo="tabInfo"
      v-if="dv.lisDialog == 'SYST01D02'"
    />
</template>

<script>
import SYST01D02 from "./SYST01D02.vue";

export default {
  props: ["tabInfo"],
  components: {
    SYST01D02,
  },

  data() {
    return {
      dv: {
        sc: {
          module: "",
          text: "",
        },

        lisDialog: "syst01d01",
        modi: 2,

        lisappobjects: [],
        selectedRow: "",
      },
    };
  },

  computed: {
    scmoduleIsValid() {
      return !!this.dv.sc.module;
    },
    sctextIsValid() {
      console.log("computed");
      console.log(this.dv.sc.text === "");
      return this.dv.sc.text === "";
    },
  },

  methods: {
    async btnSearch(prop) {
      this.dv = await this.lis.function("SYST01/01-btnSearch", prop);
      // await this.$Axios.post("SYST01/01-btnSearch", prop).then((res) => {
      //   this.dv = res.data;
      // });
      console.log(this.$lisEnv);
    },
    async btnEdit(prop) {
      this.dv = await this.lis.function("SYST01/01-btnEdit", prop);
      this.tabInfo.blockGoToTransaction = true;
      // await this.$Axios
      //   .post("SYST01/01-btnEdit", prop)
      //   .then((res) => {
      //     this.dv = res.data;
      //     this.tabInfo.blockGoToTransaction = true;
      //   })
      //   .catch((err) => {
      //     this.$q.notify({
      //       type: "negative",
      //       message: err.response.data,
      //       actions: [{ label: "X", color: "white", dense: true }],
      //     });
      //   });
    },
    async btnShow(prop) {
      this.dv = await this.lis.function("SYST01/01-btnShow", prop);
      this.tabInfo.blockGoToTransaction = true;
      // await this.$Axios.post("SYST01/01-btnShow", prop).then((res) => {
      //   this.dv = res.data;
      //   this.tabInfo.blockGoToTransaction = true;
      // });
    },
    async btnInsert(prop) {
      this.dv = await this.lis.function("SYST01/01-btnInsert", prop);
      this.tabInfo.blockGoToTransaction = true;
      // await this.$Axios.post("SYST01/01-btnInsert", prop).then((res) => {
      //   this.dv = res.data;
      //   this.tabInfo.blockGoToTransaction = true;
      // });
    },
    async btnDelete(prop) {
      this.dv = await this.lis.function("SYST01/01-btnDelete", prop);
      // await this.$Axios.post("SYST01/01-btnDelete", prop).then((res) => {
      //   this.dv = res.data;
      // });
    },
    async init(prop) {
      this.dv = await this.lis.function("SYST01/01-init", prop);
      // await this.$Axios
      //   .post("SYST01/01-init", prop)
      //   .then((res) => {
      //     this.dv = res.data;
      //   })
      //   .catch(function (err) {
      //     console.log(err);
      //   });
    },
  },
  mounted() {
    this.init(this.dv);
    console.log("mounted worked");
  },
};
</script>
