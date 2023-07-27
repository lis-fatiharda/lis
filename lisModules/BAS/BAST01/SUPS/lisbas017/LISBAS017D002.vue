<template>
    <l-div v-if="mv.lisDialog == 'LISBAS017D002'">
        <!--Tittle Layer-->
        <l-card>
            <q-bar class="bg-blue-grey-3"> Destek Tablosu - lisbas017 </q-bar>
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
            <l-card-section horizontal>
                <l-div-flex>
                    <l-select
                        :label="this.$gl(`Firma`, `Company`)"
                        v-model="mv.lisbas017.company"
                        options="lisbas001"
                        optValue="company"
                        optTitle="stext"
                        optCaptions="company"
                        width="120px"
                    />
                    <!-- <l-select
                        :label="
                            this.$gl(
                                `Ödeme Tipi`,
                                `Payment Type`
                            )
                        "
                        v-model="mv.lisbas017.paymcond"
                        options="lisbas011"
                        optValue="paytype"
                        optTitle="stext"
                        optCaptions="paytype"
                        width="170px"
                    /> -->
                    <l-input
                        :label="this.$gl(`Ödeme Tipi`, `Payment Type`)"
                        dense
                        v-model="mv.lisbas017.paymcond"
                    ></l-input>

                    
                    <l-input
                        :label="this.$gl(`Açıklama`, `Description`)"
                        
                        dense
                        v-model="mv.lisbas017.stext"
                    ></l-input>
                   
                </l-div-flex>
              
            </l-card-section>
        </l-card>
        <!--Searching Criterias Layer-->
        <l-table
            name="LISBAS017D002"
            :tableData="mv.lisbas017.items"
            :columns="myColumnsbas17items"
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


myColumnsbas17items: [
                {
                    type: "selectmenu",
                    label: this.$gl("Ödeme Tipi", "Pay Type"),
                    value: "paytype",
                    options: "lisbas011",
                    optValue: "paytype",
                    optTitles: {
                      paytype: "Ödeme Tipi  ",
                        stext: "Açıklama",
                    },
                },
                {
                    label: this.$gl("Ödeme Günü", "Pay Day"),
                    type: "number",
                    value: "payday",
                },
                {
                    label: this.$gl(`Ödeme Tarihi`, `Pay Date`),
                    value: "paydate",
                    type: "datetime",
                },
                {
                    label: this.$gl("Yüzde%", "Percent%"),
                    type: "number",
                    value: "paypercent",
                },
                {
                    label: this.$gl("Ödeme Tutarı", "Pay Amount"),
                    type: "number",
                    fraction: 2,
                    value: "payamount",
                },
                {
                    label: this.$gl("Statü","Status"),
                    type: "string",
                    value: "paystat",
                },
                {
                    label: this.$gl("Not","Note"),
                    type: "string",
                    value: "ltext",
                },
                
                
            ],

            
        };
    },

    methods: {
        async btnSave() {
            await this.lis.function("BAST01/SUPS/lisbas017/02-btnSave", this.mv);
            this.cancel();
        },
        async cancel() {
            this.mv.lisDialog = "LISBAS017";
        },
       
        async pushNewItem(event) {
            console.log("pushNewItem", event);
            let myReturn = await this.lis.function(
                "BAST01/SUPS/lisbas017/pushNewItem",
                this.mv
            );
            myReturn.itemnum =
                this.mv.lisbas017.items[this.mv.lisbas017.items.length - 1]
                    .itemnum + 10;
            this.mv.lisbas017.items.push(myReturn);
        },
    },
    // mounted() {
    //     this.init(this.mv);
    // },
};
</script>
