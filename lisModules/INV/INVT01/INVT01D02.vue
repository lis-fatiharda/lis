<template>
    <!--Tittle Layer-->
    <l-card0>
        <l-tabs v-model="tab">
            <l-tab name="no" label="Belgesiz Giriş" />
            <l-tab name="order" label="Satınalma Girişi" />
        </l-tabs>

        <l-tab-panels v-model="tab" animated style="padding: 0">
            <l-tab-panel name="no" style="padding: 0">
                <INVT01D21 :tabInfo="tabInfo" />
            </l-tab-panel>
            <l-tab-panel name="order" style="padding: 0">
                <INVT01D22 :tabInfo="tabInfo" />
            </l-tab-panel>
        </l-tab-panels>
    </l-card0>
</template>

<script>
import INVT01D21 from "./INVT01D21.vue";
import INVT01D22 from "./INVT01D22.vue";
export default {
    props: ["tabInfo"],
    components: {
        INVT01D21,
        INVT01D22,
    },
    data() {
        return {
            tab: "no",
        }
    }
};
</script>

