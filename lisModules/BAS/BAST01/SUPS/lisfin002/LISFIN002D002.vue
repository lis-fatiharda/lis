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
                        :label="
                            this.$gl(`Cari Kart`, `Customer Card`)
                        "
                        v-model="mv.lisfin002.iscustomer"
                        color="pink"
                    />
                    <l-checkbox
                        :label="
                            this.$gl(`Banka (Borç)`, `Bank 1`)
                        "
                        v-model="mv.lisfin002.isbankDebit"
                        color="pink"
                    />
                    <l-checkbox
                        :label="
                            this.$gl(`Banka (Alacak)`, `Bank 2`)
                        "
                        v-model="mv.lisfin002.isbankCredit"
                        color="pink"
                    />
                </l-div-flex>

                <l-separator/>
                <l-div-flex>
                        <l-chip square dense>
                            <q-avatar color="primary" text-color="white"
                                >A</q-avatar
                            >
                            Demirbaş
                        </l-chip>
                        <l-chip square dense>
                            <q-avatar color="red" text-color="white"
                                >C</q-avatar
                            >
                            Maliyet Merkezi
                        </l-chip>

                    
                        <l-chip square dense>
                            <q-avatar color="amber" text-color="white"
                                >L</q-avatar
                            >
                            Akreditif Çek No
                        </l-chip>
                  
                        <l-chip square dense>
                            <q-avatar color="red" text-color="white"
                                >M</q-avatar
                            >
                            Ay
                        </l-chip>
                    
                        <l-chip square dense>
                            <q-avatar color="red" text-color="white"
                                >R</q-avatar
                            >
                            Personel
                        </l-chip>
                   
                        <l-chip square dense>
                            <q-avatar color="brown" text-color="white"
                                >P</q-avatar
                            >
                            Ürün
                        </l-chip>
                  
                        <l-chip square dense>
                            <q-avatar color="brown" text-color="white"
                                >T</q-avatar
                            >
                            Malzeme Tipi
                        </l-chip>
                  
                        <l-chip square dense>
                            <q-avatar color="brown" text-color="white"
                                >X</q-avatar
                            >
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
                            <q-avatar color="amber" text-color="white"
                                >E</q-avatar
                            >
                            Tesis
                        </l-chip>
               
                        <l-chip square dense>
                            <q-avatar color="amber" text-color="white"
                                >W</q-avatar
                            >
                            Depo
                        </l-chip>
               
                        <l-chip square dense>
                            <q-avatar color="amber" text-color="white"
                                >S</q-avatar
                            >
                            Stok Yeri
                        </l-chip>
                </l-div-flex>
            </l-card-section>
        </l-card>
        <!--Searching Criterias Layer-->
        <l-table
            name="LISFIN002D002"
            :tableData="mv.lisfin002.items"
            :columns="myColumnsfin02items"
            :height="'70vh'"
            :width="'100%'"
            :readonly="false"
            :context="contextMenu"
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
                    label: this.$gl("Borç/Alacak", "Movement"),
                    value: "postway",
                    type: "checkbox",
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
                    label: this.$gl("Para Birimi", "Currency"),
                    value: "currency",
                    options: "lisbas007",
                    optValue: "unit",
                    optTitles: { unit: "Birim", stext: "Açıklama" },
                    optFilter: { unittype: 1 },
                },
            ],
        };
    },

    methods: {
        async btnSave() {
            await this.lis.function("BAST01/SUPS/lisfin002/02-btnSave", this.mv);
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
