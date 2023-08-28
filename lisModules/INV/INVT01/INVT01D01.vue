<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="inventory" />

                <l-toolbar-title>{{
                    this.$gl("Malzeme Hareketleri", "Material Movements")
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
                <l-tabs v-model="tab">
                    <l-tab name="enterance" :label="this.$gl(`Giriş`, `Entry`)" />
                    <l-tab
                        name="transfer"
                        :label="this.$gl(`Transfer`, `Transfer`)"
                    />
                    <l-tab name="exit" :label="this.$gl(`Çıkış`, `Exit`)" />
                </l-tabs>

                <l-tab-panels v-model="tab" animated>
                    <l-tab-panel name="enterance" class="q-pa-xs">
                        <INVT01D02 :tabInfo="tabInfo" />
                    </l-tab-panel>

                    <l-tab-panel name="transfer" class="q-pa-xs">
                        <INVT01D03 :tabInfo="tabInfo" />
                    </l-tab-panel>

                    <l-tab-panel name="exit" class="q-pa-xs">
                        <!--INVT01D04 :tabInfo="tabInfo" /-->
                    </l-tab-panel>
                </l-tab-panels>
            </l-card>

            <!--------------------------------->
        </l-card0>
    </l-div>
</template>

<script>
import INVT01D02 from "./INVT01D02.vue";
import INVT01D03 from "./INVT01D03.vue";
import INVT01D04 from "./INVT01D04.vue";

export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
    components: {
        INVT01D02,
        INVT01D03,
        INVT01D04,
    },

    data() {
        return {
            tab: "enterance",
        };
    },
};
</script>
