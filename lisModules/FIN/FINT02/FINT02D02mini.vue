<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="account_balance" />

                <l-toolbar-title>{{
                    this.$gl(
                        "Muhasebe Fişleri Detayı",
                        "Accounting Slips Details"
                    )
                }}</l-toolbar-title>

                <div class="q-gutter-xs">
                    <l-btn
                        v-if="dv.modi != 2"
                        icon="save"
                        color="teal"
                        flat
                        @click="btnSave()"
                    />

                    <l-btn icon="cancel" color="negative" flat v-close-popup />
                </div>
            </l-toolbar>
            <l-div-flex>
                <l-select
                    :label="this.$gl(`Firma`, `Company`)"
                    v-model="dv.lisfindocs.company"
                    options="lisbas001"
                    optValue="company"
                    optTitle="stext"
                    optCaptions="company"
                    width="120px"
                />
                <l-select
                    :label="this.$gl(`Muh. Stndr.`, `Acc. Stndr`)"
                    v-model="dv.lisfindocs.accstd"
                    options="lisbas001"
                    optValue="accstd"
                    optTitle="stext"
                    optCaptions="accstd"
                    width="120px"
                />
                <l-select
                    :label="this.$gl(`İş Alanı`, `Business Area`)"
                    v-model="dv.lisfindocs.busarea"
                    options="lisbas003"
                    optValue="busarea"
                    optTitle="stext"
                    optCaptions="busarea"
                    width="120px"
                />
                <l-input
                    :label="this.$gl(`Belge Tipi`, `Document Type`)"
                    
                    dense
                    v-model="dv.lisfindocs.doctype"
                    style="width: 100px"
                ></l-input>
                <l-input
                    :label="this.$gl(`Belge No`, `Document No`)"
                    
                    dense
                    v-model="dv.lisfindocs.docnum"
                    style="width: 100px"
                ></l-input>

                <!-- destektablo SORULACAK -->

                <l-date
                    :label="this.$gl(`Yevmiye Tarihi`, `Post Date`)"
                    v-model="dv.lisfindocs.postdate"
                    style="width: 150px"
                />
                <l-date
                    :label="this.$gl(`Belge Tarihi`, `Document Date`)"
                    v-model="dv.lisfindocs.docdate"
                    style="width: 150px"
                />
                
                <l-input
                    :label="this.$gl(`Belge Açıklaması`, `Account Descr.`)"
                    
                    dense
                    v-model="dv.lisfindocs.stext"
                ></l-input>
            </l-div-flex>

            <l-div>
                <l-table
                    name="FINT02D02"
                    :tableData="dv.lisfindocs.items"
                    :columns="myColumnsFint02D02"
                    :height="'78vh'"
                    :width="'100%'"
                    @change="calcBalanceOfDoc()"
                    @keydown="if ($event.key == 'Insert') pushNewItem($event);"
                />
            </l-div>

            <l-div-flex>
                <l-space />
                <l-input
                    type="money"
                    :label="this.$gl(`Borç`, `Debit`)"
                    v-model="dv.lisfindocs.ddebit"
                    filled
                    readonly
                />
                <l-input
                    type="money"
                    :label="this.$gl(`Alacak`, `Credit`)"
                    v-model="dv.lisfindocs.dcredit"
                    filled
                    readonly
                />
                <l-input
                    type="money"
                    :label="this.$gl(`Bakiye`, `Balance`)"
                    v-model="dv.lisfindocs.ddiff"
                    filled
                    readonly
                    style="background-color: rgb(226, 226, 186);"
                />
            </l-div-flex>
        </l-card0>
    </l-div>
</template>

