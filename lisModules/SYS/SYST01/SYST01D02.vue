<template>
  <l-div>
    <!--Tittle Layer-->
    <l-card>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-toolbar class="q-gutter-xs">
          <l-icon size="md" name="assignment_ind" />

          <l-toolbar-title>{{
            this.$gl(`Uygulama Nesne Detayı`, `Application Object Detail`)
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
      <!--Head Layer-->

      <div class="row">
        <div class="row col-10 q-gutter-xs">
          <l-input
            
            dense
            v-model="dv.lisappobjects[0].module"
            :label="this.$gl(`Modul`, `Module`)"
          />

          <l-input
            
            dense
            v-model="dv.lisappobjects[0].stext"
            :label="this.$gl(`Modul Açıklaması(Tr)`, `Module Description(Tr)`)"
          />

          <l-input
            
            dense
            v-model="dv.lisappobjects[0].stexte"
            :label="this.$gl(`Modul Açıklaması(En)`, `Module Description(En)`)"
          />

          <l-select
            
            dense
            v-model="dv.lisappobjects[0].group"
            :label="this.$gl(`Modul Grubu`, `Module Group`)"
            emit-value
            map-options
            style="min-width: 230px"
            :options="[
              {
                label: this.$gl('Temel Uygulama', 'Basic Application'),
                value: 0,
              },
              {
                label: this.$gl('Süreç Uygulaması', 'Process Application'),
                value: 1,
              },
            ]"
            optValue="value"
            optTitle="label"
          />
        </div>
        <div class="col-2 q-pa-xs">
          <l-input
            :label="this.$gl(`Modul Rengi`, `Module Color`)"
            v-model="dv.lisappobjects[0].moduleColor"
            :bg-color="dv.lisappobjects[0].moduleColor"
            
            dense
          />
        </div>
      </div>
      <hr />
      <div class="row">Uygulamalar</div>

      <!-- Uygulamalar Section -->

      <div
        class="row wrap q-pa-xs q-gutter-xs"
        v-for="item in dv.lisappobjects[0].transactions"
        :key="item.id"
      >
        <l-input
          
          dense
          v-model="item.code"
          :label="this.$gl(`Uygulama Kodu`, `Application Code`)"
        />

        <l-input
          
          dense
          v-model="item.stext"
          :label="this.$gl(`Uygulama Açıklaması`, `Application Description`)"
        />

        <l-input
          
          dense
          v-model="item.stexte"
          :label="
            this.$gl(`Uygulama Açıklaması (E)`, `Application Description (E)`)
          "
        />

        <l-input
          
          dense
          v-model="item.pathName"
          :label="this.$gl(`Başlangıç Diyaloğu`, `Initial Dialogue`)"
        />

        <l-input
          
          dense
          v-model="item.component"
          readonly
          :label="
            this.$gl(`Uygulama Route-Component`, `Application Route-Component`)
          "
        />

        <l-checkbox
          :label="this.$gl(`Silindi mi?`, `Is Delete?`)"
          v-model="item.deleted"
          color="red"
          
          dense
        ></l-checkbox>
      </div>
      <div class="row">
        <div class="col-11"></div>
        <div class="col-1">
          <l-btn
            round
            color="secondary"
            icon="add"
            @click="pushNewTransaction"
          ></l-btn>
        </div>
      </div>
    </l-card>
  </l-div>
</template>

<script>
export default {
  props: ["dv", "tabInfo"],
  methods: {
    async btnSave() {
      console.log("btnSave çalıştı");
      await this.lis.function("SYST01/02-btnSave", this.dv);
      this.cancel();
      
    },
    cancel() {
      this.dv.lisDialog = "syst01d01";
      this.tabInfo.blockGoToTransaction = false;
    },
    pushNewTransaction() {
      console.log(this.dv.lisappobjects[0].transactions);
      this.dv.lisappobjects[0].transactions.push({
        code: "",
        stext: "",
        pathName: "",
      });
      console.log(this.dv.lisappobjects[0].transactions);
    },
    async init(prop) {
      let appobj = await this.lis.function("SYST01/02-init", prop);
      this.dv.lisappobjects.module = appobj.lisappobjects.module;
   
      console.log(this.dv);
      console.log("02-created çalıştı");
    },
  },

  mounted() {
    this.init(this.dv);
  },
};
</script>

function data() { throw new Error('Function not implemented.'); }
