<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="account_balance" />

                <l-toolbar-title>{{
                    this.$gl(
                        "Muhasebe Belgesi Detayı",
                        "Accounting Slips Details"
                    )
                }}</l-toolbar-title>

                <div class="q-gutter-xs">
                    <l-btn
                        v-if="dv.modi != 2"
                        icon="print"
                        color="primary"
                        @click="btnPrint()"
                    />

                    <l-btn
                        v-if="dv.modi != 2"
                        icon="save"
                        color="teal"
                        @click="btnSave()"
                    />

                    <l-btn
                        icon="cancel"
                        color="negative"
                        @click="this.cancel()"
                    />
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
                    class="bg-blue-1"
                    :readonly="dv.modi == 0 ? false : true"
                />
                <l-select
                    :label="this.$gl(`İş Alanı`, `Business Area`)"
                    v-model="dv.lisfindocs.busarea"
                    options="lisbas003"
                    optValue="busarea"
                    optTitle="stext"
                    optCaptions="busarea"
                    width="120px"
                    class="bg-blue-1"
                    :readonly="dv.modi == 0 ? false : true"
                />
                <l-select
            :label="this.$gl(`Belge Tipi`, `Document Type`)"
            v-model="dv.lisfindocs.doctype"
            options="lisfin003"
            optValue="doctype"
            optTitle="stext"
                    optCaptions="doctype"
          />
                <l-input
                    :label="this.$gl(`Belge No`, `Document No`)"
                    v-model="dv.lisfindocs.docnum"
                    readonly
                ></l-input>

                <!-- destektablo SORULACAK -->
                <l-select
                    :label="this.$gl(`Muh. Stndr.`, `Acc. Stndr`)"
                    v-model="dv.lisfindocs.accstd"
                    options="lisfin001"
                    optValue="accstd"
                    optTitle="stext"
                    optCaptions="accstd"
                    width="120px"
                    class="bg-blue-1"
                    :readonly="dv.modi == 0 ? false : true"
                />
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
                
                

                <l-checkbox
                    :label="this.$gl(`Silindi`, `Deleted`)"
                    v-model="dv.lisfindocs._deleted"
                    color="pink"
                />
            </l-div-flex>
            <l-div>
                <l-input
                    :label="this.$gl(`Hesap Açıklaması`, `Account Description`)"
                    v-model="dv.lisfindocs.stext"
                ></l-input>
            </l-div>
                
        </l-card0>

        <l-card>
        <l-tabs
            v-model="tab"
        >
            <l-tab name="Kalemler" :label="this.$gl(`Kalemler`, `Items`)" />
            <l-tab name="Detaylar" :label="this.$gl(`Detaylar`, `Details`)" />
            <l-tab name="Notlar" :label="this.$gl(`Notlar`, `Notes`)" />
            <l-tab name="Eklenenler" :label="this.$gl(`Eklenenler`, `Added`)" />
        </l-tabs>

        <l-tab-panels v-model="tab" animated>
            <l-tab-panel name="Kalemler" style="padding: 0">
                <FINT02D05 :dv="dv" :tabInfo="tabInfo" />
                <FINT02D03 :dv="dv" :tabInfo="tabInfo" />
            </l-tab-panel>

            <l-tab-panel name="Detaylar" style="padding: 0">
                <FINT02D04 :dv="dv" :tabInfo="tabInfo" />
            </l-tab-panel>

            <l-tab-panel name="Notlar" class="q-gutter-xs">
                <FINT02D10 :dv="dv" :tabInfo="tabInfo" />
            </l-tab-panel>

            <l-tab-panel name="Eklenenler" class="q-gutter-xs">
                <FINT02D11 :dv="dv" :tabInfo="tabInfo" />
            </l-tab-panel>
        </l-tab-panels>
    </l-card>
    </l-div>

    
</template>

<script>
import FINT02D03 from "./FINT02D03.vue";
import FINT02D04 from "./FINT02D04.vue";
import FINT02D05 from "./FINT02D05.vue";

import FINT02D10 from "./FINT02D10.vue";
import FINT02D11 from "./FINT02D11.vue";

export default {
    props: ["dv", "tabInfo"],
    components: {
        FINT02D03,
        FINT02D04,
        FINT02D05,
        FINT02D10,
        FINT02D11,
    },
    data() {
        return {
            tab: "Kalemler",
        }
},

    methods: {
        async btnSave() {
            console.log("btnSave çalıştı");
            await this.lis.function("FINT02/02-btnSave", this.dv);
            this.cancel();
        },
        cancel() {
            this.tabInfo.blockGoToTransaction = false;
            this.dv.lisDialog = "FINT02D01";
        },
        async init(prop) {
            await this.lis.function("FINT02/02-init", prop);
        },
    },
    mounted() {
        this.init(this.dv);
        this.tabInfo.blockGoToTransaction = true;
    },
    async beforeUnmount() {
        await this.lis.function("cls-system.unlock", {
                company: this.dv.lisfindocs.company,
                lid: "FINT02",
                lockkey:
                    this.dv.lisfindocs.doctype + this.dv.lisfindocs.docnum,
            });
    },
};
</script>
