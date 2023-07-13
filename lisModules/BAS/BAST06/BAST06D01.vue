<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="memory" />

                <l-toolbar-title>{{
                    this.$gl("Toplu İşlemler", "Batch Processes")
                }}</l-toolbar-title
                ><br />
                <!-- <l-card>
          <div>{{ save }}</div>
        </l-card> -->
                <!-- <l-btn flat round dense icon="save" color="teal-4" @click="btnSave()" /> -->
                <l-btn
                    icon="cancel"
                    flat
                    round
                    dense
                    color="negative"
                    @click="this.$btnGoHome(tabInfo)"
                />
            </l-toolbar>
        </l-card0>
        <!--Searching Criterias Layer------>
        <l-card0>
            <l-tabs
                v-model="dv.tab"
            >
                <l-tab
                    name="matCards"
                    :label="this.$gl(`Malzeme Kartları`, `Material Cards`)"
                />
                <l-tab
                    name="custCards"
                    :label="this.$gl(`Cari Kartlar`, `Customers-Vendors`)"
                />
                <l-tab name="bom" :label="this.$gl(`Ürün Ağaçları`, `BOM`)" />
                <l-tab
                    name="accounts"
                    :label="this.$gl(`Hesap Planı`, `Accounts`)"
                />
            </l-tabs>

            <l-tab-panels v-model="dv.tab" animated>
                <l-tab-panel name="matCards" class="q-pa-xs">
                    <BAST06D02 />
                </l-tab-panel>
                <l-tab-panel name="custCards" class="q-pa-xs">
                    <BAST06D03 />
                </l-tab-panel>
                <l-tab-panel name="bom" class="q-pa-xs">
                    <BAST06D04 />
                </l-tab-panel>
                <l-tab-panel name="accounts" class="q-pa-xs">
                    <BAST06D05 />
                </l-tab-panel>
            </l-tab-panels>
        </l-card0>

        <!--------------------------------->
    </l-div>
</template>

<script>
import BAST06D02 from "./DIALOGS/BAST06D002/BAST06D02.vue";
import BAST06D03 from "./DIALOGS/BAST06D003/BAST06D03.vue";
import BAST06D04 from "./DIALOGS/BAST06D004/BAST06D04.vue";
import BAST06D05 from "./DIALOGS/BAST06D005/BAST06D05.vue";

