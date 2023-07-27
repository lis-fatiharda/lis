<template>
    <l-div v-if="dv.lisDialog == 'FINT01D01'">
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="account_balance" />

                <l-toolbar-title>{{
                    this.$gl("Hesap Planı", "Account Plan")
                }}</l-toolbar-title>

                <l-btn
                    icon="cancel"
                    flat
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
                    :label="this.$gl(`Hesap Tipi`, `Account Type`)"
                    v-model="dv.sc.acctype"
                    options="lisfin004"
                    optValue="acctype"
                    optTitle="stext"
                    optCaptions="acctype"
                    width="130px"
                />

                <!-- <l-input
                        :label="this.$gl(`Hesap No`, `Account No`)"
                        dense
                        v-model="dv.sc.account"
                    ></l-input> -->

                <l-input
                    :label="this.$gl(`Hesap No`, `Account No`)"
                    v-model="dv.sc.account"
                >
                </l-input>
                <l-input
                    :label="this.$gl(`Hesap Açk.`, `Account Descr.`)"
                    dense
                    v-model="dv.sc.stext"
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
                        dense
                        v-model="dv.sc.glaccount"
                    ></l-input> -->
                <l-input
                    :label="this.$gl(`T.D Hesap`, `Uniform Account`)"
                    v-model="dv.sc.glaccount"
                >
                </l-input>
                <l-input
                    :label="this.$gl(`Hesap Sınıfı`, `Account Class`)"
                    dense
                    v-model="dv.sc.accclass"
                    width="100px"
                ></l-input>

                <l-select
                    :label="this.$gl(`Hesap Grubu`, `Account Group`)"
                    v-model="dv.sc.accgrp"
                    options="lisfin005"
                    optValue="group"
                    optTitle="stext"
                    optCaptions="group"
                    width="150px"
                />

                <l-select
                    :label="this.$gl(`Hesap Seviyesi`, `Account Level`)"
                    map-options
                    v-model="dv.sc.acclevel"
                    :options="[
                        {
                            label: this.$gl(`Ana Hesap`, `Main Acc.`),
                            value: 0,
                        },
                        {
                            label: this.$gl(`Üst Hesap`, `Group Acc.`),
                            value: 1,
                        },
                        {
                            label: this.$gl(
                                `Güncellenebilir Hesap`,
                                `Direct Acc.`
                            ),
                            value: 2,
                        },
                        { label: this.$gl(`Tümü`, `All`), value: 99 },
                    ]"
                    optValue="value"
                    optTitle="label"
                    style="width: 250px"
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

        <l-div0-flex>
            <l-btn-group>
                <l-btn color="warning" icon="search" @click="btnSearch(dv)" />
                <l-btn color="info" icon="visibility" @click="btnShow(dv)" />
                <l-btn color="primary" icon="edit" @click="btnEdit(dv)" />
                <l-btn color="secondary" icon="add" @click="btnInsert(dv)" />
                <l-btn color="deep-orange" icon="print" @click="btnDelete(dv)" />
            </l-btn-group>

            <l-space />
            <l-btn
                label="Hesap Hareketleri"
                color="primary"
                outline
                @click="btnDelete(dv)"
            />
            <l-space />
        </l-div0-flex>

        <l-table
            name="FINT01D01"
            :tableData="dv.reportList"
            :columns="myColumnsFin"
            :context="contextMenu"
            :readonly="true"
        />
    </l-div>
    <FINT01D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'FINT01D02'" />
</template>

<script>
import FINT01D02 from "./FINT01D02.vue";

export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
    components: {
        FINT01D02,
    },

    data() {
        return {
            isSelectAcc: false,
            isSelectGla: false,
            dv: {
                sc: {
                    company: "01",
                    acctype: "",
                    account: "",
                    stext: "",
                    currency: "",
                    glaccount: "",
                    accclass: "",
                    accgrp: "",
                    acclevel: 99,
                    _deleted: false,
                },

                lisDialog: "FINT01D01",
                modi: 2,
                selectedRow: "",
                reportList: [],
                lisaccounts: {},
                // lockKeyParams: {
                //   company: "01",
                //   lid: "FINT01",
                //   lockkey: "",
                // },
            },
            myColumnsFin: [
                {
                    label: this.$gl("Firma", "Company"),
                    value: "company",
                    type: "string",
                    default: "01",
                },
                {
                    label: this.$gl(`Hesap Tipi`, `Account Type`),
                    value: "acctype",
                    type: "string",
                },

                {
                    label: this.$gl(`Hesap No`, `Account No`),
                    value: "account",
                    type: "string",
                },
                {
                    label: this.$gl(`Hesap Açkl.`, `Account Descr.`),
                    value: "stext",
                    type: "string",
                },
                {
                    label: this.$gl(
                        `Muhasebe  Standartı`,
                        `Accounting Standard`
                    ),
                    value: "accstd",
                    type: "number",
                },
                {
                    label: this.$gl(`T.D Hesap`, `Uniform Account`),
                    value: "glaccount",
                    type: "string",
                },

                {
                    label: this.$gl(`Hesap Seviyesi`, `Account Level`),
                    value: "acclevel",
                    fetchValue: "acclevel",
                    type: "select",
                    options: [
                        {
                            label: this.$gl(`Ana Hesap`, `Main Acc.`),
                            value: 0,
                        },
                        {
                            label: this.$gl(`Üst Hesap`, `Group Acc.`),
                            value: 1,
                        },
                        {
                            label: this.$gl(
                                `Güncellenebilir Hesap`,
                                `Direct Upd.`
                            ),
                            value: 2,
                        },
                    ],
                },

                {
                    label: this.$gl(`Hesap Sınıfı`, `Account Class`),
                    value: "accclass",
                    type: "string",
                },
                {
                    label: this.$gl(`Hesap Grubu`, `Account Group`),
                    value: "accgrp",
                    type: "string",
                },
                {
                    label: this.$gl(`Para Birimi`, `Currency`),
                    value: "currency",
                    type: "string",
                },

                // {
                //   label: this.$gl(`Silinecek?`, `Is Delete?`),
                //   value: "_deleted",
                //   type: "checkbox",
                // },
            ],
        };
    },

    methods: {
        async btnSearch(prop) {
            this.dv = await this.lis.function("FINT01/01-btnSearch", prop);

            this.dv.reportList.forEach((e) => {
                if (e.acclevel == 0) {
                    e._bgColor = "#e0f7fa";
                }
                if (e.acclevel == 1) {
                    e._bgColor = "#fff8e1";
                }
            });
        },
        async btnEdit(prop) {
            this.dv = await this.lis.function("FINT01/01-btnEdit", prop);
        },
        async btnShow(prop) {
            this.dv = await this.lis.function("FINT01/01-btnShow", prop);
        },
        async btnInsert(prop) {
            this.dv = await this.lis.function("FINT01/01-btnInsert", prop);
        },
        async btnDelete(prop) {
            this.dv = await this.lis.function("FINT01/01-btnDelete", prop);
        },
        async init(prop) {
            this.dv = await this.lis.function("FINT01/01-init", this.dv);
        },
    },

    mounted() {
        this.init(this.dv);
        console.log("mounted worked");
    },
};
</script>
