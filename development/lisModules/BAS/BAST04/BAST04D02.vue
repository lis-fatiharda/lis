<template>
    <l-div>
        <!--Tittle Layer-->

        <q-bar :class="`bg-${tabInfo.moduleColor}`">
            <l-toolbar-title>{{
                this.$gl("Malzeme Varyantları", "Material Variants")
            }}</l-toolbar-title>
            <l-btn
                v-if="dv.modi != 2"
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

        <l-card>
            <l-card-section horizontal>
                <l-div-flex>
                    <l-select
                        :label="this.$gl(`Firma`, `Company`)"
                        v-model="dv.lisvariants.company"
                        options="lisbas001"
                        optValue="company"
                        optTitle="stext"
                        optCaptions="company"
                        width="120px"
                    />
                    <l-input
                        :label="this.$gl(`Varyant Anahtarı`, `Variants Key`)"
                        dense
                        v-model="dv.lisvariants.varkey"
                    ></l-input>
                    <l-input
                        :label="this.$gl(`Açıklama`, `Description`)"
                        dense
                        v-model="dv.lisvariants.stext"
                    ></l-input>
                </l-div-flex>
            </l-card-section>
        </l-card>
        <!--Searching Criterias Layer-->
        <l-table
            v-model="dv.lisvariants.items"
            :columns="myColumnsvariantsitems"
            :context="contextMenu"
            @zoom="zoomVariantRow = $event.row"
            @keydown="if ($event.key == 'Insert') this.pushNewItem($event);"
            v-bind="$attrs"
        />
    </l-div>



    <l-dialog v-model="isShowZoom" persistent>
      <l-card0>
            <LISBAS018
                :dv="dv"
                :tabInfo="tabInfo"
                :isChild="true"
                @cancel="
                    zoomVariantRow = null;
                    isChild = false;
                "
                @ok="
                    dv.lisvariants.items[zoomVariantRow].attribute =
                        $event.attribute;
                    dv.lisvariants.items[zoomVariantRow].type = $event.type;
                    isChild = false;
                    zoomVariantRow = null;
                "
            />
    </l-card0>
    </l-dialog>
    
</template>

<script>
import LISBAS018 from "../BAST01/SUPS/lisbas018/LISBAS018.vue";
export default {
    props: ["lv", "dv", "goToTransaction", "tabInfo"],
  components: { LISBAS018 },

  inherit: false,
    inheritAttrs: false,

  created() {

        console.log("bast04d02 - $attrs", this.$attrs)
    },

  computed: {
    isShowZoom() {
          return this.zoomVariantRow == null ? false : true
        }
    },

    data() {
        return {
            isChild: false,
          zoomVariantRow: null,
            newAttribute: "",
            contextMenu: [
                {
                    name: "Satır Ekle",
                    callback: async () => {
                        this.pushNewItem();
                    },
                },
            ],

            myColumnsvariantsitems: [
                {
                    label: this.$gl("Özellik Kodu", "Properties Code"),
                    type: "zoom",
                    value: "attribute",
                },

                {
                    label: this.$gl("Tip", "Type"),
                    type: "select",
                    value: "type",
                    options: [
                        { type: 0, label: "Manuel" },
                        { type: 1, label: "Seçenekli" },
                    ],
                },
            ],
        };
  },


    methods: {
        getZoom(event) {
            console.log("getZoom", event);

            this.zoomVariantRow = event.row;
        },
        async btnSave() {
            await this.lis.function("BAST04/02-btnSave", this.dv);
            this.cancel();
        },
        async cancel() {
            this.dv.lisDialog = "BAST04D01";
        },

        async pushNewItem(event) {
            console.log("pushNewItem", event);
            let myReturn = await this.lis.function(
                "BAST04/pushNewItem",
                this.dv
            );
            //   myReturn.itemnum =
            //     this.mv.lisbas017.items[this.mv.lisbas017.items.length - 1].itemnum +
            //     10;
            this.dv.lisvariants.items.push(myReturn);
        },
    },
};
</script>
