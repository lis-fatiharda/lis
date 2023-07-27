<template>
    <l-div v-if="dv.lisDialog == 'FINT02D01'">
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="account_balance" />

                <l-toolbar-title>{{
                    this.$gl("Muhasebe Belgeleri", "Accounting Slips")
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
                    options="lisfin003"
                    optValue="doctype"
                    optTitle="stext"
                    optCaptions="doctype"
                    width="140px"
                />
                <l-input
                    :label="this.$gl(`Belge No`, `Document No`)"
                    v-model="dv.sc.docnum"
                ></l-input>

                <l-input
                    :label="this.$gl(`Yevmiye No`, `Post No`)"
                    v-model="dv.sc.postnum"
                ></l-input>
                <l-date
                    :label="this.$gl(`Yev. Tar. Başl.`, `Post. Date Str.`)"
                    v-model="dv.sc.postdatestart"
                    style="width: 150px"
                />
                <l-date
                    :label="this.$gl(`Yev. Tar. Bitiş`, `Post. Date End`)"
                    v-model="dv.sc.postdateend"
                    style="width: 150px"
                /><l-date
                    :label="this.$gl(`Blg. Tar. Başl.`, `Doc. Date Str.`)"
                    v-model="dv.sc.docdatestart"
                    style="width: 150px"
                />
                <l-date
                    :label="this.$gl(`Blg. Tar. Bitiş`, `Doc. Date End`)"
                    v-model="dv.sc.docdateend"
                    style="width: 150px"
                />

                <l-input
                    :label="this.$gl(`Tutar Min(F.Pbr)`, `Amount Min`)"
                    v-model="dv.sc.amntmin"
                ></l-input>
                <l-input
                    :label="this.$gl(`Tutar Max(F.Pbr)`, `Amount Max`)"
                    v-model="dv.sc.amntmax"
                ></l-input>
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
                    :label="this.$gl(`Hesap No`, `Account No`)"
                    v-model="dv.sc.account"
                ></l-input> -->
                <l-input
                        :label="this.$gl(`Hesap No`, `Account No`)"
                        v-model="dv.sc.account"
                    >
                        <l-chip
                            class="bg-white"
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
                    :label="this.$gl(`Hesap Açkl.`, `Account Descr.`)"
                    v-model="dv.sc.atext"
                ></l-input>
                <l-select
                    :label="this.$gl(`P.Br.`, `Currency`)"
                    v-model="dv.sc.currency"
                    options="lisbas007"
                    optValue="unit"
                    optTitle="stext"
                    optCaptions="unit"
                    :optFilter="{ unittype: 1 }"
                    width="135px"
                />
                <!-- <l-input
                    :label="this.$gl(`T.D Hesap`, `Uniform Account`)"
                    v-model="dv.sc.glaccount"
                ></l-input> -->
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
                <l-input
                    :label="this.$gl(`Hesap Sınıfı`, `Account Class`)"
                    v-model="dv.sc.accclass"
                ></l-input
                ><l-select
                    :label="this.$gl(`Hesap Grubu`, `Account Group`)"
                    v-model="dv.sc.accgrp"
                    options="lisfin005"
                    optValue="group"
                    optTitle="stext"
                    optCaptions="group"
                    width="150px"
                />
                <l-checkbox
                    :label="this.$gl(`Silindi`, `Deleted`)"
                    v-model="dv.sc._deleted"
                    color="pink"
                />
            </l-div-flex>
        </l-card0>

        <!--Searching Criterias Layer------>

        <!--------------------------------->

        <!--Butons Layer Layer---------------------->

        <l-btn-group>
            <l-btn color="warning" icon="search" @click="btnSearch(dv)" />
            <l-btn color="info" icon="visibility" @click="btnShow(dv)" />
            <l-btn color="primary" icon="edit" @click="btnEdit(dv)" />
            <l-btn color="secondary" icon="add" @click="btnInsert(dv)" />
            <l-btn color="deep-orange" icon="print" @click="btnDelete(dv)" />
        </l-btn-group>

        <l-checkbox label="Belge Ön İzleme" icon="print" />

        <l-table
            name="FINT02D01"
            :tableData="dv.reportList"
            :columns="myColumnsFin2"
            :context="contextMenu"
            :readonly="true"
        />
    </l-div>
    <FINT02D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'FINT02D02'" />
</template>

<script>
import FINT02D02 from "./FINT02D02.vue";

export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
    components: {
        FINT02D02,
    },

    data() {
        return {isSelectAcc : false, isSelectGla : false,
            dv: {
                sc: {
                    company: "01",
                    doctype: "",
                    docnum: "",
                    postnum: "",
                    postdateend: this.lis.lastDayOfMonth(),
                    postdatestart: this.lis.firstDayOfMonth(),
                    docdateend: this.lis.lastDayOfMonth(),
                    docdatestart: this.lis.firstDayOfMonth(),
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

                tbalance: 0,

                lisDialog: "FINT02D01",
                modi: 2,
                selectedRow: "",
                reportList: [],
                lisfindocs: {},
                lockKeyParams: {
                    company: "",
                    lid: "FINT02",
                    lockkey: "",
                },
            },
            myColumnsFin2: [
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
                    label: this.$gl(`Yevm. No`, `Post No`),
                    value: "postnum",
                    type: "string",
                },
                {
                    label: this.$gl(`Yevm. Tarihi`, `Post Date.`),
                    value: "postdate",
                    type: "date",
                    _textColor: "red",
                },
                {
                    label: this.$gl(`Sat.Say.`, `Items`),
                    value: "itemcount",
                    type: "number",
                },
                {
                    label: this.$gl(`Dönem`, `Period`),
                    value: "finperiod",
                    type: "number",
                },

                {
                    label: this.$gl(`Belge Tarihi`, `Document Date`),
                    value: "docdate",
                    type: "date",
                    _textColor: "red",
                },
                {
                    label: this.$gl(
                        `Borç Toplamı (Belge P.Br.)`,
                        `Amnt.(Doc.Cur.Unt.)`
                    ),
                    value: "ddebit",
                    type: "number",
                    _textColor: "green",
                },
                {
                    label: this.$gl(
                        `Alacak Toplamı (Belge P.Br.)`,
                        `Amnt.(Doc.Cur.Unt.)`
                    ),
                    value: "dcredit",
                    type: "number",
                    _textColor: "green",
                },
                {
                    label: this.$gl(
                        `Borç Toplamı (Firma P.Br.)`,
                        `Amnt.(Com.Cur.Unt.)`
                    ),
                    value: "hdebit",
                    type: "number",
                    _textColor: "green",
                },
                {
                    label: this.$gl(
                        `Alacak Toplamı (Firma P.Br.)`,
                        `Amnt.(Com.Cur.Unt.)`
                    ),
                    value: "hcredit",
                    type: "number",
                    _textColor: "green",
                },

                {
                    label: this.$gl(`Para Birimi`, `currency`),
                    value: "items.0.currency",
                    type: "string",
                },
                {
                    label: this.$gl(`Belge Açkl.`, `Doc. Descr.`),
                    value: "stext",
                    type: "string",
                },
                {
                    label: this.$gl(`İptal?`, `Iscanceled?`),
                    value: "_deleted",
                    type: "checkbox",
                },
            ],
        };
    },

    methods: {
        async btnSearch(prop) {
            this.dv = await this.lis.function("FINT02/01-btnSearch", prop);
        },
        async btnEdit(prop) {
            this.dv = await this.lis.function("FINT02/01-btnEdit", prop);
        },
        async btnShow(prop) {
            this.dv = await this.lis.function("FINT02/01-btnShow", prop);
        },
        async btnInsert(prop) {
            this.dv = await this.lis.function("FINT02/01-btnInsert", prop);
        },
        async btnDelete(prop) {
            this.dv = await this.lis.function("FINT02/01-btnDelete", prop);
        },
        async init(prop) {
            this.dv = await this.lis.function("FINT02/01-init", this.dv);
        },
    },

    mounted() {
        this.init(this.dv);
    },
};
</script>
