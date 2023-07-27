<template>
  <div>
    <l-div v-if="dv.lisDialog == 'INVT02D01'">
      <!--Tittle Layer-->
      <l-card0>
        <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
          <l-icon size="md" name="inventory" />

          <l-toolbar-title>{{
            this.$gl("Stok Sayımları", "Stock Counts")
          }}</l-toolbar-title>

          <l-btn
            icon="cancel"
            flat
            round
            dense
            color="negative"
            @click="this.$btnGoHome(tabInfo)"
          />
        </l-toolbar>

        <!--Searching Criterias Layer------>
        <div class="row q-pa-xs q-gutter-xs">
          <l-select
            :label="this.$gl(`Firma`, `Company`)"
            v-model="dv.sc.company"
            options="lisbas001"
            optValue="company"
            optTitle="stext"
            optCaptions="company"
            width="120px"
          />

          <l-select
            :label="this.$gl(`Tesis`, `Plant`)"
            v-model="dv.sc.plant"
            options="lisbas002"
            optValue="plant"
            optTitle="stext"
            optCaptions="plant"
            width="120px"
          />

          <l-select
            :label="this.$gl(`Depo`, `Warehouse`)"
            v-model="dv.sc.warehouse"
            options="lisinv003"
            optValue="warehouse"
            optTitle="stext"
            optCaptions="warehouse"
            width="140px"
          />

          <l-select
            :label="this.$gl(`Belge Tipi`, `Document Type`)"
            v-model="dv.sc.doctype"
            options="lissal001"
            optValue="doctype"
            optTitle="stext"
            optCaptions="doctype"
            width="125px"
          />

          <l-input
            
            dense
            v-model="dv.sc.docnum"
            :label="this.$gl(`Belge No`, `Document No`)"
          />
          <l-datetime
            :label="this.$gl(`Belge Tarihi Başlangıç`, `Document Date Start`)"
            v-model="dv.sc.docdatestrt"
          />
          <l-datetime
            :label="this.$gl(`Belge Tarihi Bitiş`, `Document Date End`)"
            v-model="dv.sc.docdateend"
          />
        </div>
        <!--------------------------------->
      </l-card0>
      <!--Butons Layer Layer---------------------->

      <l-div>
        <l-btn-group>
          <l-btn color="warning"  icon="search" @click="btnSearch(dv)" />
          <l-btn color="info"  icon="visibility" @click="btnShow(dv)" />
          <l-btn color="primary"  icon="edit" @click="btnEdit(dv)" />
          <l-btn color="negative"  icon="cancel" @click="btnDelete(dv)"
            ><l-tooltip>{{
              this.$gl("Hareketi Geri Al", "Undo Move")
            }}</l-tooltip></l-btn
          >
        </l-btn-group>
      </l-div>
     
      <l-table
        :tableData="dv.lisinvdocsItems"
        :columns="myColumnsInvt02"
        :height="'75vh'"
        :width="'100%'"
        :readonly="true"
      />
    </l-div>
    <INVT02D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'INVT02D02'" />
  </div>
</template>

<script>
import INVT02D02 from "./INVT02D02.vue";

export default {
  props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
  components: {
    INVT02D02,
  },
  data() {
    return {
      myColumnsInvt02: [
        {
          label: this.$gl("Tesis", "Plant"),
          value: "plant",
          type: "string",
        },
        {
          label: this.$gl("Depo", "Warehouse"),
          value: "warehouse",
          type: "string",
        },
        {
          label: this.$gl("Belge Tipi", "Document Type"),
          value: "doctype",
          type: "string",
        },
        {
          label: this.$gl("Belge No", "Document Num."),
          value: "docnum",
          type: "string",
        },
        {
          label: this.$gl("Blokeli?", "Is Blocked?"),
          value: "isblocked",
          type: "select",
          options: [
            {
              label: this.$gl("Blokeli Değil", "Not Blocked"),
              value: 0,
            },
            {
              label: this.$gl("Blokeli", "Blocked"),
              value: 1,
            },
          ],
        },
        {
          label: this.$gl("Yazdırıldı?", "Is Printed?"),
          value: "isprinted",
          type: "select",
          options: [
            {
              label: `Yazdırılmadı`,
              label: this.$gl("Yazdırılmadı", "Not Printed"),
              value: 0,
            },
            {
              label: this.$gl("Yazdırıldı", "Printed"),
              value: 1,
            },
          ],
        },
        {
          label: this.$gl("Belge Tarihi", "Document Date"),
          value: "docdate",
          type: "datetime",
        },
      ],
      dv: {
        lisDialog: "INVT02D01",
        sc: {
          company: "01",
        
          plant: "01",
        
          warehouse: null,
          
          stockplace: null,
         
          specialstock: null,
         
          batchnum: "",
          postway: 0,

          docdatestrt: new Date(),
          docdateend: new Date(),
        },
        modi: 2,
        selectedRow: "",
        lisinvdocs: [],
        lisinvdocsItems: [],
      },
    };
  },

  methods: {
    async btnSearch(prop) {
      this.dv = await this.lis.function("INVT02/01-btnSearch", prop);
      // await this.$Axios.post("INVT02/01-btnSearch", prop).then((res) => {
      //   this.dv = res.data;

      this.dv.lisinvdocsItems = [];
      for (let i in this.dv.lisinvdocs) {
        let invDoc = this.dv.lisinvdocs[i];
        for (let k in invDoc.items) {
          let invItem = invDoc.items[k];
          //--
          invItem.company = invDoc.company;
          invItem.doctype = invDoc.doctype;
          invItem.docnum = invDoc.docnum;
          invItem.docdate = invDoc.docdate;
          invItem.stext = invDoc.stext;

          this.dv.lisinvdocsItems.push(invItem);
        }
      }
      //});
    },
    async btnEdit(prop) {
      this.dv = await this.lis.function("INVT02/01-btnEdit", prop);
      // await this.$Axios.post("INVT02/01-btnEdit", prop).then((res) => {
      //   this.dv = res.data;
      // });
    },
    async btnShow(prop) {
      this.dv = await this.lis.function("INVT02/01-btnShow", prop);
      // await this.$Axios.post("INVT02/01-btnShow", prop).then((res) => {
      //   this.dv = res.data;
      // });
    },
    async btnDelete(prop) {
      this.dv = await this.lis.function("INVT02/01-btnDelete", prop);
      // await this.$Axios.post("INVT02/01-btnDelete", prop).then((res) => {
      //   this.dv = res.data;
      // });
    },
    async init() {
      this.dv = await this.lis.function("INVT02/01-init", this.dv);
    },
    async init(prop) {
      this.dv = await this.lis.function("INVT02/01-init", this.dv);

      this.dv.noVatReasons.map((e) => (e.value = e.taxcode));
    },
  },

  async mounted() {
    //this.dv = await this.lis.function("INVT02/01-init", this.dv);
    this.init(this.dv);
    // await this.$Axios
    //   .post("INVT02/01-init", this.dv)
    //   .then((res) => {
    //     this.dv = res.data;
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
  },
};
</script>
