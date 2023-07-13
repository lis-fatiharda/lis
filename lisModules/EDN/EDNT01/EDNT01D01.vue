<template>
  <l-div>
    <q-layout view="hHh lpR fFf" container style="height: 850px">
      <q-header reveal :class="`bg-${tabInfo.moduleColor} text-black`">
        <l-toolbar>
          <l-btn
            flat
            @click="drawerLeft = !drawerLeft"
            round
            dense
            icon="chevron_right"
          />
          <l-toolbar-title>{{ strHeadText }}</l-toolbar-title>
          <l-toolbar-title class="row">
            

            <l-select
                    :label="this.$gl(`Firma`, `Company`)"
                    v-model="dv.sc.company"
                    options="lisbas001"
                    optValue="company"
                    optTitle="stext"
                    optCaptions="company"
                    width="120px"
                    class="bg-blue-1"
                    @click="dv.sc.companyStext = dv.sc.company"
                />
            <l-input
              
              dense
              readonly
              v-model="dv.sc.companyStext"
            ></l-input>
          </l-toolbar-title>

          <l-toolbar-title class="row">
            <l-btn
              
              dense
              icon="recent_actors"
              color="teal-2"
              class="text-black"
              @click="CheckUserList()"
              ><l-tooltip>{{
                this.$gl("Mükellef Listesi Güncelle", "Update Taxpayer List")
              }}</l-tooltip>
            </l-btn>
          </l-toolbar-title>

          <l-btn
            icon="cancel"
            color="negative"
            @click="this.$btnGoHome(tabInfo)"
          />
        </l-toolbar>
      </q-header>

      <q-drawer
        v-model="drawerLeft"
        :width="220"
        :breakpoint="700"
        bordered
        class="bg-grey-2"
      >
        <q-scroll-area class="fit">
          <div style="max-width: 300px">
            <q-list class="rounded-borders">
              <q-expansion-item
                expand-separator
                icon="description"
                :label="this.$gl(`E-Fatura`, `E-Invoice`)"
                default-opened
                popup
                dense
              >
                <q-expansion-item
                  :header-inset-level="1"
                  expand-separator
                  icon="receipt"
                  :label="this.$gl(`Gelen`, `Incoming`)"
                  default-opened
                  dense
                >
                  <l-card>
                    <l-card-section>
                      <l-chip
                        clickable
                        icon="loupe"
                        color="teal-2"
                        size="12px"
                        @click="
                          dv.hProcessInt = 101;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Yeni", "New") }}</l-chip
                      >
                      <l-chip
                        clickable
                        icon="receipt"
                        color="blue-2"
                        size="12px"
                        @click="
                          dv.hProcessInt = 102;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Alınan", "Received") }}</l-chip
                      >
                      <l-chip
                        clickable
                        icon="error"
                        color="red-3"
                        size="12px"
                        @click="
                          dv.hProcessInt = 103;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Hatalı", "Incorrect") }}</l-chip
                      >
                      <l-chip
                        clickable
                        icon="archive"
                        color="brown-2"
                        size="12px"
                        @click="
                          dv.hProcessInt = 104;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Arşivlenen", "Archived") }}</l-chip
                      >
                    </l-card-section>
                  </l-card>
                </q-expansion-item>
                <q-expansion-item
                  :header-inset-level="1"
                  expand-separator
                  icon="outbox"
                  :label="this.$gl(`Giden`, `Outgoing`)"
                  default-opened
                  dense
                >
                  <l-card>
                    <l-card-section>
                      <l-chip
                        clickable
                        icon="loupe"
                        color="teal-2"
                        size="12px"
                        @click="
                          dv.hProcessInt = 111;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Yeni", "New") }}</l-chip
                      >
                      <l-chip
                        clickable
                        icon="send"
                        color="blue-2"
                        size="12px"
                        @click="
                          dv.hProcessInt = 112;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Gönderilen", "Sent") }}</l-chip
                      >
                      <l-chip
                        clickable
                        icon="error"
                        color="red-3"
                        size="12px"
                        @click="
                          dv.hProcessInt = 113;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Hatalı", "Incorrect") }}</l-chip
                      >
                      <l-chip
                        clickable
                        icon="archive"
                        color="brown-2"
                        size="12px"
                        @click="
                          dv.hProcessInt = 114;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Arşivlenen", "Archived") }}</l-chip
                      >
                    </l-card-section>
                  </l-card>
                </q-expansion-item>
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="send_and_archive"
                :label="this.$gl(`E-Arşiv`, `E-Archive`)"
                default-opened
                popup
                dense
              >
                <q-expansion-item
                  :header-inset-level="1"
                  expand-separator
                  icon="outbox"
                  :label="this.$gl(`Giden`, `Outgoing`)"
                  default-opened
                  dense
                >
                  <l-card>
                    <l-card-section>
                      <l-chip
                        clickable
                        icon="loupe"
                        color="teal-2"
                        size="12px"
                        @click="
                          dv.hProcessInt = 211;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Yeni", "New") }}</l-chip
                      >
                      <l-chip
                        clickable
                        icon="send"
                        color="blue-2"
                        size="12px"
                        @click="
                          dv.hProcessInt = 212;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Gönderilen", "Sent") }}</l-chip
                      >
                      <l-chip
                        clickable
                        icon="error"
                        color="red-3"
                        size="12px"
                        @click="
                          dv.hProcessInt = 213;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Hatalı", "Incorrect") }}</l-chip
                      >
                      <l-chip
                        clickable
                        icon="archive"
                        color="brown-2"
                        size="12px"
                        @click="
                          dv.hProcessInt = 214;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Arşivlenen", "Archived") }}</l-chip
                      >
                    </l-card-section>
                  </l-card>
                </q-expansion-item>
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="local_shipping"
                :label="this.$gl(`E-İrsaliye`, `E-Delivery`)"
                default-opened
                popup
                dense
              >
                <q-expansion-item
                  :header-inset-level="1"
                  expand-separator
                  icon="receipt"
                  :label="this.$gl(`Gelen`, `Incoming`)"
                  default-opened
                  dense
                >
                  <l-card>
                    <l-card-section>
                      <l-chip
                        clickable
                        icon="loupe"
                        color="teal-2"
                        size="12px"
                        @click="
                          dv.hProcessInt = 301;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Yeni", "New") }}</l-chip
                      >
                      <l-chip
                        clickable
                        icon="receipt"
                        color="blue-2"
                        size="12px"
                        @click="
                          dv.hProcessInt = 302;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Alınan", "Received") }}</l-chip
                      >
                      <l-chip
                        clickable
                        icon="error"
                        color="red-3"
                        size="12px"
                        @click="
                          dv.hProcessInt = 303;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Hatalı", "Incorrect") }}</l-chip
                      >
                      <l-chip
                        clickable
                        icon="archive"
                        color="brown-2"
                        size="12px"
                        @click="
                          dv.hProcessInt = 304;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Arşivlenen", "Archived") }}</l-chip
                      >
                    </l-card-section>
                  </l-card>
                </q-expansion-item>
                <q-expansion-item
                  :header-inset-level="1"
                  expand-separator
                  icon="outbox"
                  :label="this.$gl(`Giden`, `Outgoing`)"
                  default-opened
                  dense
                >
                  <l-card>
                    <l-card-section>
                      <l-chip
                        clickable
                        icon="loupe"
                        color="teal-2"
                        size="12px"
                        @click="
                          dv.hProcessInt = 311;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Yeni", "New") }}</l-chip
                      >
                      <l-chip
                        clickable
                        icon="send"
                        color="blue-2"
                        size="12px"
                        @click="
                          dv.hProcessInt = 312;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Gönderilen", "Sent") }}</l-chip
                      >
                      <l-chip
                        clickable
                        icon="error"
                        color="red-3"
                        size="12px"
                        @click="
                          dv.hProcessInt = 313;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Hatalı", "Incorrect") }}</l-chip
                      >
                      <l-chip
                        clickable
                        icon="archive"
                        color="brown-2"
                        size="12px"
                        @click="
                          dv.hProcessInt = 314;
                          this.btnSearch();
                        "
                        >{{ this.$gl("Arşivlenen", "Archived") }}</l-chip
                      >
                    </l-card-section>
                  </l-card>
                </q-expansion-item>
              </q-expansion-item>
            </q-list>
          </div>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page class="q-pa-xs">
          <l-card class="row q-gutter-xs q-pa-xs">
            <l-input
              
              v-model="dv.sc.doctype"
              :label="this.$gl(`Belge Tipi`, `Document Type`)"
              dense
            >
            </l-input>

            <l-input
              
              dense
              v-model="dv.sc.docnum"
              :label="this.$gl(`Belge No`, `Document No`)"
            />

            <l-input
              
              dense
              v-model="dv.sc.einvonumber"
              :label="this.$gl(`E-Fatura No`, `E-Invoice No`)"
            />

            <l-date
              v-model="dv.sc.docDate1"
              :label="
                this.$gl(
                  `Belge Tarih Aralığı Başl.`,
                  `Document Date Range Start`
                )
              "
              style="width: 180px"
            />
            <l-date
              v-model="dv.sc.docDate2"
              :label="
                this.$gl(
                  `Belge Tarih Aralığı Bitş.`,
                  `Document Date Range End.`
                )
              "
              style="width: 180px"
            />
            <l-date
              v-model="dv.sc.edocDate1"
              :label="
                this.$gl(`Edn Tarih Aralığı Başl.`, `Edn Date Range Start`)
              "
              style="width: 180px"
            />
            <l-date
              v-model="dv.sc.edocDate2"
              :label="
                this.$gl(`Edn Tarih Aralığı Bitş.`, `Edn Date Range Ending.`)
              "
              style="width: 180px"
            />

            <l-input
              :label="this.$gl(`Müşteri Kodu`, `Customer Code`)"
              
              dense
              v-model="dv.sc.customer"
            >
              <l-chip
                class="bg-white"
                icon="search"
                dense
                clickable
                @click="isSelectCust = !isSelectCust"
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
              dense
            >
            </l-input>
          </l-card>

          <q-div class="q-gutter-xs q-pa-xs">
            <l-btn color="warning"  icon="search" @click="btnSearch()" />
            <l-btn color="info"  icon="visibility" @click="btnShow(dv)" />
            <l-btn color="red-4"  icon="delete" @click="btnDelete(dv)" />
            <l-btn color="pink-4"  icon="print" @click="btnPrint(dv)" />
            <l-btn
              v-if="
                (dv.hProcessInt.toString().substring(1, 2) == '1') &
                ((dv.hProcessInt.toString().substring(2, 3) == '1') |
                  (dv.hProcessInt.toString().substring(2, 3) == '3'))
                  ? true
                  : false
              "
              color="teal-4"
              
              :label="this.$gl(`Gönder`, `Send`)"
              @click="btnSend(dv)"
            />
            <l-btn
              v-if="
                (dv.hProcessInt.toString().substring(1, 2) == '1') &
                ((dv.hProcessInt.toString().substring(2, 3) == '1') |
                  (dv.hProcessInt.toString().substring(2, 3) == '3'))
                  ? true
                  : false
              "
              color="teal-4"
              
              :label="this.$gl(`P.K.Değiştir`, `pk?`)"
              @click="btnSend(dv)"
            />
            <l-btn
              v-if="
                (dv.hProcessInt.toString().substring(0, 1) == '1') &
                (dv.hProcessInt.toString().substring(1, 2) == '1') &
                ((dv.hProcessInt.toString().substring(2, 3) == '2') |
                  (dv.hProcessInt.toString().substring(2, 3) == '3'))
                  ? true
                  : false
              "
              color="teal-4"
              
              :label="this.$gl(`Statü Kontrol`, `Status Check`)"
              @click="btnStatusControl()"
            />
            <!-- -->
            <l-btn
              v-if="dv.hProcessInt.toString().substring(1, 2) == '0'"
              color="teal-4"
              
              :label="this.$gl(`Gelen Fatura Al`, `Receive Incoming Invoice`)"
              @click="btnSend()"
            />
            <l-btn
              v-if="
                dv.hProcessInt.toString().substring(1, 2) == '0' ? true : false
              "
              color="teal-4"
              
              :label="this.$gl(`İçeri Almadan Reddet`, `Deny Without Intake`)"
              @click="btnSend()"
            />
            <l-btn
              v-if="
                dv.hProcessInt.toString().substring(1, 2) == '0' ? true : false
              "
              color="teal-4"
              
              :label="
                this.$gl(`İçeri Almadan Onayla`, `Confirm Without Checking In`)
              "
              @click="btnSend()"
            />
            <l-btn
              v-if="
                dv.hProcessInt.toString().substring(1, 2) == '0' ? true : false
              "
              color="teal-4"
              
              :label="this.$gl(`İçeri Al`, `Import`)"
              @click="btnSend()"
            />
          </q-div>

          <l-table
            name="EDNT01D01"
            :tableData="dv.lisedndocsList"
            :columns="myColumnsEdn"
            :height="'68vh'"
            :width="'100%'"
            :readonly="true"
          />
        </q-page>

        <ednt01d02 />
      </q-page-container>
    </q-layout>
  </l-div>
