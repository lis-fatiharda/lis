<template>
    <l-div-flex>
        <l-card style="width: 100%" bordered>
            <l-div-flex class="text-overline">
                <l-select
                    :label="this.$gl(`Kayıt Anahtarı`, `Post Key`)"
                    v-model="cv.postkey"
                    @select="this.setPostKey()"
                    :options="postKeyList"
                    optValue="postkey"
                    optTitle="stext"
                    optCaptions="postkey"
                    width="150px"
                    class="bg-amber-2"
                />

                <l-input
                    label="Açıklama"
                    v-model="cv.stext"
                    min-width="320px"
                    readonly
                />

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
                    @click="clearFinItem()"
                />
            </l-div-flex>
            <l-separator inset />
            <l-card-section class="row">
                <l-input
                    :label="this.$gl(`Cari Kodu`, `Customer Code`)"
                    v-model="cv.customer"
                    v-if="olisfin002?.iscustomer == true"
                >
                    <l-chip
                        class="bg-white"
                        icon="search"
                        dense
                        clickable
                        @click="cv.isSelectCust = true"
                    >
                        <BAST02D01mini
                            :pComp="lisfindoc.company"
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
                    :label="this.$gl(`Cari Adı`, `Customer Name`)"
                    v-model="cv.name1"
                    style="width: 300px"
                    v-if="olisfin002?.iscustomer == true"
                >
                </l-input>

                <l-select
                    :label="this.$gl(`Banka (Gönderen)`, `Bank`)"
                    v-model="cv.bankCredit"
                    options="lisbas015"
                    optValue="baccount"
                    optTitle="stext"
                    optCaptions="baccount"
                    width="250px"
                    v-if="olisfin002?.isbankCredit == true"
                />

                <l-select
                    :label="this.$gl(`Banka (Gelen)`, `Bank`)"
                    v-model="cv.bankDebit"
                    options="lisbas015"
                    optValue="baccount"
                    optTitle="stext"
                    optCaptions="baccount"
                    width="250px"
                    v-if="olisfin002?.isbankDebit == true"
                />

                <l-input
                    type="money"
                    :label="this.$gl(`Tutar`, `Amount`)"
                    v-model="cv.postamnt"
                    v-if="cv.postkey?.length > 0"
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
                    v-if="cv.postkey?.length > 0"
                />
                <l-input
                    :label="this.$gl(`Kur`, `Exchange`)"
                    type="number"
                    v-model="cv.currate"
                    v-if="cv.postkey?.length > 0"
                />
                <l-date
                    :label="this.$gl(`Kur Tarihi`, `Currency Date`)"
                    v-model="cv.curdate"
                    style="width: 150px"
                    v-if="cv.postkey?.length > 0"
                />
            </l-card-section>
        </l-card>
    </l-div-flex>
</template>

<script>
export default {
    props: ["lisfindoc", "tabInfo", "postKeyList"],
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

                bankDebit: "",
                bankCredit: "",
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
            olisfin002: {},
        };
    },

    methods: {
        async setPostKey() {
            
            this.olisfin002 = await this.lis.function("FINT02/05-setPostKey", {
                company: this.lisfindoc.company,
                postkey: this.cv.postkey,
            });

            this.cv.stext = this.olisfin002?.stext;
        },
        async createFinFromPostkey() {
            let myReturn = await this.lis.function(
                "cls-finance.createFinFromPostkey",
                { plisfindocs: this.lisfindoc, cv: this.cv }
            );
            this.lis.objectMove(myReturn, this.lisfindoc)
            this.lisfindoc.items = myReturn.items;
        },
        async clearFinItem() {
            this.lisfindoc.items = await this.lis.function(
                "FINT02/clearFinItem",
                {}
            );
        },
    },
};
</script>
