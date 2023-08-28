<template>
  <q-layout container class="bg-white" style="width: 1000px">
    <q-header :class="`bg-${tabInfo.moduleColor} text-black`">
      <l-toolbar>
        <l-toolbar-title>{{
          this.$gl("Varyant Detayı", "Variant Detail")
        }}</l-toolbar-title>
        <l-btn
          v-if="dv.modi != 2"
          v-close-popup
          dense
          color="primary"
          icon="save"
          @click="btnSave(), (item.showDetail = false)"
        />
        <l-btn
          v-close-popup
          dense
          color="negative"
          icon="close"
          @click="item.showDetail = false"
        />
      </l-toolbar>
    </q-header>

    <q-page-container>
      <l-div v-for="vrnt in variantOpts.items" :key="vrnt.id">
        <l-div-flex
          ><l-input
            v-if="vrnt.type == 0"
            :label="vrnt.attribute"
            v-model="vrnt.value"
            style="width: 130px" />
          <l-input
            v-if="vrnt.type == 0"
            label="Min"
            v-model="vrnt.minvalue"
            style="width: 130px"
            :readonly="true" />
          <l-input
            v-if="vrnt.type == 0"
            label="Max"
            v-model="vrnt.maxvalue"
            style="width: 130px"
            :readonly="true" />
          <l-input
            v-if="vrnt.type == 0"
            label="Birim"
            v-model="vrnt.qunit"
            style="width: 130px"
            :readonly="true" />
          <l-select
            v-if="vrnt.type == 1"
            :label="vrnt.attribute"
            v-model="vrnt.value"
            :options="vrnt.options"
            optTitle="value"
            optValue="value"
            style="width: 200px" />
          </l-div-flex>
      </l-div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  props: ["isShow", "dv", "tabInfo", "item"],
  data() {
    return {
      variantOpts: [],
      myVariant: {},
    };
  },
  methods: {
    async init() {
      console.log("ITEMITEM", this.item);
      this.variantOpts = await this.lis.function(
        "BAST04/01-initSetVaryant",
        this.item
      );
      console.log("Variant", this.variantOpts);
      console.log("this.item.variant", this.item.variant);

      for (let x in this.variantOpts.items) {
        this.variantOpts.items[x].value =
          this.item.variant[this.variantOpts.items[x].attribute];
        console.log(
          "this.variantOpts.items[x].value",
          this.variantOpts.items[x].value
        );
      }
    },

    btnSave() {
      console.log("forönce", this.variantOpts.items);
      var mymy = {};
      var key = "";
      for (let s in this.variantOpts.items) {
        if (this.variantOpts.items[s].type == 0) {
          console.log("111111111111111111111", this.variantOpts.items[s].value);
          console.log(
            "222222222222222222222",
            this.variantOpts.items[s].maxvalue
          );
          if (
            this.variantOpts.items[s].value > this.variantOpts.items[s].maxvalue
          ) {
            throw new Error("engelleme başarılı");
          }
        }
      }
      for (let i in this.variantOpts.items) {
        console.log(
          "atttrrrbtönce",
          this.myVariant[this.variantOpts.items[i].attribute]
        );
        this.myVariant[this.variantOpts.items[i].attribute] =
          this.variantOpts.items[i].value;

        key = this.variantOpts.items[i].attribute;
        console.log("key", key);
        mymy[key] = this.variantOpts.items[i].value;
      }
      console.log("mymySOOOON", mymy);
      this.myVariant = mymy;
      console.log("this.myVariant", this.myVariant);
      this.item.variant = this.myVariant;
      console.log("this.item.variant", this.item.variant);
      mymy = {};
    },
  },

  mounted() {
    this.init(this.item);
    // console.log("this.init(this.item)",this.init(this.item));
    // this.variantOpts.items = this.init(this.item);
    // console.log("this.variantOpts.itemsMMMMM",this.variantOpts.items);
    // for (let x in this.variantOpts.items) {
    //   this.variantOpts.items[x].value =
    //     this.item.variant[this.variantOpts.items[x].attribute];
    //     console.log("this.variantOpts.items[x].value",this.variantOpts.items[x].value);
    // }
  },
};
</script>
