<template>
  <l-div>
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="account_balance" />

        <l-toolbar-title>{{
          this.$gl("Hesap Hareketleri (Muavin Defter)", "Account Processes")
        }}</l-toolbar-title>

        <l-btn
          v-if="isChild == undefined"
          icon="cancel"
          flat
          round
          color="negative"
          @click="this.$btnGoHome(tabInfo)"
        />
        <l-btn
          v-if="isChild != undefined"
          icon="cancel"
          flat
          round
          color="negative"
          @click="cancel()"
        />
      </l-toolbar>

      <l-tabs v-model="tab">
        <l-tab name="Sorgula" :label="this.$gl(`Sorgula`, `Search`)" />
        <l-tab name="Sorgula +" :label="this.$gl(`Sorgula +`, `Search +`)" />
        <l-tab name="Opsiyonlar" :label="this.$gl(`Opsiyonlar`, `Options`)" />
      </l-tabs>

      <l-tab-panels v-model="tab" animated>
        <l-tab-panel name="Sorgula" class="row q-pa-xs q-gutter-xs">
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
            :label="this.$gl(`Hesap Tipi`, `Account Type`)"
            v-model="dv.sc.acctype"
            options="lisfin004"
            optValue="acctype"
            optTitle="stext"
            optCaptions="acctype"
            width="130px"
            class="bg-blue-1"
          />

          <l-input
            :label="this.$gl(`Hesap No`, `Account No`)"
            v-model="dv.sc.account"
            class="bg-blue-1"
          >
            <l-chip
              class="bg-blue-1"
              icon="search"
              dense
              clickable
              @click="isSelectAcc = !isSelectAcc"
            >
              <FINT01D01mini
                :pComp="dv.sc.company"
                :isShow="isSelectAcc"
                @ok="
                  dv.sc.account = $event.account;
                  isSelectAcc = false;
                "
                @cancel="isSelectAcc = false"
              />
            </l-chip>
          </l-input>
          <l-input
            :label="this.$gl(`T.D Hesap`, `Uniform Account`)"
            v-model="dv.sc.glaccount"
          >
            <l-chip
              class="bg-white"
              icon="search"
              dense
              clickable
              @click="isSelectGla = !isSelectGla"
            >
              <FINT01D01mini
                :pComp="dv.sc.company"
                :isShow="isSelectGla"
                @ok="
                  dv.sc.glaccount = $event.glaccount;
                  isSelectGla = false;
                "
                @cancel="isSelectGla = false"
              />
            </l-chip>
          </l-input>
          <l-date
            :label="this.$gl(`Yev. Tar. Başl.`, `Post. Date Str.`)"
            v-model="dv.sc.datefrom"
            style="width: 150px"
          />
          <l-date
            :label="this.$gl(`Yev. Tar. Bitiş`, `Post. Date End`)"
            v-model="dv.sc.dateuntil"
            style="width: 150px"
          />
        </l-tab-panel>

        <l-tab-panel name="Sorgula +" class="row q-pa-xs q-gutter-xs">
        </l-tab-panel>

        <l-tab-panel name="Opsiyonlar" class="row q-pa-xs q-gutter-xs">
        </l-tab-panel>
      </l-tab-panels>
    </l-card0>

    <!--Searching Criterias Layer------>

    <!--------------------------------->

    <!--Butons Layer Layer---------------------->
    <l-div0-flex class="q-gutter-xs">
      <l-btn color="primary" icon="search" @click="btnSearch(dv)" />
      <l-btn color="orange" icon="print" @click="btnSearch(dv)" />
      <l-space />
      <l-btn label="Muhasebe Belgesi" outline clickable @click = showFint02() />
      <l-btn label="Erişim" outline />
      <l-space />
    </l-div0-flex>

    <l-table
      name="FINT03D01"
      v-model="dv.reportList"
      :columns="columns"
      :context="contextMenu"
      :width="'100%'"
      :readonly="true"
    />
    <l-dialog v-model="isShowFint02" persistent>
    <l-card0>
      <FINT02D02
        :pCompany = "dv.company"
        :pDoctype = "dv.acctype"
        :pDocnum = "dv.account"
        :tabInfo="tabInfo"
        :isChild02="true"
        @cancel="isShowFint02 = false"
        :modi = "2"
      />
    </l-card0>
  </l-dialog>

    <FINT01D01mini
      :pComp="dv.sc.company"
      :isShow="zoomMaterialRow == null ? false : true"
      @ok="
        lis.objectMove($event, dv.lissaldocs.items[zoomMaterialRow]);
        dv.lissaldocs.items[zoomMaterialRow].material = $event.material;
        dv.lissaldocs.items[zoomMaterialRow].mtext = $event.stext;
        dv.lissaldocs.items[zoomMaterialRow].itemtype = $event.salitemtype;
        dv.lissaldocs.items[zoomMaterialRow].qunit = $event.salunit;
        dv.lissaldocs.items[zoomMaterialRow].vatrate = $event.salvatkey;
        zoomMaterialRow = null;
        calcPrice();
      "
      @cancel="zoomMaterialRow = null"
    />
  </l-div>
</template>

