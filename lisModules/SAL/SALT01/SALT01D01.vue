<template>
  <l-div v-if="dv.lisDialog == 'SALT01D01'">
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="list_alt" />

        <l-toolbar-title>{{
          this.$gl("Satış Belgeleri", "Sales Orders")
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
      <!--Searching Criterias Layer----row-1-->
      <l-div-flex>
        <l-select
          :label="this.$gl(`Firma`, `Company`)"
          v-model="dv.sc.company"
          options="lisbas001"
          optValue="company"
          optTitle="stext"
          optCaptions="company"
          width="120px"
          class="bg-blue-1"
        />

        <l-select
          :label="this.$gl(`İş Alanı`, `Business Area`)"
          v-model="dv.sc.busarea"
          options="lisbas003"
          optValue="busarea"
          optTitle="stext"
          optCaptions="busarea"
          width="120px"
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

        <l-select
          v-model="dv.lissaldocs.project"
          :label="this.$gl(`Proje Kodu`, `Project Code`)"
          options="liscrm003"
          optValue="project"
          optTitle="stext"
          optCaptions="project"
          width="140px"
        />

        <l-select
          :label="this.$gl(`Satış Bölümü`, `Sales Department`)"
          v-model="dv.sc.saldept"
          options="lissal003"
          optValue="saldept"
          optTitle="stext"
          optCaptions="saldept"
          width="130px"
        />

        <!-- Customer Informations -->

        <l-input
          :label="this.$gl(`Müşteri Kodu`, `Customer Code`)"
          v-model="dv.sc.customer"
        >
          <l-chip
            class="bg-white"
            icon="search"
            dense
            clickable
            @click="isSelectCust = !this.isSelectCust"
          >
            <BAST02D01mini
              :pComp="dv.sc.company"
              :isShow="isSelectCust"
              @ok="
                dv.sc.customer = $event.customer;
                isSelectCust = false;
              "
              @cancel="isSelectCust = false"
            />
          </l-chip>
        </l-input>

        <l-input
          :label="this.$gl(`Müşteri Adı`, `Customer Name`)"
          v-model="dv.sc.name1"
          style="width: 300px"
        >
        </l-input>
        <l-input
          :label="this.$gl(`Malzeme Kodu`, `Material`)"
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
          :label="this.$gl(`Malzeme Adı`, `Material Name`)"
          v-model="dv.sc.mtext"
          style="width: 300px"
        />

        <l-input
          v-model="dv.sc.variant"
          :label="this.$gl(`Varyant`, `Variant`)"
        />

        <l-date
          v-model="dv.sc.docdate1"
          :label="this.$gl(`Başlangıç Tarihi`, `Starting Date`)"
          style="width: 140px"
        />
        <l-date
          v-model="dv.sc.docdate2"
          :label="this.$gl(`Bitiş Tarihi`, `End Date`)"
          style="width: 140px"
        />

        <l-select
          :label="this.$gl(`Belge Karakteristiği`, `Document Characteristic`)"
          map-options
          v-model="dv.sc.docChar"
          :options="[
            { label: this.$gl(`Teklif`, `Offer`), value: 0 },
            { label: this.$gl(`Sipariş`, `Order`), value: 1 },
            {
              label: this.$gl(`İrsaliye`, `Delivery`),
              value: 2,
            },
            { label: this.$gl(`Fatura`, `Invoice`), value: 3 },
            { label: this.$gl(`Tümü`, `All`), value: 99 },
          ]"
          optValue="value"
          optTitle="label"
          style="width: 180px"
        />

        <l-select
          :label="this.$gl(`Belge Statüsü`, `Document Status`)"
          map-options
          v-model="dv.sc.docStat"
          :options="[
            { label: this.$gl(`Açık`, `Open`), value: 0 },
            { label: this.$gl(`Kısmi`, `Partial`), value: 1 },
            { label: this.$gl(`Kapalı`, `Closed`), value: 2 },
            { label: this.$gl(`Tümü`, `All`), value: 99 },
          ]"
          optValue="value"
          optTitle="label"
          style="width: 180px"
        />
        <l-checkbox
          :label="this.$gl(`Silindi?`, `Is Delete?`)"
          v-model="dv._deleted"
          color="pink"
        />
      </l-div-flex>
      <!--------------------------------row-2-->
      <!--------------------------------row-3-->
    </l-card0>

    <l-btn color="amber" icon="search" @click="btnSearch()" />
    <l-btn color="info" icon="visibility" @click="btnShow()" />
    <l-btn color="primary" icon="edit" @click="btnEdit()" />
    <l-btn color="secondary" icon="add" @click="btnInsert()" />
    <l-btn color="deep-orange" icon="print" @click="btnPrint()" />

    <q-toggle
      :label="dv.toggle"
      color="pink"
      :true-value="this.$gl(`Ağaç`, `Tree View`)"
      :false-value="this.$gl(`Tablo`, `Table View`)"
      v-model="dv.toggle"
    />
    <l-chip
      :label="this.$gl(`İmza`, `Signature`)"
      clickable
      outline
      icon="edit"
      color="negative"
      text-color="white"
      @click="signDocument()"
    />

    <!--Table Layer---------------------------->

    <l-table
      v-model="dv.salDocList"
      :columns="myColumns"
      :context="contextMenu"
      height="fit"
      :readonly="true"
      @dblclick="btnEdit()"
    />
    <l-dialog
      v-model="isCallFlow.isShow"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <l-card class="bg-grey-2" style="height: 100%">
        <SALT02D01
          :pDv="isCallFlow"
          @close="
            isCallFlow.isShow = false;
            v - close - popup;
          "
          :tabInfo="tabInfo"
          :lv="lv"
        />
      </l-card>
    </l-dialog>
  </l-div>
  <q-dialog
    v-model="dv.isShowCopyDocs"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <SALT01D12 :dv="dv" :tabInfo="tabInfo"
  /></q-dialog>

  <SALT01D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'SALT01D02'" />

  <div v-show="false">
    <SALT01D01PDF :dv="dv" />
  </div>
