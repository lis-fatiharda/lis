<template>
  <l-div>
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="inventory" />

        <l-toolbar-title>{{
          this.$gl("Stok Sayımı Detayı", "Stock Counts Detail")
        }}</l-toolbar-title>

        <l-btn
          v-if="dv.modi != 2"
          icon="save"
          color="teal"
          @click="btnSave()"
        />
        <l-btn icon="cancel" color="negative" @click="cancel()" />
      </l-toolbar>

      <div class="row">
        <!-- Detail Part-->
      </div>

      <hr />
    </l-card0>
  </l-div>
</template>

<script>
export default {
  props: ["dv", "tabInfo"],
  data() {
    return {
      // lockKeyParams: {
      //   company: this.dv.liscustomers.company,
      //   lid: "BAST02",
      //   lockkey: this.dv.liscustomers.customer,
      // },
    };
  },

  methods: {
    async btnSave() {
      console.log("btnSave çalıştı");
      await this.lis.function("INVT02/02-btnSave", this.dv);
      this.cancel();
      // await this.$Axios
      //   .post("INVT03/02-btnSave", this.dv)
      //   .then((res) => {
      //     console.log(res.data);
      //     this.cancel();
      //   })
      //   .catch(function (err) {
      //     console.log(err);
      //   });
    },
    cancel() {
      this.tabInfo.blockGoToTransaction = false;
      this.dv.lisDialog = "INVT02D01";
    },
    async init(prop) {
      await this.lis.function("INVT02/02-init", prop);
      // await this.$Axios
      //   .post("INVT03/02-init", prop)
      //   .then(function (res) {
      //     console.log("02-init");
      //   })
      //   .catch(function (err) {
      //     console.log(err);
      //   });
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

function data() { new Error('Function not implemented.'); }
