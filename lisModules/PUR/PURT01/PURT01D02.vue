<template>
  <l-div>
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="description" />

        <l-toolbar-title>{{
          this.$gl("Satınalma belgesi Detayı", "Order Detail")
        }}</l-toolbar-title>

        <l-chip
          v-if="dv.lispurdocs.edoctype > 0"
          color="negative"
          outline
          :label="
            dv.lispurdocs.edoctype == 1
              ? this.$gl('E-İrsaliye', 'E-Waybill')
              : dv.lispurdocs.edoctype == 2
              ? this.$gl('E-Fatura', 'E-Invoice')
              : this.$gl('E-Arşiv', 'E-Archive')
          "
        />
        <l-space />

        <div class="q-gutter-xs">
          <l-btn
            v-if="dv.modi != 2"
            icon="print"
            color="primary"
            @click="btnPrint()"
          />

          <l-btn
            v-if="dv.modi != 2"
            icon="save"
            color="teal"
            @click="btnSave()"
          />
          <l-btn icon="cancel" color="negative" @click="cancel()" />
        </div>
      </l-toolbar>

      <l-card-section
        class="row q-pa-xs q-gutter-xs"
        style="width: 85% min-width: 320px"
      >
        <l-select
          :label="this.$gl(`Firma`, `Company`)"
          v-model="dv.sc.company"
          options="lisbas001"
          optValue="company"
          optTitle="stext"
          optCaptions="company"
          width="120px"
          class="bg-blue-1"
          :readonly="true"
        />

        <l-select
          :label="this.$gl(`İş Alanı`, `Business Area`)"
          v-model="dv.lispurdocs.busarea"
          options="lisbas003"
          optValue="busarea"
          optTitle="stext"
          optCaptions="busarea"
          width="120px"
          class="bg-blue-1"
          :readonly="dv.modi == 0 ? false : true"
        />

        <l-select
          :label="this.$gl(`Belge Tipi`, `Document Type`)"
          v-model="dv.lispurdocs.doctype"
          @select="setDocChar()"
          options="lispur001"
          optValue="doctype"
          optTitle="stext"
          optCaptions="doctype"
          :optFilter="{ isonlybyref: false }"
          width="125px"
          class="bg-blue-1"
          :readonly="dv.modi == 0 ? false : true"
        />

        <l-input
          dense
          v-model="dv.lispurdocs.docnum"
          :label="this.$gl(`Belge No`, `Document No`)"
          readonly
        />

        <l-select
          :label="this.$gl(`Proje Kodu`, `Project Code`)"
          v-model="dv.lispurdocs.project"
          options="liscrm003"
          optValue="project"
          optTitle="stext"
          optCaptions="project"
          width="140px"
        />

        <l-select
          :label="this.$gl(`Satınalma Bölümü`, `Purchasing Department`)"
          v-model="dv.lispurdocs.purdept"
          options="lispur003"
          optValue="purdept"
          optTitle="stext"
          optCaptions="purdept"
          width="150px"
          class="bg-blue-1"
        />

        <l-datetime
          v-model="dv.lispurdocs.validfrom"
          :label="this.$gl(`Belge Tarihi`, `Document Date`)"
          style="max-width: 220px"
        />

        <l-select
          :label="this.$gl(`Onay`, `Confirm`)"
          :readonly="true"
          map-options
          v-model="dv.lispurdocs.isapprove"
          :options="[
            { value: 0, label: this.$gl(`Yok`, `No`) },
            { value: 1, label: this.$gl(`Eksik`, `Missing`) },
            { value: 2, label: this.$gl(`Tamam`, `OK`) },
          ]"
          optValue="value"
          optTitle="label"
          style="width: 153px"
        />

        <l-select
          :label="this.$gl(`Belge Statüsü`, `Document Status`)"
          :readonly="true"
          map-options
          v-model="dv.lispurdocs.docstat"
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
          :label="this.$gl(`Muhasebeleştir`, `Is Accounted?`)"
          v-model="dv.lispurdocs.isfinance"
          color="secondary"
          v-if="dv.lispurdocs.invtype > 0"
        />
        <l-checkbox
          :label="this.$gl(`Muhasebe Belge Göster`, `Is Show Account?`)"
          v-model="dv.isShowFinDoc"
          color="primary"
          v-if="(dv.lispurdocs.invtype > 0) & (dv.lispurdocs.isfinance == true)"
        />
        <l-checkbox
          :label="this.$gl(`Silindi?`, `Is Delete?`)"
          v-model="dv.lispurdocs._deleted"
          color="negative"
        />
      </l-card-section>

      <l-separator inset />

      <l-card-section class="row q-pa-xs q-gutter-xs">
        <!-- Customer Informations -->

        <l-input
          :label="this.$gl(`Tedarikçi Kodu`, `Vendor Code`)"
          dense
          v-model="dv.lispurdocs.vendor"
          :readonly="dv.modi == 0 ? false : true"
          class="bg-blue-1"
        >
          <l-chip
            class="bg-blue-1"
            icon="search"
            dense
            clickable
            @click="
              dv.modi == 0
                ? (dv.lispurdocs.isSelectCust = !dv.lispurdocs.isSelectCust)
                : false
            "
          >
            <BAST02D01mini
              :pComp="dv.lispurdocs.company"
              :isShow="dv.lispurdocs.isSelectCust"
              @ok="
                dv.lisVendor = $event;
                lis.objectMove($event, dv.lispurdocs);
                setDocChar();
                dv.lispurdocs.vendor = $event.customer;
                dv.lispurdocs.isSelectCust = false;
              "
              @cancel="dv.lispurdocs.isSelectCust = false"
            />
          </l-chip>
        </l-input>

        <l-input
          :label="this.$gl(`Tedarikçi Adı`, `Vendor Name`)"
          v-model="dv.lispurdocs.name1"
          style="width: 300px"
          dense
          :readonly="dv.modi == 0 ? false : true"
        >
        </l-input>

        <l-select
          :label="this.$gl(`P.Br.`, `Currency`)"
          v-model="dv.lispurdocs.currency"
          options="lisbas007"
          optValue="unit"
          optTitle="stext"
          optCaptions="unit"
          :optFilter="{ unittype: 1 }"
          width="135px"
        />
        <l-input
          dense
          :label="this.$gl(`Kur`, `Exchange`)"
          type="number"
          v-model="dv.lispurdocs.currate"
        />
        <l-date
          v-model="dv.lispurdocs.curdate"
          :label="'Kur Tarihi'"
          style="max-width: 220px"
        />
      </l-card-section>
    </l-card0>
    <l-card>
      <l-tabs v-model="tab">
        <l-tab name="Kalemler" :label="this.$gl(`Kalemler`, `Items`)" />
        <l-tab
          name="Açık Kalemler"
          :label="this.$gl(`Açık Kalemler`, `Open Items`)"
        />
        <l-tab name="Koşullar" :label="this.$gl(`Koşullar`, `Conditions`)" />
        <l-tab name="İndirim" :label="this.$gl(`İNDİRİM`, `DISCOUNT`)" />
        <l-tab
          name="Mal/Fat Gönderen"
          :label="this.$gl(`Mal/Fat Gönderen`, `Goods/Invoice Sender`)"
        />
        <l-tab
          name="Ödeme Planı"
          :label="this.$gl(`Ödeme Planı`, `Payment Plan`)"
        />
        <l-tab name="Onay" :label="this.$gl(`Onay`, `Confirm`)" />
        <l-tab name="Notlar" :label="this.$gl(`Notlar`, `Notes`)" />
        <l-tab name="Eklenenler" :label="this.$gl(`Eklenenler`, `Added`)" />
      </l-tabs>

      <l-tab-panels v-model="tab" animated>
        <l-tab-panel name="Kalemler" class="q-pa-xs" style="padding: 0">
          <PURT01D03 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Açık Kalemler" style="padding: 0">
          <PURT01D04 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Koşullar" class="row q-gutter-xs q-pa-xs">
          <PURT01D05 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="İndirim" class="row" style="padding: 0">
          <PURT01D06 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Mal/Fat Gönderen" class="row" style="padding: 0">
          <PURT01D07 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel
          name="Ödeme Planı"
          class="row q-gutter-xs"
          style="padding: 0"
        >
          <PURT01D08 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Onay" class="row q-gutter-xs">
          <PURT01D09 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Notlar" class="q-gutter-xs">
          <PURT01D10 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Eklenenler" class="q-gutter-xs">
          <PURT01D11 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>
      </l-tab-panels>
    </l-card>

    <l-dialog v-model="dv.isShowFinDocDialog" full-width>
      <FINT02D02mini :dv="dv" :tabInfo="tabInfo" cancelToDialog="PURT01D01" />
    </l-dialog>
  </l-div>
