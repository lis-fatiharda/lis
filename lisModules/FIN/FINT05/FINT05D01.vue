<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="account_balance" />

                <l-toolbar-title>{{
                    "Borç / Alacak Belgeleri İlişkilendirme"
                }}</l-toolbar-title>

                <l-btn
                    icon="cancel"
                    flat
                    round
                    color="negative"
                    @click="this.$btnGoHome(tabInfo)"
                    v-if="pdv == undefined"
                />
                <l-btn
                    icon="cancel"
                    flat
                    round
                    color="negative"
                    @click="this.$emit('cancel')"
                    v-if="pdv != undefined"
                />
            </l-toolbar>

            <l-tabs v-model="tab">
                <l-tab name="Sorgula" :label="this.$gl(`Sorgula`, `Search`)" />
                <l-tab
                    name="Sorgula +"
                    :label="this.$gl(`Sorgula +`, `Search +`)"
                />
                <l-tab
                    name="Opsiyonlar"
                    :label="this.$gl(`Opsiyonlar`, `Options`)"
                />
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
                        width="120px"
                    />

                    <!-- <l-input
                        :label="this.$gl(`Hesap`, `Account`)"
                        v-model="dv.sc.account"
                        class="bg-amber-1"
                    />

                    <l-input
                        :label="this.$gl(`TD.Hesap`, `Account`)"
                        v-model="dv.sc.glaccount"
                    /> -->
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
                        :label="this.$gl(`Dönem Başl.`, `Post. Date Str.`)"
                        v-model="dv.sc.datefrom"
                        style="width: 150px"
                    />
                    <l-date
                        :label="this.$gl(`Dönem Bitiş`, `Post. Date End`)"
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

        <l-div0-flex>
            <l-btn-group>
            <l-btn color="primary" icon="search" @click="btnSearch()" />
            <l-btn color="orange" icon="visibility"/>
        </l-btn-group>

        <l-space/>

        <l-div-flex>
            <l-btn label="İlişkilendir"  color="secondary" @click="btnMatch()"/>
        <l-btn label="İlişki Kaldır"  color="negative" @click="btnUnMatch()"/>
        </l-div-flex>
        
        </l-div0-flex>

        <l-badge>
            Borç Kalemleri
        </l-badge>

        <l-table
            name="debitTable"
            :tableData="dv.reportListDebit"
            :columns="debitColumns"
            :context="contextMenu"
            :width="'100%'"
            :readonly="true"
        />

        <l-badge>
            Alacak Kalemleri
        </l-badge>

        <l-table
            name="creditTable"
            :tableData="dv.reportListCredit"
            :columns="creditColumns"
            :context="contextMenu"
            :width="'100%'"
            :readonly="true"
        />

    </l-div>
</template>

<script>

