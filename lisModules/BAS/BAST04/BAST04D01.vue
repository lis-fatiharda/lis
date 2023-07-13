<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="memory" />

                <l-toolbar-title>{{
                    this.$gl("Malzeme Varyantları", "Material Variants")
                }}</l-toolbar-title>

                <l-btn
                    icon="cancel"
                    flat
                    round
                    dense
                    color="negative"
                    @click="this.$btnGoHome(tabInfo)"
                />
            </l-toolbar>

            <!--Searching Criterias Layer------>
            <l-card style="padding: 0">
                <l-tabs
                    v-model="tab"
                >
                    <l-tab name="matCards" :label="this.$gl(`Malzeme Kartları`, `Material Cards`)" />
                    <l-tab
                        name="custCards"
                        :label="this.$gl(`Cari Kartlar`, `Customers-Vendors`)"
                    />
                    <l-tab name="bom" :label="this.$gl(`Ürün Ağaçları`, `BOM`)" />
                    <l-tab name="accounts" :label="this.$gl(`Hesap Planı`, `Accounts`)" />
                </l-tabs>

                <l-tab-panels v-model="tab" animated>
                    <l-tab-panel name="matCards" class="q-pa-xs">
                        
                    </l-tab-panel>

                    <l-tab-panel name="custCards" class="q-pa-xs">
                        
                    </l-tab-panel>

                    <l-tab-panel name="bom" class="q-pa-xs">
                        
                    </l-tab-panel>
                    <l-tab-panel name="accounts" class="q-pa-xs">
                        
                    </l-tab-panel>
                </l-tab-panels>
            </l-card>

            <!--------------------------------->
        </l-card0>
    </l-div>
</template>

<script>
export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
    components: {},

    data() {
        return {
            tab: "matCards",
        };
    },
};
</script>
