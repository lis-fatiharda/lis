<template>
    <div>
        <l-div v-if="mv.lisDialog == 'LISBAS017'">
            <!--Tittle Layer-->
            <l-card0>
                <q-bar class="bg-blue-grey-3">
                    Destek Tablosu - lisbas017
                </q-bar>
                <q-bar :class="`bg-${tabInfo.moduleColor}`">
                    <l-toolbar-title>{{
                        this.$gl(
                            "Ödeme Koşulları",
                            "Terms of Payment"
                        )
                    }}</l-toolbar-title>

                    <l-btn
                        icon="cancel"
                        flat
                        round
                        dense
                        color="negative"
                        @click="cancel()"
                    />
                </q-bar>

                <l-div-flex>
                    <l-select
                        :label="this.$gl(`Firma`, `Company`)"
                        v-model="mv.sc.company"
                        options="lisbas001"
                        optValue="company"
                        optTitle="stext"
                        optCaptions="company"
                        width="120px"
                    />
                    <l-input
                        :label="this.$gl(`Ödeme Tipi`, `Payment Type`)"
                        
                        dense
                        v-model="mv.sc.paymcond"
                    ></l-input>
                    <l-input
                        :label="this.$gl(`Açıklama`, `Description`)"
                        
                        dense
                        v-model="mv.sc.stext"
                    ></l-input>
                    <!-- <l-select
                        
            
                        v-model="mv.status"
                        :label="this.$gl(`Statü`, `Status`)"
                        :options="[
                            { label: this.$gl(`Serbest`, `Free`), value: 0 },
                            {
                                label: this.$gl(`Zorunlu`, `Compulsory`),
                                value: 1,
                            },
                            {
                                label: this.$gl(
                                    `Boş Bırakılmalı`,
                                    `Should be left blank`
                                ),
                                value: 2,
                            },
                        ]"
                        optValue="value"
                        map-options
                        style="width: 200px"
                    />
                    <l-select
                    
                        v-model="mv.entgr"
                        :label="this.$gl(`Entegrasyon`, `Integration`)"
                        :options="[
                            {
                                label: this.$gl(
                                    `Entegrasyonsuz`,
                                    `No Integration`
                                ),
                                value: 0,
                            },
                            {
                                label: this.$gl(`Entegrasyonlu`, `Integrated`),
                                value: 1,
                            },
                            {
                                label: this.$gl(`Her İkisi`, `Both of them`),
                                value: 2,
                            },
                        ]"
                        optValue="value"
                        map-options
                        style="width: 200px"
                    />
                    <l-input
                        :label="this.$gl(`Değer Alanı`, `Value Area`)"
                        
                        dense
                        v-model="mv.sc.valuearea"
                    ></l-input>
                    <l-select
                        :label="this.$gl(`Hesap Tipi`, `Account Type`)"
                        v-model="mv.sc.acctype"
                        options="lisfin004"
                        optValue="acctype"
                        optTitle="stext"
                        optCaptions="acctype"
                        width="130px"
                    />

                    <l-input
                        :label="this.$gl(`Hesap No`, `Account No`)"
                        
                        dense
                        v-model="mv.sc.account"
                    ></l-input>
                    <l-select
                        v-model="mv.vatkey"
                        :label="this.$gl(`KDV Anahtarı`, `VAT Key`)"
                        :options="[
                            { label: this.$gl(`Hayır`, `No`), value: 0 },
                            { label: this.$gl(`Evet`, `Yes`), value: 1 },
                            {
                                label: this.$gl(`Hepsi`, `All`),
                                value: 2,
                            },
                        ]"
                        map-options
                        optValue="value"
                        style="width: 150px"
                    /><l-select
                        v-model="mv.stoppage"
                        :label="this.$gl(`Stopaj`, `Stoppage`)"
                        :options="[
                            { label: this.$gl(`Hayır`, `No`), value: 0 },
                            { label: this.$gl(`Evet`, `Yes`), value: 1 },
                            {
                                label: this.$gl(`Hepsi`, `All`),
                                value: 2,
                            },
                        ]"
                        map-options
                        optValue="value"
                        style="width: 150px"
                    /><l-select
                        v-model="mv.check"
                        :label="this.$gl(`Çek`, `Check`)"
                        :options="[
                            { label: this.$gl(`Hayır`, `No`), value: 0 },
                            { label: this.$gl(`Evet`, `Yes`), value: 1 },
                            {
                                label: this.$gl(`Hepsi`, `All`),
                                value: 2,
                            },
                        ]"
                        map-options
                        optValue="value"
                        style="width: 150px"
                    /><l-select
                        v-model="mv.sync"
                        :label="this.$gl(`Eşitleme`, `Sync`)"
                        :options="[
                            { label: this.$gl(`Hayır`, `No`), value: 0 },
                            { label: this.$gl(`Evet`, `Yes`), value: 1 },
                            {
                                label: this.$gl(`Hepsi`, `All`),
                                value: 2,
                            },
                        ]"
                        map-options
                        optValue="value"
                        style="width: 150px"
                    /> -->
                </l-div-flex>
            </l-card0>

            <!--Searching Criterias Layer------>

            <!--------------------------------->

            <!--Butons Layer Layer---------------------->

        
                <l-btn-group>
                    <l-btn
                        color="warning"
                        icon="search"
                        @click="btnSearch(mv)"
                    />
                    <l-btn color="primary" icon="edit" @click="btnEdit(mv)" />
                    <l-btn
                        color="secondary"
                        icon="add"
                        @click="btnInsert(mv)"
                    />
                    <l-btn
                        color="negative"
                        icon="delete"
                        @click="btnDelete(mv)"
                    />
                </l-btn-group>

            <l-table
                name="LISBAS017"
                v-model="mv.lisbas017List"
                :columns="myColumnsBas017"
                :context="contextMenu"
                :height="'70vh'"
                :width="'100%'"
                :readonly="true"
            />
        </l-div>
        <LISBAS017D002
            :mv="mv"
            :dv="dv"
            :lv="lv"
            :tabInfo="tabInfo"
            v-if="mv.lisDialog == 'LISBAS017D002'"
        />
    </div>
