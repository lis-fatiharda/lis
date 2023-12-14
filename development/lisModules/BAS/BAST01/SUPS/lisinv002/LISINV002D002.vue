<template>
  <l-div v-if="mv.lisDialog == 'LISINV002D002'">
    <!--Tittle Layer-->
    <l-card>
      <q-bar class="bg-blue-grey-3"> Destek Tablosu - lisinv002 </q-bar>
      <q-bar :class="`bg-${tabInfo.moduleColor}`">
        <l-toolbar-title>{{
          this.$gl(
            "Envanter Yönetimi Kullanıcı Hakları Detayı",
            "Inventory Management User Rights Detail"
          )
        }}</l-toolbar-title>
        <l-btn
          v-if="mv.modi != 2"
          icon="save"
          flat
          round
          dense
          color="teal"
          @click="btnSave()"
        />
        <l-btn
          icon="cancel"
          flat
          round
          dense
          color="negative"
          @click="cancel()"
        />
      </q-bar>
    </l-card>
    <l-card>
      <l-card-section horizontal>
        <l-div-flex>
          <l-select
            :label="this.$gl(`Firma`, `Company`)"
            v-model="mv.lisinv002.company"
            options="lisbas001"
            optValue="company"
            optTitle="stext"
            optCaptions="company"
            width="120px"
          />
          <!-- <l-input dense label="Kullanıcı" v-model="mv.lisinv002.invuser" /> -->
          <l-input
            :label="this.$gl(`Kullanıcı`, `User`)"
            v-model="mv.lisinv002.invuser"
          >
            <l-chip
              class="bg-white"
              icon="search"
              dense
              :clickable="mv.modi == 1 ? false : true"
              @click="isSelectUser = !isSelectUser"
            >
              <SYST03D01mini
                :tabInfo="tabInfo"
                :isShow="isSelectUser"
                @ok="
                  mv.lisinv002.invuser = $event.username;
                  isSelectUser = false;
                "
                @cancel="isSelectUser = false"
              />
            </l-chip>
          </l-input>
        </l-div-flex>
      </l-card-section>
    </l-card>
    <l-card0>
      <l-tabs v-model="tab">
        <l-tab name="right" label="Kullanıcı Hakları" />
        <l-tab name="auth" label="Depo ve Hareket Kodu" />
      </l-tabs>

      <l-tab-panels v-model="tab" animated style="padding: 0">
        <l-tab-panel name="right" style="padding: 0">
          <l-table
            name="LISINV002D002"
            v-model="mv.lisinv002.rights"
            :columns="myColumnsinv02rights"
            :height="'57vh'"
            :context="contextMenuR"
            @keydown="if ($event.key == 'Insert') this.pushNewRight($event);"
          />
        </l-tab-panel>
        <l-tab-panel name="auth" style="padding: 0">
          <l-table
            name="LISINV002D002"
            v-model="mv.lisinv002.authorizations"
            :columns="myColumnsinv02auth"
            :height="'57vh'"
            :context="contextMenuA"
            @keydown="if ($event.key == 'Insert') this.pushNewAuth($event);"
          />
        </l-tab-panel>
      </l-tab-panels>
    </l-card0>
    <!--Searching Criterias Layer-->
  </l-div>
</template>

