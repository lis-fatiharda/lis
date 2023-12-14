<template>
    <div>
        <l-div>
            <!--Tittle Layer-->

            <l-card>
                <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                    <l-btn flat round dense icon="assignment_ind" />

                    <l-toolbar-title>{{
                        this.$gl(`Sunucu Yönetimi`, `Server Management`)
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
            </l-card>

            <l-div-flex>
                <l-card style="width: 50%; min-width: 320px">
                    <div class="text-overline q-pa-xs">
                        {{
                            this.$gl(
                                `Sistem Parametreleri`,
                                `System Parameters`
                            )
                        }}
                    </div>
                    <l-separator inset />
                    <l-card-section-flex>
                        <l-input
                            :label="this.$gl(`Proje Kodu`, `Project Code`)"
                            v-model="dv.sys_projectCode"
                            readonly
                        />
                        <l-input
                            :label="
                                this.$gl(`Kullanıcı Lisansı`, `User License`)
                            "
                            v-model="dv.sys_userLicense"
                            readonly
                        />
                    </l-card-section-flex>
                    <l-card-section>
                        <l-input
                            :label="
                                this.$gl(`Veri Tabanı Yolu`, `Database Path`)
                            "
                            v-model="dv.sys_dbUri"
                            readonly
                            style="min-width: 320px"
                        />
                    </l-card-section>
                    <l-card-section-flex>
                        <l-input
                            :label="
                                this.$gl(
                                    `Uygulama Sunucusu IP`,
                                    `Application Server IP`
                                )
                            "
                            v-model="dv.lisApi_URL"
                            readonly
                            style="min-width: 320px"
                        />

                        <l-input
                            :label="this.$gl(`Lis Api Port`, `Lis Api Port`)"
                            v-model="dv.sys_lisApiPort"
                            readonly
                        />
                        <l-input
                            :label="
                                this.$gl(`Lis Socket Port`, `Lis Socket Port`)
                            "
                            v-model="dv.sys_lisSocketPort"
                            readonly
                        />
                        <l-input
                            :label="
                                this.$gl(`Lis ApiOut Port`, `Lis ApiOut Port`)
                            "
                            v-model="dv.sys_lisApiOutPort"
                            readonly
                        />
                    </l-card-section-flex>
                </l-card>

                <l-card style="width: 49%; min-width: 320px">
                    <l-div-flex>
                        <l-btn
                            dense
                            color="teal"
                            icon="refresh"
                            @click="this.init(this.dv)"
                        ></l-btn>

                        <div class="text-overline">
                            {{ this.$gl(`Aktif Kullanıcılar`, `Active Users`) }}
                        </div>
                    </l-div-flex>

                    <l-separator inset />

                    <l-card-section-flex>
                        <!--Table Layer---------------------------->
                        <q-markup-table flat bordered dense>
                            <thead>
                                <tr class="bg-blue-grey-2">
                                    <th class="text-left">
                                        {{ this.$gl(`Kullanıcı`, `User`) }}
                                    </th>
                                    <th class="text-left">
                                        {{ this.$gl(`Token`, `Token`) }}
                                    </th>
                                    <th class="text-left">
                                        {{
                                            this.$gl(`Login Date`, `Login Date`)
                                        }}
                                    </th>
                                    <th class="text-left">
                                        {{
                                            this.$gl(
                                                `Kullanıcı Konumu`,
                                                `User Location`
                                            )
                                        }}
                                    </th>
                                    <th class="text-left">
                                        {{ this.$gl(`Kill User`, `Kill User`) }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="item in dv.lisuserlogins"
                                    :key="item.id"
                                >
                                    <td class="text-left">
                                        {{ item.username }}
                                    </td>
                                    <td class="text-left">{{ item.token }}</td>
                                    <td class="text-left">
                                        <l-datetime
                                            v-model="item.logindate"
                                            :readonly="true"
                                        />
                                    </td>
                                    <td class="text-left">
                                        {{ item.latitude }},{{ item.longitude }}
                                    </td>
                                    <td class="text-left">
                                        <l-btn
                                            icon="cancel"
                                            color="negative"
                                            @click="this.killUser(item)"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </q-markup-table>
                    </l-card-section-flex>
                </l-card>
                <l-card style="width: 50%; min-width: 320px">
                    <l-card-section-flex> </l-card-section-flex>
                </l-card>
                <l-card style="width: 49%; min-width: 320px">
                    <l-card-section-flex> </l-card-section-flex>
                </l-card>
            </l-div-flex>
        </l-div>
    </div>
</template>

<script>
export default {
    props: ["tabInfo"],

    data() {
        return {
            dv: {
                lisDialog: "SYST02D01",
                modi: 2,
                lisuserlogins: {},
                sys_projectCode: "",
                sys_userLicense: 0,
                sys_dbUri: "",
                lisApi_URL: "",
                sys_lisApiPort: "",
                sys_lisSocketPort: "",
                sys_lisApiOutPort: "",
            },
        };
    },

    methods: {
        async init(prop) {
            this.dv = await this.lis.function("SYST02/01-init", prop);
        },
        async killUser(prop) {
            console.log(prop);
            await this.lis.function("cmd-system.btnLogout", prop);
            this.init();
        },
    },
    mounted() {
        this.init(this.dv);
    },
};
</script>