export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo", "pdv"],
    components: {},

    data() {
        return {isSelectAcc : false, isSelectGla : false,
            tab: "Sorgula",
            dv: {
                sc: {
                    company: "01",
                    busarea: "S",
                    acctype: "",
                    account: "",
                    glaccount: "",
                   
                    datefrom: this.lis.firstDayOfYear(),
                    dateuntil: this.lis.lastDayOfMonth(),
                },

                tbalance: 0,

                reportListDebit: [],
                reportListCredit: [],
            },
            debitColumns: [
                {
                    label: "Seç",
                    value: "_selected",
                    type: "checkbox",
                },
                {
                    label: "Muh.Std.",
                    value: "accstd",
                    type: "number",
                },
                {
                    label: "B.Tipi",
                    value: "doctype",
                    type: "string",
                },

                {
                    label: "Belge No",
                    value: "docnum",
                    type: "string",
                },
                {
                    label: "Kalem",
                    value: "items.itemnum",
                    type: "number",
                },
                {
                    label: "Yevm.Tarihi",
                    value: "postdate",
                    type: "date",
                },
                {
                    label: "Açık Tutar(BPbr.)",
                    value: "items.dbalance",
                    type: "number",
                    _textColor: "purple",
                },
                {
                    label: "BPbr.",
                    value: "items.currency",
                    type: "number",
                    _textColor: "purple",
                },
                {
                    label: "Açık Tutar(FPbr.)",
                    value: "items.hbalance",
                    type: "number",
                    _textColor: "purple",
                },

                //----------------

                {
                    label: "Açıklama",
                    value: "stext",
                    type: "string",
                },

                {
                    label: "Eşlenen Tutar(BPbr)",
                    value: "items.dmatched",
                    type: "number",
                },
                {
                    label: "Eşlenen Tutar(FPbr)",
                    value: "items.hmatched",
                    type: "number",
                },

                {
                    label: "Belge T.",
                    value: "docdate",
                    type: "date",
                },
                {
                    label: "Vade T.",
                    value: "duedate",
                    type: "date",
                },


                {
                    label: "Gün",
                    value: "duedate",
                    type: "date",
                },

                //--

                {
                    label: "Kalem Tutarı(BPbr)",
                    value: "items.ddebit",
                    type: "number",
                },
                {
                    label: "Kalem Tutarı(FPbr)",
                    value: "items.hdebit",
                    type: "number",
                },
                

                //--

                {
                    label: "İ.A.",
                    value: "busarea",
                    type: "string",
                },
            ],

            creditColumns: [
                {
                    label: "Seç",
                    value: "_selected",
                    type: "checkbox",
                },
                {
                    label: "Muh.Std.",
                    value: "accstd",
                    type: "number",
                },
                {
                    label: "B.Tipi",
                    value: "doctype",
                    type: "string",
                },

                {
                    label: "Belge No",
                    value: "docnum",
                    type: "string",
                },
                {
                    label: "Kalem",
                    value: "items.itemnum",
                    type: "number",
                },
                {
                    label: "Yevm.Tarihi",
                    value: "postdate",
                    type: "date",
                },
                {
                    label: "Açık Tutar(BPbr.)",
                    value: "items.dbalance",
                    type: "number",
                    _textColor: "purple",
                },
                {
                    label: "BPbr.",
                    value: "items.currency",
                    type: "number",
                    _textColor: "purple",
                },
                {
                    label: "Açık Tutar(FPbr.)",
                    value: "items.hbalance",
                    type: "number",
                    _textColor: "purple",
                },

                //----------------

                {
                    label: "Açıklama",
                    value: "stext",
                    type: "string",
                },

                {
                    label: "Eşlenen Tutar(BPbr)",
                    value: "items.dmatched",
                    type: "number",
                },
                {
                    label: "Eşlenen Tutar(FPbr)",
                    value: "items.hmatched",
                    type: "number",
                },

                {
                    label: "Belge T.",
                    value: "docdate",
                    type: "date",
                },
                {
                    label: "Vade T.",
                    value: "duedate",
                    type: "date",
                },


                {
                    label: "Gün",
                    value: "duedate",
                    type: "date",
                },

                //--

                {
                    label: "Kalem Tutarı(BPbr)",
                    value: "items.dcredit",
                    type: "number",
                },
                {
                    label: "Kalem Tutarı(FPbr)",
                    value: "items.dcredit",
                    type: "number",
                },
                

                //--

                {
                    label: "İ.A.",
                    value: "busarea",
                    type: "string",
                },
            ],
        };
    },

    methods: {
        async btnSearch() {

            if (this.dv.sc.account == "" | this.dv.sc.account == null) {
                this.lis.alert("E", "Lütfen Bir Hesap Seçiniz!")
                return;
            }
            this.dv = await this.lis.function("FINT05/01-btnSearch", this.dv);
        },
        async btnMatch() {
            this.dv = await this.lis.function("FINT05/01-btnMatch", this.dv);
            this.lis.alert("p", "Belge İlişkilendirmeleri Yapıldı.")
        },
        async btnUnMatch() {
            this.dv = await this.lis.function("FINT05/01-btnUnMatch", this.dv);
            this.lis.alert("p", "Belge İlişkilendirmeleri Kaldırıldı.")
            this.btnSearch();
        },


        
    },

    mounted() {
        if (this.pdv != undefined) {
            this.dv.sc.company = this.pdv.sc.company;
            this.dv.sc.busarea = this.pdv.sc.busarea;
            this.dv.sc.acctype = this.pdv.sc.acctype;
            this.dv.sc.account = this.pdv.sc.account1;
            this.btnSearch();
        }
    },
};
</script>