</template>

<script>
import LISBAS017D002 from "./LISBAS017D002.vue";

export default {
    props: ["lv", "dv", "goToTransaction", "currentTab", "tabInfo"],
    components: {
        LISBAS017D002,
    },

    data() {
        return {
            mv: {
                sc: {
                    company: "01",
                    paymcond: "",
                    stext: "",
                    _deleted: false,
                },

                lisDialog: "LISBAS017",
                modi: 2,
                lisbas017List: [],
                lisbas017: {},
                myColumnsbas17items: [],
            },
            myColumnsBas017: [
                {
                    label: this.$gl(`Firma`, `Company`),
                    value: "company",
                    type: "string",
                },
                
                {
                    label: this.$gl(`Ödeme Tipi`, `Payment Type`),
                    value: "paymcond",
                    type: "string",
                },
                {
                    label: this.$gl(`Açıklama`, `Description`),
                    value: "stext",
                    type: "string",
                },
            ],
        };
    },

    methods: {
        async btnSearch(prop) {
            this.mv = await this.lis.function(
                "BAST01/SUPS/lisbas017/01-btnSearch",
                prop
            );
        },
        async btnEdit(prop) {
            this.mv = await this.lis.function(
                "BAST01/SUPS/lisbas017/01-btnEdit",
                prop
            );
        },
        async btnInsert(prop) {
            this.mv = await this.lis.function(
                "BAST01/SUPS/lisbas017/01-btnInsert",
                prop
            );
        },
        async btnDelete(prop) {
            this.mv = await this.lis.function(
                "BAST01/SUPS/lisbas017/01-btnDelete",
                prop
            );
            this.btnSearch(prop);
        },
        

        async cancel() {
            this.dv.lisDialog = "BAST01D01";
        },
    },

    async beforeUnmount() {
        await this.lis.function("cls-system.unlock", {
            company: "01",
            lid: "BAST01",
            lockkey: this.dv.olismodels[0].model,
        });
        this.tabInfo.blockGoToTransaction = false;
    },
};
</script>
<script></script>