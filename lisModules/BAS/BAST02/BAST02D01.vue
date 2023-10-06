<template>
        <l-div v-if="dv.lisDialog == 'BAST02D01'">
            <!--Tittle Layer-->
            <l-card0>
                <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                    <l-icon size="md" name="assignment_ind" />

                    <l-toolbar-title>Cari Kartlar</l-toolbar-title>

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
                    <l-select
                    :label="this.$gl(`Firma`, `Company`)"
                    v-model="dv.sc.company"
                    options="lisbas001"
                    optValue="company"
                    optTitle="stext"
                    optCaptions="company"
                    width="120px"
                    class="bg-blue-1"
                />

                    <l-select
                        :label="this.$gl(`İş Alanı`, `Business Area`)"
                        v-model="dv.sc.busarea"
                        options="lisbas003"
                        optValue="busarea"
                        optTitle="stext"
                        optCaptions="busarea"
                        width="120px"
                    />

                    <l-input
                        :label="this.$gl(`Cari Kodu`, `Current Code`)"
                        v-model="dv.sc.customer"
                        dense
                    >
                    </l-input>
                    <l-input
                        :label="this.$gl(`Cari Adı`, `Current Name`)"
                        v-model="dv.sc.name1"
                        style="width: 300px"
                        dense
                    >
                    </l-input>
                    <l-select
                        v-model="dv.sc.custOrVend"
                        :options="[
                            { label: this.$gl('Aday', `Applicant`), value: 0 },
                            {
                                label: this.$gl('Müşteri', `Customer`),
                                value: 1,
                            },
                            {
                                label: this.$gl('Tedarikçi', `Vendor`),
                                value: 2,
                            },
                            { label: this.$gl('Tümü', `All`), value: 99 },
                        ]"
                        optValue="value"
                        map-options
                        :label="this.$gl(`Cari Tipi`, `Current Type`)"
                        style="width: 170px"
                    ></l-select>
                    <l-select
                        :label="this.$gl(`Sektör`, `Sector`)"
                        v-model="dv.sc.sector"
                        options="lisbas004"
                        optValue="sector"
                        optTitle="stext"
                        optCaptions="sector"
                        width="120px"
                    />
                    <l-select
                        :label="this.$gl(`Ülke`, `Country`)"
                        v-model="dv.sc.country"
                        options="lisbas005"
                        optValue="country"
                        optTitle="stext"
                        optCaptions="country"
                        width="130px"
                    />
                    <l-select
                        :label="this.$gl(`Şehir`, `City`)"
                        v-model="dv.sc.city"
                        options="lisbas006"
                        optValue="city"
                        optTitle="stext"
                        optCaptions="city"
                        width="130px"
                    />

                    <l-input
                        :label="this.$gl(`Vergi Dairesi`, `Tax Administration`)"
                        v-model="dv.sc.taxDept"
                        style="width: 200px"
                        dense
                    >
                    </l-input>
                    <l-input
                        :label="this.$gl(`Vergi No`, `Tax Number`)"
                        v-model="dv.sc.taxNum"
                        style="width: 200px"
                        dense
                    >
                    </l-input>
                </l-div-flex>
            </l-card0>
            <!--Butons Layer Layer---------------------->

         
                    <l-btn
                        color="warning"
                        icon="search"
                        @click="btnSearch()"
                    />
                    <l-btn
                        color="info"
                        icon="visibility"
                        @click="btnShow()"
                    />

                    <l-btn color="primary" icon="edit" @click="btnEdit()" />
                    <l-btn
                        color="secondary"
                        icon="add"
                        @click="btnInsert()"
                    />
                    <l-btn color="deep-orange" icon="print" @click="btnPrint()" />
             
     

            <l-table
                v-model="dv.lisCustomerList"
                :columns="myColumnsCus"
                height="fit"
                :readonly="true"
                @dblclick="btnEdit()"
            />
        </l-div>
        <BAST02D02
            v-if="dv.lisDialog == 'BAST02D02'"
            :pCompany="dv.pCompany"
            :pCustomer="dv.pCustomer"
            :modi="dv.modi"
            @cancel="dv.lisDialog = 'BAST02D01'"
            :tabInfo="tabInfo"
        />
        <div v-show="false">
        <BAST02D01PDF :dv="dv" />
    </div>
