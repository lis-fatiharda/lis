<template>
    <q-layout container class="bg-white" style="width: 500px">
        <q-header :class="`bg-${tabInfo.moduleColor} text-black`">
            <l-toolbar>
                <l-toolbar-title class="text-black">{{
                    this.$gl("Belge Kopyala", "Copy Document")
                }}</l-toolbar-title>

                <div class="q-pa-xs q-gutter-xs">
                    <l-btn
                        dense
                        icon="done"
                        color="teal"
                        @click="copyDoc()"
                    />
                    <l-btn
                        dense
                        icon="close"
                        color="negative"
                        @click="dv.isShowCopyDocs = false"
                    />
                </div>
            </l-toolbar>
        </q-header>

        <q-page-container>
            <q-page class="q-pa-md q-gutter-md">
                <!--  Page Starts **************************************** -->
                <div class="q-pa-xs q-gutter-xs">
                    <l-checkbox label="Teklif" v-model="sc.isOffer" />
                    <l-checkbox label="Sipariş" v-model="sc.isOrder" />
                    <l-checkbox label="İrsaliye" v-model="sc.isDelivery" />
                    <l-checkbox label="Fatura" v-model="sc.isInvoice" />
                    <l-btn
                        icon="search"
                        @click="btnSearch()"
                        dense
                        color="info"
                    />
                </div>
                <div>
                    <l-table
                        name="PURT01D12"
                        :tableData="olispur004"
                        :columns="columns"
                        width="100%"
                        :readonly="true"
                        :summary="false"
                    />
                </div>

                <!--  Page Ends **************************************** -->
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
    data() {
        return {
            sc: {
                isOffer: true,
                isOrder: true,
                isDelivery: true,
                isInvoice: true,
            },
            selectedRow: [],
            olispur004: [],
            columns: [
                {
                    label: "Belge Tipi",
                    value: "todoctype",
                    type: "string",
                },
                {
                    label: "Belge Açıklaması",
                    value: "tostext",
                    type: "string",
                },
            ],
        };
    },
    methods: {
        async copyDoc(toDoctype) {
            let index = this.olispur004.findIndex((t) => t._selected == true);

            if (index == -1) {
                this.lis.alert(
                    "w",
                    this.$gl(
                        "Lütfen Satır Seçiniz!",
                        "Please choose a type!"
                    )
                ); return;
            };

            this.dv.lispurdocs = await this.lis.function("PURT01/01-copyDoc", {
                dv: this.dv,
                doc: this.selectedRow[0],
                toDoctype: this.olispur004[index].todoctype,
            });

            this.dv.modi = -1;
            this.dv.lockKeyParams.company = this.selectedRow[0].company;
            this.dv.lockKeyParams.lockkey =
                this.selectedRow[0].doctype + this.selectedRow[0].docnum;
            this.dv.lisDialog = "PURT01D02";
            this.dv.isShowCopyDocs = false;
        },
        async btnSearch() {
            console.log("Search", this.selectedRow[0]);

            this.olispur004 = await this.lis.function("PURT01/01-getCopyDocs", {
                company: this.selectedRow[0]?.company,
                doctype: this.selectedRow[0]?.doctype,
            });
            console.log("olispur004", this.olispur004);
        },
    },
    mounted() {
        this.selectedRow = this.dv.purDocList.filter((e) => e._selected == true);

        console.log("selectedRow", this.selectedRow);
        this.btnSearch();
    },
};
</script>