<script>
import FINT02D02 from "../../FIN/FINT02/FINT02D02.vue";
export default {
  props: ["lv", "cv", "goToTransaction", "currentTab", "tabInfo", "isChild"],
  components: {FINT02D02},

  data() {
    return {
      isSelectAcc: false,
      isSelectGla: false,
      isShowFint02: false,
      tab: "Sorgula",
      dv: {
        sc: {
          company: "01",
          busarea: "",
          acctype: "",
          account: "",
          datefrom: this.lis.firstDayOfYear(),
          dateuntil: this.lis.lastDayOfMonth(),

          amntmax: 0,
          amntmin: 0,
          acctype: "",
          account: "",
          atext: "",
          currency: "",
          glaccount: "",
          accclass: "",
          accgrp: "",
          isdirectupd: false,
          _deleted: false,
        },
        company: "01",
        busarea: "S",
          acctype: "",
          account: "",

        tbalance: 0,

        reportList: [],
      },
      columns: [
        {
          label: this.$gl(`Yevmiye Tarihi`, `Post Date.`),
          value: "postdate",
          type: "date",
          _textColor: "red",
        },
        {
          label: this.$gl(`Vade Tarihi`, `Post Date.`),
          value: "postdate",
          type: "date",
          _textColor: "red",
        },

        {
          label: this.$gl(`Belge Tipi`, `Document Type`),
          value: "doctype",
          type: "string",
          _textColor: "blue",
        },
        {
          label: this.$gl(`Belge No`, `Document No`),
          value: "docnum",
          type: "string",
          _textColor: "blue",
        },

        {
          label: this.$gl(`Kalem`, `Item`),
          value: "items.itemnum",
          type: "number",
        },

        {
          label: "Harici Blg.Tipi",
          value: "extdoctype",
          type: "string",
        },
        {
          label: "Harici Blg.No",
          value: "extdocnum",
          type: "string",
        },

        {
          label: this.$gl(`Hesap Tipi`, `Account Type`),
          value: "items.acctype",
          type: "string",
        },

        {
          label: this.$gl(`Hesap No`, `Account`),
          value: "items.account",
          type: "string",
        },
        {
          label: this.$gl(`Hesap Açk.`, `Account Text`),
          value: "items.atext",
          type: "string",
        },
        {
          label: this.$gl(`T.D Hesap No`, `T.D Account`),
          value: "items.glaccount",
          type: "string",
        },
        {
          label: this.$gl(`Açıklama`, `Text`),
          value: "items.stext",
          type: "string",
        },

        {
          label: this.$gl(`Borç Toplamı (Belge P.Br.)`, `Amnt.(Doc.Cur.Unt.)`),
          value: "items.ddebit",
          type: "number",
          _textColor: "green",
        },
        {
          label: this.$gl(
            `Alacak Toplamı (Belge P.Br.)`,
            `Amnt.(Doc.Cur.Unt.)`
          ),
          value: "items.dcredit",
          type: "number",
          _textColor: "green",
        },
        {
          label: this.$gl(`Bakiye (Belge P.Br.)`, `Diff.(Doc.Cur.Unt.)`),
          value: "items.ddiff",
          type: "number",
          _textColor: "blue",
        },
        {
          label: this.$gl(`B/A`, `B/A`),
          value: "items.dpostway",
          type: "string",
        },

        {
          label: this.$gl(`B.P.Br.`, `currency`),
          value: "items.currency",
          type: "string",
        },
        {
          label: this.$gl(`Kur`, `Exch.Rate`),
          value: "items.currate",
          type: "number",
        },

        {
          label: this.$gl(`Borç Toplamı (Firma P.Br.)`, `Amnt.(Com.Cur.Unt.)`),
          value: "items.hdebit",
          type: "number",
          _textColor: "green",
        },
        {
          label: this.$gl(
            `Alacak Toplamı (Firma P.Br.)`,
            `Amnt.(Com.Cur.Unt.)`
          ),
          value: "items.hcredit",
          type: "number",
          _textColor: "green",
        },

        {
          label: this.$gl(`Bakiye (Firma P.Br.)`, `Diff.(Com.Cur.Unt.)`),
          value: "items.hdiff",
          type: "number",
          _textColor: "blue",
        },
        {
          label: this.$gl(`B/A`, `B/A`),
          value: "items.hpostway",
          type: "string",
        },
      ],
    };
  },

  methods: {
    async btnSearch(prop) {
      if (this.dv.sc.acctype == "") {
        this.lis.alert("w", "Lütfen Hesap Tipi Seçiniz!");
        return;
      }

      if (this.dv.sc.account == "") {
        this.lis.alert("w", "Lütfen Hesap No Seçiniz!");
        return;
      }
      this.dv = await this.lis.function("FINT03/01-btnSearch", prop);
    },
    cancel() {
      this.$emit("cancel", false);
    },
     showFint02() {
            let selectedRow = this.dv.reportList.filter((e)=> e._selected == true)
            console.log("selectedRow",selectedRow);
            this.dv.account = selectedRow[0].docnum;
            this.dv.acctype = selectedRow[0].doctype;
            console.log("asfhfghdfghsfd",this.dv.acctype);
            this.isShowFint02 = true},
  },

  mounted() {
    //console.log("cv", this.cv.busarea);
    if (this.cv != undefined) {
      this.dv.sc.busarea = this.cv.busarea;
      this.dv.sc.acctype = this.cv.acctype;
      this.dv.sc.account = this.cv.account;
      this.btnSearch(this.dv);
    }
  },
};
</script>
