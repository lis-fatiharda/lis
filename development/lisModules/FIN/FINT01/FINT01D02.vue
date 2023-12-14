<template>
  <l-div>
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="account_balance" />

        <l-toolbar-title>{{ this.$gl("Hesap", "Account") }}</l-toolbar-title>

        <div class="q-gutter-xs">
          <l-btn
            v-if="modi != 2"
            icon="print"
            color="primary"
            @click="btnPrint()"
          />

          <l-btn v-if="modi != 2" icon="save" color="teal" @click="btnSave()" />

          <l-btn
            v-if="isChild04 == undefined"
            icon="cancel"
            color="negative"
            @click="this.cancel()"
          />
          <l-btn
            v-if="isChild04 != undefined"
            icon="cancel"
            color="negative"
            @click="this.cancel04()"
          />
        </div>
      </l-toolbar>
      <l-div-flex>
        <l-select
          :label="this.$gl(`Firma`, `Company`)"
          v-model="lisaccount.company"
          options="lisbas001"
          optValue="company"
          optTitle="stext"
          optCaptions="company"
          width="120px"
          class="bg-blue-1"
        />

        <l-select
          :label="this.$gl(`Hesap Tipi`, `Account Type`)"
          v-model="lisaccount.acctype"
          options="lisfin004"
          optValue="acctype"
          optTitle="stext"
          optCaptions="acctype"
          width="130px"
          :readonly="modi == 0 ? false : true"
        />
        <l-input
          :label="this.$gl(`Hesap No`, `Account No`)"
          v-model="lisaccount.account"
          :readonly="modi == 0 ? false : true"
        ></l-input>
        <!-- destektablo SORULACAK -->
        <l-select
          :label="this.$gl(`Muh. Std.`, `Acc. Std.`)"
          v-model="lisaccount.accstd"
          options="lisfin001"
          optValue="accstd"
          optTitle="stext"
          optCaptions="accstd"
          width="120px"
          :readonly="modi == 0 ? false : true"
        />
        <l-input
          :label="this.$gl(`Hesap Açk.`, `Account Descr.`)"
          v-model="lisaccount.stext"
          style="width: 300px"
        ></l-input>
        <l-input
          :label="this.$gl(`T.D Hesap`, `Uniform Account`)"
          v-model="lisaccount.glaccount"
        ></l-input>
        <l-select
          :label="this.$gl(`P.Br.`, `Currency`)"
          v-model="lisaccount.currency"
          options="lisbas007"
          optValue="unit"
          optTitle="stext"
          optCaptions="unit"
          :optFilter="{ unittype: 1 }"
          width="140px"
        />
        <l-select
          dense
          v-model="lisaccount.exchmethod"
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
          v-model="lisaccount.accclass"
          style="width: 150px"
        ></l-input>

        <l-select
          :label="this.$gl(`Hesap Grubu`, `Account Group`)"
          v-model="lisaccount.accgrp"
          options="lisfin005"
          optValue="group"
          optTitle="stext"
          optCaptions="group"
          width="150px"
        />

        <l-select
          :label="this.$gl(`Hesap Seviyesi`, `Account Level`)"
          map-options
          v-model="lisaccount.acclevel"
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
          v-model="lisaccount._deleted"
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
            v-model="lisaccount.project"
            style="width: 200px"
          />
          <l-select
            v-model="lisaccount.isproject"
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
            v-model="lisaccount.costcenter"
            style="width: 200px"
          />
          <l-select
            v-model="lisaccount.iscostcenter"
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
            v-model="lisaccount.costobject"
            style="width: 200px"
          />
          <l-select
            v-model="lisaccount.iscostobject"
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
            v-model="lisaccount.cplant"
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
  props: [
    "dv",
    "tabInfo",
    "pCompany",
    "pAcctype",
    "pAccount",
    "modi",
    "isChild04",
  ],
  data() {
    return {
      lisaccount: {},
    };
  },

  methods: {
    async btnSave() {
      console.log("btnSave çalıştı");
      await this.lis.function("FINT01/02-btnSave", {
        lisaccount: this.lisaccount,
        modi: this.modi,
      });
      this.cancel();
    },
    cancel() {
      this.tabInfo.blockGoToTransaction = false;
      this.dv.lisDialog = "FINT01D01";
    },
    cancel04() {
      this.$emit("cancel", false);
    },
  },
  async mounted() {
    this.tabInfo.blockGoToTransaction = true;

    this.lisaccount = await this.lis.function("FINT01/02-init", {
      company: this.pCompany,
      acctype: this.pAcctype,
      account: this.pAccount,
      modi: this.modi,
    });
  },
  async beforeUnmount() {
    await this.lis.function("cls-system.unlock", {
      company: this.pCompany,
      lid: "FINT01",
      lockkey: this.pAcctype + this.pAccount,
    });
  },
};
</script>
