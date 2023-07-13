<template>
    <l-card class="justify-evenly">
        <l-card-section-flex>
            <l-select
                :label="this.$gl(`Firma`, `Company`)"
                v-model="dv.olisinvdocs.company"
                :options="dv.sc.companyOpts"
                optValue="company"
                :optTitles="['company']"
                :optCaptions="['stext']"
                style="width: 120px"
            />

            <l-input
                v-model="dv.olisinvdocs.doctype"
                label="Belge Tipi"
                
                dense
            />
            <l-input
                v-model="dv.olisinvdocs.docnum"
                label="Belge No"
                
                dense
            />
            <l-input
                v-model="dv.olisinvdocs.extdoctype"
                label="Harici Belge Tipi"
                
                dense
            />
            <l-input
                v-model="dv.olisinvdocs.extdocnum"
                label="Harici Belge No"
                
                dense
            />

            <l-input
                v-model="dv.olisinvdocs.stext"
                label="Belge Açıklaması"
                
                dense
            />

            <l-select
                :label="this.$gl(`Hareket Kodu`, `Movement Code`)"
                v-model="dv.sc.trantype"
                :options="dv.sc.trantypeOpts"
                optValue="trantype"
                :optTitles="['trantype']"
                :optCaptions="['stext']"
                style="width: 120px"
            />

            <l-datetime
                :label="this.$gl(`Belge Tarihi`, `Document Date`)"
                v-model="dv.olisinvdocs.docDate"
            />

            <l-btn
                color="teal"
                class="align-end"
                
                dense
                icon="save"
                @click="btnSave()"
            />
        </l-card-section-flex>
        <l-card-section>
            <l-table
                name="INVT01D42"
                :tableData="dv.olisinvdocs.items"
                :context="contextMenu"
                :columns="myColumns"
                width="100%"
                height="60vh"
                @keyup="if ($event.key == 'Insert') this.pushNewItem();"
            />
        </l-card-section>
    </l-card>
</template>

<script>
export default {
    props: ["tabInfo"],
    data() {
        return {
            tab: "no",

            myColumns: [
                {
                    type: "string",
                    label: "Malzeme Kodu",
                    value: "material",
                },
                {
                    type: "string",
                    label: "Malzeme Adı",
                    value: "stext",
                },
                {
                    type: "string",
                    label: "Miktar",
                    value: "quantity",
                },
            ],
            contextMenu: [
                {
                    name: "Satır Ekle",
                    callback: async () => {

                        
                        let myReturn = await this.lis.function(
                            "INVT01/42-pushNewItem",
                            this.dv
                        );
                        this.dv.olisinvdocs.items.push(myReturn.items[0]);
                    },
                },
            ],
            dv: {
                lisDialog: "INVT01D42",
                olisinvdocs: {},
                sc: {
                    
                    trantype: "",
                },
            },
        };
    },
    computed: {
        fetchWarehouses() {
            let tmpWarehouses = this.dv.sc.warehouseOpts.filter(
                (e) => e.plant == this.dv.sc.plant
            );
            return tmpWarehouses;
        },
    },

    methods: {
        fetchStockplaces(Pplant, Pwarehouse) {
            let tmpStockplaces = this.dv.sc.stockplaceOpts.filter(
                (e) => (e.plant == Pplant) & (e.warehouse == Pwarehouse)
            );
            return tmpStockplaces;
        },
        async pushNewItem() {
            let myReturn = await this.lis.function(
                "INVT01/42-pushNewItem",
                this.dv
            );
            this.dv.olisinvdocs.items.push(myReturn.items);
        },
        removeItem(index) {
            if (this.olisinvdocs.items.length > 1) {
                this.olisinvdocs.items.splice(index, 1);
            }
        },
        async btnSave() {
            console.log("btnSave çalıştı");
            await this.lis.function("INVT01/42-btnSave", this.dv.olisinvdocs);
            this.cancel();
        },
        cancel() {
            this.dv.lisDialog = "INVT01D01";
        },
    },
    async mounted() {
        this.dv = await this.lis.function("INVT01/42-init", this.dv);
    },
};
</script>