<script>
export default {
  props: ["lv", "dv", "goToTransaction", "currentTab", "tabInfo", "mv"],
  components: {},

  data() {
    return {
      tab: "right",
      isSelectUser: false,
      contextMenuR: [
        {
          name: "Satır Ekle",
          callback: async () => {
            this.pushNewRight();
          },
        },
      ],
      contextMenuA: [
        {
          name: "Satır Ekle",
          callback: async () => {
            this.pushNewAuth();
          },
        },
      ],
      myColumnsinv02auth: [
        {
          label: this.$gl("Har.Kodu", "Move Code"),
          value: "trantype",
          type: "selectmenu",
          options: "lisinv006",
          optValue: "movecode",
          optTitles: { movecode: "Hareket Kodu", stext: "Açıklama" },
        },
        {
          type: "selectmenu",
          label: this.$gl("Depo", "Warehouse"),
          value: "warehouse",
          options: "lisinv003",
          optValue: "warehouse",
          optTitles: { warehouse: "Depo", stext: "Açıklama" },
        },
        {
          type: "selectmenu",
          label: this.$gl("Stok Yeri", "stockplace"),
          value: "stockplace",
          options: "lisinv004",
          optValue: "stockplace",
          optTitles: { stockplace: "Stok Yeri", stext: "Açıklama" },
        },

        {
          label: this.$gl("Har. Yönü", "Move Drct."),
          value: "qpostway",
          type: "selectmenu",
          options: [
            { value: 0, stext: "Giriş" },
            { value: 1, stext: "Çıkış" },
          ],
          optValue: "value",
          optTitles: { value: "Değer", stext: "Açıklama" },
        },

        {
          label: this.$gl("İzin?", "Is Allowed"),
          value: "isallowed",
          type: "selectmenu",
          options: [
            { value: 0, stext: "İzin Verilmiyor" },
            { value: 1, stext: "İzin Veriliyor" },
          ],
          optValue: "value",
          optTitles: { value: "Değer", stext: "Açıklama" },
        },
      ],

      myColumnsinv02rights: [
        {
          type: "checkbox",
          value: "process0",
          label: this.$gl("Bel.Giriş", "Ent.Without Doc"),
        },
        {
          label: this.$gl("Satınalama Girişi", "Purch.Ent."),
          value: "process1",
          type: "checkbox",
        },
        {
          label: this.$gl("Üretimden Giriş", "Prod.Ent."),
          value: "process2",
          type: "checkbox",
        },
        {
          label: this.$gl(
            "Transfer Siparişine Bağlı Giriş",
            "Ent. Based on Tr. Ord."
          ),
          value: "process3",
          type: "checkbox",
        },
        {
          label: this.$gl(
            "Ürün Ağacına Bağlı Giriş",
            "Ent. Based on Prd. Tre."
          ),
          value: "process4",
          type: "checkbox",
        },
        {
          label: this.$gl("Fason Giriş", "Contract Entry"),
          value: "process5",
          type: "checkbox",
        },
        {
          label: this.$gl("Servisten Giriş", "Service Entry"),
          value: "process6",
          type: "checkbox",
        },
        {
          label: this.$gl("Müşteriden İade Girişi", "Cust.Rtrn. Entry"),
          value: "process7",
          type: "checkbox",
        },
        {
          label: this.$gl("Fasondan İade Girişi", "Contract Entry"),
          value: "process8",
          type: "checkbox",
        },
        {
          label: this.$gl("Belgesiz Çıkış", "Exit Without Doc"),
          value: "process10",
          type: "checkbox",
        },
        {
          label: this.$gl(
            "Ürün Ağacına Bağlı Çıkış",
            "Exit Based on Prd. Tre."
          ),
          value: "process11",
          type: "checkbox",
        },
        {
          label: this.$gl("Üretime Çıkış", "Prod.Exit"),
          value: "process12",
          type: "checkbox",
        },
        {
          label: this.$gl("Fason Çıkış", "Contract Exit"),
          value: "process13",
          type: "checkbox",
        },
        {
          label: this.$gl("İrsaliye Çıkışı", "Delivery Exit"),
          value: "process14",
          type: "checkbox",
        },
        {
          label: this.$gl(
            "Transfer Siparişine Bağlı Çıkış",
            "Exit Based on Tr. Ord."
          ),
          value: "process15",
          type: "checkbox",
        },
        {
          label: this.$gl("Servise Çıkış", "Service Exit"),
          value: "process16",
          type: "checkbox",
        },
        {
          label: this.$gl("Fason Transferi", "Contract Transfer"),
          value: "process17",
          type: "checkbox",
        },
        {
          label: this.$gl("Tedarikçiye İade", "Return Supplier"),
          value: "process18",
          type: "checkbox",
        },
        {
          label: this.$gl("Parti Bazında Dağıtım", "Distr. by Lot"),
          value: "process19",
          type: "checkbox",
        },
        {
          label: this.$gl("Tesisler Arası Transfer", "Tr. betwn. Plnts"),
          value: "process20",
          type: "checkbox",
        },
        {
          label: this.$gl("Depolar  Arası Transfer", "Tr. betwn. Wr."),
          value: "process21",
          type: "checkbox",
        },
        {
          label: this.$gl("Stok Yerleri  Arası Transfer", "Tr. betwn. Stck."),
          value: "process22",
          type: "checkbox",
        },
        {
          label: this.$gl("Malzemeden Malzemeye Transfer", "Tr.Mat.to Mat."),
          value: "process23",
          type: "checkbox",
        },
        {
          label: this.$gl("Üretime Transfer", "Tr.to Prd."),
          value: "process24",
          type: "checkbox",
        },
        {
          label: this.$gl("Satınalamaya Bağlı Transfer", "Tr. Based on Purch."),
          value: "process25",
          type: "checkbox",
        },
        {
          label: this.$gl("İptal Hareketleri", "Cancel Move"),
          value: "processreverse",
          type: "checkbox",
        },
        {
          label: this.$gl("Stok Sayımı", "Stock Count"),
          value: "processadjust",
          type: "checkbox",
        },
      ],
    };
  },

  methods: {
    async btnSave() {
      await this.lis.function("BAST01/SUPS/lisinv002/02-btnSave", this.mv);
      this.cancel();
    },
    async cancel() {
      this.mv.lisDialog = "LISINV002";
    },
    async init() {
      await this.lis.function("BAST01/SUPS/lisinv002/02-init", this.mv);
    },
    async pushNewRight(event) {
      console.log("pushNewRight", event);
      let myReturn = await this.lis.function(
        "BAST01/SUPS/lisinv002/pushNewRight",
        this.mv
      );
      this.mv.lisinv002.rights.push(myReturn);
    },
    async pushNewAuth(event) {
      console.log("pushNewAuth", event);
      let myReturnA = await this.lis.function(
        "BAST01/SUPS/lisinv002/pushNewAuth",
        this.mv
      );
      this.mv.lisinv002.authorizations.push(myReturnA);
    },
  },
  mounted() {
    this.init(this.mv);
    this.mv.lisinv002.company = "01";
  },
};
</script>