</template>

<script>
import BAST02D02 from "./BAST02D02.vue";
import BAST02D01PDF from "./BAST02D01PDF.vue";

export default {
    props: ["tabInfo"],
    components: {
        BAST02D02,
        BAST02D01PDF,
    },

    data() {
        return {
            myColumnsCus: [
                {
                    label: this.$gl("Firma", "Company"),
                    value: "company",
                    type: "string",
                    default: "01",
                },
                {
                    label: this.$gl("İş Alanı", "Busarea"),
                    value: "busarea",
                    type: "string",
                    default: "S",
                },
                {
                    label: this.$gl("Cari Kodu", "Current Code"),
                    value: "customer",
                    type: "string",
                },
                {
                    label: this.$gl("Cari Adı", "Current Name"),
                    value: "name1",
                    type: "string",
                },
                {
                    label: this.$gl("Cari Tipi", "Current Type"),
                    value: "custorvend",
                    type: "select",
                    options: [
                        { value: 0, label: "Aday" },
                        { value: 1, label: "Müşteri" },
                        { value: 2, label: "Tedarikçi" },
                    ],
                },

                {
                    label: this.$gl("Sektör", "Sector"),
                    value: "sector",
                    type: "string",
                },
                {
                    label: "Posta Kodu",
                    label: this.$gl("Posta Kodu", "Post Code"),
                    value: "postcode",
                    type: "string",
                },
                {
                    label: this.$gl("Ülke", "Country"),
                    value: "country",
                    type: "string",
                },
                {
                    label: this.$gl("Şehir", "City"),
                    value: "city",
                    type: "string",
                },
                {
                    label: this.$gl("Vergi Dairesi", "Tax Administration"),
                    value: "taxdept",
                    type: "string",
                },
                {
                    label: this.$gl("Vergi Numarası", "Tax Number"),
                    value: "taxnum",
                    type: "string",
                },
                {
                    label: "Tel. Num.",
                    value: "telnum",
                    type: "string",
                },
                {
                    label: "Fax. Num.",
                    value: "faxnum",
                    type: "string",
                },
            ],
            dv: {
                lisDialog: "BAST02D01",
                modi: 2,
                pCompany: "",
                pCustomer: "",
                sc: {
                    company: "01",
                    busarea: "S",
                    sector: "",
                    country: "",
                    city: "",
                    customer: "",
                    name1: "",
                    taxDept: "",
                    taxNum: "",
                    custOrVend: 99,
                },
                lisCustomerList: [],
            },
        };
    },

    methods: {
        async getLocation() {
            if (navigator.geolocation) {
                console.log("position");

                navigator.geolocation.getCurrentPosition(
                    console.log,
                    console.error
                );
            } else {
                console.log("not supported");
            }
        },
        async btnSearch() {
            this.dv = await this.lis.function("BAST02/01-btnSearch", this.dv);
          
        },
        async btnEdit() {
            this.dv = await this.lis.function("BAST02/01-btnEdit", this.dv);
            this.tabInfo.blockGoToTransaction = true;
           
        },
        async btnShow() {
            this.dv = await this.lis.function("BAST02/01-btnShow", this.dv);
            this.tabInfo.blockGoToTransaction = true;
            
        },
        async btnInsert() {
            this.dv = await this.lis.function("BAST02/01-btnInsert", this.dv);
            this.tabInfo.blockGoToTransaction = true;
           
        },
        
            async btnPrint() {
            this.lis.printPDF("BAST02D01PDF", "Cari Kartlar Raporu");
        },
            
       
        async init() {
            this.dv = await this.lis.function("BAST02/01-init", this.dv);
        },
    },
};
</script>
