<template>
    <q-layout container class="bg-white" style="width: 1000px">
        <q-header :class="`bg-${tabInfo.moduleColor} text-black`">
            <l-toolbar>
                <l-toolbar-title>{{
                    this.$gl("Varyant Detayı", "Variant Detail")
                }}</l-toolbar-title>

                <l-div-flex>
                    <l-btn
                        v-if="dv.modi != 2"
                        :v-close-popup="pop"
                        dense
                        color="primary"
                        icon="save"
                        @click="btnSave(), (item.showDetail = false)"
                    />
                    <l-btn
                        v-close-popup
                        dense
                        color="negative"
                        icon="close"
                        @click="item.showDetail = false"
                    />
                </l-div-flex>
            </l-toolbar>
        </q-header>

        <q-page-container>
            <l-div v-for="vrnt in variantOpts.items" :key="vrnt.id">
                <l-div-flex
                    ><l-input
                        v-if="vrnt.type == 0"
                        :label="vrnt.attribute"
                        v-model="vrnt.value"
                        style="width: 130px"
                    />
                    <l-input
                        v-if="vrnt.type == 0"
                        label="Min"
                        v-model="vrnt.minvalue"
                        style="width: 130px"
                        :readonly="true"
                    />
                    <l-input
                        v-if="vrnt.type == 0"
                        label="Max"
                        v-model="vrnt.maxvalue"
                        style="width: 130px"
                        :readonly="true"
                    />
                    <l-input
                        v-if="vrnt.type == 0"
                        label="Birim"
                        v-model="vrnt.qunit"
                        style="width: 130px"
                        :readonly="true"
                    />
                    <l-select
                        v-if="vrnt.type == 1"
                        :label="vrnt.attribute"
                        v-model="vrnt.value"
                        :options="vrnt.options"
                        optTitle="value"
                        optValue="value"
                        style="width: 200px"
                    />
                </l-div-flex>
            </l-div>
        </q-page-container>
    </q-layout>
</template>

<script>
export default {
    props: ["isShow", "dv", "tabInfo", "item"],
    data() {
        return {
            variantOpts: [],
            myVariant: {},
            pop: 1,
        };
    },
    methods: {
        async init() {
            this.variantOpts = await this.lis.function(
                "BAST04/01-initSetVaryant",
                this.item
            );

            if (this.item.variant != "") {
                for (let x in this.variantOpts.items) {
                    let variantObjected = this.item.variant.replaceAll(
                        " ",
                        '"'
                    );
                    variantObjected = "{" + variantObjected + "}";

                    variantObjected = this.lis.objectFromJson(variantObjected);

                    this.variantOpts.items[x].value =
                        variantObjected[this.variantOpts.items[x].attribute];
                }
            }
        },

        btnSave() {
            console.log("forönce", this.variantOpts.items);
            var myvrnt = {};
            var key = "";
            for (let s in this.variantOpts.items) {
                if (this.variantOpts.items[s].type == 0) {
                    if (
                        (this.variantOpts.items[s].value >
                            this.variantOpts.items[s].maxvalue) |
                        (this.variantOpts.items[s].minvalue >
                            this.variantOpts.items[s].value)
                    ) {
                        this.pop = 0;
                        this.lis.alert(
                            "e",
                            `${this.variantOpts.items[s].attribute}  ${this.variantOpts.items[s].maxvalue} - ${this.variantOpts.items[s].minvalue}  Arasında Olmalıdır`
                        );
                    } else {
                        this.pop = 1;
                    }
                }
            }
            for (let i in this.variantOpts.items) {
                this.myVariant[this.variantOpts.items[i].attribute] =
                    this.variantOpts.items[i].value;

                key = this.variantOpts.items[i].attribute;

                myvrnt[key] = this.variantOpts.items[i].value;
            }

            this.myVariant = this.lis.objectToJson(myvrnt);

            this.myVariant = this.myVariant.replaceAll('"', " ");
            this.myVariant = this.myVariant.slice(1, -1);

            this.item.variant = this.myVariant;

            myvrnt = {};
            this.$emit("ok", this.item.variant);
        },
    },

    mounted() {
        this.init(this.item);
    },
};
</script>
