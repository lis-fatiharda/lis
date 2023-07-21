<template>
  <l-div>
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="account_tree" />

        <l-toolbar-title>{{
          this.$gl("Ürün Ağacı Detay Ekranı", "BOM Detail Screen")
        }}</l-toolbar-title>

        <div class="q-gutter-xs">
          <l-btn
            v-if="dv.modi != 2"
            icon="print"
            color="primary"
            @click="btnPrint()"
          />

          <l-btn
            v-if="dv.modi != 2"
            icon="save"
            color="teal"
            @click="btnSave()"
          />

          <l-btn icon="cancel" color="negative" @click="this.cancel()" />
        </div>
      </l-toolbar>

      <div class="row q-pa-xs q-gutter-xs">
        <l-select
          :label="this.$gl(`Firma`, `Company`)"
          v-model="dv.lisbomdocs.company"
          options="lisbas001"
          optValue="company"
          optTitle="stext"
          optCaptions="company"
          width="120px"
        />
        <l-select
          :label="this.$gl(`Tesis`, `Plant`)"
          v-model="dv.lisbomdocs.plant"
          options="lisbas002"
          optValue="plant"
          optTitle="stext"
          optCaptions="plant"
          width="120px"
        />
        <l-select
          :label="this.$gl(`Tipi`, `Type`)"
          v-model="dv.lisbomdocs.doctype"
          options="lisbom002"
          optValue="type"
          optTitle="stext"
          optCaptions="type"
          width="150px"
        />
        <l-input
          v-model="dv.lisbomdocs.docnum"
          :label="this.$gl(`No`, `No`)"
          dense
          style="width: 150px"
          readonly
        />

        <!-- <l-input :label="this.$gl(`Malzeme Kodu`, `Material`)" v-model="dv.lisbomdocs.prods[0].material">
                    <l-chip class="bg-white" icon="search" dense clickable @click="isSelectMat = !isSelectMat">
                        <BAST03D01mini :pComp="dv.sc.company" :isShow="isSelectMat" @ok="
                            dv.lisbomdocs.prods[0].material = $event.material;
                        isSelectMat = false;
                        " @cancel="isSelectMat = false" />
                    </l-chip>
                </l-input>
                <l-input
                    v-model="dv.lisbomdocs.prods[0].quantity"
                    :label="this.$gl(`Miktar`, `Quantity`)"
                    dense
                    style="width: 150px"
                    
                />
               
                <l-select
                   :label="this.$gl(`Birim`, `Unit`)"
                   v-model="dv.lisbomdocs.prods[0].qunit"
                   options="lisbas007"
                   optValue="unit"
                   optTitle="stext"
                   optCaptions="unit"
                   :optFilter="{ unittype: 0 }"
                   width="135px"
                    />
                <l-select
                   :label="this.$gl(`Depo`, `Warehouse`)"
                   v-model="dv.lisbomdocs.prods[0].warehouse"
                   options="lisinv003"
                   optValue="warehouse"
                   optTitle="stext"
                   optCaptions="warehouse"
                   width="150px"
                 />

                 <l-select
                   :label="this.$gl(`Stok Yeri`, `Stockplace`)"
                   v-model="dv.lisbomdocs.prods[0].stockplace"
                   options="lisinv004"
                   optValue="stockplace"
                   optTitle="stext"
                   optCaptions="stockplace"
                   width="150px"
                 /> 
                 <l-input
                    v-model="dv.lisbomdocs.prods[0].stext"
                    :label="this.$gl(`Açıklama`, `Description`)"
                    dense
                    style="width: 245px"
                    
                />-->
        <l-input
          v-model="dv.lisbomdocs.alternum"
          :label="this.$gl(`Alternatif No`, `Alternative No`)"
          dense
          style="width: 150px"
        />
        <l-datetime
          :label="this.$gl(`İş Emri Tarihi`, `Work Order Date`)"
          v-model="dv.lisbomdocs.docdate"
          style="width: 160px"
        />

        <l-checkbox v-model="dv.lisbomdocs._deleted" label="Sil" color="pink" />
      </div>
      <l-card>
        <l-tabs v-model="tab">
          <l-tab name="Genel" :label="this.$gl(`Genel`, `General`)" />
          <l-tab
            name="Üretilenler"
            :label="this.$gl(`Üretilenler`, `Produced`)"
          />
          <l-tab
            name="Tüketilenler"
            :label="this.$gl(`Tüketilenler`, `Consumed`)"
          />
          <l-tab
            name="Operasyonlar"
            :label="this.$gl(`Operasyonlar`, `Operations`)"
          />
          <l-tab name="Araçlar" :label="this.$gl(`Araçlar`, `Tools`)" />

          <l-tab
            name="Maliyetlendirme"
            :label="this.$gl(`Maliyetlendirme`, `Costing`)"
          />
          <l-tab name="Notlar" :label="this.$gl(`Notlar`, `Notes`)" />
          <l-tab name="Eklenenler" :label="this.$gl(`Eklenenler`, `Added`)" />
        </l-tabs>

        <l-tab-panels v-model="tab" animated>
          <l-tab-panel name="Genel">
            <BOMT01D03 :dv="dv" :tabInfo="tabInfo" />
          </l-tab-panel>
          <l-tab-panel name="Üretilenler">
            <BOMT01D04 :dv="dv" :tabInfo="tabInfo" />
          </l-tab-panel>

          <l-tab-panel name="Tüketilenler">
            <BOMT01D05 :dv="dv" :tabInfo="tabInfo" />
          </l-tab-panel>

          <l-tab-panel name="Operasyonlar">
            <BOMT01D06 :dv="dv" :tabInfo="tabInfo" />
          </l-tab-panel>

          <l-tab-panel name="Araçlar">
            <BOMT01D07 :dv="dv" :tabInfo="tabInfo" />
          </l-tab-panel>

          <l-tab-panel name="Maliyetlendirme" class="row" style="padding: 0">
            <BOMT01D08 :dv="dv" :tabInfo="tabInfo" />
          </l-tab-panel>

          <l-tab-panel name="Notlar">
            <BOMT01D09 :dv="dv" :tabInfo="tabInfo" />
          </l-tab-panel>

          <l-tab-panel name="Eklenenler">
            <BOMT01D10 :dv="dv" :tabInfo="tabInfo" />
          </l-tab-panel>
        </l-tab-panels>
      </l-card>
    </l-card0>
  </l-div>
