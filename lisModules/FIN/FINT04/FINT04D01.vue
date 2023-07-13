<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="account_balance" />

                <l-toolbar-title>{{
                    this.$gl("Mizan", "Account Balance")
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
                        :label="this.$gl(`Başlama Hesabı`, `Account No`)"
                        v-model="dv.sc.account1"
                        class="bg-amber-1"
                    /><l-input
                        :label="this.$gl(`Bitiş Hesabı`, `Account No`)"
                        v-model="dv.sc.account2"
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

        <l-btn-group>
            <l-btn color="primary" icon="search" @click="btnSearch(dv)" />
            <l-btn color="orange" icon="print"/>
        </l-btn-group>

        <l-table
            name="FINT04D01"
            :tableData="dv.reportList"
            :columns="columns"
            :context="contextMenu"
            :width="'100%'"
            :readonly="true"
        />

        <FINT01D01mini
            :pComp="dv.sc.company"
            :isShow="zoomMaterialRow == null ? false : true"
            @ok="
                lis.objectMove($event, dv.lissaldocs.items[zoomMaterialRow]);
                dv.lissaldocs.items[zoomMaterialRow].material = $event.material;
                dv.lissaldocs.items[zoomMaterialRow].mtext = $event.stext;
                dv.lissaldocs.items[zoomMaterialRow].itemtype =
                    $event.salitemtype;
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

export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
    components: {},

    data() {
        return {
            tab: "Sorgula",
            dv: {
                sc: {
                    company: "01",
                    busarea: "S",
                    acctype: "G",
                    account1: this.lis.getDayOfWeek(),
                    account2: "",
                    datefrom: this.lis.firstDayOfYear(),
                    dateuntil: this.lis.lastDayOfMonth(),
                },

                tbalance: 0,

                reportList: [],
            },
            columns: [
                {
                    label: this.$gl(`Hesap No`, `Account`),
                    value: "account",
                    type: "string",
                },
                {
                    label: this.$gl(`Hesap Açk.`, `Account Text`),
                    value: "stext",
                    type: "string",
                },

                {
                    label: this.$gl(`Devir Borç`, `Item`),
                    value: "xdebit",
                    type: "number",
                },
                {
                    label: this.$gl(`Devir Alac.`, `Item`),
                    value: "xcredit",
                    type: "number",
                },
                {
                    label: this.$gl(`Devir Bakiye Borç`, `Item`),
                    value: "xbalancedebit",
                    type: "number",
                    _textColor: "purple",
                },
                {
                    label: this.$gl(`Devir Bakiye Alac.`, `Item`),
                    value: "xbalancecredit",
                    type: "number",
                    _textColor: "purple",
                },

                //----------------

                {
                    label: this.$gl(`Dönem Borç`, `Item`),
                    value: "debit",
                    type: "number",
                },
                {
                    label: this.$gl(`Dönem Alac.`, `Item`),
                    value: "credit",
                    type: "number",
                },
                {
                    label: this.$gl(`Dönem Bakiye Borç`, `Item`),
                    value: "balancedebit",
                    type: "number",
                    _textColor: "blue",
                },
                {
                    label: this.$gl(`Dönem Bakiye Alac.`, `Item`),
                    value: "balancecredit",
                    type: "number",
                    _textColor: "blue",
                },

                //----------------

                {
                    label: this.$gl(`Toplam Borç`, `Item`),
                    value: "tdebit",
                    type: "number",
                    _textColor: "green",
                },
                {
                    label: this.$gl(`Toplam Alac.`, `Item`),
                    value: "tcredit",
                    type: "number",
                    _textColor: "green",
                },
                {
                    label: this.$gl(`Bakiye Borç`, `Item`),
                    value: "tbalancedebit",
                    type: "number",
                    _textColor: "red",
                },
                {
                    label: this.$gl(`Bakiye Alac.`, `Item`),
                    value: "tbalancecredit",
                    type: "number",
                    _textColor: "red",
                },

                //----------------

                {
                    label: this.$gl(`B.P.Br.`, `currency`),
                    value: "currency",
                    type: "string",
                },
            ],
        };
    },

    methods: {
        async btnSearch(prop) {
            this.dv = await this.lis.function("FINT04/01-btnSearch", prop);
        },
    },

    mounted() {},
};
</script>
