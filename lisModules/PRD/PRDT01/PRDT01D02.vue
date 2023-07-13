
 
<template>
    <l-div> 
        <!--Tittle Layer-->
         <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="account_tree" />

                <l-toolbar-title>{{
                    this.$gl("İş Emri Detay Ekranı", "Work Order Detail Screen")
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
            
            <div class="row q-pa-xs q-gutter-xs">
                <l-select
                    :label="this.$gl(`Firma`, `Company`)"
                    v-model="dv.lisprddocs.company"
                    options="lisbas001"
                    optValue="company"
                    optTitle="stext"
                    optCaptions="company"
                    width="120px"
                />
                <l-select
                    :label="this.$gl(`Tesis`, `Plant`)"
                    v-model="dv.lisprddocs.plant"
                    options="lisbas002"
                    optValue="plant"
                    optTitle="stext"
                    optCaptions="plant"
                    width="120px"
                />
                <l-select 
                :label="this.$gl(`Tipi`, `Type`)" 
                v-model="dv.lisprddocs.doctype" 
                options="lisprd001"
                optValue="type" 
                optTitle="stext" 
                optCaptions="type" 
                width="150px" />
                <l-input
                    v-model="dv.lisprddocs.docnum"
                    :label="this.$gl(`No`, `No`)"
                    dense
                    style="width: 150px"
                    readonly
                />
                
                <l-input :label="this.$gl(`Malzeme Kodu`, `Material`)" v-model="dv.lisprddocs.prods.material">
                    <l-chip class="bg-white" icon="search" dense clickable @click="isSelectMat = !isSelectMat">
                        <BAST03D01mini :pComp="dv.sc.company" :isShow="isSelectMat" @ok="
                            dv.lisprddocs.prods.material = $event.material;
                        isSelectMat = false;
                        " @cancel="isSelectMat = false" />
                    </l-chip>
                </l-input>
                <l-input
                    v-model="dv.lisprddocs.prods.quantity"
                    :label="this.$gl(`Miktar`, `Quantity`)"
                    dense
                    style="width: 150px"
                    
                />
               
                <l-select
                   :label="this.$gl(`Birim`, `Unit`)"
                   v-model="dv.lisprddocs.prods.qunit"
                   options="lisbas007"
                   optValue="unit"
                   optTitle="stext"
                   optCaptions="unit"
                   :optFilter="{ unittype: 0 }"
                   width="135px"
                    />
                <l-select
                   :label="this.$gl(`Depo`, `Warehouse`)"
                   v-model="dv.lisprddocs.prods.warehouse"
                   options="lisinv003"
                   optValue="warehouse"
                   optTitle="stext"
                   optCaptions="warehouse"
                   width="150px"
                 />

                 <l-select
                   :label="this.$gl(`Stok Yeri`, `Stockplace`)"
                   v-model="dv.lisprddocs.prods.stockplace"
                   options="lisinv004"
                   optValue="stockplace"
                   optTitle="stext"
                   optCaptions="stockplace"
                   width="150px"
                 />
                 <l-input
                    v-model="dv.lisprddocs.prods.stext"
                    :label="this.$gl(`Açıklama`, `Description`)"
                    dense
                    style="width: 245px"
                    
                />
                <l-input
                    v-model="dv.lisprddocs.alternum"
                    :label="this.$gl(`Alternatif No`, `Alternative No`)"
                    dense
                    style="width: 150px"
                    
                />
                <l-datetime
                    :label="this.$gl(`Başlangıç Tarihi`, `Start Date`)"
                    v-model="dv.lisprddocs.validfrom"
                    style="width: 160px"
                />
                <l-datetime
                    :label="this.$gl(`Bitiş Tarihi`, `End Date`)"
                    v-model="dv.lisprddocs.validuntil"
                    style="width: 160px"
                />
                <l-checkbox
                    v-model="dv.lisprddocs._deleted"
                    label="Sil"
                    color="pink"
                />
            </div>

            <l-div>
                <l-input
                    type="textarea"
                    v-model="dv.lisprddocs.note"
                    label="İş Emri Notu"
                    dense
                    style="width: 1650px"
                    autogrow
                />
            </l-div>
        </l-card0> 

    </l-div>
</template> 

<script>
export default {
    props: ["dv", "tabInfo"],
     data() {
         return {isSelectMat: false,}},
//             toggleMaterial: true,
//             myColumnsBomItem: [
//                 {
//                     type: "string",
//                     value: "type",
//                     label: this.$gl("Tip", "Type"),
//                 },
//                 {
//                     type: "string",
//                     value: "components.component",
//                     label: this.$gl("Eleman", "Components"),
//                 },
//                 {
//                     type: "number",
//                     value: "alternum",
//                     label: this.$gl("Alt.No", "Alt.No"),
//                 },
//                 {
//                     type: "number",
//                     value: "components.quantity",
//                     label: this.$gl("Tüketilecek Miktar", "Quantity"),
//                 },
//                 {
//                     type: "string",
//                     value: "components.qunit",
//                     label: this.$gl("Birim", "Qunit"),
//                 },
//                 {
//                     type: "string",
//                     value: "components.stext",
//                     label: this.$gl("Açıklama", "Description"),
//                 },
//             ],
//         };
//     },

    methods: {
        async btnSave() {
            console.log("btnSave çalıştı");
            await this.lis.function("PRDT01/02-btnSave", this.dv);
            this.cancel();
        },
        cancel() {
            this.tabInfo.blockGoToTransaction = false;
            this.dv.lisDialog = "PRDT01D01";
        },
    },
    mounted() {
        this.tabInfo.blockGoToTransaction = true;
    },
    async beforeUnmount() {
        await this.lis.function("cls-system.unlock", this.lockKeyParams);
    },
};
</script>

function data() { throw new Error('Function not implemented.'); }
