<template>
  <l-div>
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="list_alt" />

        <l-toolbar-title>{{
          this.$gl("Satış Belgesi Detayı", "Order Detail")
        }}</l-toolbar-title>

        <l-chip
          v-if="dv.lissaldocs.edoctype > 0"
          color="negative"
          outline
          :label="
            dv.lissaldocs.edoctype == 1
              ? this.$gl('E-Fatura', 'E-Invoice')
              : dv.lissaldocs.edoctype == 2
              ? this.$gl('E-Arşiv', 'E-Archive')
              : this.$gl('E-İrsaliye', 'E-Waybill')
          "
        />
        <l-space />

        <div class="q-gutter-xs">
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
          v-model="dv.lissaldocs.company"
          options="lisbas001"
          optValue="company"
          optTitle="stext"
          optCaptions="company"
          width="120px"
          :readonly="true"
        />

        <l-select
          :label="this.$gl(`İş Alanı`, `Business Area`)"
          v-model="dv.lissaldocs.busarea"
          options="lisbas003"
          optValue="busarea"
          optTitle="stext"
          optCaptions="busarea"
          width="120px"
          :readonly="dv.modi == 0 ? false : true"
        />

        <l-select
          :label="this.$gl(`Belge Tipi`, `Document Type`)"
          v-model="dv.lissaldocs.doctype"
          @select="this.setDocChar()"
          options="lissal001"
          optValue="doctype"
          optTitle="stext"
          optCaptions="doctype"
          :optFilter="{ isonlybyref: false }"
          width="125px"
          :readonly="dv.modi == 0 ? false : true"
          class="bg-blue-1"
        />

        <l-input
          dense
          v-model="dv.lissaldocs.docnum"
          :label="this.$gl(`Belge No`, `Document No`)"
          readonly
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
          v-model="dv.lissaldocs.saldept"
          options="lissal003"
          optValue="saldept"
          optTitle="stext"
          optCaptions="saldept"
          width="130px"
          class="bg-blue-1"
        />

        <l-datetime
          v-model="dv.lissaldocs.validfrom"
          :label="'Belge Tarihi'"
          style="max-width: 220px"
        />

        <l-select
          :label="this.$gl(`Onay`, `Confirm`)"
          :readonly="true"
          map-options
          v-model="dv.lissaldocs.issignature"
          :options="[
            { value: 0, label: this.$gl(`Yok`, `No`) },
            { value: 1, label: this.$gl(`Eksik`, `Missing`) },
            { value: 2, label: this.$gl(`Tamam`, `OK`) },
          ]"
          optValue="value"
          optTitle="label"
          style="width: 180px"
        />

        <l-select
          :label="this.$gl(`Belge Statüsü`, `Document Status`)"
          :readonly="true"
          map-options
          v-model="dv.lissaldocs.docstat"
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
          v-model="dv.lissaldocs.isfinance"
          color="secondary"
          v-if="dv.lissaldocs.invtype > 0"
        />
        <l-checkbox
          :label="this.$gl(`Muhasebe Belge Göster`, `Is Show Account?`)"
          v-model="dv.isShowFinDoc"
          color="primary"
          v-if="(dv.lissaldocs.invtype > 0) & (dv.lissaldocs.isfinance == true)"
        />

        <l-checkbox
          :label="this.$gl(`Silindi?`, `Is Deleted?`)"
          v-model="dv.lissaldocs._deleted"
          color="negative"
        />
      </l-card-section>

      <l-separator inset />

      <l-card-section class="row q-pa-xs q-gutter-xs">
        <!-- Customer Informations -->

        <l-input
          :label="this.$gl(`Müşteri Kodu`, `Customer Code`)"
          dense
          v-model="dv.lissaldocs.customer"
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
                ? (dv.lissaldocs.isSelectCust = !dv.lissaldocs.isSelectCust)
                : false
            "
          >
            <BAST02D01mini
              :pComp="dv.lissaldocs.company"
              :isShow="dv.lissaldocs.isSelectCust"
              @ok="
                lis.objectMove($event, dv.lissaldocs);
                dv.liscustomers = $event;
                setDocChar();
                dv.lissaldocs.isSelectCust = false;
              "
              @cancel="dv.lissaldocs.isSelectCust = false"
            />
          </l-chip>
        </l-input>

        <l-input
          :label="this.$gl(`Müşteri Adı`, `Customer Name`)"
          v-model="dv.lissaldocs.name1"
          style="width: 300px"
          :readonly="dv.modi == 0 ? false : true"
        >
        </l-input>

        <l-select
          :label="this.$gl(`P.Br.`, `Currency`)"
          v-model="dv.lissaldocs.currency"
          options="lisbas007"
          optValue="unit"
          optTitle="stext"
          optCaptions="unit"
          :optFilter="{ unittype: 1 }"
          width="135px"
        />

        <l-input
          :label="this.$gl(`Kur`, `Exchange`)"
          type="number"
          v-model="dv.lissaldocs.currate"
        />
        <l-date
          v-model="dv.lissaldocs.curdate"
          :label="'Kur Tarihi'"
          style="max-width: 220px"
        />
        <l-checkbox
          :label="this.$gl(`Durduruldu mu?`, `Is Stop?`)"
          v-model="dv.lissaldocs.isstop"
          color="negative"
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
          name="Mal/Fat Alıcısı"
          :label="this.$gl(`Mal/Fat Alıcısı`, `Goods/Invc.Taker`)"
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
        <l-tab-panel name="Kalemler" style="padding: 0">
          <SALT01D03 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Açık Kalemler" style="padding: 0">
          <SALT01D04 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Koşullar">
          <SALT01D05 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="İndirim" class="row" style="padding: 0">
          <SALT01D06 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Mal/Fat Alıcısı" class="row" style="padding: 0">
          <SALT01D07 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Ödeme Planı" class="row q-gutter-xs">
          <SALT01D08 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Onay" class="row q-gutter-xs">
          <SALT01D09 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Notlar" class="q-gutter-xs">
          <SALT01D10 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>

        <l-tab-panel name="Eklenenler" class="q-gutter-xs">
          <SALT01D11 :dv="dv" :tabInfo="tabInfo" />
        </l-tab-panel>
      </l-tab-panels>
    </l-card>

    <l-dialog v-model="dv.isShowFinDocDialog" full-width>
      <FINT02D02mini :dv="dv" :tabInfo="tabInfo" cancelToDialog="SALT01D01" />
    </l-dialog>
  </l-div>