</template>

<script>
import ednt01d02 from "./EDNT01D02.vue";
export default {
  props: ["lv", "tabInfo"],
  components: {
    ednt01d02,
  },

  data() {
    return {
      myColumnsEdn: [
        {
          label: this.$gl("Belge Tipi", "Document Type"),
          value: "doctype",
          type: "string",
        },
        {
          label: this.$gl("Belge No", "Document No"),
          value: "docnum",
          type: "string",
        },
        {
          label: this.$gl("E-Belge No", "E-Document Number"),
          value: "einvonumber",
          type: "string",
        },
        {
          label: this.$gl("Müşteri Kodu", "Customer Code"),
          value: "customer",
          type: "string",
        },
        {
          label: this.$gl("Müşteri Adı", "Customer Name"),
          value: "name1",
          type: "string",
        },
        {
          label: this.$gl("Belge Toplamı", "Document Total"),
          value: "grandtotal",
          type: "number",
        },
        {
          label: this.$gl("P.Br.", "Currency"),
          value: "currency",
          type: "string",
        },
        {
          label: this.$gl("P.Kutusu", "P.Box"),
          value: "alias",
          type: "string",
        },
        {
          label: this.$gl("UUID", "UUID"),
          value: "einvouuid",
          type: "string",
        },
        {
          label: this.$gl("K.Gönderilme Tarihi", "Queued Date"),
          value: "edocdate",
          type: "date",
        },
        {
          label: this.$gl("K.Gönderen", "Queued Sender"),
          value: "createdby",
          type: "string",
        },
        {
          label: this.$gl("İşlem Tarihi", "Transaction date"),
          value: "docdate",
          type: "date",
        },
        {
          label: this.$gl("İşlem Yapan", "Transacter"),
          value: "processedby",
          type: "string",
        },
        {
          label: this.$gl("Statü Kodu", "Status Code"),
          value: "processstat",
          type: "string",
        },
        {
          label: this.$gl("Statü Açıklaması", "Status Text"),
          value: "processstatstr",
          type: "string",
        },
      ],
      dv: {
        sc: {
          company: "01",
          companyStext: "",
          doctype: "",
          docnum: "",
          einvonumber: "",
          docDate1: this.lis.firstDayOfMonth(),
          docDate2: new Date("2030-01-01"),
          edocDate1: this.lis.firstDayOfMonth(),
          edocDate2: new Date("2030-01-01"),
          customer: "",
          name1: "",
          edoctype: 3,
          postway: 1,
          
        },

        lisedndocsList: [],
        hProcessInt: 111,
        selectedRow: "",
      },
      hProcessText: "",
      drawerLeft: true,
      isSelectCust: false,
    };
  },
  computed: {
    strHeadText() {
      switch (this.dv.hProcessInt) {
        case 101:
          return "E-Fatura - Gelen / Yeni";
          break;
        case 102:
          return "E-Fatura - Gelen / Alınan";
          break;
        case 103:
          return "E-Fatura - Gelen / Hata";
          break;
        case 104:
          return "E-Fatura - Gelen / Arşiv";
          break;

        case 111:
          return "E-Fatura - Giden / Yeni";
          break;
        case 112:
          return "E-Fatura - Giden / Gönderilen";
          break;
        case 113:
          return "E-Fatura - Giden / Hata";
          break;
        case 114:
          return "E-Fatura - Giden / Arşiv";
          break;

        case 211:
          return "E-Arşiv - Giden / Yeni";
          break;
        case 212:
          return "E-Arşiv - Giden / Gönderilen";
          break;
        case 213:
          return "E-Arşiv - Giden / Hata";
          break;
        case 214:
          return "E-Arşiv - Giden / Arşiv";
          break;

        case 301:
          return "E-İrsaliye - Gelen / Yeni";
          break;
        case 302:
          return "E-İrsaliye - Gelen / Alınan";
          break;
        case 303:
          return "E-İrsaliye - Gelen / Hata";
          break;
        case 304:
          return "E-İrsaliye - Gelen / Arşiv";
          break;

        case 311:
          return "E-İrsaliye - Giden / Yeni";
          break;
        case 312:
          return "E-İrsaliye - Giden / Gönderilen";
          break;
        case 313:
          return "E-İrsaliye - Giden / Hata";
          break;
        case 314:
          return "E-İrsaliye - Giden / Arşiv";
          break;
        default:
          break;
      }
    },
  },
  methods: {
    async btnStatusControl() {
      await this.lis.function("EDNT01/01-btnStatusControl", this.dv);
      this.lis.alert("p", "Belge Statüleri Güncellendi.");
      this.btnSearch();
    },
    async btnSend() {
      await this.lis.function("EDNT01/01-btnSend", this.dv);
      this.lis.alert("p", "Seçili Belgeler Gönderildi.");
      this.btnSearch();
    },
    async CheckUserList() {
      await this.lis.function("ednt01/01-checkUserList");
    },

    async btnSearch() {
      this.dv = await this.lis.function("EDNT01/01-btnSearch", this.dv);
    },
    async btnDelete() {
      await this.lis.function("EDNT01/01-btnDelete", this.dv);
      this.lis.alert("p", "Belge Kuyruktan Silindi.");
    },
    async btnPrint() {
      const item = this.dv.lisedndocsList.filter((e) => {
        return e._selected == true;
      });

      function b64_to_utf8(str) {
        return decodeURIComponent(escape(window.atob(str)));
      }
      //----------------------

      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(item[0].edistr, "text/xml");
      var xsltEncoded = xmlDoc.getElementsByTagName(
        "cbc:EmbeddedDocumentBinaryObject"
      )[0].childNodes[0].nodeValue;

      const xsltDecoded = b64_to_utf8(xsltEncoded);

      console.log("xsltDecoded", xsltDecoded);

      //----------------------
      let ediStr =
        "<?xml-stylesheet type='text/xsl' href='" +
        item[0].doctype +
        "_" +
        item[0].docnum +
        ".xslt'?>" +
        item[0].edistr;

      const url = window.URL.createObjectURL(new Blob([ediStr]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        item[0].doctype + "_" + item[0].docnum + ".xml"
      ); //or any other extension
      document.body.appendChild(link);
      link.click();
      //---

      const urlxslt = window.URL.createObjectURL(new Blob([xsltDecoded]));
      const linkxslt = document.createElement("a");
      linkxslt.href = urlxslt;
      linkxslt.setAttribute(
        "download",
        item[0].doctype + "_" + item[0].docnum + ".xslt"
      ); //or any other extension
      document.body.appendChild(linkxslt);
      linkxslt.click();
    },
  },

  async mounted() {
    this.dv = await this.lis.function("EDNT01/01-init", this.dv);
  },
};
</script>
