<template>
    <!--Tittle Layer-->
    <l-card>
        <l-tabs
            v-model="tab"
        >
            <l-tab name="no" label="Belgesiz Çıkış" />
            <l-tab name="order" label="İrsaliye Çıkışı" />
        </l-tabs>

        <l-tab-panels v-model="tab" animated>
            <l-tab-panel name="no" class="q-pa-xs">
                <INVT01D41 :tabInfo="tabInfo" />
            </l-tab-panel>
            <l-tab-panel name="order" class="q-pa-xs">
                <INVT01D42 :tabInfo="tabInfo" />
            </l-tab-panel>
        </l-tab-panels>
    </l-card>
</template>

<script>
import INVT01D41 from "./INVT01D41.vue";
import INVT01D42 from "./INVT01D42.vue";
export default {
    props: ["tabInfo"],
    components: {
        INVT01D41,
        INVT01D42,
    },
    data() {
        return {
            tab: "no",
        };
    },

};
</script>

function data() { throw new Error('Function not implemented.'); }