</template>

<script>
import SALT01D03 from "./SALT01D03.vue";
import SALT01D04 from "./SALT01D04.vue";
import SALT01D05 from "./SALT01D05.vue";
import SALT01D06 from "./SALT01D06.vue";
import SALT01D07 from "./SALT01D07.vue";
import SALT01D08 from "./SALT01D08.vue";
import SALT01D09 from "./SALT01D09.vue";
import SALT01D10 from "./SALT01D10.vue";
import SALT01D11 from "./SALT01D11.vue";
import FINT02D02mini from "../../FIN/FINT02/FINT02D02mini.vue";

import SALT02D01 from "../SALT02/SALT02D01.vue";
import calcPrice from "./calcPrice.js";

export default {
  props: ["dv", "tabInfo", "isDialog"],
  components: {
    SALT02D01,
    SALT01D03,
    SALT01D04,
    SALT01D05,
    SALT01D06,
    SALT01D07,
    SALT01D08,
    SALT01D09,
    SALT01D10,
    SALT01D11,
    FINT02D02mini,
  },
  data() {
    return {
      selectedCar: "",
      tab: "Kalemler",
    };
  },

  watch: {
    async "dv.lissaldocs.currency"(newValue, oldValue) {
      let isConvert = await this.lis.message(
        "c",
        "Mevcut Fiyatlar Üzerinden Yeni Kur İçin Çevrim Yapılsın Mı?"
      );

      this.dv.lissaldocs = await this.lis.function("SALT01/02-fetchCurRate", {
        pLissaldocs: this.dv.lissaldocs,
        oldCurrency: oldValue,
        isConvert,
      });

      this.calcPrice();
    },
    async "dv.lissaldocs.curdate"(newValue) {
      this.dv.lissaldocs = await this.lis.function("SALT01/02-fetchCurRate", {
        pLissaldocs: this.dv.lissaldocs,
        oldCurrency: this.dv.lissaldocs.currency,
      });

      this.calcPrice();
    },
  },

  methods: {
    calcPrice(event) {
      this.dv.lissaldocs = calcPrice(this.dv.lissaldocs);
    },
    async setDocChar() {
      
      if (
        (this.dv.lissaldocs.customer == "") |
        (this.dv.lissaldocs.doctype == "")
      )
        return;
      let myReturn = await this.lis.function("SALT01/setDocChar", {
        company: this.dv.lissaldocs.company,
        customer: this.dv.lissaldocs.customer,
        doctype: this.dv.lissaldocs.doctype,
      });

      this.dv.lissaldocs.offtype = myReturn.olissal001.offtype;
      this.dv.lissaldocs.ordtype = myReturn.olissal001.ordtype;
      this.dv.lissaldocs.deltype = myReturn.olissal001.deltype;
      this.dv.lissaldocs.invtype = myReturn.olissal001.invtype;

      this.dv.lissaldocs.edoctype = myReturn.edoctype;
      if (this.dv.modi == 0) {
        if (myReturn.olissal001.signprotocol == 0) {
          this.dv.lissaldocs.issignature = 0;
        } else {
          this.dv.lissaldocs.issignature = 1;
        }
      }
    },

    //**** Fetch Customer Infos */
    fetchCustInfos(cust) {
      this.dv.lissaldocs.name1 = cust.name1;
      this.dv.lissaldocs.address = cust.address;
      this.dv.lissaldocs.telnum = cust.telnum;
      this.dv.lissaldocs.email = cust.email;
      this.dv.lissaldocs.cpgender = cust.custper[0].gender;
      this.dv.lissaldocs.cpname = cust.custper[0].name;
      this.dv.lissaldocs.cpsecondname = cust.custper[0].secondname;
      this.dv.lissaldocs.cpsurname = cust.custper[0].surname;
      this.dv.lissaldocs.cpdepartment = cust.custper[0].department;
      this.dv.lissaldocs.cpposition = cust.custper[0].position;
    },
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.dv.sc.fCustomerOpts = this.dv.sc.customerOpts;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.dv.sc.fCustomerOpts = this.dv.sc.customerOpts.filter(
          (v) => v.name1.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    async btnPrint() {
      if (this.dv.lissaldocs.isprinted == true) {
        this.lis.alert(
          "i",
          this.$gl(
            "Belge Daha Önce Kuyruğa Gönderildi.",
            "Document Queued Previously."
          )
        );
        return;
      }

      await this.lis.function("SALT01/02-btnPrint", this.dv);

      this.lis.alert("p", "Kuyruğa Gönderildi.");
    },

    async btnSave() {
      //----- Controls Before Save ---------

      if (
        (this.dv.lissaldocs.doctype == null) |
        (this.dv.lissaldocs.doctype == "")
      ) {
        this.lis.alert(
          "w",
          this.$gl(
            "Lütfen Belge Tipi Seçiniz!",
            "Please Select Document Type!"
          ),
          this.$gl("Belge Kaydedilemedi!", "Could Not Save Document")
        );
        return;
      }
      if (
        (this.dv.lissaldocs.saldept == null) |
        (this.dv.lissaldocs.saldept == "")
      ) {
        this.lis.alert(
          "w",
          this.$gl(
            "Lütfen Satış Bölümü Seçiniz!",
            "Please Select Sales Department!"
          ),
          this.$gl("Belge Kaydedilemedi!", "Could Not Save Document!")
        );
        return;
      }

      if (
        (this.dv.lissaldocs.customer == null) |
        (this.dv.lissaldocs.customer == "")
      ) {
        this.lis.alert(
          "w",
          this.$gl("Lütfen Müşteri Seçiniz!", "Please Select Customer!"),
          this.$gl("Belge Kaydedilemedi!", "Could Not Save Document!")
        );
        return;
      }

      for (let i in this.dv.lissaldocs.vats) {
        if (
          (this.dv.lissaldocs.vats[i].vatrate == 0) &
          ((this.dv.lissaldocs.vats[i].novatcode == "") |
            (this.dv.lissaldocs.vats[i].novatcode == null) |
            (this.dv.lissaldocs.vats[i].novattxt == ""))
        ) {
          this.lis.alert(
            "w",
            this.$gl(
              "Lütfen Vergi Muafiyet Sebebi Seçiniz!",
              "Please Select No Vat Reason!"
            ),
            this.$gl("Belge Kaydedilemedi!", "Could Not Save Document!")
          );
          return;
        }
      }
      if (this.dv.lissaldocs.currency == null) {
        this.$q.notify({
          type: "warning",
          message: this.$gl(
            "Lütfen Para Birimi Giriniz!",
            "Please Fill Currency !"
          ),
          caption: this.$gl("Belge Kaydedilemedi!", "Failed to Save Document!"),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }

      for (let i in this.dv.lissaldocs.items) {
        if (this.dv.lissaldocs.items[i]._deleted == false) {
          if (
            this.dv.lissaldocs.items[i].qunit == null ||
            this.dv.lissaldocs.items[i].qunit == ""
          ) {
            console.log("girdi", this.dv.lissaldocs.items);
            this.$q.notify({
              type: "warning",
              message: this.$gl(
                `Lütfen ${this.dv.lissaldocs.items[i].itemnum} No'lu kalem için Miktar Birimini Giriniz!`,
                "Please Fill Currency !"
              ),
              caption: this.$gl(
                "Belge Kaydedilemedi!",
                "Failed to Save Document!"
              ),
              actions: [{ label: "X", color: "white", dense: true }],
            });
            return;
          }
          if (this.dv.lissaldocs.items[i].quantity <= 0) {
            this.$q.notify({
              type: "warning",
              message: this.$gl(
                `Lütfen ${this.dv.lissaldocs.items[i].itemnum} No'lu kalem için Miktar Giriniz!`,
                "Please Fill Currency !"
              ),
              caption: this.$gl(
                "Belge Kaydedilemedi!",
                "Failed to Save Document!"
              ),
              actions: [{ label: "X", color: "white", dense: true }],
            });
            return;
          }
          if (
            this.dv.lissaldocs.items[i].material == null ||
            this.dv.lissaldocs.items[i].material == ""
          ) {
            this.$q.notify({
              type: "warning",
              message: this.$gl(
                `Lütfen ${this.dv.lissaldocs.items[i].itemnum} No'lu kalem için Malzeme Giriniz!`,
                "Please Fill Currency !"
              ),
              caption: this.$gl(
                "Belge Kaydedilemedi!",
                "Failed to Save Document!"
              ),
              actions: [{ label: "X", color: "white", dense: true }],
            });
            return;
          }
          if (
            this.dv.lissaldocs.items[i].itemtype == null ||
            this.dv.lissaldocs.items[i].itemtype == ""
          ) {
            this.$q.notify({
              type: "warning",
              message: this.$gl(
                `Lütfen ${this.dv.lissaldocs.items[i].itemnum} No'lu kalem için Kalem Tipi Giriniz!`,
                "Please Fill Currency !"
              ),
              caption: this.$gl(
                "Belge Kaydedilemedi!",
                "Failed to Save Document!"
              ),
              actions: [{ label: "X", color: "white", dense: true }],
            });
            return;
          }
        }
      }

      //------ Controls for E-Invoice --------------------------------

      if (
        (this.dv.lissaldocs.edoctype == 1) |
        (this.dv.lissaldocs.edoctype == 2)
      ) {
        if (this.dv.lissaldocs.irctaxdept == "") {
          this.lis.alert("w", "Lütfen Fatura Alıcı Vergi Dairesi Giriniz!");
          return;
        }
        if (this.dv.lissaldocs.irctaxnum == "") {
          this.lis.alert("w", "Lütfen Fatura Alıcı Vergi No Giriniz!");
          return;
        }
      }

      //------ Controls for E-Delivery --------------------------------

      if (this.dv.lissaldocs.edoctype == 3) {
        if (this.dv.lissaldocs.drivername == "") {
          this.lis.alert("w", "Lütfen Şoför Adı Giriniz!");
          return;
        }
        if (this.dv.lissaldocs.driversurname == "") {
          this.lis.alert("w", "Lütfen Şoför Soyadı Giriniz!");
          return;
        }
        if (this.dv.lissaldocs.driverid.length != 11) {
          this.lis.alert("w", "Lütfen Geçerli Bir Şoför TC Giriniz!");
          return;
        }
        if (this.dv.lissaldocs.driverplate == "") {
          this.lis.alert("w", "Lütfen Plaka Bilgisi Giriniz!");
          return;
        }
        //-
        if (this.dv.lissaldocs.grccountry == "") {
          this.lis.alert("w", "Lütfen Mal Alıcısı Ülke Bilgisi Giriniz!");
          return;
        }
        if (this.dv.lissaldocs.grccity == "") {
          this.lis.alert("w", "Lütfen Mal Alıcısı Şehir Bilgisi Giriniz!");
          return;
        }
        if (this.dv.lissaldocs.grcdistrict == "") {
          this.lis.alert("w", "Lütfen Mal Alıcısı Semt Bilgisi Giriniz!");
          return;
        }
        if (this.dv.lissaldocs.grcbuilding == "") {
          this.lis.alert("w", "Lütfen Mal Alıcısı Kapı No Giriniz!");
          return;
        }
        if (this.dv.lissaldocs.grcpostcode == "") {
          this.lis.alert("w", "Lütfen Mal Alıcısı Posta Kodu Giriniz!");
          return;
        }
      }

      //------ Print & Save The E-Document ----------

      if (
        (this.dv.lissaldocs.isprinted == false) &
        (this.dv.lissaldocs.edoctype > 0) &
        (this.dv.lissaldocs._deleted == false)
      ) {
        let myReturn = await this.lis.message(
          "c",
          "LISERP",
          this.dv.lissaldocs.edoctype == 1
            ? this.$gl(
                "E-Fatura Kuyruğa Gönderilsin mi?",
                "Send E-Invoice to Queue?"
              )
            : this.dv.lissaldocs.edoctype == 2
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
          this.dv.lissaldocs = await this.lis.function(
            "SALT01/02-btnSave",
            this.dv
          );
          this.lis.alert(
            "p",
            this.$gl("Satış Belgesi Kaydedildi.", "Sales Document Saved.")
          );
          await this.btnPrint(true);
        } else {
          //------ Just Save The Document ----------
          await this.lis.function("SALT01/02-btnSave", this.dv);
          this.lis.alert(
            "p",
            this.$gl("Satış Belgesi Kaydedildi.", "Sales Document Saved.")
          );
        }
      } else {
        //------ Save The Document ----------
        this.dv.lissaldocs = await this.lis.function(
          "SALT01/02-btnSave",
          this.dv
        );
        this.lis.alert(
          "p",
          this.$gl("Satış Belgesi Kaydedildi.", "Sales Document Saved.")
        );
      }
      if (
        (this.dv.lissaldocs.isfinance == true) &
        (this.dv.lissaldocs.invtype > 0)
      ) {
        // create finance Document for invoice
        await this.createFinFromSal();
        if (this.dv.isShowFinDoc == true) {
          this.dv.isShowFinDocDialog = true;
        } else {
          await this.saveFinDoc();
          this.cancel();
        }
      } else {
        this.cancel();
      }
    },

    async createFinFromSal() {
      //------ Create The Finance Document ----------
      this.dv.lisfindocs = await this.lis.function(
        "cls-finance.createFinFromSal",
        this.dv.lissaldocs
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
        this.$gl("Muhasebe Belgesi Kaydedildi.", "Sales Document Saved.")
      );
      this.cancel();
      this.dv.isShowFinDocDialog = false;
    },
    cancel() {
      if (this.isDialog == undefined) {
        this.dv.isShowFinDocDialog = false;
        this.tabInfo.blockGoToTransaction = false;
        this.dv.lisDialog = "SALT01D01";
      } else {
        this.$emit("cancel");
      }
    },
  },
  async mounted() {
    this.dv.liscustomers = await this.lis.function("SALT01/02-init", this.dv);
    if ((this.dv.modi <= 0) & (this.dv.lissaldocs.customer != ""))
      this.setDocChar();
    if (this.dv.modi != 2) this.tabInfo.blockGoToTransaction = true;
  },
  async beforeUnmount() {
    if (this.dv.modi != 2) {
      await this.lis.function("cls-system.unlock", this.dv.lockKeyParams);
    }
  },
};
</script>

<style>
.q-table--dense .q-table th,
.q-table--dense .q-table td {
  padding: 0px 0px;
}
</style>
