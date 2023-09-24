<template>
  <l-div-flex>
    <l-card style="width: 100%" horizontal>
      <l-div-flex>
        <l-select
          class="q-gutter-xs"
          :label="this.$gl(`Firma`, `Company`)"
          v-model="dv.company"
          options="lisbas001"
          optValue="company"
          optTitle="stext"
          optCaptions="company"
        />

        <l-select
          class="q-gutter-xs"
          :label="this.$gl(`Hareket Kodu`, `Transaction Code`)"
          v-model="dv.movecode"
          options="lisinv006"
          optValue="movecode"
          optTitle="stext"
          :optFilter="{ postway: 2 }"
          optCaptions="movecode"
        />

        <l-space />

        <l-datetime
          :label="this.$gl(`Belge Tarihi`, `Document Date`)"
          v-model="dv.docdate"
        />
        <l-datetime
          :label="this.$gl(`Kur Tarihi`, `Currency Date`)"
          v-model="dv.curdate"
        />
      </l-div-flex>

      <l-input
        class="q-gutter-xs"
        label="Belge Açıklaması"
        v-model="dv.stext"
        :autogrow="true"
      />

      <!-- ekranda gelsin diye createdat yazdım böyle bi alan yok -->
      <!-- class="row q-pa-xs q-gutter-xs" -->
    </l-card>
  </l-div-flex>

  <l-div-flex>
    <l-btn color="blue-5" class="align-end" icon="refresh" @click="init()" >
    
  </l-btn>
    <l-btn color="teal" class="align-end" icon="save" @click="btnSave()" />
    <l-btn
      color="negative"
      icon="remove"
      @click="btnRowDelete()"
    ><l-tooltip>Satır Sil</l-tooltip></l-btn>

    <l-space />

    <l-btn label="Stok Raporundan Getir" outline @click="isShowInvt04 = true" />
  </l-div-flex>

  <l-div-flex>
    <div style="width: 49%">
      <l-table
        v-model="dv.transferTable"
        :columns="columns1"
        :context="contextMenu"
        @zoom="zoomMaterialRow = $event.row"
        @keydown="if ($event.key == 'Insert') this.pushNewTrns($event);"
      />
    </div>

    <l-space />

    <div style="width: 49%">
      <l-table
        v-model="dv.transferTable"
        :columns="columns2"
        :context="contextMenu"
        @zoom="zoomMaterialRow = $event.row"
        @keydown="if ($event.key == 'Insert') this.pushNewTrns($event);"
      />
    </div>
  </l-div-flex>
  <q-dialog v-model="isShowItemVar">
    <setVariant
      :dv="dv"
      :item="dv.transferTable[selectedRowVar]"
      :tabInfo="tabInfo"
      @ok="isShowItemVar = false"
    />
  </q-dialog>
  <l-dialog v-model="isShowInvt04">
    <INVT04D01
      :dv="dv"
      :tabInfo="tabInfo"
      :isChild="true"
      @cancel="isShowInvt04 = false"
      @ok="fetchINVT04($event)"
    />
  </l-dialog>

  <BAST03D01mini
    :pComp="dv.company"
    :isShow="zoomMaterialRow == null ? false : true"
    @ok="
      lis.objectMove($event, dv.transferTable[zoomMaterialRow]);
      dv.transferTable[zoomMaterialRow].material = $event.material;
      dv.transferTable[zoomMaterialRow].mtext = $event.stext;
      dv.transferTable[zoomMaterialRow].qunit = $event.skunit;
      zoomMaterialRow = null;
    "
    @cancel="zoomMaterialRow = null"
  />
</template>

