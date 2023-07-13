<template>
    <div>
        <l-div v-if="dv.lisDialog == 'list01d01'">
            <!--Tittle Layer-->
            <l-card>
                <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                    <l-icon size="md" name="account_balance" />

                    <l-toolbar-title>{{
                        this.$gl("Hesap Planı", "Account Plan")
                    }}</l-toolbar-title>

                    <l-btn
                        icon="cancel"
                        color="negative"
                        @click="this.$btnGoHome(tabInfo)"
                    />
                </l-toolbar>
                <div class="row q-pa-xs"></div>
            </l-card>
            <!--Butons Layer Layer---------------------->

            <l-div>
                <l-btn-group>
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
                    <l-btn
                        color="primary"
                        
                        icon="edit"
                        @click="btnEdit(dv)"
                    />
                    <l-btn
                        color="secondary"
                        
                        icon="add"
                        @click="btnInsert(dv)"
                    />
                    <l-btn
                        color="negative"
                        
                        icon="print"
                        @click="btnDelete(dv)"
                    />
                </l-btn-group>
            </div>
            <!--Table Layer---------------------------->
            <q-markup-table flat bordered dense separator="cell">
                <thead>
                    <tr class="bg-blue-grey-2">
                        <th class="text-left">Kolon-1</th>
                        <th class="text-left">Kolon-2</th>
                        <th class="text-left">Kolon-3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in dv.reportList"
                        :key="item.id"
                        @click="dv.selectedRow = item._id"
                        :class="
                            dv.selectedRow == item._id
                                ? 'bg-light-blue-1'
                                : 'bg-white'
                        "
                    >
                        <td class="text-left">
                            <l-chip dense :label="index + 1" rounded glossy />
                        </td>
                        <td class="text-left">Data-2</td>
                        <td class="text-left">Data-3</td>
                    </tr>
                </tbody>
                <l-scroller
                    :position="'bottom-right'"
                    :icon="'keyboard_arrow_up'"
                    :color="'accent'"
                />
            </q-markup-table>
        </div>
        <list01d02
            :dv="dv"
            :tabInfo="tabInfo"
            v-if="dv.lisDialog == 'list01d02'"
        />
    </div>
</template>

<script>
import list01d02 from "./list01d02.vue";

export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
    components: {
        list01d02,
    },

    data() {
        return {
            dv: {
                lisDialog: "list01d01",
                modi: 2,
                selectedRow: "",
                reportList: [],
            },
        };
    },

    methods: {
        async btnSearch(prop) {
            await this.$Axios.post("list01/01-btnSearch", prop).then((res) => {
                this.dv = res.data;
            });
        },
        async btnEdit(prop) {
            await this.$Axios.post("list01/01-btnEdit", prop).then((res) => {
                this.dv = res.data;
            });
        },
        async btnShow(prop) {
            await this.$Axios.post("list01/01-btnShow", prop).then((res) => {
                this.dv = res.data;
            });
        },
        async btnInsert(prop) {
            await this.$Axios.post("list01/01-btnInsert", prop).then((res) => {
                this.dv = res.data;
            });
        },
        async btnDelete(prop) {
            await this.$Axios.post("list01/01-btnDelete", prop).then((res) => {
                this.dv = res.data;
            });
        },
        async init(prop) {
            await this.$Axios
                .post("list01/01-init", this.dv)
                .then((res) => {
                    this.dv = res.data;
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
    },

    mounted() {
        this.init(this.dv);
        console.log("mounted worked");
    },
};
</script>
