<template>
    <l-div v-if="dv.lisDialog == 'SYST05D01'">
      <!--Tittle Layer-->
      <l-card0>
        <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
          <l-icon size="md" name="assignment_ind" />

          <l-toolbar-title>{{
            this.$gl(`Sistem Blokeleri`, `System Blocks`)
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
        </l-div-flex>
        <!--------------------------------->
      </l-card0>
      <!--Butons Layer Layer---------------------->

        <l-btn-group>
          <l-btn color="warning"  icon="search" @click="btnSearch(dv)" />
        </l-btn-group>
      <!--Table Layer---------------------------->
      <q-markup-table flat bordered dense>
        <thead>
          <tr class="bg-blue-grey-2">
            <th class="text-left">{{ this.$gl(`Seç`, `Select`) }}</th>
            <th class="text-left">
              {{ this.$gl(`Firma Kodu`, `Company Code`) }}
            </th>
            <th class="text-left">{{ this.$gl(`ID`, `ID`) }}</th>
            <th class="text-left">
              {{ this.$gl(`Kilit Anahtarı`, `Lock Key`) }}
            </th>
            <th class="text-left">{{ this.$gl(`Kilitleyen`, `Locking`) }}</th>
            <th class="text-left">
              {{ this.$gl(`Kilitlenme Tarihi`, `Deadlock Date`) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dv.lislocks" :key="item.id">
            <td class="text-left">
              <l-btn
                dense
                push
                color="negative"
                icon="clear"
                rounded
                unelevated
                
                @click="btnDelete(item)"
              />
            </td>
            <td class="text-left">{{ item.company }}</td>
            <td class="text-left">{{ item.lid }}</td>
            <td class="text-left">{{ item.lockkey }}</td>
            <td class="text-left">{{ item.createdby }}</td>
            <td class="text-left">{{ item.createdat }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </l-div>
</template>

<script>
export default {
  props: ["lv", "goToTransaction", "currentTab", "tabInfo"],

  data() {
    return {
      dv: {
        sc: {
          company: "01",
          companyOpts: [],
        },
        lisDialog: "SYST05D01",
        modi: 2,
        selectedRow: "",
        reportList: [],
        lislocks: [],
      },
    };
  },

  methods: {
    async btnSearch(prop) {
      this.dv = await this.lis.function("SYST05/01-btnSearch", prop);
    },
    async btnDelete(prop) {
      await this.lis.function("SYST05/01-btnDelete", prop);
      this.btnSearch(this.dv);
    },
  },

  mounted() {
    this.btnSearch(this.dv);
    console.log("mounted worked");
  },
};
</script>
