<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="account_balance" />

                <l-toolbar-title>{{ "Kur Farkı Raporu" }}</l-toolbar-title>

                <l-btn
                    icon="cancel"
                    flat
                    round
                    color="negative"
                    @click="this.$btnGoHome(tabInfo)"
                />
            </l-toolbar>
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
                    :label="this.$gl(`Hesap Tipi`, `Account Type`)"
                    v-model="dv.sc.acctype"
                    options="lisfin004"
                    optValue="acctype"
                    optTitle="stext"
                    optCaptions="acctype"
                    width="120px"
                />

                <l-input
                    :label="this.$gl(`Hesap No`, `Account No`)"
                    v-model="dv.sc.account"
                    class="bg-amber-1"
                >
                    <l-chip
                        class="bg-amber-1"
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

                <l-date
                    :label="this.$gl(`Tarih Başl.`, `Post. Date Str.`)"
                    v-model="dv.sc.datefrom"
                    style="width: 150px"
                />
                <l-date
                    :label="this.$gl(`Tarih Bitiş`, `Post. Date End`)"
                    v-model="dv.sc.dateuntil"
                    style="width: 150px"
                />
            </l-div-flex>
        </l-card0>

        <!--Searching Criterias Layer------>

        <!--------------------------------->

        <!--Butons Layer Layer---------------------->

        <l-div0-flex>
            <l-btn-group>
                <l-btn color="primary" icon="search" @click="btnSearch()" />
                <l-btn color="orange" icon="print" @click="btnShow()" />
            </l-btn-group>

            <l-space />

            <l-div-flex>

                <l-checkbox
                label="KDV Grupla"
                v-model="dv.groupVatkey"/>
                <l-select
                    label="Belge Tipi"
                    v-model="dv.sc.salDocType"
                    options="lissal001"
                    :optFilter="{
                        iscurrdiffinv: true,
                    }"
                    optValue="doctype"
                    optTitle="stext"
                    optCaptions="doctype"
                    class="bg-white"
                />
                <l-btn
                    label="Kur Farkı Faturası Oluştur"
                    color="secondary"
                    icon="list_alt"
                    @click="btnCreateCurrDiffDoc()"
                />
            </l-div-flex>
        </l-div0-flex>

        <l-table
            name="accountTable"
            :tableData="dv.reportList"
            :columns="columns"
            :context="contextMenu"
            :width="'100%'"
            :readonly="true"
        />
    </l-div>

    <l-dialog v-model="isShowSALT01D02">
        <SALT01D02 :lv="lv" :tabInfo="tabInfo" :dv="dv" :isDialog="true" @cancel="isShowSALT01D02 = false"/>
    </l-dialog>
</template>

<script>
import SALT01D02 from "../../SAL/SALT01/SALT01D02.vue"
export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
    components: {
        SALT01D02,
    },

    data() {
        return {
            isSelectAcc: false,
            isSelectGla: false,
            isShowSALT01D02: false,
            
            dv: {
                sc: {
                    company: "01",
                    busarea: "S",
                    acctype: "",
                    account: "M-220825-0030",
                    salDocType: "",
                    datefrom: this.lis.firstDayOfYear(),
                    dateuntil: this.lis.lastDayOfMonth(),
                },

                tbalance: 0,

                reportList: [],
                lissaldocs: {},
                modi: 0,
                isShowFinDocDialog: false,
                isShowFinDoc: false,
                groupVatkey: false
            },
            columns: [
                {
                    label: "Seç",
                    value: "_selected",
                    type: "checkbox",
                },
                {
                    label: "Hesap Tipi",
                    value: "acctype",
                    type: "string",
                },

                {
                    label: "Hesap No",
                    value: "account",
                    type: "string",
                },
                {
                    label: "Hesap Adı",
                    value: "atext",
                    type: "string",
                },
                {
                    label: "Kur Farkı Borç",
                    value: "debitcurrdiff",
                    type: "number",
                    _textColor: "purple",
                },
                {
                    label: "Kur Farkı Alacak",
                    value: "creditcurrdiff",
                    type: "number",
                    _textColor: "purple",
                },

                {
                    label: "KDV",
                    value: "vatkey",
                    type: "number",
                },

                //--

                {
                    label: "Belge Tip(Borç)",
                    value: "debitdoctype",
                    type: "string",
                },
                {
                    label: "Belge No(Borç)",
                    value: "debitdocnum",
                    type: "string",
                },
                {
                    label: "Kalem No(Borç)",
                    value: "debititemnum",
                    type: "number",
                },
                //--

                {
                    label: "Belge Tip(Alacak)",
                    value: "creditdoctype",
                    type: "string",
                },
                {
                    label: "Belge No(Alacak)",
                    value: "creditdocnum",
                    type: "string",
                },
                {
                    label: "Kalem No(Alacak)",
                    value: "credititemnum",
                    type: "number",
                },

                //--

                {
                    label: "Eşlenmiş Tutar (Belge P.Br.)",
                    value: "dmatched",
                    type: "number",
                },
                {
                    label: "Eşlenmiş Tutar (Firma P.Br.)",
                    value: "hmatched",
                    type: "number",
                },
            ],
        };
    },

    methods: {
        async btnSearch() {
            if ((this.dv.sc.account == "") | (this.dv.sc.account == null)) {
                this.lis.alert("E", "Lütfen Bir Hesap Seçiniz!");
                return;
            }
            this.dv = await this.lis.function("FINT10/01-btnSearch", this.dv);
        },

        async btnCreateCurrDiffDoc() {
            if ((this.dv.sc.salDocType == "") | (this.dv.sc.salDocType == null)) {
                this.lis.alert("W", "Lütfen Belge Tipi Seçiniz!");
                return;
            }
            this.dv = await this.lis.function(
                "FINT10/01-btnCreateCurrDiffDoc",
                this.dv
            );

            this.isShowSALT01D02 = true;
        },
    },

    mounted() {},
};
</script>
