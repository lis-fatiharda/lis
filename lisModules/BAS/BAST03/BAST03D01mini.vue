<template>
    <l-dialog-small v-model="pIsShow" persistent>
        <l-div>
            <!--Tittle Layer-->
            <l-card0>
                <l-toolbar class="bg-amber-2">
                    <l-toolbar-title>Malzeme Kartları</l-toolbar-title>

                    <l-btn
                        flat
                        round
                        dense
                        icon="done"
                        color="teal"
                        @click="selectMaterial()"
                    >
                        <l-tooltip>
                            Seçilen Malzeme Bilgilerini Getir
                        </l-tooltip>
                    </l-btn>
                    <l-btn
                        flat
                        round
                        dense
                        icon="cancel"
                        color="negative"
                        @click="cancel()"
                    />
                </l-toolbar>

                <!--Searching Criterias Layer------>
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

                    <l-input
                        dense
                        label="Malzeme Kodu"
                        v-model="dv.sc.material"
                    />
                    <l-input dense label="Malzeme Adı" v-model="dv.sc.mtext" />

                    <l-select
                        :label="this.$gl(`Malzeme Tip`, `Material Type`)"
                        v-model="dv.sc.mattype"
                        options="lisbas009"
                        optValue="mattype"
                        optTitle="stext"
                        optCaptions="mattype"
                        width="150px"
                    />
                    <l-select
                        :label="this.$gl(`Malzeme Statüsü`, `Material Status`)"
                        v-model="dv.sc.matstat"
                        options="lisbas010"
                        optValue="matstat"
                        optTitle="stext"
                        optCaptions="matstat"
                        width="120px"
                    />

                    <l-btn
                        color="warning"
                        dense
                        icon="search"
                        @click="btnSearch(dv)"
                    >
                        <l-tooltip> Ara </l-tooltip></l-btn
                    >
                </l-div-flex>

                <!--------------------------------->
            </l-card0>
            <!--Table Layer---------------------------->
            <q-markup-table flat bordered dense class="cursor-pointer" separator="cell">
                <thead>
                    <tr class="bg-blue-grey-2">
                        <th class="text-left"></th>
                        <th class="text-left">Malzeme</th>
                        <th class="text-left">Tipi</th>
                        <th class="text-left">Açıklaması</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in dv.materialList"
                        :key="item.id"
                        @click="dv.selectedRow = item._id"
                        :class="
                            dv.selectedRow == item._id
                                ? 'bg-light-blue-1'
                                : 'bg-white'
                        "
                        @dblclick="selectMaterial()"
                    >
                        <td class="text-left">
                            <l-chip dense :label="index + 1" rounded glossy />
                        </td>
                        <td class="text-left">{{ item.material }}</td>
                        <td class="text-left">{{ item.mattype }}</td>
                        <td class="text-left">{{ item.mtext }}</td>
                    </tr>
                </tbody>
            </q-markup-table>
        </l-div>
    </l-dialog-small>
</template>

<script>
export default {
    props: ["isShow", "pComp"],

    data() {
        return {
            pIsShow: this.isShow,
            dv: {
                sc: {
                    company: "01",
                    mtext: "",
                    material: "",

                    matstat: "",
                    mattype: "",
                    sector: "",
                },
                selectedRow: "",
                materialList: [],
                lisMaterial: {},
            },
        };
    },

    watch: {
        isShow(newValue) {
            this.pIsShow = newValue;
        },
        pComp(newValue) {
            this.dv.sc.company = newValue;
        },
    },

    methods: {
        async btnSearch(prop) {
            await this.$Axios.post("BAST03/01-btnSearch", prop).then((res) => {
                this.dv = res.data;
            });
        },
        async selectMaterial() {
            this.dv.materialList = this.dv.materialList.filter(
                (e) => e._id == this.dv.selectedRow
            );
            if (this.dv.materialList.length == 1) {
                this.dv.lisMaterial = this.dv.materialList[0];
                this.$emit("ok", this.dv.lisMaterial);
            } else {
                this.lis.alert("e", "Bir Malzeme Kartı Seçilmedi!");
            }
        },
        cancel() {
            this.$emit("cancel", false);
        },

        async init() {
            this.dv = await this.lis.function("BAST03/01-init", this.dv);
        },
    },

    mounted() {
        this.init(this.dv);
    },
};
</script>
