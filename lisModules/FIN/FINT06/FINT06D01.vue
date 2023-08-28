<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="account_balance" />

                <l-toolbar-title>{{
                    "Toplu Finansal Eşleştirme (FIFO ile)"
                }}</l-toolbar-title>

                <l-btn
                    icon="cancel"
                    flat
                    round
                    color="negative"
                    @click="this.$btnGoHome(tabInfo)"
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

                    <l-input
                        label="Hesap No"
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

                    <l-select
                    :label="this.$gl(`P.Br.`, `Currency`)"
                    v-model="dv.sc.currency"
                    options="lisbas007"
                    optValue="unit"
                    optTitle="stext"
                    optCaptions="unit"
                    :optFilter="{ unittype: 1 }"
                    width="135px"
                    class="bg-amber-1"
                />

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
                <l-btn color="orange" icon="visibility" @click="btnShow()" />
            </l-btn-group>

            <l-space />

            <l-div-flex>
                <l-btn
                    label="İlişkilendir"
                    color="secondary"
                    @click="btnMatch()"
                />
                <l-btn
                    label="İlişki Kaldır"
                    color="negative"
                    @click="btnUnMatch()"
                />
            </l-div-flex>
        </l-div0-flex>

        <l-table
            name="accountTable"
            v-model="dv.reportList"
            :columns="columns"
            :context="contextMenu"
            :width="'100%'"
            :readonly="true"
        />
    </l-div>

    <l-dialog v-model="isShowFINT05D1" persistent>
        <FINT05D01
            :pdv="dv"
            :tabInfo="tabInfo"
            @cancel="isShowFINT05D1 = false"
        />
    </l-dialog>
</template>

<script>
import FINT05D01 from "../FINT05/FINT05D01.vue";
export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
    components: { FINT05D01 },

    data() {
        return {
            isSelectAcc: false,
            isSelectGla: false,
            tab: "Sorgula",
            isShowFINT05D1: false,
            dv: {
                sc: {
                    company: "01",
                    busarea: "S",
                    acctype: "",
                    account: "",
                    glaccount: "",
                    currency: "",

                    datefrom: this.lis.firstDayOfYear(),
                    dateuntil: this.lis.lastDayOfMonth(),
                },

                tbalance: 0,

                reportList: [],
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
                    label: "Açık Borç",
                    value: "balancedebit",
                    type: "number",
                },
                {
                    label: "Açık Alacak",
                    value: "balancecredit",
                    type: "number",
                    _textColor: "purple",
                },
                {
                    label: "Fark Tutar.",
                    value: "diff",
                    type: "number",
                    _textColor: "purple",
                },
                {
                    label: "P.Br.",
                    value: "currency",
                    type: "number",
                    _textColor: "purple",
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
            if (this.dv.sc.currency == "" | this.dv.sc.currency == null) {
                this.lis.alert("E", "Lütfen Bir Para Birimi Seçiniz!")
                return;
            }
            this.dv = await this.lis.function("FINT06/01-btnSearch", this.dv);
        },
        btnShow() {
            this.isShowFINT05D1 = true;
        },
        async btnMatch() {
            this.dv = await this.lis.function("FINT06/01-btnMatch", this.dv);
            this.lis.alert("p", "Belge İlişkilendirmeleri Yapıldı.");
            this.btnSearch();
        },
        async btnUnMatch() {
            this.dv = await this.lis.function("FINT06/01-btnUnMatch", this.dv);
            this.lis.alert("p", "Belge İlişkilendirmeleri Kaldırıldı.");
            this.btnSearch();
        },
    },

    mounted() {},
};
</script>
