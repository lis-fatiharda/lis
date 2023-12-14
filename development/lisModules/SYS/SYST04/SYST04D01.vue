<template>
  
    <l-div v-if="dv.lisDialog == 'SYST04D01'">
      <!--Tittle Layer-->
      <l-card0>
        <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
          <l-icon size="md" name="assignment_ind" />

          <l-toolbar-title>{{
            this.$gl(`Sistem Numaratörleri`, `System Numberers`)
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

        <!--Searching Criterias Layer------>
        <div class="row q-pa-xs">
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
            dense
            
            :label="this.$gl(`Numaratör`, `Numerator`)"
            v-model="dv.sc.numRange"
          />
          <l-input
            dense
            
            :label="this.$gl(`Açıklama`, `Explanation`)"
            v-model="dv.sc.stext"
          />
          <l-checkbox
            :label="this.$gl(`Manuel Numaratör?`, `Manual Numerator?`)"
            v-model="dv.sc.isManuel"
          />
          <l-checkbox
            :label="
              this.$gl(
                `Entegratör Numaratörleri Getir`,
                `Bring Integrator Numberers`
              )
            "
            v-model="dv.sc.isIntegrator"
          />
        </div>

        <!--------------------------------->
      </l-card0>
      <!--Butons Layer Layer---------------------->

        <l-btn-group>
          <l-btn color="warning"  icon="search" @click="btnSearch(dv)" />
          <l-btn color="primary"  icon="edit" @click="btnEdit(dv)" />
          <l-btn color="info"  icon="visibility" @click="btnShow(dv)" />
          <l-btn color="secondary"  icon="add" @click="btnInsert(dv)" />
          <l-btn color="negative"  icon="delete" @click="btnDelete(dv)" />
        </l-btn-group>
      <!--Table Layer---------------------------->
      <q-markup-table flat bordered dense>
        <thead>
          <tr class="bg-blue-grey-2">
            <th class="text-left"></th>
            <th class="text-left">{{ this.$gl(`Numaratör`, `Numerator`) }}</th>
            <th class="text-left">{{ this.$gl(`Açıklama`, `Explanation`) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in dv.numRangeList"
            :key="item.id"
            @click="dv.selectedRow = item._id"
            :class="dv.selectedRow == item._id ? 'bg-light-blue-1' : 'bg-white'"
          >
            <td class="text-left">
              <l-chip dense :label="index + 1" rounded glossy />
            </td>
            <td class="text-left">{{ item.numrange }}</td>
            <td class="text-left">{{ item.stext }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </l-div>
    <SYST04D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'SYST04D02'" />

</template>

<script>
import SYST04D02 from "./SYST04D02.vue";

export default {
  props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
  components: {
    SYST04D02,
  },

  data() {
    return {
      dv: {
        sc: {
          numRange: "",
          company: "01",
          companyOpts: [],
          isIntegrator: false,
          stext: "",
          isManuel: false,
        },
        lisDialog: "SYST04D01",
        modi: 2,
        selectedRow: "",
        numRangeList: [],
        olisnumranges: {},
        partTypeOpts: [],
      },
    };
  },

  methods: {
    async btnSearch(prop) {
      this.dv = await this.lis.function("SYST04/01-btnSearch", prop);
    },
    async btnEdit(prop) {
      this.dv = await this.lis.function("SYST04/01-btnEdit", prop);
      this.tabInfo.blockGoToTransaction = true;
    },
    async btnShow(prop) {
      this.dv = await this.lis.function("SYST04/01-btnShow", prop);
      this.tabInfo.blockGoToTransaction = true;
    },
    async btnInsert(prop) {
      this.dv = await this.lis.function("SYST04/01-btnInsert", prop);
      this.tabInfo.blockGoToTransaction = true;
    },
    async btnDelete(prop) {
      this.dv = await this.lis.function("SYST04/01-btnDelete", prop);
    },
    async init(prop) {
      this.dv = await this.lis.function("SYST04/01-init", this.dv);
    },
  },

  mounted() {
    this.init(this.dv);
    console.log("mounted worked");
  },
};
</script>
