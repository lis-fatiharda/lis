<template>
    <l-div v-if="mv.lisDialog == 'LISFIN003D002'">
        <!--Tittle Layer-->
        <l-card>
            <q-bar class="bg-blue-grey-3"> Destek Tablosu - lisfin003 </q-bar>
            <q-bar :class="`bg-${tabInfo.moduleColor}`">
                <l-toolbar-title>{{
                    this.$gl(
                        "Muhasebe Belgeleri",
                        "Accounting Documents"
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
            <l-card-section horizontal>
                <l-div-flex>
                    <l-select
                        :label="this.$gl(`Firma`, `Company`)"
                        v-model="mv.lisfin003.company"
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
                        v-model="mv.lisfin003.accstd"
                        options="lisfin001"
                        optValue="accstd"
                        optTitle="stext"
                        optCaptions="accstd"
                        width="170px"
                    />
                    <l-input
                        :label="this.$gl(`Belge Tipi`, `Document Type`)"
                        
                        dense
                        v-model="mv.lisfin003.doctype"
                    ></l-input>
                    <l-input
                        :label="this.$gl(`Açıklama`, `Description`)"
                        
                        dense
                        v-model="mv.lisfin003.stext"
                    ></l-input>
                    <l-input
                        :label="this.$gl(`Numaratör`, `Number Range`)"
                        
                        dense
                        v-model="mv.lisfin003.numrange"
                    ></l-input>
                </l-div-flex>
                <l-separator vertical />

                <div>
             
                </div>
            </l-card-section>
        </l-card>
        <!--Searching Criterias Layer-->
        <l-table
            name="LISFIN003D002"
            v-model="mv.lisfin003.postkeys"
            :columns="myColumnsfin02postkeys"
            :height="'70vh'"
            :width="'50%'"
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

            myColumnsfin02postkeys: [
                {
                    label: this.$gl("Kayıt Anahtarı", "Postkey"),
                    value: "postkey",
                    type: "string",
                },

                {
                    label: this.$gl("Açıklama", "Explanation"),
                    value: "stext",
                    type: "string",
                },

                
            ],
        };
    },

    methods: {
        async btnSave() {
            await this.lis.function("BAST01/SUPS/lisfin003/02-btnSave", this.mv);
            this.cancel();
        },
        async cancel() {
            this.mv.lisDialog = "LISFIN003";
        },
        // async init(prop) {
        //     await this.lis.function("BAST01/SUPS/lisfin003/02-init", this.mv);
        // },
        async pushNewItem(event) {
            console.log("pushNewItem", event);
            let myReturn = await this.lis.function(
                "BAST01/SUPS/lisfin003/pushNewItem",
                this.mv
            );
            myReturn.itemnum =
                this.mv.lisfin003.postkeys[this.mv.lisfin003.postkeys.length - 1]
                    .itemnum + 10;
            this.mv.lisfin003.postkeys.push(myReturn);
        },
    },
    // mounted() {
    //     this.init(this.mv);
    // },
};
</script>