<script>
import setVariant from "./../../BAS/BAST04/setVariant.vue";
import INVT04D01 from "./../../INV/INVT04/INVT04D01.vue";
export default {
  props: ["tabInfo"],
  components: {
    setVariant,
    INVT04D01,
  },
  computed: {
    columns1() {
      return [
        {
          label: this.$gl("Malzeme", "Material"),
          value: "material",
          type: "zoom",
        },
        {
          label: this.$gl("Açıklama", "Description"),
          value: "mtext",
          type: "string",
        },
        {
          label: this.$gl("Miktar", "Quantity"),
          value: "quantity",
          type: "number",
          friction: 2,
        },
        {
          type: "selectmenu",
          label: this.$gl("Miktar Br.", "Quantity Unit"),
          value: "qunit",
          options: "lismaterials.matunits",
          optValue: "unit",
          optTitles: { unit: "Birim" },
          optFilter: {
            company: this.dv.company,
            material: "$material",
          },
        },

        {
          type: "selectmenu",
          label: this.$gl("Kaynak Tesis", "Plant"),
          value: "plant1",
          options: "lismaterials.matstock",
          optValue: "plant",
          optTitles: { plant: "Tesis", stext: "Açıklama" },
          optFilter: {
            company: this.dv.company,
            material: "$material",
          },
        },
        {
          type: "selectmenu",
          label: this.$gl("Kaynak Depo", "Warehouse"),
          value: "warehouse1",
          options: "lismaterials.matstock",
          optValue: "warehouse",
          optTitles: { warehouse: "Depo", stext: "Açıklama" },
          optFilter: {
            company: this.dv.company,
            material: "$material",
            "matstock.plant": "$plant1",
          },
        },
        {
          type: "selectmenu",
          label: this.$gl("Kaynak Stok Yeri", "stockplace"),
          value: "stockplace1",
          options: "lismaterials.matstock",
          optValue: "stockplace",
          optTitles: { stockplace: "Stok Yeri", stext: "Açıklama" },
          optFilter: {
            company: this.dv.company,
            material: "$material",
            "matstock.plant": "$plant1",
            "matstock.warehouse": "$warehouse1",
          },
        },
        {
          type: "selectmenu",
          label: this.$gl("Kyn.Ö.St.tipi", "Src Special Stok"),
          value: "specialstock1",
          options: "lisinv005",
          optValue: "specialstock",
          optTitles: {
            specialstock: "Özel Stok Tipi",
            stext: "Açıklama",
          },
        },
        {
          label: this.$gl("Kaynak Parti", "Source Batchnum"),
          value: "batchnum1",
          type: "string",
        },
        {
          type: "string",
          label: this.$gl("Malzeme Varyantı", "Material Variant"),
          value: "varkey",
          readonly: true,
        },
      ];
    },

    columns2() {
      return [
        {
          label: this.$gl("Malzeme", "Material"),
          value: "material",
          type: "zoom",
        },
        {
          label: this.$gl("Açıklama", "Description"),
          value: "mtext",
          type: "string",
        },
        {
          label: this.$gl("Miktar", "Quantity"),
          value: "quantity",
          type: "number",
          friction: 2,
        },
        {
          type: "selectmenu",
          label: this.$gl("Miktar Br.", "Quantity Unit"),
          value: "qunit",
          options: "lismaterials.matunits",
          optValue: "unit",
          optTitles: { unit: "Birim" },
          optFilter: {
            company: this.dv.company,
            material: "$material",
          },
        },

        {
          type: "selectmenu",
          label: this.$gl("Hedef Tesis", "Plant"),
          value: "plant2",
          options: "lismaterials.matstock",
          optValue: "plant",
          optTitles: { plant: "Tesis", stext: "Açıklama" },
          optFilter: {
            company: this.dv.company,
            material: "$material",
          },
        },
        {
          type: "selectmenu",
          label: this.$gl("Hedef Depo", "Warehouse"),
          value: "warehouse2",
          options: "lismaterials.matstock",
          optValue: "warehouse",
          optTitles: { warehouse: "Depo", stext: "Açıklama" },
          optFilter: {
            company: this.dv.company,
            material: "$material",
            "matstock.plant": "$plant2",
          },
        },
        {
          type: "selectmenu",
          label: this.$gl("Hdf.Stok Yeri", "stockplace"),
          value: "stockplace2",
          options: "lismaterials.matstock",
          optValue: "stockplace",
          optTitles: { stockplace: "Stok Yeri", stext: "Açıklama" },
          optFilter: {
            company: this.dv.company,
            material: "$material",
            "matstock.plant": "$plant2",
            "matstock.warehouse": "$warehouse2",
          },
        },

        {
          type: "selectmenu",
          label: this.$gl("Hdf.Ö.St.tipi", "Targ.Special Stok"),
          value: "specialstock2",
          options: "lisinv005",
          optValue: "specialstock",
          optTitles: {
            specialstock: "Özel Stok Tipi",
            stext: "Açıklama",
          },
        },

        {
          label: this.$gl("Hedef Parti", "Target Batchnum"),
          value: "batchnum2",
          type: "string",
        },
        {
          type: "string",
          label: this.$gl("Malzeme Varyantı", "Material Variant"),
          value: "varkey",
          readonly: true,
        },
      ];
    },
  },
  data() {
    return {
      contextMenu: [
        {
          name: "Satır Ekle",
          callback: async () => {
            this.dv.transferTable.push({
              material: "",
              mtext: "",
              quantity: 0,
              qunit: "",
              plant1: "",
              warehouse1: "",
              stockplace1: "",
              specialstock1: "",
              batchnum1: "",
              plant2: "",
              warehouse2: "",
              stockplace2: "",
              specialstock2: "",
              batchnum2: "",
            });
          },
        },
        {
          name: "Malzeme Varyantı",
          callback: async () => {
            this.selectedRowVar = this.dv.transferTable.findIndex(
              (e) => e._selected == true
            );

            console.log("selectedRowVar", this.selectedRowVar);
            this.isShowItemVar = true;
          },
        },
      ],
      zoomMaterialRow: null,
      isShowItemVar: false,
      isShowInvt04: false,
      selectedRowVar: 0,
      dv: {
        company: "01",
        movecode: "TAA",
        docdate: new Date(),
        curdate: new Date(),
        stext: "",
        transferTable: [],
      },
    };
  },
  methods: {
    async btnSave() {
      let myReturn = await this.lis.function("INVT01/31-btnSave", this.dv);
      this.lis.alert(
        "p",
        `${myReturn.doctype} - ${myReturn.docnum} No'lu Envanter Hareketi Kaydedildi.`
      );
      this.init();
    },

    btnRowDelete() {
      this.dv.transferTable = this.dv.transferTable.filter((e) => e._selected == false);
    },

    fetchINVT04(event) {
      if (
        this.dv.transferTable.length == 1 &&
        this.dv.transferTable[0].material == ""
      ) {
        this.dv.transferTable = [];
      }

      for (let i in event)
        this.dv.transferTable.push({
          material: event[i].material,
          mtext: event[i].mtext,
          quantity: event[i].quantity,
          qunit: event[i].qunit,
          plant1: event[i].plant,
          warehouse1: event[i].warehouse,
          stockplace1: event[i].stockplace,
          specialstock1: event[i].specialstock,
          batchnum1: event[i].batchnum,
          specialstock2: event[i].specialstock,
          batchnum2: event[i].batchnum,
          varkey: event[i].variant,
        });
      this.isShowInvt04 = false;
    },
    async init() {
      this.dv.transferTable = [];
      this.dv.transferTable.push({
        material: "",
        mtext: "",
        quantity: 0,
        qunit: "",
        plant1: "",
        warehouse1: "",
        stockplace1: "",
        specialstock1: "",
        batchnum1: "",
        plant2: "",
        warehouse2: "",
        stockplace2: "",
        specialstock2: "",
        batchnum2: "",
      });

      console.log("init objectNew");

      let mm = await this.lis.objectNew("lissaldocs.items");
      console.log("mmmmmmmm", mm);
    },
  },
  async mounted() {
    this.init();
  },
};
</script>

function data() { throw new Error('Function not implemented.'); }
