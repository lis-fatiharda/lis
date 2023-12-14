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
            v-if="isChild != undefined"
            icon="done"
            flat
            round
            dense
            color="green"
            @click="this.ok()"
          />

          <l-btn
            v-if="isChild != undefined"
            icon="cancel"
            flat
            round
            dense
            color="negative"
            @click="this.cancel()"
          />

          <l-btn
            v-if="isChild == undefined"
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

          <l-input
                        dense
                        v-model="dv.sc.variant"
                        :label="
                            this.$gl(
                                `Varyant`,
                                `Variant`
                            )
                        "
                    />
                    
          <l-select
            :label="this.$gl(`Malz.Tip`, `Type`)"
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

      <l-btn-group>
        <l-btn color="warning" icon="search" @click="btnSearch(dv)" />
      </l-btn-group>

      <l-table
        name="INVT04D01"
        v-model="dv.reportList"
        :columns="Invstockscolumns"
        :readonly="true"
      />
    </l-div>
    <INVT04D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'INVT04D02'" />
  </div>
</template>

<script>
import INVT04D02 from "./INVT04D02.vue";

export default {
  props: ["lv", "goToTransaction", "currentTab", "tabInfo", "isChild"],
  components: {
    INVT04D02,
  },

  data() {
    return {
      Invstockscolumns: [
        {
          label: "Firma",
          value: "company",
          type: "string",
        },

        {
          label: this.$gl("Malzeme", "Material"),
          value: "material",
          type: "string",
          textColor: "blue"
        },
        {
          label: this.$gl("Malzeme Adı", "Material Name"),
          value: "mtext",
          type: "string",
          textColor: "blue"
        },

        {
          label: "Tesis",
          value: "plant",
          type: "string",
          bgColor: "#f9e4aac4",
        },

        {
          label: this.$gl("Depo", "Warehouse"),
          value: "warehouse",
          type: "string",
          bgColor: "#f9e4aac4",
        },

        {
          label: this.$gl("Stok Yeri", "Stock Place"),
          value: "stockplace",
          type: "string",
          bgColor: "#f9e4aac4",
        },
        {
          label: this.$gl("Ö.St.Tipi", "Spc.St.Typ"),
          value: "specialstock",
          type: "string",
          bgColor: "#f9e4aa69",
        },
        {
          label: this.$gl("Parti", "Batchnum"),
          value: "batchnum",
          type: "string",
          bgColor: "#f9e4aa69",
        },

        {
          label: this.$gl("Toplam Miktar", "Quantity"),
          value: "quantity",
          type: "number",
          fraction: 2,
          textColor: "blue",
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
          textColor: "purple",
        },
        {
          label: this.$gl("Bloke Miktar", "Blocked Quantity"),
          value: "bquantity",
          type: "number",
          fraction: 2,
          textColor: "red",
        },
        {
          label: this.$gl("Rezerve Miktar", "Reserved Quantity"),
          value: "rquantity",
          type: "number",
          fraction: 2,
          textColor: "orange",
        },
        {
          label: this.$gl("Fiyat", "Price"),
          value: "price",
          type: "number",
          fraction: 2,
          textColor: "green",
        },
        {
          label: this.$gl("Fiyat Birimi", "Price Unit"),
          value: "punit",
          type: "string",
          textColor: "green",
        },
        {
          label: this.$gl("Varyant", "Variant"),
          value: "variant",
          type: "string",
        },
      ],
      dv: {
        lisDialog: "INVT04D01",
        sc: {
          company: "01",
          plant: "",
          warehouse: "",
          stockplace: "",
          specialstock: "",
          mattype: "",
          matgrp: "",
          batchnum: "",
          material: "",
          mtext: "",
          variant: "",
          postway: 0,
          quantity: 0.0,
          aquantity: 0.0,
          qquantity: 0.0,
          bquantity: 0.0,
          rquantity: 0.0,
          expirydate: this.lis.firstDayOfMonth(),
        },
        reportList: [],
      },
      isSelectMat: false,
    };
  },

  methods: {
    async btnSearch() {
      this.dv = await this.lis.function("INVT04/01-btnSearch", this.dv);
      console.log(this.dv.reportList);
    },
    async init() {
      this.dv = await this.lis.function("INVT04/01-init", this.dv);
    },
    ok() {
      let select = this.dv.reportList.filter((e) => e._selected == true);
      if (select.length >= 1) {
        this.$emit("ok", select);
        isChild = false;
      } else {
        this.lis.alert("e", "Bir Malzeme Seçilmedi!");
      }
    },
    cancel() {
      this.$emit("cancel", false);
    },
  },

  async mounted() {
    //this.init(this.dv);
  },
};
</script>
