<template>
    <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="list_alt" />

        <l-toolbar-title>{{
            this.$gl("Satış Belgeleri", "Sales Orders")
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

    <l-card-flex>
        <l-input label="firma" v-model="dv.sc.company"/>
        <l-input label="firma Adı" v-model="dv.sc.name1"/>
    
    
    
      </l-card-flex>

    <l-div-flex>
        <l-btn
            label="ara"
            icon="search"
            color="secondary"
            @click="btnSearch()"
        />
    </l-div-flex>

    <l-table name="SALT03D01" :tableData="dv.reportList" :columns="myColumns" />
</template>

<script>
export default {
    props: ["tabInfo", "lv"],

    components: {},

    data() {
        return {
          dv: {
            sc: {
              company: "",
              name1: ""
            },
            reportList: []
          },

            myColumns: [
                {
                    label: "Belge Tipi",
                    value: "doctype",
                    type: "string",
                },
                {
                    label: "Belge No",
                    value: "docnum",
                    type: "string",
                },
                {
                    label: "Müşteri Adı",
                    value: "name1",
                    type: "string",
                },
            ],
        };
    },

    methods: {
        async btnSearch() {
            this.dv = await this.lis.function("SALT03/01-btnSearch", this.dv);
        },
    },

    mounted() {},
};
</script>
