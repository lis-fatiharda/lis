<template>
  <l-card style="width: 100%" class="q-pa-xs q-gutter-xs">
    <div class="text-overline q-pa-xs">
      {{ this.$gl("Belge Geçmişi", "Document History") }}
    </div>
    <l-separator inset />
    <div class="q-gutter-xs row">
      <l-input
        label="Belgeyi Oluşturan"
        readonly
        dense
        v-model="dv.lissaldocs._createdby"
      />
      <l-datetime
        label="Tarih"
        :readonly="true"
        v-model="dv.lissaldocs.createdAt"
      />
    </div>
    <div class="q-gutter-xs row">
      <l-input
        label="Belgeyi Değiştiren"
        readonly
        dense
        v-model="dv.lissaldocs._createdby"
      />
      <l-datetime
        label="Tarih"
        :readonly="true"
        v-model="dv.lissaldocs.createdAt"
      />
    </div>
  </l-card>

  <l-card style="width: 100%">
    <l-div>
      <l-div-flex>
        <div class="text-overline q-pa-xs">
          {{ this.$gl("Onay", "Approve") }}
        </div>
        <l-space />

        <l-chip
          v-if="dv.modi == 1"
          :label="this.$gl(`İmza`, `Signature`)"
          clickable
          outline
          icon="edit"
          color="negative"
          text-color="white"
          @click="signDocument()"
      /></l-div-flex>
      <l-table
        name="SALT01D09"
        v-model="dv.lissaldocs.signstat"
        :columns="myColumnsSign"
        :width="'100%'"
        style="height: 100%"
        :readonly="true"
      />
    </l-div>
  </l-card>

  <l-card style="width: 100%">
    <div class="text-overline q-pa-xs">
      {{ this.$gl("E-Belge Özellikleri", "E-Document Properties") }}
    </div>
    <l-separator inset />
    <l-card-section class="q-gutter-xs row">
      <l-input label="E-Belge Durumu" :readonly="true" dense />
      <l-select
        label="E-Fatura Tipi"
        width="200px"
        v-model="dv.lissaldocs.einvotype"
        :options="[
          { einvotype: 0, stext: 'Temel Fatura' },
          { einvotype: 1, stext: 'Ticari Fatura' },
        ]"
        optValue="einvotype"
        optTitle="stext"
        optCaptions="einvotype"
        :readonly="dv.lissaldocs.isprinted == true ? true : false"
      />
    </l-card-section>
  </l-card>
</template>

<script>
export default {
  props: ["dv", "tabInfo"],
  data() {
    return {
      myColumnsSign: [
        {
          label: this.$gl(`Kullanıcı Adı`, `User Name`),
          value: "username",
          type: "string",
        },

        {
          label: this.$gl(`Kullanıcı Grubu`, `User Group`),
          value: "stext",
          type: "string",
        },

        {
          label: this.$gl(`İmza Tarihi`, `Sign Date`),
          value: "date",
          type: "datetime",
        },
      ],
    };
  },
  methods: {
    async signDocument() {
      this.dv.lissaldocs = await this.lis.function(
        "SALT01/signDocument",
        this.dv.lissaldocs
      );
      this.lis.alert("p", "Belge İmzalandı.");
    },
  },
};
</script>
