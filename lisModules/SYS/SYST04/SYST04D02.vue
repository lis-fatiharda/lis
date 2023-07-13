<template>
  <l-div>
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-toolbar class="q-gutter-xs">
          <l-icon size="md" name="assignment_ind" />

          <l-toolbar-title>{{
            this.$gl(`Numaratör Detayı`, `Numbering Detail`)
          }}</l-toolbar-title>

          <l-btn
            v-if="dv.modi != 2"
            icon="save"
            color="teal"
            @click="btnSave()"
          />
          <l-btn icon="cancel" color="negative" @click="cancel()" />
        </l-toolbar>
      </l-toolbar>

      <div class="row">
        <div class="row q-pa-xs">
          <l-select
            :label="this.$gl(`Firma`, `Company`)"
            v-model="dv.sc.company"
            options="lisbas001"
            optValue="company"
            optTitle="stext"
            optCaptions="company"
            width="120px"
            
          />
          <l-input
            dense
            
            :label="this.$gl(`Numaratör`, `Numerator`)"
            v-model="dv.olisnumranges.numrange"
          />
          <l-input
            dense
            
            :label="this.$gl(`Açıklama`, `Explanation`)"
            v-model="dv.olisnumranges.stext"
          />
          <l-checkbox
            :label="this.$gl(`Manuel Numaratör?`, `Manual Numerator?`)"
            v-model="dv.olisnumranges.ismanuel"
          />
          <l-checkbox
            :label="
              this.$gl(`Entegratör Numaratörü mü?`, `Last Assigned Number?`)
            "
            v-model="dv.olisnumranges.isintegrator"
            @click="btnIntegrator()"
          />
          <l-input
            dense
            
            :label="this.$gl(`Son Atanan Numara`, ``)"
            v-model="dv.olisnumranges.valcurrent"
            class="bg-green-2"
          />
        </div>
      </div>

      {{ this.$gl(`Parçalar`, `Parts`) }}
      <hr />
      <div
        class="q-pa-xs"
        v-for="item in dv.olisnumranges.numparts"
        :key="item._id"
      >
        <l-card class="row q-pa-xs bg-grey-3">
          <l-input
            dense
            
            :label="this.$gl(`Parça No`, `Part No`)"
            v-model="item.partno"
            style="width: 100px"
            :readonly="dv.olisnumranges.isintegrator"
          />
          
          <l-select
            
            v-model="item.parttype"
            :options="dv.partTypeOpts"
            :label="this.$gl(`Parça Tipi`, `Part Type`)"
            style="width: 180px"
            dense
            optValue="dv.partTypeOpts" 
            optTitle="dv.partTypeOpts"
            map-options
            :readonly="dv.olisnumranges.isintegrator"
          />
          <l-input
            v-if="item.parttype == 'Manuel'"
            dense
            
            :label="this.$gl(`Parça uzunluğu`, `Part Length`)"
            v-model="item.partlength"
            :readonly="dv.olisnumranges.isintegrator"
          />
          <l-input
            v-if="dv.olisnumranges.isintegrator == false"
            dense
            
            :label="this.$gl(`Ön Ek`, `Prefix`)"
            v-model="item.preffix"
          />

          <l-input
            v-if="dv.olisnumranges.isintegrator == false"
            dense
            
            :label="this.$gl(`Son Ek`, `Suffix`)"
            v-model="item.suffix"
          />

          <l-input
            v-if="item.parttype == 'Otomatik'"
            dense
            
            :label="this.$gl(`Başlangıç`, `Start`)"
            v-model="item.valstart"
            :readonly="dv.olisnumranges.isintegrator"
          />
          <l-input
            dense
            
            :label="this.$gl(`Bitiş`, `Finish`)"
            v-model="item.valend"
            v-if="item.parttype == 'Otomatik'"
            :readonly="dv.olisnumranges.isintegrator"
          />
          <l-input
            v-if="item.parttype == 'Otomatik'"
            dense
            
            :label="this.$gl(`Arttırım Miktarı`, `Increase Amount`)"
            v-model="item.valincrease"
            :readonly="dv.olisnumranges.isintegrator"
          />
          <l-input
            v-if="item.parttype == 'Otomatik'"
            dense
            
            :label="this.$gl(`Son Atanan Değer`, `Last Assigned Value`)"
            v-model="item.valcurrent"
            class="bg-green-1"
          />
          <l-chip
            dense
            justify="right"
            icon="cancel"
            clickable
            rounded
            glossy
            color="negative"
            text-color="white"
            @click="removePart(item._id)"
            >{{ this.$gl(`Sil`, `Delete`) }}</l-chip
          >
        </l-card>
      </div>
      <div class="row">
        <div class="col-11"></div>
        <div class="col-1">
          <l-btn
            round
            color="secondary"
            icon="add"
            @click="pushNewPart"
            :disable="dv.olisnumranges.isintegrator"
          ></l-btn>
        </div>
      </div>
    </l-card0>
  </l-div>
</template>

<script>
export default {
  props: ["dv", "tabInfo"],
  data() {
    return {};
  },

  methods: {
    btnIntegrator() {
      this.dv.olisnumranges.numparts[0].valend = 999999999;
    },
    async btnSave() {
      console.log("btnSave çalıştı");
      await this.lis.function("SYST04/02-btnSave", this.dv);
      this.cancel();
    },
    async pushNewPart() {
      let myReturn = await this.lis.function("SYST04/pushNewPart");
      this.dv.olisnumranges.numparts.push(myReturn);
    },
    async removePart(pid) {
      console.log(pid);
      this.dv.olisnumranges.numparts = [
        ...this.dv.olisnumranges.numparts.filter((e) => e._id != pid),
      ];
    },
    cancel() {
      this.dv.olisnumranges = [];
      this.dv.lisDialog = "SYST04D01";
      this.tabInfo.blockGoToTransaction = false;
    },
  },
  async mounted() {
    if (this.dv.modi == 0) this.dv.olisnumranges.numparts[0].partno = 1;
  },
};
</script>

function data() { throw new Error('Function not implemented.'); }
