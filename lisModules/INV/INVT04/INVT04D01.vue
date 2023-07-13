<template>
  <div>
    <l-div v-if="dv.lisDialog == 'INVT04D01'">
      <!--Tittle Layer-->
      <l-card0>
        <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
          <l-icon size="md" name="inventory" />

          <l-toolbar-title>{{
            this.$gl("Malzeme Stokları", "Material Stocks")
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
        <l-div class="row q-pa-xs q-gutter-xs">
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
            width="150px"
          />
          <l-select
            :label="this.$gl(`Stok Yeri`, `Stockplace`)"
            v-model="dv.sc.stockplace"
            options="lisinv004"
            optValue="stockplace"
            optTitle="stext"
            optCaptions="stockplace"
            width="150px"
          />
          <l-select
            :label="this.$gl(`Ö.St.Tipi`, `Specialstock`)"
            v-model="dv.sc.specialstock"
            options="lisinv005"
            optValue="specialstock"
            optTitle="stext"
            optCaptions="specialstock"
            width="120px"
          />

          <l-input
            
            dense
            v-model="dv.sc.batchnum"
            :label="this.$gl(`Parti No`, `Batch Number`)"
          />
          <!-- <l-input
            
            dense
            v-model="dv.sc.material"
            :label="this.$gl(`Malzeme`, `Material`)"
          /> -->
          <l-input
            :label="this.$gl(`Malzeme Kodu`, `Material`)"
            
            dense
            v-model="dv.sc.material"
          >
            <l-chip
              class="bg-white"
              icon="search"
              dense
              clickable
              @click="isSelectMat = !isSelectMat"
            >
              <BAST03D01mini
                :pComp="dv.sc.company"
                :isShow="isSelectMat"
                @ok="
                  dv.sc.material = $event.material;
                  isSelectMat = false;
                "
                @cancel="isSelectMat = false"
              />
            </l-chip>
          </l-input>
          <l-input
            
            dense
            v-model="dv.sc.mtext"
            :label="this.$gl(`Malzeme Açıklaması`, `Material Description`)"
          />
          <l-select
            :label="this.$gl(`Tip`, `Type`)"
            v-model="dv.sc.mattype"
            options="lisbas009"
            optValue="mattype"
            optTitle="stext"
            optCaptions="mattype"
            width="180px"
          />
          <l-select
            :label="this.$gl(`Malz. Grp.`, `Material Group`)"
            v-model="dv.sc.matgrp"
            options="lisbas014"
            optValue="matgrp"
            optTitle="stext"
            optCaptions="matgrp"
            width="150px"
          />
          <l-datetime
            :label="this.$gl(`Son Kull. Trh.`, `Expiration Date`)"
            v-model="dv.sc.expirydate"
            style="width: 160px"
          />
        </l-div>
        <!--------------------------------->
      </l-card0>
      <!--Butons Layer Layer---------------------->

      <l-div>
        <l-btn-group>
          <l-btn color="warning"  icon="search" @click="btnSearch(dv)" />
        </l-btn-group>
      </l-div>

      <l-table
        :tableData="dv.lisinvstocksItems"
        :columns="myColumnsInvt04"
        :height="'75vh'"
        :width="'100%'"
        :readonly="true"
      />
    </l-div>
    <INVT04D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'INVT04D02'" />
  </div>
</template>

<script>
import INVT04D02 from "./INVT04D02.vue";

export default {
  props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
  components: {
    INVT04D02,
  },

  data() {
    return {
      myColumnsInvt04: [
        {
          label: this.$gl("Depo", "Warehouse"),
          value: "warehouse",
          type: "string",
        },
        {
          label: this.$gl("Stok Yeri", "Stock Place"),
          value: "stockplace",
          type: "string",
        },
        {
          label: this.$gl("Ö.St.Tipi", "Spc.St.Typ"),
          value: "specialstock",
          type: "string",
        },
        {
          label: this.$gl("Parti", "Batchnum"),
          value: "batchnum",
          type: "string",
        },
        {
          label: this.$gl("Malzeme", "Material"),
          value: "material",
          type: "string",
        },
        {
          label: this.$gl("Malzeme Açıklaması", "Material Description"),
          value: "stext",
          type: "string",
        },
        {
          label: this.$gl("Toplam Miktar", "Quantity"),
          value: "quantity",
          type: "number",
          fraction: 2,
        },
        {
          label: this.$gl("Birim", "Unit"),
          value: "qunit",
          type: "string",
        },

        {
          label: this.$gl("Kullanılabilir Miktar", "Available Quantity"),
          value: "aquantity",
          type: "number",
          fraction: 2,
        },
        {
          label: this.$gl("Kalite Miktar", "Quality Quantity"),
          value: "qquantity",
          type: "number",
          fraction: 2,
        },
        {
          label: this.$gl("Bloke Miktar", "Blocked Quantity"),
          value: "bquantity",
          type: "number",
          fraction: 2,
        },
        {
          label: this.$gl("Rezerve Miktar", "Reserved Quantity"),
          value: "rquantity",
          type: "number",
          fraction: 2,
        },
        {
          label: this.$gl("Fiyat", "Price"),
          value: "price",
          type: "number",
          fraction: 2,
        },
        {
          label: this.$gl("Fiyat Birimi", "Price Unit"),
          value: "punit",
          type: "string",
        },

        {
          label: this.$gl("Malz.Tipi", "Mat.Type"),
          value: "mattype",
          type: "string",
        },
        {
          label: this.$gl("Malz.Grubu", "Mat.Grp."),
          value: "matgrp",
          type: "string",
        },
      ],
      dv: {
        lisDialog: "INVT04D01",
        sc: {
          company: "01",

          plant: null,

          warehouse: null,

          stockplace: null,

          specialstock: null,

          mattype: null,

          matgrp: null,

          batchnum: "",
          material: "",
          mtext: "",

          qpostway: 0,
          quantity: 0.0,
          aquantity: 0.0,
          qquantity: 0.0,
          bquantity: 0.0,
          rquantity: 0.0,
          expirydate: this.lis.firstDayOfMonth(),
        },
        modi: 2,
        selectedRow: "",
        lisinvstocks: [],
        lisinvstocksItems: [],
      },
      isSelectMat: false,
    };
  },

  methods: {
    async btnSearch(prop) {
      this.dv = await this.lis.function("INVT04/01-btnSearch", prop);
    },
    async btnEdit(prop) {
      this.dv = await this.lis.function("INVT04/01-btnEdit", prop);
    },
    async btnShow(prop) {
      this.dv = await this.lis.function("INVT04/01-btnShow", prop);
    },
    async btnDelete(prop) {
      this.dv = await this.lis.function("INVT04/01-btnDelete", prop);
    },
    async init(prop) {
      this.dv = await this.lis.function("INVT04/01-init", this.dv);

      this.dv.noVatReasons.map((e) => (e.value = e.taxcode));
    },
  },

  async mounted() {
    //this.dv = await this.lis.function("INVT04/01-init", this.dv);
    this.init(this.dv);
    // await this.$Axios
    //   .post("INVT04/01-init", this.dv)
    //   .then((res) => {
    //     this.dv = res.data;
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
  },
};
</script>
