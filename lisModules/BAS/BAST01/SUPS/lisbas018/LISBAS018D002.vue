<template>
  <l-div v-if="mv.lisDialog == 'LISBAS018D002'">
    <!--Tittle Layer-->
    <l-card>
      <q-bar class="bg-blue-grey-3"> Destek Tablosu - lisbas018 </q-bar>
      <q-bar :class="`bg-${tabInfo.moduleColor}`">
        <l-toolbar-title>{{
          this.$gl("Malzeme Seçenekleri", "Material Options")
        }}</l-toolbar-title>
        <l-btn
          v-if="mv.modi != 2"
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
    </l-card>
    <l-card>
      <l-card-section horizontal>
        <l-div-flex>
          <l-select
            :label="this.$gl(`Firma`, `Company`)"
            v-model="mv.lisbas018.company"
            options="lisbas001"
            optValue="company"
            optTitle="stext"
            optCaptions="company"
            width="120px"
          />
          <l-input
            :label="this.$gl(`Özellik`, `Attribute`)"
            dense
            v-model="mv.lisbas018.attribute"
          ></l-input>
          <l-select
            v-model="mv.lisbas018.type"
            :label="this.$gl(`Tip`, `Type`)"
            :options="[
              { label: this.$gl(`Manuel`, `Manuel`), value: 0 },
              { label: this.$gl(`Seçenek`, `Options`), value: 1 },
            ]"
            optValue="value"
            map-options
            style="width: 200px"
            @select="options($event)"
          />
          <l-input
            v-if="!showTable"
            :label="this.$gl(`Min Değer`, `Min Value`)"
            dense
            type="number"
            v-model="mv.lisbas018.minvalue"
          ></l-input>
          <l-input
            v-if="!showTable"
            :label="this.$gl(`Max Değer`, `Max Value`)"
            dense
            type="number"
            v-model="mv.lisbas018.maxvalue"
          ></l-input>
          <l-select
            v-if="!showTable"
            :label="this.$gl(`Birim`, `Unit`)"
            v-model="mv.lisbas018.qunit"
            options="lisbas007"
            optValue="unit"
            optTitle="stext"
            optCaptions="unit"
            :optFilter="{ unittype: 0 }"
            width="200px"
          />
        </l-div-flex>
      </l-card-section>
    </l-card>
    <!--Searching Criterias Layer-->
    <l-table
      v-if="showTable"
      name="LISBAS018D002"
      v-model="mv.lisbas018.options"
      :columns="myColumnsbas18options"
      :context="contextMenu"
      @keydown="if ($event.key == 'Insert') this.pushNewItem($event);"
    />
  </l-div>
</template>

<script>
export default {
  props: ["lv", "dv", "goToTransaction", "currentTab", "tabInfo", "mv"],
  components: {},

  data() {
    return {
      showTable: false,
      contextMenu: [
        {
          name: "Satır Ekle",
          callback: async () => {
            this.pushNewItem();
          },
        },
      ],

      myColumnsbas18options: [
        {
          label: this.$gl("Değer", "Value"),
          type: "string",
          value: "value",
        },
        // {
        //   label: this.$gl("Özellik Kodu", "Proporties Code"),
        //   type: "string",
        //   value: "attribute",
        // },
      ],
    };
  },

  methods: {
    async btnSave() {
      await this.lis.function("BAST01/SUPS/lisbas018/02-btnSave", this.mv);
      this.cancel();
    },
    async cancel() {
      this.mv.lisDialog = "LISBAS018";
    },

    async pushNewItem(event) {
      console.log("pushNewItem", event);
      let myReturn = await this.lis.function(
        "BAST01/SUPS/lisbas018/pushNewItem",
        this.mv
      );
      this.mv.lisbas018.options.push(myReturn);
    },
    options(event) {
      console.log("event", event);
      if (event == 0) {
        this.showTable = false;
        //this.mv.lisbas018.options = [];
      } else {
        this.showTable = true;
      }
    },
  },

  mounted() {
    if (this.mv.lisbas018.type == 1) {
      this.showTable = true;
    }
  },
};
</script>
