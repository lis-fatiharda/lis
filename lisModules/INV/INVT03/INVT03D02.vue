<template>
  <l-div>
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="inventory" />

        <l-toolbar-title>{{
          this.$gl("Stok Hareketi Detayı", "Stock Movement Detail")
        }}</l-toolbar-title>

        <l-btn
          v-if="dv.modi != 2"
          icon="save"
          color="teal"
          @click="btnSave()"
        />
        <l-btn icon="cancel" color="negative" @click="cancel()" />
      </l-toolbar>
      <l-div-flex></l-div-flex>
    </l-card0>

    <l-separator inset />

    <l-card-flex>
      <l-input
        dense
        v-model="dv.lisinvdocs.company"
        :label="this.$gl(`Firma`, `Company`)"
        readonly
        style="width: 100"
      />
      <l-input
        
        dense
        v-model="dv.lisinvdocs.createdby"
        :label="this.$gl(`Oluşturan`, `Createdby`)"
        readonly
        style="width: 120px"
      />
      <l-input
        
        dense
        v-model="dv.lisinvdocs.doctype"
        :label="this.$gl(`Belge Tipi`, `Document Type`)"
        readonly
        style="width: 50"
      />
      <l-input
        
        dense
        v-model="dv.lisinvdocs.docnum"
        :label="this.$gl(`Belge No`, `Document No`)"
        readonly
        style="width: 50"
      />
      <l-input
        
        dense
        v-model="dv.lisinvdocs.itemnum"
        :label="this.$gl(`Kalem No`, `Item No`)"
        readonly
        style="width: 120px"
      />
      <l-input
        
        dense
        v-model="dv.lisinvdocs.stext"
        :label="this.$gl(`Belge Açıklaması`, `Document Description`)"
        readonly
        style="width: 350px"
      />
      <l-input
        
        dense
        v-model="dv.lisinvdocs.extdoctype"
        :label="this.$gl(`Hrci. Blge Tpi`, `Ext.Doc.Type`)"
        readonly
        style="width: 120px"
      />
      <l-input
        
        dense
        v-model="dv.lisinvdocs.extdocnum"
        :label="this.$gl(`Hrci. Blge No`, `Ext.Doc.No`)"
        readonly
        style="width: 120px"
      />
      <l-datetime
        v-model="dv.lisinvdocs.docdate"
        :label="this.$gl(`Belge Tarihi`, `Document Date`)"
        style="max-width: 220px"
        readonly
      />
    </l-card-flex>
    <l-separator inset />
    <l-div>
      <l-card style="width: 33%; min-width: 250px">
        <div class="text-overline q-pa-xs">
          {{ this.$gl("E-İrsaliye", "E-Waybill") }}
        </div>
        <l-separator inset />

        <l-card-section class="q-gutter-xs">
          <div class="row q-gutter-xs">
            <l-input
              :label="this.$gl(`E-İrs. Tipi`, `E-Waybill Type`)"
              
              dense
              v-model="dv.lisinvdocs.edeltype"
              style="width: 120px"
              readonly
            />
            <l-input
              :label="this.$gl(`E-İrs. No`, `E-Waybill No`)"
              
              dense
              v-model="dv.lisinvdocs.edelnumber"
              style="width: 150px"
              readonly
            />
            <l-input
              :label="this.$gl(`E-İrs. UUID`, `E-Waybill UUID`)"
              
              dense
              v-model="dv.lisinvdocs.edeluuid"
              style="width: 100px"
              readonly
            />
          </div>
        </l-card-section>
      </l-card>

      <l-card style="width: 33%; min-width: 350px">
        <div class="text-overline q-pa-xs">
          {{ this.$gl("Üretim Bilgileri", "Production Information") }}
        </div>
        <l-separator inset />

        <l-card-section class="q-gutter-xs">
          <div class="row q-gutter-xs">
            <l-input
              :label="this.$gl(`İş Merkezi`, `Work Center`)"
              
              dense
              v-model="dv.lisinvdocs.items[0].workcenter"
              style="width: 150px"
            />
            <l-input
              :label="this.$gl(`Onay No`, `Confirmation No`)"
              
              dense
              v-model="dv.lisinvdocs.items[0].confirmation"
              style="width: 150px"
              readonly
            />
            <l-input
              :label="this.$gl(`Onay Sırası`, `Confirmation Position`)"
              
              dense
              v-model="dv.lisinvdocs.items[0].confirmpos"
              style="width: 150px"
              readonly
            />
          </div>
        </l-card-section>
      </l-card>
      <l-card style="width: 33%; min-width: 350px">
        <div class="text-overline q-pa-xs">
          {{ this.$gl("Ekstra Bilgiler", "Extra Information") }}
        </div>
        <l-separator inset />

        <l-card-section>
          <l-div-flex>
            <l-input
              :label="this.$gl(`Tedarikçi`, `Vendor`)"
              
              dense
              v-model="dv.lisinvdocs.items[0].vendor"
              style="width: 150px"
              readonly
            />
            <l-input
              :label="this.$gl(`Taşıyıcı`, `Freighter`)"
              v-model="dv.lisinvdocs.items[0].freighter"
              style="width: 150px"
              readonly
            />
            <l-input
              :label="this.$gl(`Müşteri`, `Customer.`)"
              v-model="dv.lisinvdocs.items[0].customer"
              style="width: 150px"
              readonly
            />
            <l-input
              :label="this.$gl(`Proje`, `Project.`)"
              v-model="dv.lisinvdocs.items[0].project"
              style="width: 150px"
              readonly
            />
          </l-div-flex>
        </l-card-section>
     
    </l-card>
    <l-separator size="5px" color="brown-7" inset />
    <l-table
      name="INVT03D02"
      :tableData="dv.lisinvdocs.items"
      :columns="myColumnsInvt03D02"
      :height="'57vh'"
      :width="'100%'"
      :readonly="true"
    />
  </l-div>
  </l-div>
