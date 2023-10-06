<template>
  <l-div>
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="account_balance" />

        <l-toolbar-title>{{ this.$gl("Hesap", "Account") }}</l-toolbar-title>

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
      <l-div-flex>
        <l-select
          :label="this.$gl(`Firma`, `Company`)"
          v-model="dv.sc.company"
          options="lisbas001"
          optValue="company"
          optTitle="stext"
          optCaptions="company"
          width="120px"
          class="bg-blue-1"
        />

        <l-select
          :label="this.$gl(`Hesap Tipi`, `Account Type`)"
          v-model="dv.lisaccounts.acctype"
          options="lisfin004"
          optValue="acctype"
          optTitle="stext"
          optCaptions="acctype"
          width="130px"
          :readonly="dv.modi == 0 ? false : true"
        />
        <l-input
          :label="this.$gl(`Hesap No`, `Account No`)"
          v-model="dv.lisaccounts.account"
          :mask="dv.lisaccounts.acctype == 'G' ? '###.##.###' : false"
          :readonly="dv.modi == 0 ? false : true"
        ></l-input>
        <!-- destektablo SORULACAK -->
        <l-select
          :label="this.$gl(`Muh. Std.`, `Acc. Std.`)"
          v-model="dv.lisaccounts.accstd"
          options="lisfin001"
          optValue="accstd"
          optTitle="stext"
          optCaptions="accstd"
          width="120px"
          :readonly="dv.modi == 0 ? false : true"
        />
        <l-input
          :label="this.$gl(`Hesap Açk.`, `Account Descr.`)"
          v-model="dv.lisaccounts.stext"
          style="width: 300px"
        ></l-input>
        <l-input
          :label="this.$gl(`T.D Hesap`, `Uniform Account`)"
          v-model="dv.lisaccounts.glaccount"
        ></l-input>
        <l-select
          :label="this.$gl(`P.Br.`, `Currency`)"
          v-model="dv.lisaccounts.currency"
          options="lisbas007"
          optValue="unit"
          optTitle="stext"
          optCaptions="unit"
          :optFilter="{ unittype: 1 }"
          width="140px"
        />
        <l-select
          dense
          v-model="dv.lisaccounts.exchmethod"
          :label="this.$gl(`Kur Metodu`, `Curr. Method`)"
          :options="[
            { label: this.$gl(`Alış`, `Buying`), value: 0 },
            { label: this.$gl(`Satış`, `Sales`), value: 1 },
            { label: this.$gl(`Ef. Alış`, `Ef.Buying`), value: 2 },
            { label: this.$gl(`Ef. Satış`, `Ef.Sales`), value: 3 },
          ]"
          map-options
          emit-value
          optValue="value"
          optTitle="label"
          style="width: 180px"
        />
        <l-input
          :label="this.$gl(`Hesap Sınıfı`, `Account Class`)"
          v-model="dv.lisaccounts.accclass"
          style="width: 150px"
        ></l-input>

        <l-select
          :label="this.$gl(`Hesap Grubu`, `Account Group`)"
          v-model="dv.lisaccounts.accgrp"
          options="lisfin005"
          optValue="group"
          optTitle="stext"
          optCaptions="group"
          width="150px"
        />

        <l-select
          :label="this.$gl(`Hesap Seviyesi`, `Account Level`)"
          map-options
          v-model="dv.lisaccounts.acclevel"
          :options="[
            { label: this.$gl(`Ana Hesap`, `Main Acc.`), value: 0 },
            {
              label: this.$gl(`Üst Hesap`, `Group Acc.`),
              value: 1,
            },
            {
              label: this.$gl(`Güncellenebilir Hesap`, `Direct Acc.`),
              value: 2,
            },
            { label: this.$gl(`Tümü`, `All`), value: 99 },
          ]"
          optValue="value"
          optTitle="label"
          style="width: 250px"
        />

        <l-checkbox
          :label="this.$gl(`Silindi`, `Deleted`)"
          v-model="dv.lisaccounts._deleted"
          color="pink"
        />
      </l-div-flex>
    </l-card0>
    <l-card style="width: 50%; min-width: 350px">
      
        <div class="text-overline q-pa-xs">
          {{ this.$gl("Genel", "General") }}
        </div>
      <l-separator inset />

      <l-card-section>
        <l-div-flex>
          <l-input
            :label="this.$gl(`Proje`, `Project`)"
            dense
            v-model="dv.lisaccounts.project"
            style="width: 200px"
          />
          <l-select
            v-model="dv.lisaccounts.isproject"
            :label="this.$gl(`Proje Girişi`, `Project Entry`)"
            :options="[
              { label: this.$gl(`Serbest`, `Free`), value: 0 },
              {
                label: this.$gl(`Zorunlu`, `Compulsory`),
                value: 1,
              },
              {
                label: this.$gl(`Boş Bırakılmalı`, `Should be left blank`),
                value: 2,
              },
            ]"
            optValue="value"
            optTitle="label"
            map-options
            style="width: 230px"
          />
        </l-div-flex>
      </l-card-section>
      <l-card-section>
        <l-div-flex>
          <l-input
            :label="this.$gl(`Maliyet Merkezi`, `Cost Center`)"
            v-model="dv.lisaccounts.costcenter"
            style="width: 200px"
          />
          <l-select
            v-model="dv.lisaccounts.iscostcenter"
            :label="this.$gl(`Malyt. Merk. Gir.`, `Cost Cent. Ent.`)"
            :options="[
              { label: this.$gl(`Serbest`, `Free`), value: 0 },
              {
                label: this.$gl(`Zorunlu`, `Compulsory`),
                value: 1,
              },
              {
                label: this.$gl(`Boş Bırakılmalı`, `Should be left blank`),
                value: 2,
              },
            ]"
            optValue="value"
            optTitle="label"
            map-options
            style="width: 230px"
          />
        </l-div-flex>
      </l-card-section>
      <l-card-section class="q-gutter-xs">
        <div class="row q-gutter-xs">
          <l-input
            :label="this.$gl(`Maliyet Objesi`, `Cost Object`)"
            v-model="dv.lisaccounts.costobject"
            style="width: 200px"
          />
          <l-select
            v-model="dv.lisaccounts.iscostobject"
            :label="this.$gl(`Maliyet Objesi Girişi`, `Cost Object Entry`)"
            :options="[
              { label: this.$gl(`Serbest`, `Free`), value: 0 },
              {
                label: this.$gl(`Zorunlu`, `Compulsory`),
                value: 1,
              },
              {
                label: this.$gl(`Boş Bırakılmalı`, `Should be left blank`),
                value: 2,
              },
            ]"
            optValue="value"
            optTitle="label"
            map-options
            style="width: 230px"
          />
        </div>
      </l-card-section>
      <l-card-section class="q-gutter-xs">
        <div class="row q-gutter-xs">
          <l-select
            :label="this.$gl(`Maliyet Tesisi`, `Cost Plant`)"
            v-model="dv.lisaccounts.cplant"
            options="lisbas002"
            optValue="plant"
            optTitle="stext"
            optCaptions="plant"
            style="width: 200px"
          ></l-select>
        </div>
      </l-card-section>
    </l-card>
  </l-div>
 
</template>

<script>
export default {
  props: ["dv", "tabInfo"],
  data() {
    return {
        
      lockKeyParams: {
        company: this.dv.lisaccounts.company,
        lid: "FINT01",
        lockkey: this.dv.lisaccounts.acctype + this.dv.lisaccounts.account,
      },
    };
  },

  methods: {
    async btnSave() {
      console.log("btnSave çalıştı");
      await this.lis.function("FINT01/02-btnSave", this.dv);
      this.cancel();
    },
    cancel() {
      this.tabInfo.blockGoToTransaction = false;
      this.dv.lisDialog = "FINT01D01";
    },
    async init(prop) {
      await this.lis.function("FINT01/02-init", prop);
    },
    
  },
  mounted() {
    this.init(this.dv);
    console.log("02 created çalıştı");
    this.tabInfo.blockGoToTransaction = true;
  },
  async beforeUnmount() {
    //this.$Axios.post("cls-system.unlock", this.lockKeyParams);
    await this.lis.function("cls-system.unlock", this.lockKeyParams);
  },
};
</script>

function data() { throw new Error('Function not implemented.'); }
