<template>
    <l-div-flex>
        <l-card style="width: 100%">
            <l-div-flex class="text-overline">
                <l-select
                    :label="this.$gl(`Kayıt Anahtarı`, `Post Key`)"
                    v-model="cv.postkey"
                    @selectedRow="cv.stext = $event?.stext"
                    options="lisfin002"
                    optValue="postkey"
                    optTitle="stext"
                    optCaptions="postkey"
                    width="150px"
                    class="bg-amber-2"
                />

                <l-input label="Açıklama" v-model="cv.stext" width="250px"/>

                <l-space />
                <l-chip
                    icon="done"
                    clickable
                    label="Uygula"
                    dense
                    outline
                    color="secondary"
                    @click="createFinFromPostkey()"
                />
                <l-chip
                    icon="clear"
                    clickable
                    label="Temizle"
                    dense
                    outline
                    color="negative"
                />
            </l-div-flex>
            <l-separator inset />
            <l-card-section class="q-gutter-xs q-pa-xs row">
                <l-input
                    :label="this.$gl(`Müşteri Kodu`, `Customer Code`)"
                    v-model="cv.customer"
                >
                    <l-chip
                        class="bg-white"
                        icon="search"
                        dense
                        clickable
                        @click="cv.isSelectCust = true"
                    >
                        <BAST02D01mini
                            :pComp="dv.lisfindocs.company"
                            :isShow="cv.isSelectCust"
                            @ok="
                                cv.customer = $event.customer;
                                cv.name1 = $event.name1;
                                cv.isSelectCust = false;
                            "
                            @cancel="cv.isSelectCust = false"
                        />
                    </l-chip>
                </l-input>

                <l-input
                    :label="this.$gl(`Müşteri Adı`, `Customer Name`)"  
                    v-model="cv.name1"
                    style="width: 300px"
                >
                </l-input>

                <l-select
                    :label="this.$gl(`Banka`, `Bank`)"
                    v-model="cv.bank"
                    options="lisbas015"
                    optValue="baccount"
                    optTitle="stext"
                    optCaptions="baccount"
                    width="250px"
                />

                <l-input
                    type="money"
                    :label="this.$gl(`Tutar`, `Amount`)"
                    v-model="cv.postamnt"
                />
                <l-select
                    :label="this.$gl(`P.Br.`, `Currency`)"
                    v-model="cv.currency"
                    options="lisbas007"
                    optValue="unit"
                    optTitle="stext"
                    optCaptions="unit"
                    :optFilter="{ unittype: 1 }"
                    width="135px"
                />
                <l-input
                    :label="this.$gl(`Kur`, `Exchange`)"
                    type="number"
                    v-model="cv.currate"
                />
                <l-date
                    :label="this.$gl(`Kur Tarihi`, `Currency Date`)"
                    v-model="cv.curdate"
                    style="width: 150px"
                />
            </l-card-section>
        </l-card>
    </l-div-flex>
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
    data() {
        return {
            cv: {
                postkey: "",
                customer: "",
                iscustomer: false,
                isSelectCust: false,
                name1: "",
                isname1: false,
                stext: "",

                bank: "",
                isbank: false,
                banktxt: "",
                isbanktxt: false,

                postamnt: 0,
                ispostamnt: false,
                currency: "",
                iscurrency: false,
                currate: 1,
                iscurrate: false,
                curdate: new Date(),
                iscurdate: false,
            },
        };
    },

    methods: {
        async createFinFromPostkey() {
            this.dv.lisfindocs = await this.lis.function("cls-finance.createFinFromPostkey", {plisfindocs: this.dv.lisfindocs, cv: this.cv})
        }
    }
};
</script>
