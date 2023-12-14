<template>
  <l-div>
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="account_tree" />

        <l-toolbar-title>{{
          this.$gl("Onay Detay Ekranı", "Confirmation Detail Screen")
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

      <l-card style="width: 100%; min-width: 100px">
        <l-card-section class="q-gutter-xs">
          <div>
            {{ this.$gl("İş Emri Bilgileri", "Work Order Information") }}
          </div>

          <div class="row q-gutter-xs">
            <l-input
              :label="this.$gl(`Firma`, `Company`)"
              v-model="dv.lisprddocs.company"
              width="120px"
              readonly
            />
            <l-input
              :label="this.$gl(`Tesis`, `Plant`)"
              v-model="dv.lisprddocs.plant"
              width="120px"
              readonly
            />
            <l-input
              :label="this.$gl(`Tipi`, `Type`)"
              v-model="dv.lisprddocs.doctype"
              width="150px"
              readonly
            />
            <l-input
              v-model="dv.lisprddocs.docnum"
              :label="this.$gl(`No`, `No`)"
              dense
              style="width: 150px"
              readonly
            />

            <l-datetime
              :label="this.$gl(`İş Emri Tarihi`, `Work Order Date`)"
              v-model="dv.lisprddocs.docdate"
              style="width: 160px"
            />

            <l-checkbox
              v-model="dv.lisprddocs._deleted"
              label="Sil"
              color="pink"
            />
          </div>
          <br />
          <l-separator inset />
          <br />
          <div class="row q-gutter-xs">
            {{ this.$gl("Operasyon Bilgileri", "Operation Information") }}
          </div>
          <div class="row q-gutter-xs">
            <l-input
              v-model="dv.lisprddocs.operations.operation"
              :label="this.$gl(`Opr.No`, `Opr.No`)"
              dense
              style="width: 150px"
              readonly
            />
            <l-input
              v-model="dv.lisprddocs.operations.confirmation"
              :label="this.$gl(`Onay No`, `Confirmation`)"
              dense
              style="width: 150px"
              readonly
            />

            <l-input
              v-model="dv.lisprddocs.operations.oprcontrol"
              :label="
                this.$gl(`Operasyon Kontrol Tipi`, `Operation Control Type`)
              "
              dense
              style="width: 150px"
              readonly
            />
            <l-input
              v-model="dv.lisprddocs.operations.workcenter"
              :label="this.$gl(`İş Merkezi`, `Work Center`)"
              dense
              style="width: 150px"
              readonly
            />
            <l-input
              v-model="dv.lisprddocs.operations.costcenter"
              :label="this.$gl(`Maliyet Merkezi`, `Cost Center`)"
              dense
              style="width: 150px"
              readonly
            />
            <l-input
              v-model="dv.lisprddocs.operations.capgrp"
              :label="
                this.$gl(`İş Mer. Kap. Grubu`, `Work Center Capacity Group`)
              "
              dense
              style="width: 150px"
              readonly
            />
            <l-input
              v-model="dv.lisprddocs.operations.stext"
              :label="this.$gl(`Açıklama`, `Description`)"
              dense
              style="width: 300px"
            />
          </div>
        </l-card-section>
      </l-card>

      <l-card>
        <l-tabs v-model="tab">
          <l-tab
            name="Üretilenler"
            :label="this.$gl(`Üretilenler`, `Produced`)"
          />
          <l-tab
            name="Tüketilenler"
            :label="this.$gl(`Tüketilenler`, `Consumed`)"
          />
          <l-tab
            name="Aktiviteler"
            :label="this.$gl(`Aktiviteler`, `Activities`)"
          />
          <l-tab name="Araçlar" :label="this.$gl(`Araçlar`, `Tools`)" />
        </l-tabs>

        <l-tab-panels v-model="tab" animated>
          <l-tab-panel name="Üretilenler">
            <PRDT02D04 :dv="dv" :tabInfo="tabInfo" />
          </l-tab-panel>

          <l-tab-panel name="Tüketilenler">
            <PRDT02D05 :dv="dv" :tabInfo="tabInfo" />
          </l-tab-panel>

          <l-tab-panel name="Aktiviteler">
            <PRDT02D08 :dv="dv" :tabInfo="tabInfo" />
          </l-tab-panel>

          <l-tab-panel name="Araçlar">
            <PRDT02D07 :dv="dv" :tabInfo="tabInfo" />
          </l-tab-panel>
        </l-tab-panels>
      </l-card>
    </l-card0>
  </l-div>
</template> 

<script>
// import PRDT01D03 from "./PRDT01D03.vue";
import PRDT02D04 from "./PRDT02D04.vue";
import PRDT02D05 from "./PRDT02D05.vue";
// import PRDT01D06 from "./PRDT01D06.vue";
import PRDT02D07 from "./PRDT02D07.vue";
// import PRDT01D08 from "./PRDT01D08.vue";
// import PRDT01D09 from "./PRDT01D09.vue";
// import PRDT01D10 from "./PRDT01D10.vue";

export default {
  props: ["dv", "tabInfo"],
  components: {
    // PRDT01D03,
    PRDT02D04,
    PRDT02D05,
    // PRDT01D06,
    PRDT02D07,
    // PRDT01D08,
    // PRDT01D09,
    // PRDT01D10,
  },
  data() {
    return { isSelectMat: false, tab: "Üretilenler" };
  },
  //
  methods: {
    async btnSave() {
      console.log("btnSave çalıştı");
      await this.lis.function("PRDT02/02-btnSave", this.dv);
      this.cancel();
    },
    cancel() {
      this.tabInfo.blockGoToTransaction = false;
      this.dv.lisDialog = "PRDT02D01";
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

function data() { new Error('Function not implemented.'); }
