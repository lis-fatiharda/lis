<template>
    <l-div v-if="mv.lisDialog == 'LISFIN002D002'">
        <!--Tittle Layer-->
        <l-card>
            <q-bar class="bg-blue-grey-3"> Destek Tablosu - lisfin002 </q-bar>
            <q-bar :class="`bg-${tabInfo.moduleColor}`">
                <l-toolbar-title>{{
                    this.$gl(
                        "Muhasebe Kayıt Anahtarları",
                        "Accounting Registration Key"
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
            <l-card-section>
                <l-div-flex>
                    <l-select
                        :label="this.$gl(`Firma`, `Company`)"
                        v-model="mv.lisfin002.company"
                        options="lisbas001"
                        optValue="company"
                        optTitle="stext"
                        optCaptions="company"
                        width="120px"
                    />
                    <l-select
                        :label="
                            this.$gl(
                                `Muhasebe Standartı`,
                                `Accounting Standard`
                            )
                        "
                        v-model="mv.lisfin002.accstd"
                        options="lisfin001"
                        optValue="accstd"
                        optTitle="stext"
                        optCaptions="accstd"
                        width="170px"
                    />
                    <l-input
                        :label="this.$gl(`Kayıt Anahtarı`, `Registration Key`)"
                        dense
                        v-model="mv.lisfin002.postkey"
                    ></l-input>
                    <l-input
                        :label="this.$gl(`Açıklama`, `Description`)"
                        dense
                        v-model="mv.lisfin002.stext"
                    ></l-input>
                    <l-checkbox
                        :label="
                            this.$gl(`Entegrasyonlu Fiş?`, `Integrated Plug?`)
                        "
                        v-model="mv.lisfin002.isintegration"
                        color="pink"
                    />
                    <!-- -->
                    <l-checkbox
                        :label="this.$gl(`Cari Kart`, `Customer Card`)"
                        v-model="mv.lisfin002.iscustomer"
                        color="pink"
                    />
                    <l-checkbox
                        :label="this.$gl(`Banka (Borç)`, `Bank 1`)"
                        v-model="mv.lisfin002.isbankDebit"
                        color="pink"
                    />
                    <l-checkbox
                        :label="this.$gl(`Banka (Alacak)`, `Bank 2`)"
                        v-model="mv.lisfin002.isbankCredit"
                        color="pink"
                    />
                </l-div-flex>

                <l-separator />
                <l-div-flex>
                    <l-chip square dense>
                        <q-avatar color="primary" text-color="white"
                            >A</q-avatar
                        >
                        Demirbaş
                    </l-chip>
                    <l-chip square dense>
                        <q-avatar color="red" text-color="white">C</q-avatar>
                        Maliyet Merkezi
                    </l-chip>

                    <l-chip square dense>
                        <q-avatar color="amber" text-color="white">L</q-avatar>
                        Akreditif Çek No
                    </l-chip>

                    <l-chip square dense>
                        <q-avatar color="red" text-color="white">M</q-avatar>
                        Ay
                    </l-chip>

                    <l-chip square dense>
                        <q-avatar color="red" text-color="white">R</q-avatar>
                        Personel
                    </l-chip>

                    <l-chip square dense>
                        <q-avatar color="brown" text-color="white">P</q-avatar>
                        Ürün
                    </l-chip>

                    <l-chip square dense>
                        <q-avatar color="brown" text-color="white">T</q-avatar>
                        Malzeme Tipi
                    </l-chip>

                    <l-chip square dense>
                        <q-avatar color="brown" text-color="white">X</q-avatar>
                        Malzeme
                    </l-chip>

                    <l-chip square dense>
                        <q-avatar color="negative" text-color="white"
                            >Y</q-avatar
                        >
                        KDV Anahtarı
                    </l-chip>

                    <l-chip square dense>
                        <q-avatar color="secondary" text-color="white"
                            >Z</q-avatar
                        >
                        Banka
                    </l-chip>

                    <l-chip square dense>
                        <q-avatar color="secondary" text-color="white"
                            >B</q-avatar
                        >
                        Para Birimi
                    </l-chip>

                    <l-chip square dense>
                        <q-avatar color="amber" text-color="white">E</q-avatar>
                        Tesis
                    </l-chip>

                    <l-chip square dense>
                        <q-avatar color="amber" text-color="white">W</q-avatar>
                        Depo
                    </l-chip>

                    <l-chip square dense>
                        <q-avatar color="amber" text-color="white">S</q-avatar>
                        Stok Yeri
                    </l-chip>

                    <l-space />
                    <l-btn
                        label="Runcode"
                        outline
                        dense
                        @click="openRuncode()"
                    />
                </l-div-flex>
            </l-card-section>
        </l-card>

        <l-dialog v-model="isShowRuncode" persistent>
            <q-bar :class="`bg-${tabInfo.moduleColor} text-black`">
                <l-toolbar-title class="text-black"> RUNCODE</l-toolbar-title>

                <l-btn
                    v-close-popup
                    dense
                    icon="close"
                    color="negative"
                    @click="isShowRuncode = false"
                />
            </q-bar>

            <l-card style="height: 100%">
                <q-editor
                    v-model="mv.lisfin002.items[selectedRow].runcode"
                    min-height="5rem"
                    class="bg-grey-1"
                />
            </l-card>

            <!--  Page Ends **************************************** -->
        </l-dialog>
        <!--Searching Criterias Layer-->
        <l-table
            v-model="mv.lisfin002.items"
            :columns="myColumnsfin02items"
            :context="contextMenu"
            height="60vh"
            @keydown="if ($event.key == 'Insert') this.pushNewItem($event);"
        />
    </l-div>
</template>

<script>
export default {
    props: ["lv", "dv", "goToTransaction", "currentTab", "tabInfo", "mv"],
    components: {},

    data() {
        return {
            isShowRuncode: false,
            selectedRow: -1,
            contextMenu: [
                {
                    name: "Satır Ekle",
                    callback: async () => {
                        this.pushNewItem();
                    },
                },
            ],

            myColumnsfin02items: [
                {
                    label: this.$gl("Kalem", "Item"),
                    value: "itemnum",
                    type: "string",
                },

                {
                    type: "selectmenu",
                    label: this.$gl("Yön", "Movement"),
                    value: "postway",
                    options: [
                        { value: 0, label: "Borç" },
                        { value: 1, label: "Alacak" },
                    ],
                    optValue: "value",
                    optTitles: { label: "Yön" },
                },

                {
                    label: this.$gl("Borç/Alacak", "Movement"),
                    value: "postway",
                    type: "select",
                    options: [
                        { value: 0, label: "Borç" },
                        { value: 1, label: "Alacak" },
                    ],
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
                    label: this.$gl("Hesap", "Account"),
                    value: "account",
                    type: "string",
                },
                {
                    label: this.$gl(
                        "Tek Düzen Hesap No",
                        "Uniform Account Number"
                    ),
                    value: "glaccount",
                    type: "string",
                },
                {
                    label: this.$gl("Değer Alanı", "Value Field"),
                    value: "valuefield",
                    type: "string",
                },
                {
                    label: this.$gl("Açıklama", "Description"),
                    value: "stext",
                    type: "string",
                },

                {
                    type: "selectmenu",
                    label: "Vadeli Kağıt Tipi",
                    value: "futpapertype",
                    options: [
                        { value: 0, stext: "Hiçbiri" },
                        { value: 1, stext: "Çek" },
                        { value: 2, stext: "Senet" },
                        { value: 3, stext: "Akreditif Mektup" },
                    ],
                    optValue: "value",
                    optTitles: { value: "Tip", stext: "Açıklama" },
                },

                {
                    type: "selectmenu",
                    label: "Vadeli Kağıt Statüsü",
                    value: "futpaperstat",
                    options: [
                        { futpapertype: 1, value: 0, stext: "None" },
                        { futpapertype: 1, value: 1, stext: "Portföyde" },
                        { futpapertype: 1, value: 2, stext: "Ciro Edildi" },
                        { futpapertype: 1, value: 3, stext: "Bankada" },
                        { futpapertype: 1, value: 4, stext: "Ödendi" },
                        {
                            futpapertype: 1,
                            value: 5,
                            stext: "Müşt. İade Edildi",
                        },
                        {
                            futpapertype: 1,
                            value: 6,
                            stext: "Portfoyde (Karşılıksız)",
                        },
                        {
                            futpapertype: 1,
                            value: 7,
                            stext: "Müşt. İade (Karşılıksız)",
                        },
                        {
                            futpapertype: 1,
                            value: 8,
                            stext: "Portföyde (Ciro Karşılıksız)",
                        },
                        {
                            futpapertype: 1,
                            value: 9,
                            stext: "Bankada (Kırdırılacak)",
                        },
                        {
                            futpapertype: 1,
                            value: 10,
                            stext: "Bankada (Kırdırıldı)",
                        },
                        { futpapertype: 2, value: 0, stext: "None" },
                        { futpapertype: 2, value: 1, stext: "Portföyde" },
                        { futpapertype: 2, value: 2, stext: "Ciro Edildi" },
                        { futpapertype: 2, value: 3, stext: "Bankada" },
                        { futpapertype: 2, value: 4, stext: "Ödendi" },
                        {
                            futpapertype: 2,
                            value: 5,
                            stext: "Müşt. İade Edildi",
                        },
                        {
                            futpapertype: 2,
                            value: 6,
                            stext: "Portfoyde (Karşılıksız)",
                        },
                        {
                            futpapertype: 2,
                            value: 7,
                            stext: "Müşt. İade (Karşılıksız)",
                        },
                        {
                            futpapertype: 2,
                            value: 8,
                            stext: "Portföyde (Ciro Karşılıksız)",
                        },
                        {
                            futpapertype: 2,
                            value: 9,
                            stext: "Bankada (Kırdırılacak)",
                        },
                        {
                            futpapertype: 2,
                            value: 10,
                            stext: "Bankada (Kırdırıldı)",
                        },
                        { futpapertype: 3, value: 0, stext: "None" },
                        {
                            futpapertype: 3,
                            value: 11,
                            stext: "Alınan Akrd.Mek.Açık",
                        },
                        {
                            futpapertype: 3,
                            value: 12,
                            stext: "Alınan Akrd.Mek.Güvencede",
                        },
                        {
                            futpapertype: 3,
                            value: 13,
                            stext: "Alınan Akrd.Mek.Ödenmiş",
                        },
                        {
                            futpapertype: 3,
                            value: 11,
                            stext: "Verilen Akrd.Mek.Açık",
                        },
                        {
                            futpapertype: 3,
                            value: 12,
                            stext: "Verilen Akrd.Mek.Kırdırılmış",
                        },
                        {
                            futpapertype: 3,
                            value: 13,
                            stext: "Verilen Akrd.Mek.Ödenmiş",
                        },
                    ],
                    optValue: "value",
                    optTitles: {
                        futpapertype: "Kağıt Tipi",
                        value: "Tip",
                        stext: "Açıklama",
                    },
                    optFilter: { futpapertype: "$futpapertype" },
                },

                {
                    type: "selectmenu",
                    label: this.$gl("Para Birimi", "Currency"),
                    value: "currency",
                    options: "lisbas007",
                    optValue: "unit",
                    optTitles: { unit: "Birim", stext: "Açıklama" },
                    optFilter: { unittype: 1 },
                },

                {
                    type: "string",
                    label: "Kod",
                    value: "runcode",
                },
            ],
        };
    },

    methods: {
        async openRuncode() {
            this.selectedRow = await this.lis.findSelectedIndex(
                this.mv.lisfin002.items
            );

            if (this.selectedRow == -1) {
                this.lis.alert("w", "Lütfen Bir Satır Seçiniz!");
                return;
            }
            this.isShowRuncode = true;
        },
        async btnSave() {
            await this.lis.function(
                "BAST01/SUPS/lisfin002/02-btnSave",
                this.mv
            );
            this.cancel();
        },
        async cancel() {
            this.mv.lisDialog = "LISFIN002";
        },
        // async init(prop) {
        //     await this.lis.function("BAST01/SUPS/lisfin002/02-init", this.mv);
        // },
        async pushNewItem(event) {
            console.log("pushNewItem", event);
            let myReturn = await this.lis.function(
                "BAST01/SUPS/lisfin002/pushNewItem",
                this.mv
            );
            myReturn.itemnum =
                this.mv.lisfin002.items[this.mv.lisfin002.items.length - 1]
                    .itemnum + 10;
            this.mv.lisfin002.items.push(myReturn);
        },
    },
};
</script>
