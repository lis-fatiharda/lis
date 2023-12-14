<template>
    <l-toolbar :class="`bg-${tabInfo.moduleColor} text-black`">
        <l-toolbar-title>UBL Detayı</l-toolbar-title>
        <l-btn
            icon="cancel"
            flat
            round
            dense
            color="negative"
            @click="$emit('cancel')"
        />
    </l-toolbar>

    <q-splitter v-model="splitterModel">
        <template v-slot:before>
            <div class="q-pa-md">
                {{ edistr }}
            </div>
        </template>

        <template v-slot:after>
            <q-card flat bordered>
                <q-card-section v-html="htmlstr" />
            </q-card>
        </template>
    </q-splitter>
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
    data() {
        return {
            splitterModel: 50,
            edistr: "",
            htmlstr: ``
        };
    },
    mounted() {
        let selected = this.dv.lisedndocsList.filter(
            (e) => e._selected == true
        );

        this.edistr = selected[0].edistr;
    },
};
</script>