</template>

<script>
import SALT01D02 from "./SALT01D02.vue";
import SALT02D01 from "../SALT02/SALT02D01.vue";
import SALT01D12 from "./SALT01D12.vue";
import SALT01D01PDF from "./SALT01D01PDF.vue";

export default {
  props: ["lv", "tabInfo"],
  components: {
    SALT01D02,
    SALT02D01,
    SALT01D12,
    SALT01D01PDF,
  },

  data() {
    return {
      isCallFlow: { isShow: false },
      isSelectCust: false,
      isSelectMat: false,
      selectedRowCopy: false,
      contextMenu: [
        {
          name: "Belge Kopyala",
          callback: async () => {
            this.selectedRowCopy = this.dv.salDocList.findIndex(
              (e) => e._selected == true
            );
            let ctrlCopy = await this.lis.function("SALT01/01-getCopyDocs", {
              company: this.dv.salDocList[this.selectedRowCopy].company,
              doctype: this.dv.salDocList[this.selectedRowCopy].doctype,
              docnum: this.dv.salDocList[this.selectedRowCopy].docnum,
            });
            console.log("ctrlCopy", ctrlCopy);
            if (ctrlCopy == undefined) {
              this.dv.isShowCopyDocs = false;
            } else {
              this.dv.isShowCopyDocs = true;
            }
          },
        },

        {
          name: "Gelişim",
          callback: () => {
            let selectedRow = this.dv.salDocList.filter(
              (e) => e._selected == true
            );

            this.isCallFlow = {
              isShow: true,
              calledBy: "SALT01D01",
              company: selectedRow[0].company,
              busarea: selectedRow[0].busarea,
              doctype: selectedRow[0].doctype,
              docnum: selectedRow[0].docnum,
              itemnum: 0,
            };
          },
        },

        {
          name: "separator",
        },
        {
          name: "Kuyruğa Gönder",
          callback: () => {
            this.sendToQueue();
          },
        },
        {
          name: "Muhasebeleştir",
          callback: () => {
            this.sendToFinance();
          },
        },
      ],
      myColumns: [
        {
          label: this.$gl(`Firma`, `Company`),
          value: "company",
          type: "string",
        },

        {
          label: this.$gl(`İş Alanı`, `Business Area`),
          value: "busarea",
          type: "string",
        },

        {
          label: this.$gl(`Belge Tipi`, `Document Type`),
          value: "doctype",
          type: "string",
        },
        {
          label: this.$gl(`Belge No`, `Document No`),
          value: "docnum",
          type: "string",
        },

        {
          label: this.$gl(`Belge Tarihi`, `Document Date`),
          value: "validfrom",
          type: "datetime",
          textColor: "red",
        },

        {
          label: this.$gl(`Müşteri Kodu`, `Customer Code`),
          value: "customer",
          type: "string",
          textColor: "blue",
        },
        {
          label: this.$gl(`Müşteri Adı`, `Customer Name`),
          value: "name1",
          type: "string",
          textColor: "blue",
        },
        {
          label: this.$gl(`Proje`, `Project`),
          value: "project",
          type: "string",
        },

        {
          label: this.$gl(`Brüt`, `Gross`),
          value: "gross",
          type: "number",
          fraction: 2,
          textColor: "#23978c",
        },
        {
          label: this.$gl(`İndirim`, `Discount`),
          value: "discamnt",
          type: "number",
          fraction: 2,
          textColor: "#23978c",
        },
        {
          label: "Net",
          value: "subtotal",
          type: "number",
          fraction: 2,
          textColor: "#23978c",
        },
        {
          label: this.$gl(`Genel Toplam`, `Grand Total`),
          value: "grandtotal",
          type: "number",
          fraction: 2,
          textColor: "#23978c",
        },
        {
          label: this.$gl(`Para Br.`, `Currency`),
          value: "currency",
          type: "string",
          textColor: "#23978c",
        },
        {
          label: this.$gl(`E-Belge No`, `E-Document Number`),
          value: "einvonumber",
          type: "string",
        },

        {
          label: this.$gl(`Belge Statüsü`, `Document Status`),
          value: "docstat",
          type: "select",
          textColor: "red",
          options: [
            {
              label: this.$gl(`Açık`, `Open`),
              value: 0,
            },
            {
              label: this.$gl(`Kısmi`, `Partial`),
              value: 1,
            },
            {
              label: this.$gl(`Kapalı`, `Closed`),
              value: 2,
            },
          ],
        },
        {
          label: this.$gl(`Kuyrukta`, `In the queue`),
          value: "isprinted",
          type: "checkbox",
        },
        {
          label: this.$gl(`Muhasebeleşti`, `is Finance?`),
          value: "isfinance",
          type: "checkbox",
        },
      ],
      dv: {
        lisDialog: "SALT01D01",
        modi: 2,
        selectedRow: "",
        toggle: "Tablo",
        isShowFinDoc: false,
        isShowFinDocDialog: false,
        //isSShow: true,
        sc: {
          company: "01",
          busarea: "S",
          doctype: "",
          docnum: "",
          customer: "",
          name1: "",
          material: "",
          mtext: "",
          variant: "",
          paymcond: "",
          docStat: 99,
          docChar: 99,
          project: "",
          saldept: "",
          docdate1: this.lis.firstDayOfMonth(),
          docdate2: this.lis.lastDayOfMonth(),
        },
        salDocList: [],
        lissaldocs: {},
        lisfindocs: {},
        openItems: [],
        lissaldocsPrototype: {},
        liscustomers: {},
        isShowCopyDocs: false,
        copyDocsList: [],
        discOptsH: [],
        discOpts: [],
        noVatReasons: [],
        _deleted: false,
        lockKeyParams: {
          company: "",
          lid: "SALT01",
          lockkey: "",
        },
      },
    };
  },

  methods: {
    async sendToQueue() {
      await this.lis.function("SALT01/01-sendToQueue", this.dv);
      this.lis.alert("p", "Seçili Belgeler Kuyruğa Gönderildi.");
    },
    async sendToFinance() {
      await this.lis.function("SALT01/01-sendToFinance", this.dv);
      this.lis.alert("p", "Seçili Belgeler Muhasebeleştirildi.");
    },

    textcontext(event) {
      let selectedRow = this.dv.salDocList.filter((e) => e._selected == true);
      console.log("l-tabledan dondu", selectedRow[0].docnum);
    },
    async btnSearch() {
      this.dv = await this.lis.function("SALT01/01-btnSearch", this.dv);
      this.dv.salDocList.map((e) => (e.__children = e.items));
    },
    async btnEdit() {
      this.dv = await this.lis.function("SALT01/01-btnEdit", this.dv);
    },
    async btnShow() {
      this.dv = await this.lis.function("SALT01/01-btnShow", this.dv);
    },
    async btnInsert() {
      this.dv = await this.lis.function("SALT01/01-btnInsert", this.dv);
    },
    async btnPrint() {
      this.lis.printPDF("SALT01D01PDF", "Satış Belgeleri Raporu");
    },
    async init() {
      this.dv = await this.lis.function("SALT01/01-init", this.dv);

      this.dv.noVatReasons.map((e) => (e.value = e.taxcode));
    },
    async signDocument() {
      let selectedRowSal = this.dv.salDocList.filter(
        (e) => e._selected == true
      );
      await this.lis.function("SALT01/signDocument", selectedRowSal[0]);
      this.lis.alert("p", "Belge İmzalandı.");
    },
  },

  // mounted() {
  //     this.init(this.dv);
  //     console.log("SALT01D01 - $attrs", this.$attrs)
  // },
};
</script>