</template>

<script>
import BOMT01D03 from "./BOMT01D03.vue";
import BOMT01D04 from "./BOMT01D04.vue";
import BOMT01D05 from "./BOMT01D05.vue";
import BOMT01D06 from "./BOMT01D06.vue";
import BOMT01D07 from "./BOMT01D07.vue";
import BOMT01D08 from "./BOMT01D08.vue";
import BOMT01D09 from "./BOMT01D09.vue";
import BOMT01D10 from "./BOMT01D10.vue";

export default {
  props: ["dv", "tabInfo"],
  components: {
    BOMT01D03,
    BOMT01D04,
    BOMT01D05,
    BOMT01D06,
    BOMT01D07,
    BOMT01D08,
    BOMT01D09,
    BOMT01D10,
  },
  data() {
    return { isSelectMat: false, tab: "Genel" };
  },
  //
  methods: {
    async btnSave() {
      console.log("btnSave çalıştı");
      await this.lis.function("BOMT01/02-btnSave", this.dv);
      this.cancel();
    },
    cancel() {
      this.tabInfo.blockGoToTransaction = false;
      this.dv.lisDialog = "BOMT01D01";
    },
  },
  async mounted() {
    this.tabInfo.blockGoToTransaction = true;
  },
  async beforeUnmount() {
    if (this.dv.modi != 2) {
      await this.lis.function("cls-system.unlock", this.dv.lockKeyParams);
    }
  },
};
</script>

function data() { throw new Error('Function not implemented.'); }
