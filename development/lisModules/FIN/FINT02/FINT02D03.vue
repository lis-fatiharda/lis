<template>
    <l-table
        v-model="lisfindoc.items"
        :columns="itemsColumns"
        @change="calcBalanceOfDoc()"
        @keydown="if ($event.key == 'Insert') pushNewItem($event);"
        @zoom="zoomForRow = $event.row"
    />

    <FINT01D01mini
        :pComp="lisfindoc.company"
        :isShow="zoomForRow == null ? false : true"
        @ok="
            lisfindoc.items[zoomForRow].acctype = $event.acctype;
            lisfindoc.items[zoomForRow].account = $event.account;
            lisfindoc.items[zoomForRow].atext = $event.stext;
            lisfindoc.items[zoomForRow].glaccount = $event.glaccount;
            lisfindoc.items[zoomForRow].currency = $event.currency;
            zoomForRow = null;
        "
        @cancel="zoomForRow = null"
    />

    <l-div-flex>
        <l-space />
        <l-input
            type="money"
            :label="this.$gl(`Borç`, `Debit`)"
            v-model="lisfindoc.ddebit"
            filled
            readonly
        />
        <l-input
            type="money"
            :label="this.$gl(`Alacak`, `Credit`)"
            v-model="lisfindoc.dcredit"
            filled
            readonly
        />
        <l-input
            type="money"
            :label="this.$gl(`Bakiye`, `Balance`)"
            v-model="lisfindoc.ddiff"
            filled
            readonly
            :class="lisfindoc.ddiff > 0 ? 'bg-red-3' : 'bg-yellow-2'"
        />
    </l-div-flex>
</template>

<script>
import calcBalanceOfDoc from "../../classes/finance/calcBalanceOfDoc.js";

export default {
    props: ["lisfindoc", "tabInfo"],
    data() {
        return {
            selectedRow: 0,
            showDetail: false,
            zoomForRow: null,

            itemsColumns: [
                {
                    label: this.$gl("Kalem", "Item"),
                    value: "itemnum",
                    type: "number",
                },
                {
                    type: "selectmenu",
                    label: this.$gl("Hesap Tipi", "Account Type"),
                    value: "acctype",
                    options: "lisfin004",
                    optValue: "acctype",
                    optTitles: { acctype: "Tip", stext: "Açıklama" },
                },
                {
                    label: this.$gl(`Hesap No`, `Account No`),
                    value: "account",
                    type: "zoom",
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
            let myReturn = await calcBalanceOfDoc(this.lisfindoc, this.lis);
            await lis.objectMove(myReturn, this.lisfindoc);
        },
        async pushNewItem(event) {
            let myReturn = await this.lis.function(
                "FINT02/pushNewItem",
                this.lisfindoc
            );
            myReturn.itemnum =
                this.lisfindoc.items[this.lisfindoc.items.length - 1]
                    .itemnum + 10;
            this.lisfindoc.items.push(myReturn);
        },

        calcBalance(event) {
            this.lisfindoc = calcBalance(this.lisfindoc);
        },

        async removeItem(index) {
            this.lisfindoc.items.splice(index, 1);
        },
    },
};
</script>