</template>

<script>
import PURT01D03 from "./PURT01D03.vue";
import PURT01D04 from "./PURT01D04.vue";
import PURT01D05 from "./PURT01D05.vue";
import PURT01D06 from "./PURT01D06.vue";
import PURT01D07 from "./PURT01D07.vue";
import PURT01D08 from "./PURT01D08.vue";
import PURT01D09 from "./PURT01D09.vue";
import PURT01D10 from "./PURT01D10.vue";
import PURT01D11 from "./PURT01D11.vue";
import lispur008 from "./../../../lisModels/lispur008";
import FINT02D02mini from "../../FIN/FINT02/FINT02D02mini.vue";

import calcPrice from "./calcPrice.js";

export default {
  props: ["dv", "tabInfo"],
  components: {
    PURT01D03,
    PURT01D04,
    PURT01D05,
    PURT01D06,
    PURT01D07,
    PURT01D08,
    PURT01D09,
    PURT01D10,
    PURT01D11,
    FINT02D02mini,
  },
  data() {
    return {
      selectedCar: "",
      dvt: {
        liscustomers: {},
        grcAdrList: [],
        ircAdrList: [],
      },

      tab: "Kalemler",
    };
  },

  watch: {
    async "dv.lispurdocs.currency"(newValue, oldValue) {
      console.log("watch : dv.lispurdocs.currency");
      let isConvert = await this.lis.message(
        "c",
        "Mevcut Fiyatlar Üzerinden Yeni Kur İçin Çevrim Yapılsın Mı?"
      );

      console.log("Gidiyor", oldValue);

      this.dv.lispurdocs = await this.lis.function("PURT01/02-fetchCurRate", {
        pLispurdocs: this.dv.lispurdocs,
        oldCurrency: oldValue,
        isConvert,
      });

      console.log("döndü******");

      this.calcPrice();
    },
    async "dv.lispurdocs.curdate"(newValue) {
      console.log("watch : dv.lispurdocs.curdate");

      this.dv.lispurdocs = await this.lis.function("PURT01/02-fetchCurRate", {
        pLispurdocs: this.dv.lispurdocs,
        oldCurrency: this.dv.lispurdocs.currency,
      });

      this.calcPrice();
    },
  },

  methods: {
    calcPrice(event) {
      this.dv.lispurdocs = calcPrice(this.dv.lispurdocs);
    },
    async setDocChar() {
      
      if (
        (this.dv.lispurdocs.vendor == "") |
        (this.dv.lispurdocs.doctype == "")
      )
        return;
      let myReturn = await this.lis.function("PURT01/setDocChar", {
        company: this.dv.lispurdocs.company,
        vendor: this.dv.lispurdocs.vendor,
        doctype: this.dv.lispurdocs.doctype,
      });
      this.dv.lispurdocs.reqtype = myReturn.olispur001.reqtype;
      this.dv.lispurdocs.offtype = myReturn.olispur001.offtype;
      this.dv.lispurdocs.ordtype = myReturn.olispur001.ordtype;
      this.dv.lispurdocs.deltype = myReturn.olispur001.deltype;
      this.dv.lispurdocs.invtype = myReturn.olispur001.invtype;

      this.dv.lispurdocs.edoctype = myReturn.edoctype;
    },

    //**** Fetch Customer Infos */
    fetchCustInfos(cust) {
      this.dv.lispurdocs.name1 = cust.name1;
      //this.dv.lispurdocs.address = cust.address;
      //this.dv.lispurdocs.telnum = cust.telnum;
      //this.dv.lispurdocs.email = cust.email;
      //this.dv.lispurdocs.cpgender = cust.custper[0].gender;
      //this.dv.lispurdocs.cpname = cust.custper[0].name;
      //this.dv.lispurdocs.cpsecondname = cust.custper[0].secondname;
      //this.dv.lispurdocs.cpsurname = cust.custper[0].surname;
      //this.dv.lispurdocs.cpdepartment = cust.custper[0].department;
      //this.dv.lispurdocs.cpposition = cust.custper[0].position;
    },
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.dv.scfCustomerOpts = this.dv.scCustomerOpts;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.dv.scfCustomerOpts = this.dv.scCustomerOpts.filter(
          (v) => v.name1.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    async btnPrint(pFromSave) {
      if (this.dv.lispurdocs.isprinted == true) {
        this.lis.alert("p", "Belge Daha Önce Kuyruğa Gönderildi.");
        return;
      }
      await this.lis.function("PURT01/02-btnPrint", this.dv);

      this.dv.lispurdocs.isprinted = true;

      if (pFromSave != true) {
        this.btnSave();
      }
    },

    async btnSave() {
      //----- Controls Before Save ---------
      if (
        (this.dv.lispurdocs.doctype == null) |
        (this.dv.lispurdocs.doctype == "")
      ) {
        this.lis.alert(
          "w",
          "Lütfen Belge Tipi Seçiniz!",
          "Belge Kaydedilemedi!"
        );
        return;
      }
      if (
        (this.dv.lispurdocs.purdept == null) |
        (this.dv.lispurdocs.purdept == "")
      ) {
        this.lis.alert(
          "w",
          "Lütfen Satınalma Bölümü Seçiniz!",
          "Belge Kaydedilemedi!"
        );
        return;
      }
      if (
        (this.dv.lispurdocs.reqtype == 0) &
        (this.dv.lispurdocs.vendor == "")
      ) {
        this.lis.alert(
          "w",
          "Lütfen Tedarikçi Seçiniz!",
          "Belge Kaydedilemedi!"
        );
        return;
      }
      if (
        (this.dv.lispurdocs.currency == "") |
        (this.dv.lispurdocs.currency == null)
      ) {
        this.lis.alert(
          "w",
          "Lütfen Para Birimi Giriniz!",
          "Belge Kaydedilemedi!"
        );
        return;
      }

      for (let i in this.dv.lispurdocs.items) {
        if (this.dv.lispurdocs.items[i]._deleted == false) {
          if (
            this.dv.lispurdocs.items[i].qunit == null ||
            this.dv.lispurdocs.items[i].qunit == ""
          ) {
            this.lis.alert(
              "w",
              `Lütfen ${this.dv.lispurdocs.items[i].itemnum} No'lu kalem için Miktar Birimini Giriniz!`,
              "Belge Kaydedilemedi!"
            );
            return;
          }

          if (this.dv.lispurdocs.items[i].quantity <= 0) {
            this.lis.alert(
              "w",
              `Lütfen ${this.dv.lispurdocs.items[i].itemnum} No'lu kalem için Miktar Giriniz!`,
              "Belge Kaydedilemedi!"
            );
            return;
          }
          if (
            this.dv.lispurdocs.items[i].material == null ||
            this.dv.lispurdocs.items[i].material == ""
          ) {
            this.lis.alert(
              "w",
              `Lütfen ${this.dv.lispurdocs.items[i].itemnum} No'lu kalem için Malzeme Giriniz!`,
              "Belge Kaydedilemedi!"
            );
            return;
          }
          if (
            this.dv.lispurdocs.items[i].itemtype == null ||
            this.dv.lispurdocs.items[i].itemtype == ""
          ) {
            this.lis.alert(
              "w",
              `Lütfen ${this.dv.lispurdocs.items[i].itemnum} No'lu kalem için Kalem Tipi Giriniz!`,
              "Belge Kaydedilemedi!"
            );
            return;
          }
        }
      }

      //------ Print The E-Document ----------

      if (
        (this.dv.lispurdocs.isprinted == false) &
        (this.dv.lispurdocs.edoctype > 0) &
        (this.dv.lispurdocs._deleted == false)
      ) {
        let myReturn = await this.lis.message(
          "c",
          "LISERP",
          this.dv.lispurdocs.edoctype == 1
            ? this.$gl(
                "E-Fatura Kuyruğa Gönderilsin mi?",
                "Send E-Invoice to Queue?"
              )
            : this.dv.lispurdocs.edoctype == 2
            ? this.$gl(
                "E-Arşiv Kuyruğa Gönderilsin mi?",
                "Send E-Archive to Queue?"
              )
            : this.$gl(
                "E-İrsaliye Kuyruğa Gönderilsin mi?",
                "Send E-Waybill Queue?"
              )
        );

        if (myReturn == true) {
          //------ Save The Document ----------
          this.dv.lispurdocs = await this.lis.function(
            "PURT01/02-btnSave",
            this.dv
          );
          this.lis.alert(
            "p",
            this.$gl(
              "Satınalma Belgesi Kaydedildi.",
              "Purchase Document Saved."
            )
          );
          await this.btnPrint(true);
        } else {
          //------ Just Save The Document ----------
          this.dv.lispurdocs = await this.lis.function(
            "PURT01/02-btnSave",
            this.dv
          );
          this.lis.alert(
            "p",
            this.$gl(
              "Satınalma Belgesi Kaydedildi.",
              "Purchase Document Saved."
            )
          );
        }
      } else {
        //------ Save The Document ----------
        console.log("elseelse");
        this.dv.lispurdocs = await this.lis.function(
          "PURT01/02-btnSave",
          this.dv
        );
        console.log("elseelse", this.dv.lispurdocs);
        this.lis.alert(
          "p",
          this.$gl("Satınalma Belgesi Kaydedildi.", "Purchase Document Saved.")
        );
      }

      // create finance Document for invoice

      console.log("###########################");
      console.log(this.dv.lispurdocs);
      console.log(this.dv.lispurdocs.isfinance);
      console.log(this.dv.lispurdocs.invtype);

      if (
        (this.dv.lispurdocs.isfinance == true) &
        (this.dv.lispurdocs.invtype > 0)
      ) {
        console.log("####1");
        // create finance Document for invoice
        await this.createFinFromPur();
        if (this.dv.isShowFinDoc == true) {
          this.dv.isShowFinDocDialog = true;
          console.log("####2");
        } else {
          console.log("####3");
          await this.saveFinDoc();
          this.cancel();
        }
      } else {
        this.cancel();
      }
    },

    async createFinFromPur() {
      //------ Create The Finance Document ----------
      this.dv.lisfindocs = await this.lis.function(
        "cls-finance.createFinFromPur",
        this.dv.lispurdocs
      );
    },

    async saveFinDoc() {
      //------ Save The Finance Document ----------

      await this.lis.function("cls-finance.save", {
        plisfindocs: this.dv.lisfindocs,
        modi: 0,
      });
      this.lis.alert(
        "p",
        this.$gl("Muhasebe Belgesi Kaydedildi.", "Purchase Document Saved.")
      );
      this.cancel();
      this.dv.isShowFinDocDialog = false;
    },

    cancel() {
      this.tabInfo.blockGoToTransaction = false;
      this.dv.lisDialog = "PURT01D01";
    },
  },
  async created() {
    let tmpDv = {};
    tmpDv = await this.lis.function("PURT01/02-init", this.dv);
    tmpDv.lisVendor.custaddress.forEach((e) => {
      e.label = e.addressname + " - " + e.city + "/" + e.country;
      e.value = e.adrnum;
    });
    if (this.dv.modi != 2) this.tabInfo.blockGoToTransaction = true;
  },
  async beforeUnmount() {
    if (this.dv.modi != 2) {
      await this.lis.function("cls-system.unlock", this.dv.lockKeyParams);
    }
  },
};
</script>

function data() { throw new Error('Function not implemented.'); }