export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
    components: { BAST06D02, BAST06D03, BAST06D04, BAST06D05 },

    data() {
        return {
            dv: {
                materialList: [],
                // lisCustomerList: [],
                // reportList: [],
                // reportListFin: [],
                // liscustomers: {},
                // lisbomdocs: {},
                // lisaccounts: {},
                lismaterials: {},
                tab: "matCards",
                company: "01",
            },
            // myColumnsMat: [
            //   {
            //     label: this.$gl("Malzeme", "Material"),
            //     value: "material",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl("Tipi", "Type"),
            //     value: "mattype",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl("Açıklaması", "Description"),
            //     value: "stext",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl("Sektör", "Sector"),
            //     value: "sector",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl("Malzeme Grubu", "Material Group"),
            //     value: "matgrp",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl("Stok Birimi", "Stock Unit"),
            //     value: "skunit",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl("Çıkış Birimi", "Output Unit"),
            //     value: "salunit",
            //     type: "string",
            //   },

            //   {
            //     label: this.$gl(
            //       "Malzeme Uzun Açıklaması",
            //       "Material Long Description"
            //     ),
            //     value: "ltext",
            //     type: "string",
            //   },
            // ],
            // myColumnsCus: [
            //   {
            //     label: this.$gl("Firma", "Company"),
            //     value: "company",
            //     type: "string",
            //     default: "01",
            //   },
            //   {
            //     label: this.$gl("İş Alanı", "Busarea"),
            //     value: "busarea",
            //     type: "string",
            //     default: "S",
            //   },
            //   {
            //     label: this.$gl("Cari Kodu", "Current Code"),
            //     value: "customer",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl("Cari Adı", "Current Name"),
            //     value: "name1",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl("Cari Tipi", "Current Type"),
            //     value: "custorvend",
            //     type: "select",
            //     options: [
            //       { value: 0, label: "Aday" },
            //       { value: 1, label: "Müşteri" },
            //       { value: 2, label: "Tedarikçi" },
            //     ],
            //   },

            //   {
            //     label: this.$gl("Sektör", "Sector"),
            //     value: "sector",
            //     type: "string",
            //   },
            //   {
            //     label: "Posta Kodu",
            //     label: this.$gl("Posta Kodu", "Post Code"),
            //     value: "postcode",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl("Ülke", "Country"),
            //     value: "country",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl("Şehir", "City"),
            //     value: "city",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl("Vergi Dairesi", "Tax Administration"),
            //     value: "taxdept",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl("Vergi Numarası", "Tax Number"),
            //     value: "taxnum",
            //     type: "string",
            //   },
            //   {
            //     label: "Tel. Num.",
            //     value: "telnum",
            //     type: "string",
            //   },
            //   {
            //     label: "Fax. Num.",
            //     value: "faxnum",
            //     type: "string",
            //   },
            // ],
            // myColumnsBom: [
            //   {
            //     type: "string",
            //     value: "company",
            //     label: this.$gl("Firma", "Company"),
            //   },
            //   {
            //     type: "string",
            //     value: "plant",
            //     label: this.$gl("Tesis", "Plant"),
            //   },
            //   {
            //     type: "number",
            //     value: "alternum",
            //     label: this.$gl("Alt.No", "Alt.No"),
            //   },
            //   {
            //     type: "string",
            //     value: "bomnumber",
            //     label: this.$gl("Ürün Ağacı No", "Bom Number"),
            //   },
            //   {
            //     type: "string",
            //     value: "material",
            //     label: this.$gl("Malzeme", "Material"),
            //   },
            //   {
            //     type: "string",
            //     value: "stext",
            //     label: this.$gl("Açıklama", "Description"),
            //   },
            //   {
            //     type: "datetime",
            //     value: "validfrom",
            //     label: this.$gl(`Başlangıç Tarihi`, `Start Date`),
            //   },
            //   {
            //     type: "datetime",
            //     value: "validuntil",
            //     label: this.$gl(`Bitiş Tarihi`, `End Date`),
            //   },
            //   {
            //     type: "string",
            //     value: "type",
            //     label: this.$gl("Tip", "Type"),
            //   },
            // ],
            // myColumnsFin: [
            //   {
            //     label: this.$gl(`Hesap Tipi`, `Account Type`),
            //     value: "acctype",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl(`Hesap No`, `Account No`),
            //     value: "account",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl(`Hesap Açkl.`, `Account Descr.`),
            //     value: "stext",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl(`T.D Hesap`, `Uniform Account`),
            //     value: "glaccount",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl(`Ana Hesap`, `Main Account`),
            //     value: "ismainacc",
            //     type: "checkbox",
            //   },
            //   {
            //     label: this.$gl(`Direkt Güncell.`, `Direct Updt.`),
            //     value: "isdirectupd",
            //     type: "checkbox",
            //   },
            //   {
            //     label: this.$gl(`Silinecek?`, `Is Delete?`),
            //     value: "_deleted",
            //     type: "checkbox",
            //   },
            //   {
            //     label: this.$gl(`Hesap Sınıfı`, `Account Class`),
            //     value: "accclass",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl(`Hesap Grubu`, `Account Group`),
            //     value: "accgrp",
            //     type: "string",
            //   },
            //   {
            //     label: this.$gl(`Para Birimi`, `currency`),
            //     value: "Currency",
            //     type: "string",
            //   },
            // ],
        };
    },
    methods: {
        // async btnSave(tab,dv) {
        //   console.log("btnSave çalıştı BAST06");
        //   console.log("BAST06D02");
        //    if (tab == "matCards") {
        //      await this.lis.function("BAST06/DIALOGS/BAST06D02/02-btnSave", dv);
        //    }
        //    if (tab == "custCards") {
        //      await this.lis.function("BAST06/DIALOGS/BAST06D03/03-btnSave", dv);
        //    }
        //    if (tab == "bom") {
        //      await this.lis.function("BAST06/DIALOGS/BAST06D04/04-btnSave", dv);
        //    }
        //    if (tab == "accounts") {
        //      await this.lis.function("BAST06/DIALOGS/BAST06D05/05-btnSave", dv);
        //    }
        //   await this.lis.function("BAST06/01-btnSave", dv);
        // },
        // async init(prop) {
        //   this.dv = await this.lis.function("BAST06/DIALOGS/BAST06D02/02-init", this.dv);
        // },
    },
    // mounted() {
    //   this.init(this.dv);
    //   console.log("mounted workedDDDDD");
    // },
};
</script>
