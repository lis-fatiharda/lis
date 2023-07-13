<template>
  <l-div>
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.modulecolor}`">
        <l-icon size="md" name="account_balance" />

        <l-toolbar-tittle>{{ this.$gl("Çek/Senet") }}</l-toolbar-tittle>

        <l-btn
          icon="cancel"
          flat
          round
          color="negative"
          @click="this.$btnGoHome(tabInfo)"
        />
      </l-toolbar>

      <l-tabs v-model="tab">
        <l-tab name="Sorgula" :label="this.$gl(`Sorgula`)" />
        <l-tab name="Sorgula +" :label="this.$gl(`Sorgula`)" />
        <l-tab name="Opsiyonlar" :label="this.$gl(`Opsiyonlar`)" />
      </l-tabs>

      <l-tab-panels v-model="tab" animated>
        <l-tab-panel name="Sorgula" class="row q-pa-xs q-gutter-xs">
          <l-select
            :label="this.$gl(`Firma`)"
            v-model="dv.sc.company"
            options="lisbas001"
            optValue="company"
            optTittle="stext"
            optCaptions="company"
            width="120px"
            class="bg-blue-1"
          />

          <l-input
            :label="this.$gl('Harici Belg. No')"
            v-model="dv.sc.checknumber"
            class="bg-amber-1"
          />

        </l-tab-panel>

        <l-tab-panel name="Sorgula +" class="row q-pa-xs q-gutter-xs">
        </l-tab-panel>

        <l-tab-panel name="Opsiyonlar" class="row q-pa-xs q-gutter-xs">
        </l-tab-panel>
      </l-tab-panels>
    </l-card0>

    <!--Searching Criterias Layer------>

    <!--------------------------------->

    <!--Butons Layer Layer---------------------->

    <l-btn-group>
      <l-btn color="primary" icon="search" @click="btnSearch(dv)" />
    </l-btn-group>

    <l-table
      name="FINT07D01"
      :tableData="dv.reportList"
      :columns="columns"
      :context="contextMenu"
      :width="'100%'"
      :readonly="true"
    />

    <FINT01D01mini
      :pComp="dv.sc.company"
      :isShow="zoomMaterialRow == null ? false : true"
      @ok="
        lis.objectMove($event, dv.lissaldocs.items[zoomMaterialRow]);
        dv.lissaldocs.items[zoomMaterialRow].material = $event.material;
        dv.lissaldocs.items[zoomMaterialRow].mtext = $event.stext;
        dv.lissaldocs.items[zoomMaterialRow].itemtype = $event.salitemtype;
        dv.lissaldocs.items[zoomMaterialRow].qunit = $event.salunit;
        dv.lissaldocs.items[zoomMaterialRow].vatrate = $event.salvatkey;
        zoomMaterialRow = null;
        calcPrice();
      "
      @cancel="zoomMaterialRow = null"
    />
  </l-div>
</template>

<script>
export default {
  props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
  components: {},

  data() {
    return {
      tab: "Sorgula",
      dv: {
        sc: {
          company: "01",
          checknumber: "",
        },

        tbalance: 0,

        reportList: [],
      },
      columns: [
        {
          label: this.$gl(`Tipi`),
          value: "account",
          type: "string",
        },
        {
          label: this.$gl('Yevm. Tarihi'),
          value: "postdate",
          type: "string",
        },
        {
          label: this.$gl('Vade Tarihi'),
          value: "postdate",
          type: "string",
        },
        {
          label: this.$gl("Tutar"),
          value: "ddebit",
          type: "number",
        },
        {
          label: this.$gl("B.P.Br."),
          value: "currency",
          type: "string",
        },
      ],
    };
  },

  methods: {
    async btnSearch(prop) {
      this.dv = await this.lis.function("FINT07/01-btnSearch", prop);
    },
  },

  mounted() {},
};
</script>
