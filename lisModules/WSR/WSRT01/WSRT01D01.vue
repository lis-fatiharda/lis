<template>
        <l-div v-if="dv.lisDialog == 'WSRT01D01'">
            <!--Tittle Layer-->
            <l-card0>
                <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                    <l-icon size="md" name="assignment_ind" />

                    <l-toolbar-title>Web Servis Metodları</l-toolbar-title>

                    <l-btn
                        icon="cancel"
                        flat
                        round
                        dense
                        color="negative"
                        @click="this.$btnGoHome(tabInfo)"
                    />
                </l-toolbar>
                <!--Search Layer Layer---------------------->

                <l-div-flex>
             

                    <l-input
                        label="Web Servis Metodu"
                        v-model="dv.sc.wsmethod"
                    >
                    </l-input>

                    <l-input
                        label="Web Servis Metodu"
                        v-model="dv.sc.lisfunction"
                    >
                    </l-input>

                    <l-checkbox label="Blokeli"
                        v-model="dv.sc.isblocked"/>
              
                </l-div-flex>
            </l-card0>
            <!--Butons Layer Layer---------------------->

         
                    <l-btn
                        color="warning"
                        icon="search"
                        @click="btnSearch(dv)"
                    />
                    <l-btn
                        color="info"
                        icon="visibility"
                        @click="btnShow(dv)"
                    />

                    <l-btn color="primary" icon="edit" @click="btnEdit(dv)" />
                    <l-btn
                        color="secondary"
                        icon="add"
                        @click="btnInsert(dv)"
                    />
     

            <l-table
                v-model="dv.liswebservicesList"
                :columns="myColumns"
                :readonly="true"
            />
        </l-div>
        <WSRT01D02
            :dv="dv"
            :tabInfo="tabInfo"
            v-if="dv.lisDialog == 'WSRT01D02'"
        />
        <div v-show="false">
        <WSRT01D01PDF :dv="dv" />
    </div>
</template>

<script>
import WSRT01D02 from "./WSRT01D02.vue";

export default {
    props: ["tabInfo"],
    components: {
        WSRT01D02,
    },

    data() {
        return {
            myColumns: [
                {
                    label: "WS Methodu",
                    value: "wsmethod",
                    type: "string",
                },
                {
                    label: "Lis Fonksiyonu",
                    value: "lisfunction",
                    type: "string",
                },

                
                
            ],
            dv: {
                lisDialog: "WSRT01D01",
                modi: 2,
                sc: {
                    wsmethod: "",
                    lisfunction: "",
                    isblocked: false,
                },
                liswebservicesList: [],
                liswebservices: {},
                selectedRow: "",
            },
        };
    },

    methods: {
        async btnSearch(prop) {
            this.dv = await this.lis.function("WSRT01/01-btnSearch", prop);
          
        },
        async btnEdit(prop) {
            this.dv = await this.lis.function("WSRT01/01-btnEdit", prop);
            this.tabInfo.blockGoToTransaction = true;
           
        },
        async btnShow(prop) {
            this.dv = await this.lis.function("WSRT01/01-btnShow", prop);
            this.tabInfo.blockGoToTransaction = true;
            
        },
        async btnInsert(prop) {
            this.dv = await this.lis.function("WSRT01/01-btnInsert", prop);
            this.tabInfo.blockGoToTransaction = true;
           
        },
        
            async btnPrint() {
            this.lis.printPDF("WSRT01D01PDF", "Cari Kartlar Raporu");
        },
            
       
        async init() {
            this.dv = await this.lis.function("WSRT01/01-init", this.dv);
        },
    },

   // mounted() {
   //     this.init(this.dv);
   // },
};
</script>
