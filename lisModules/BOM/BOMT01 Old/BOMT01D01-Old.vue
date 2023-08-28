<template>
    <l-div v-if="dv.lisDialog == 'BOMT01D01'">
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="account_tree" />

                <l-toolbar-title>{{
                    this.$gl("Ürün Ağaçlarım", "Bill Of Materials - Route")
                }}</l-toolbar-title>

                <l-btn
                    icon="cancel"
                    flat
                    round
                    dense
                    color="negative"
                    @click="this.$btnGoHome(tabInfo)"
                />
            </l-toolbar>
            <l-div-flex>
                <l-select
                    :label="this.$gl(`Firma`, `Company`)"
                    v-model="dv.sc.company"
                    options="lisbas001"
                    optValue="company"
                    optTitle="stext"
                    optCaptions="company"
                    width="120px"
                />
                <l-select
                    :label="this.$gl(`Tesis`, `Plant`)"
                    v-model="dv.sc.plant"
                    options="lisbas002"
                    optValue="plant"
                    optTitle="stext"
                    optCaptions="plant"
                    width="120px"
                />

                <l-input
                    v-model="dv.sc.bomnumber"
                    label="Ürün Ağacı No"
                    dense
                />
                <l-input v-model="dv.sc.material" label="Malzeme Kodu" dense />
                <l-input v-model="dv.sc.stext" label="Açıklama" dense />
                <l-input
                    v-model="dv.sc.alternum"
                    label="Alternatif No"
                    dense
                    style="width: 150px"
                />
                <l-select
                    :label="this.$gl(`Tip`, `Type`)"
                    v-model="dv.sc.type"
                    options="lisbom003"
                    optValue="type"
                    optTitle="stext"
                    optCaptions="type"
                    width="120px"
                />
                <l-datetime
                    :label="this.$gl(`Tarih`, `Date`)"
                    v-model="dv.sc.date"
                    style="width: 160px"
                />
                <l-checkbox
                    v-model="dv.sc._deleted"
                    label="Silindi mi?"
                    color="pink"
                />
            </l-div-flex>
        </l-card0>
        <!--------------------------------->

        <!--Butons Layer Layer---------------------->

        <l-btn-group>
            <l-btn color="warning" icon="search" @click="btnSearch(dv)" />
            <l-btn color="info" icon="visibility" @click="btnShow(dv)" />
            <l-btn color="primary" icon="edit" @click="btnEdit(dv)" />
            <l-btn color="secondary" icon="add" @click="btnInsert(dv)" />
            <l-btn color="negative" icon="print" @click="btnDelete(dv)" />
        </l-btn-group>

        <l-table
            name="BOMT01D01"
            v-model="dv.reportList"
            :columns="myColumnsBom"
            :height="'73vh'"
            width="100%"
            :readonly="true"
        />
    </l-div>
    <BOMT01D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'BOMT01D02'" />
</template>

<script>
import BOMT01D02 from "./BOMT01D02.vue";

export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
    components: {
        BOMT01D02,
    },

    data() {
        return {
            dv: {
                lisDialog: "BOMT01D01",
                sc: {
                    company: "01",
                    plant: "01",
                    bomnumber: "",
                    material: "",
                    stext: "",
                    alternum: 0,
                    type: "",
                    date: new Date(),
                    validfrom: new Date(),
                    validuntil: new Date(),
                    _deleted: false,
                },
                modi: 2,
                selectedRow: "",
                lisbomdocs: {},
                reportList: [],
                lockKeyParams: {
                    company: "01",
                    lid: "BOMT01",
                    lockkey: "",
                },
            },
            myColumnsBom: [
                {
                    type: "string",
                    value: "company",
                    label: this.$gl("Firma", "Company"),
                },
                {
                    type: "string",
                    value: "plant",
                    label: this.$gl("Tesis", "Plant"),
                },
                {
                    type: "number",
                    value: "alternum",
                    label: this.$gl("Alt.No", "Alt.No"),
                },
                {
                    type: "string",
                    value: "bomnumber",
                    label: this.$gl("Ürün Ağacı No", "Bom Number"),
                },
                {
                    type: "string",
                    value: "material",
                    label: this.$gl("Malzeme", "Material"),
                },
                {
                    type: "string",
                    value: "stext",
                    label: this.$gl("Açıklama", "Description"),
                },
                {
                    type: "datetime",
                    value: "validfrom",
                    label: this.$gl(`Başlangıç Tarihi`, `Start Date`),
                },
                {
                    type: "datetime",
                    value: "validuntil",
                    label: this.$gl(`Bitiş Tarihi`, `End Date`),
                },
                {
                    type: "string",
                    value: "type",
                    label: this.$gl("Tip", "Type"),
                },
            ],
        };
    },

    methods: {
        async btnSearch(prop) {
            this.dv = await this.lis.function("BOMT01/01-btnSearch", prop);
            // await this.$Axios.post("BOMT01/01-btnSearch", prop).then((res) => {
            //     this.dv = res.data;
            // });
        },
        async btnEdit(prop) {
            this.dv = await this.lis.function("BOMT01/01-btnEdit", prop);
            // await this.$Axios.post("BOMT01/01-btnEdit", prop).then((res) => {
            //     this.dv = res.data;
            // });
        },
        async btnShow(prop) {
            this.dv = await this.lis.function("BOMT01/01-btnShow", prop);
            // await this.$Axios.post("BOMT01/01-btnShow", prop).then((res) => {
            //     this.dv = res.data;
            // });
        },
        async btnInsert(prop) {
            this.dv = await this.lis.function("BOMT01/01-btnInsert", prop);
            // await this.$Axios.post("BOMT01/01-btnInsert", prop).then((res) => {
            //     this.dv = res.data;
            // });
        },
        async btnDelete(prop) {
            this.dv = await this.lis.function("BOMT01/01-btnDelete", prop);
            // await this.$Axios.post("BOMT01/01-btnDelete", prop).then((res) => {
            //     this.dv = res.data;
            //});
        },
        async init(prop) {
            this.dv = await this.lis.function("BOMT01/01-init", this.dv);
            // await this.$Axios
            //     .post("BOMT01/01-init", this.dv)
            //     .then((res) => {
            //         this.dv = res.data;
            //     })
            //     .catch(function (err) {
            //         console.log(err);
            //     });
        },
    },

    mounted() {
        this.init(this.dv);
        console.log("mounted worked");
    },
};
</script>
