<template>
  <l-div>
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="account_balance" />

        <l-toolbar-title>{{
          this.$gl("Muhasebe Belgesi Detayı", "Accounting Slips Details")
        }}</l-toolbar-title>

        <div class="q-gutter-xs">
          <l-btn
            v-if="modi != 2"
            icon="print"
            color="primary"
            @click="btnPrint()"
          />

          <l-btn
            v-if="modi != 2"
            icon="save"
            color="teal"
            @click="btnSave()"
          />

          <l-btn v-if="isChild02 == undefined" icon="cancel" color="negative" @click="this.cancel()" />
          <l-btn v-if="isChild02 != undefined" icon="cancel" color="negative" @click="this.cancel03()" />
        </div>
      </l-toolbar>
      <l-div-flex>
        <l-select
          :label="this.$gl(`Firma`, `Company`)"
          v-model="lisfindoc.company"
          options="lisbas001"
          optValue="company"
          optTitle="stext"
          optCaptions="company"
          width="120px"
          class="bg-blue-1"
          :readonly="modi == 0 ? false : true"
        />
        <l-select
          :label="this.$gl(`İş Alanı`, `Business Area`)"
          v-model="lisfindoc.busarea"
          options="lisbas003"
          optValue="busarea"
          optTitle="stext"
          optCaptions="busarea"
          width="120px"
          class="bg-blue-1"
          :readonly="modi == 0 ? false : true"
        />
        <l-select
          :label="this.$gl(`Belge Tipi`, `Document Type`)"
          v-model="lisfindoc.doctype"
          options="lisfin003"
          optValue="doctype"
          optTitle="stext"
          optCaptions="doctype"
          @select="this.setDocChar()"
        />
        <l-input
          :label="this.$gl(`Belge No`, `Document No`)"
          v-model="lisfindoc.docnum"
          readonly
        ></l-input>

        <!-- destektablo SORULACAK -->
        <l-select
          :label="this.$gl(`Muh. Stndr.`, `Acc. Stndr`)"
          v-model="lisfindoc.accstd"
          options="lisfin001"
          optValue="accstd"
          optTitle="stext"
          optCaptions="accstd"
          width="120px"
          class="bg-blue-1"
          :readonly="modi == 0 ? false : true"
        />
        <l-date
          :label="this.$gl(`Yevmiye Tarihi`, `Post Date`)"
          v-model="lisfindoc.postdate"
          style="width: 150px"
        />
        <l-date
          :label="this.$gl(`Belge Tarihi`, `Document Date`)"
          v-model="lisfindoc.docdate"
          style="width: 150px"
        />
        <l-select
          :label="this.$gl(`Onay`, `Confirm`)"
          :readonly="true"
          map-options
          v-model="lisfindoc.issignature"
          :options="[
            { value: 0, label: this.$gl(`Yok`, `No`) },
            { value: 1, label: this.$gl(`Eksik`, `Missing`) },
            { value: 2, label: this.$gl(`Tamam`, `OK`) },
          ]"
          optValue="value"
          optTitle="label"
          style="width: 153px"
        />

        <l-checkbox
          :label="this.$gl(`Silindi`, `Deleted`)"
          v-model="lisfindoc._deleted"
          color="pink"
        />
      </l-div-flex>
      <l-div>
        <l-input
          :label="this.$gl(`Hesap Açıklaması`, `Account Description`)"
          v-model="lisfindoc.stext"
        ></l-input>
      </l-div>
    </l-card0>

    <l-card>
      <l-tabs v-model="tab">
        <l-tab name="Kalemler" :label="this.$gl(`Kalemler`, `Items`)" />
        <l-tab name="Detaylar" :label="this.$gl(`Detaylar`, `Details`)" />
        <l-tab name="Notlar" :label="this.$gl(`Notlar`, `Notes`)" />
        <l-tab name="Eklenenler" :label="this.$gl(`Eklenenler`, `Added`)" />
      </l-tabs>

      <l-tab-panels v-model="tab" animated>
        <l-tab-panel name="Kalemler" style="padding: 0">
          <FINT02D05 :lisfindoc="lisfindoc" :postKeyList="postKeyList" :tabInfo="tabInfo" />
          <FINT02D03 v-if="lisfindoc.items?.length > 0" :lisfindoc="lisfindoc" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Detaylar" style="padding: 0">
          <FINT02D04 :lisfindoc="lisfindoc" :modi="modi" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Notlar" class="q-gutter-xs">
          <FINT02D10 :lisfindoc="lisfindoc" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Eklenenler" class="q-gutter-xs">
          <FINT02D11 :lisfindoc="lisfindoc" :modi="modi" :tabInfo="tabInfo" />
        </l-tab-panel>
      </l-tab-panels>
    </l-card>
  </l-div>
</template>

<script>
import FINT02D03 from "./FINT02D03.vue";
import FINT02D04 from "./FINT02D04.vue";
import FINT02D05 from "./FINT02D05.vue";

import FINT02D10 from "./FINT02D10.vue";
import FINT02D11 from "./FINT02D11.vue";

export default {
  props: ["dv", "tabInfo", "pCompany", "pDoctype", "pDocnum", "modi","isChild02"],
  components: {
    FINT02D03,
    FINT02D04,
    FINT02D05,
    FINT02D10,
    FINT02D11,
  },
  data() {
    return {
      tab: "Kalemler",
      lisfindoc: {},
      postKeyList: [],
    };
  },

  methods: {
    async setDocChar() {
      let olisfin003 = await this.lis.function("FINT02/02-setDocChar", this.lisfindoc);
      this.postKeyList = olisfin003.postkeys;

      if (this.modi == 0) {
        if (olisfin003.signprotocol == 0) {
          this.lisfindoc.issignature = 0;
        } else {
          this.lisfindoc.issignature = 1;
        }
      }
    },

    async btnSave() {
      await this.lis.function("FINT02/02-btnSave", {
                lisfindoc: this.lisfindoc,
                modi: this.modi,
            });
      this.cancel();
    },
    cancel() {
      this.tabInfo.blockGoToTransaction = false;
      this.dv.lisDialog = "FINT02D01";
    },
    cancel03() {
      this.$emit("cancel", false);
    },
  },
  async mounted() {
    this.tabInfo.blockGoToTransaction = true;
    this.lisfindoc = await this.lis.function("FINT02/02-init", {
            company: this.pCompany,
            doctype: this.pDoctype,
            docnum: this.pDocnum,
            modi: this.modi,
        });
    
  },
  async beforeUnmount() {
    await this.lis.function("cls-system.unlock", {
      company: this.lisfindoc.company,
      lid: "FINT02",
      lockkey: this.lisfindoc.doctype + this.lisfindoc.docnum,
    });
  },
};
</script>
