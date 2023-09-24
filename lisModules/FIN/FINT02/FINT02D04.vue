<template>
  <l-div-flex>
    <l-card style="width: 49%; min-width: 320px">
      <div class="text-overline q-pa-xs">
        {{ this.$gl("Referans Bilgileri", "Reference Information") }}
      </div>
      <l-separator inset />
      <l-card-section class="q-gutter-xs">
        <div class="q-gutter-xs q-pa-xs row">
          <l-input
            label="Satınalma Belgesi Tipi"
            dense
            v-model="dv.lisfindocs.purdoctype"
          />
          <l-input
            label="Satınalma Belgesi No"
            dense
            v-model="dv.lisfindocs.purdocnum"
          />
        </div>

        <l-div-flex>
          <l-input
            label="Satış Belgesi Tipi"
            dense
            v-model="dv.lisfindocs.saldoctype"
          />
          <l-input
            label="Satış Belgesi No"
            dense
            v-model="dv.lisfindocs.saldocnum"
          />
        </l-div-flex>
      </l-card-section>
    </l-card>

    <l-card style="width: 49%; min-width: 320px">
      <div class="text-overline q-pa-xs">
        {{ this.$gl("Müşteri Bilgisi", "Customer Information") }}
      </div>
      <l-separator inset />
      <l-card-section class="row q-gutter-xs"> </l-card-section>
    </l-card>
    <l-card style="width: 49%; min-width: 320px">
      <div class="text-overline q-pa-xs">
        {{ this.$gl("Finans Bilgisi", "Financial Information") }}
      </div>
      <l-separator inset />
      <l-card-section class="row q-gutter-xs"> </l-card-section>
    </l-card>
    <!-- / -->
    <l-card style="width: 49%; min-width: 320px">
      <l-div>
        <l-div-flex>
          {{ this.$gl("Onay", "Approve") }}

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
          />
        </l-div-flex>
        <l-separator inset />
        <l-table
          name="FINT02D04"
          v-model="dv.lisfindocs.signstat"
          :columns="myColumnsSign"
          :width="'100%'"
          style="height: 100%"
          :readonly="true"
        />
      </l-div>
    </l-card>
    <!-- / -->
    <!-- <l-card style="width: 49%; min-width: 320px">
      <div class="text-overline q-pa-xs"></div>
      <l-separator inset />
      <l-card-section-flex> </l-card-section-flex>
    </l-card> -->
  </l-div-flex>
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
      this.dv.lisfindocs = await this.lis.function(
        "FINT02/signDocument",
        this.dv.lisfindocs
      );
      this.lis.alert("p", "Belge İmzalandı.");
    },
  },
};
</script>