<script>
import calcBalanceOfDoc from "../../classes/finance/calcBalanceOfDoc.js";
export default {
    props: ["dv", "tabInfo", "cancelToDialog"],
    data() {
        return {

            tbalance: 0,

            lockKeyParams: {
                company: this.dv.lisfindocs.company,
                lid: "FINT02",
                lockkey:
                    this.dv.lisfindocs.account + this.dv.lisfindocs.acctype,
            },

            myColumnsFint02D02: [
                {
                    label: this.$gl("Kalem", "Item"),
                    value: "itemnum",
                    type: "number",
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
                    _textColor: "blue",
                },
                {
                    label: this.$gl(`Hesap Açkl.`, `Account Descr.`),
                    value: "atext",
                    type: "string",
                    _textColor: "blue",
                },
                {
                    label: this.$gl(`T.D Hesap`, `Uniform Account`),
                    value: "glaccount",
                    type: "string",
                },
                {
                    label: this.$gl(
                        "Borç (Belge P.Br.)",
                        "Debit (Doc. Curr.Unt.)"
                    ),
                    value: "ddebit",
                    type: "number",
                    fraction: 2,
                    _textColor: "blue",
                },
                {
                    label: this.$gl(
                        "Alacak (Belge P.Br.)",
                        "Credit (Doc. Curr.Unt.)"
                    ),
                    value: "dcredit",
                    type: "number",
                    fraction: 2,
                    _textColor: "blue",
                },

                {
                    type: "selectmenu",
                    label: this.$gl("PBr.", "Currency"),
                    value: "currency",
                    options: "lisbas007",
                    optValue: "unit",
                    optTitles: { unit: "PBr.", stext: "Açıklama" },
                    optFilter: { unittype: 1 },
                },
                {
                    type: "number",
                    label: "Kur",
                    value: "currate",
                },
                {
                    type: "date",
                    label: "Kur Tarihi",
                    value: "curdate",
                },

                {
                    label: this.$gl(
                        "Borç (Firma P.Br.)",
                        "Debit (Comp. Curr.Unt.)"
                    ),
                    value: "hdebit",
                    type: "number",
                    fraction: 2,
                    _textColor: "red",
                },
                {
                    label: this.$gl(
                        "Alacak (Firma P.Br.)",
                        "Credit (Comp. Curr.Unt.)"
                    ),
                    value: "hcredit",
                    type: "number",
                    fraction: 2,
                    _textColor: "red",
                },
                {
                    label: "Kalem Açıklaması",
                    value: "stext",
                    type: "string",
                    _textColor: "green",
                },

                {
                    label: this.$gl(
                        "Eşleşen Tutar (Belge. P.Br.)",
                        "Match.Amnt. (Doc.. Curr.Unt.)"
                    ),
                    value: "dmatched",
                    type: "number",
                },
                {
                    label: this.$gl(`Kayıt Anahtarı`, `Registration Key`),
                    value: "postkey",
                    type: "string",
                },
                {
                    label: this.$gl(`Silinecek?`, `Is Delete?`),
                    value: "_deleted",
                    type: "checkbox",
                },
            ],
        };
    },

    methods: {
        async calcBalanceOfDoc() {
            this.dv.lisfindocs = await calcBalanceOfDoc(this.dv.lisfindocs, this.lis);
        },
        async pushNewItem(event) {
            let myReturn = await this.lis.function(
                "FINT02/pushNewItem",
                this.dv
            );
            myReturn.itemnum =
                this.dv.lisfindocs.items[this.dv.lisfindocs.items.length - 1]
                    .itemnum + 10;
            this.dv.lisfindocs.items.push(myReturn);
        },
        async btnSave() {
            //------ Save The Finance Document ----------

            await this.lis.function("cls-finance.save", {
                plisfindocs: this.dv.lisfindocs,
                modi: 0,
            });
            this.lis.alert(
                "p",
                this.$gl(
                    "Muhasebe Belgesi Kaydedildi.",
                    "Sales Document Saved."
                )
            );
            this.dv.isShowFinDocDialog = false;

            this.dv.lisDialog = this.cancelToDialog;
        },
    },
};
</script>
