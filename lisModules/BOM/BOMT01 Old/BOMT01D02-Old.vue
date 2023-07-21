<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="account_tree" />

                <l-toolbar-title>{{
                    this.$gl("Ürün Ağacı", "Bill Of Material - Route")
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
            <div class="row q-pa-xs"></div>
            <div class="row q-pa-xs q-gutter-xs">
                <l-select
                    :label="this.$gl(`Firma`, `Company`)"
                    v-model="dv.lisbomdocs.company"
                    options="lisbas001"
                    optValue="company"
                    optTitle="stext"
                    optCaptions="company"
                    width="120px"
                />
                <l-select
                    :label="this.$gl(`Tesis`, `Plant`)"
                    v-model="dv.lisbomdocs.plant"
                    options="lisbas002"
                    optValue="plant"
                    optTitle="stext"
                    optCaptions="plant"
                    width="120px"
                />
                <l-input
                    v-model="dv.lisbomdocs.bomnumber"
                    label="Ürün Ağacı No"
                    dense
                />
                <l-input
                    v-model="dv.lisbomdocs.alternum"
                    label="Alternatif No"
                    dense
                    style="width: 150px"
                />
                <l-datetime
                    :label="this.$gl(`Başlangıç Tarihi`, `Start Date`)"
                    v-model="dv.lisbomdocs.validfrom"
                    style="width: 160px"
                />
                <l-datetime
                    :label="this.$gl(`Bitiş Tarihi`, `End Date`)"
                    v-model="dv.lisbomdocs.validuntil"
                    style="width: 160px"
                />
                <l-checkbox
                    v-model="dv.lisbomdocs._deleted"
                    label="Sil"
                    color="pink"
                />
            </div>

            <l-div>
                <l-input
                    type="textarea"
                    v-model="dv.lisbomdocs.note"
                    label="Reçete Notu"
                    dense
                    style="width: 1650px"
                    autogrow
                />
            </l-div>
        </l-card0>

        <!--------------------------------------------->

        <q-expansion-item
            v-model="toggleMaterial"
            class="shadow-1 overflow-hidden"
            style="border-radius: 10px"
            icon="inventory"
            label="Üretilen Malzemeler"
            header-class="bg-teal text-white"
            expand-icon-class="text-white"
        >
            <l-table
                name="BOMT01D02"
                :tableData="dv.lisbomdocs.materials"
                :columns="myColumnsBomItem"
                :height="'97px'"
                :summary="false"
            />
        </q-expansion-item>

        <div v-for="operation in dv.lisbomdocs.operations" :key="operation">
            <q-expansion-item
                class="shadow-1 overflow-hidden"
                style="border-radius: 10px"
                icon="precision_manufacturing"
                label="Operasyon"
                header-class="bg-primary text-white"
                expand-icon-class="text-white"
            >
                <l-div-flex>
                    <l-input dense label="Operasyon Kontrol Tipi" />
                    <l-input dense label="İş Merkezi" />
                    <l-input dense label="Maliyet Merkezi" />
                    <l-input dense label="Kapasite Grubu" />
                </l-div-flex>

                <q-expansion-item
                    class="shadow-1 overflow-hidden q-pa-xs q-gutter-xs"
                    icon="category"
                    label="Aktiviteler"
                    header-class="bg-amber text-white"
                    expand-icon-class="text-white"
                    style="border-radius: 10px"
                    dense
                >
                    <l-table
                        name="BOMT01D02"
                        :tableData="operation.activities"
                        :columns="myColumnsBomItem"
                        :height="'97px'"
                        :summary="false"
                    />
                </q-expansion-item>

                <q-expansion-item
                    class="shadow-1 overflow-hidden q-pa-xs q-gutter-xs"
                    icon="inventory"
                    label="Tüketilen Malzemeler"
                    header-class="bg-grey text-white"
                    expand-icon-class="text-white"
                    style="border-radius: 10px"
                    dense
                >
                    <l-table
                        name="BOMT01D02"
                        :tableData="operation.components"
                        :columns="myColumnsBomItem"
                        :height="'200px'"
                        :summary="false"
                    />
                </q-expansion-item>
            </q-expansion-item>
        </div>

        <l-chip
            class="bg-primary"
            text-color="white"
            icon="add"
            clickable
            dense
            >{{ $gl("Operasyon Ekle", "Add Operation") }}</l-chip
        >
    </l-div>
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
    data() {
        return {
            toggleMaterial: true,
            myColumnsBomItem: [
                {
                    type: "string",
                    value: "type",
                    label: this.$gl("Tip", "Type"),
                },
                {
                    type: "string",
                    value: "components.component",
                    label: this.$gl("Eleman", "Components"),
                },
                {
                    type: "number",
                    value: "alternum",
                    label: this.$gl("Alt.No", "Alt.No"),
                },
                {
                    type: "number",
                    value: "components.quantity",
                    label: this.$gl("Tüketilecek Miktar", "Quantity"),
                },
                {
                    type: "string",
                    value: "components.qunit",
                    label: this.$gl("Birim", "Qunit"),
                },
                {
                    type: "string",
                    value: "components.stext",
                    label: this.$gl("Açıklama", "Description"),
                },
            ],
        };
    },

    methods: {
        async btnSave() {
            console.log("btnSave çalıştı");
            await this.lis.function("BOMT01/02-btnSave", this.dv);
            this.cancel();
        },
        cancel() {
            this.tabInfo.blockGoToTransaction = false;
            this.dv.lisDialog = "BOMT01D01";
        },
    },
    mounted() {
        this.tabInfo.blockGoToTransaction = true;
    },
    async beforeUnmount() {
        //this.$Axios.post("cls-system.unlock", this.lockKeyParams);
        await this.lis.function("cls-system.unlock", this.lockKeyParams);
    },
};
</script>

function data() { throw new Error('Function not implemented.'); }