</template>

<script>
export default {
  props: ["dv", "tabInfo"],
  data() {
    return {
      lockKeyParams: {
        company: this.dv.lisinvdocs.company,
        lid: "INVT03",
        lockkey: this.dv.lisinvdocs.doctype + this.dv.lisinvdocs.docnum,
      },
      myColumnsInvt03D02: [
        {
          label: this.$gl("Kalem", "Item"),
          value: "itemnum",
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
          label: this.$gl("Har.Yönü", "Direction of Movement"),
          value: "qpostway",
          type: "select",
          options: [
            {
              label: this.$gl(`Giriş`, `Entry`),
              value: false,
            },
            {
              label: this.$gl(`Çıkış`, `Exit`),
              value: true,
            },
          ],
        },
        {
          label: this.$gl("Stk. Tipi", "Stk. Type"),
          value: "stocktype",
          type: "select",
          options: [
            {
              label: this.$gl(`Kullanılabilir`, `Available`),
              value: 0,
            },
            {
              label: this.$gl(`Kalite`, `Quality`),
              value: 1,
            },
            {
              label: this.$gl(`Bloke`, `Blocked`),
              value: 2,
            },
            {
              label: this.$gl(`Rezerve`, `Reserved`),
              value: 3,
            },
          ],
        },
        {
          label: this.$gl("Miktar", "Quantity"),
          value: "quantity",
          type: "number",
          fraction: 2,
        },
        {
          label: this.$gl("Birim", "Unit"),
          value: "unit",
          type: "string",
        },
        {
          label: this.$gl("Stok Miktarı", "Stock Quantity"),
          value: "skquantity",
          type: "number",
          fraction: 2,
        },
        {
          label: this.$gl("Stok Birim", "Stock Unit"),
          value: "skqunit",
          type: "string",
        },
        {
          label: this.$gl("Referans Tipi", "Reference Type"),
          value: "refdoctype",
          type: "string",
        },
        {
          label: this.$gl("Referans No", "Reference No"),
          value: "refdocnum",
          type: "string",
        },
        {
          label: this.$gl("Ref. Kalem No", "Ref. Item No"),
          value: "refitemnum",
          type: "string",
        },
      ],
    };
  },

  methods: {
    async btnSave() {
      await this.lis.function("INVT03/02-btnSave", this.dv);
      this.cancel();
    },
    cancel() {
      this.tabInfo.blockGoToTransaction = false;
      this.dv.lisDialog = "INVT03D01";
    },
    async init(prop) {
      await this.lis.function("INVT03/02-init", this.dv);
    },
  },
  mounted() {
    this.init(this.dv);
    this.tabInfo.blockGoToTransaction = true;
  },
  async beforeUnmount() {
    await this.lis.function("cls-system.unlock", this.lockKeyParams);
  },
};
</script>

function data() { throw new Error('Function not implemented.'); }
