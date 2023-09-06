<template>
    <l-div v-if="dv.lisDialog == 'SYST03D01'">
        <!--Tittle Layer-->

        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="assignment_ind" />

                <l-toolbar-title>{{
                    this.$gl(`Sistem Kullanıcıları`, `System Users`)
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
            <!--Searching Criterias Layer----row-1-->
            <l-div-flex>
                <div class="col-3">
                    <l-input
                        :label="this.$gl(`Kullanıcı Adı`, `User name`)"
                        v-model="dv.sc.userName"
                    />
                </div>
            </l-div-flex>
            <!--------------------------------row-2-->
            <!--------------------------------row-3-->
        </l-card0>
        <!--Butons Layer Layer---------------------->

        <l-btn-group>
            <l-btn color="warning" icon="search" @click="btnSearch(dv)" />
            <l-btn color="primary" icon="edit" @click="btnEdit(dv)" />
            <l-btn color="info" icon="visibility" @click="btnShow(dv)" />
            <l-btn color="secondary" icon="add" @click="btnInsert(dv)" />
        </l-btn-group>
        <!--Table Layer---------------------------->
        <q-markup-table flat bordered dense>
            <thead>
                <tr class="bg-blue-grey-2">
                    <th class="text-left"></th>
                    <th class="text-left">
                        {{ this.$gl(`Kullanıcı Adı`, `User Name`) }}
                    </th>
                    <th class="text-left">
                        {{ this.$gl(`Süper Kullanıcı?`, `Super User?`) }}
                    </th>
                    <th class="text-left">
                        {{ this.$gl(`Blokeli?`, `Blocked?`) }}
                    </th>
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
                    <td class="text-left">{{ item.username }}</td>
                    <td class="text-left">{{ item.issuperuser }}</td>
                    <td class="text-left">{{ item.isblocked }}</td>
                </tr>
            </tbody>
        </q-markup-table>
    </l-div>
    <SYST03D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'SYST03D02'" />
</template>

<script>
import SYST03D02 from "./SYST03D02.vue";

export default {
    props: ["tabInfo"],
    components: {
        SYST03D02,
    },

    data() {
        return {
            dv: {
                sc: {
                    userName: "",
                },
                lisDialog: "SYST03D01",
                modi: 2,

                olisusers: {},
                reportList: [],
                selectedRow: "",
                project_CODE: localStorage.project_CODE,
            },
        };
    },

    methods: {
        async btnSearch(prop) {
            this.dv = await this.lis.function("SYST03/01-btnSearch", prop);
        },
        async btnEdit(prop) {
            this.dv = await this.lis.function("SYST03/01-btnEdit", prop);
          this.tabInfo.blockGoToTransaction = true;
        },
        async btnShow(prop) {
            this.dv = await this.lis.function("SYST03/01-btnShow", prop);
            this.tabInfo.blockGoToTransaction = true;
        },
        async btnInsert(prop) {
            this.dv = await this.lis.function("SYST03/01-btnInsert", prop);
            this.tabInfo.blockGoToTransaction = true;
        },
        async btnDelete(prop) {
            this.dv = await this.lis.function("SYST03/01-btnDelete", prop);
        },
        async init(prop) {
            this.dv = await this.lis.function("SYST03/01-init", prop);
        },
    },

    mounted() {
        this.init(this.dv);
        console.log("mounted worked");
    },
};
</script>
