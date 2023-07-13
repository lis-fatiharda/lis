<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-toolbar>
                    <l-icon size="md" name="assignment_ind" />

                    <l-toolbar-title>{{
                        this.$gl(`Kullanıcı Detayı`, `User Detail`)
                    }}</l-toolbar-title>

                    <l-btn
                        v-if="dv.modi != 2"
                        icon="save"
                        color="teal"
                        @click="btnSave()"
                    />
                    <l-btn icon="cancel" color="negative" @click="cancel()" />
                </l-toolbar>
            </l-toolbar>

            <l-div-flex>
                <l-input
                    dense
                    :label="this.$gl(`Kullanıcı Adı`, `User name`)"
                    v-model="dv.olisusers[0].username"
                ></l-input>

                <l-input
                    dense
                    :label="this.$gl(`Şifre`, `Password`)"
                    v-model="dv.olisusers[0].password"
                ></l-input>

                <l-checkbox
                    v-model="dv.olisusers[0].issuperuser"
                    :label="this.$gl(`Anahtar Kullanıcı?`, `Key User?`)"
                />
                <l-checkbox
                    v-model="dv.olisusers[0].isblocked"
                    :label="this.$gl(`Blokeli?`, `Blocked?`)"
                    color="negative"
                />

                <l-input
                    dense
                    :label="this.$gl(`Adres Defteri İsim`, `Address Book Name`)"
                    v-model="dv.olisusers[0].name"
                ></l-input>
                <l-input
                    dense
                    :label="
                        this.$gl(
                            `Adres Defteri Soyİsim`,
                            `Address Book Surname`
                        )
                    "
                    v-model="dv.olisusers[0].surname"
                ></l-input>
            </l-div-flex>
            <hr />

            <l-tabs
                v-model="tab"
            >
                <l-tab name="Sistem" :label="this.$gl(`Sistem`, `System`)">
                </l-tab>
                <l-tab
                    name="Uygulama Hakları"
                    :label="this.$gl(`Uygulama Hakları`, `Application Rights`)"
                />
                <l-tab
                    name="Destek Döküman Hakları"
                    :label="
                        this.$gl(
                            `Destek Döküman Hakları`,
                            `Support Document Rights`
                        )
                    "
                />
                <l-tab name="Gruplar" :label="this.$gl(`Gruplar`, `Groups`)" />
            </l-tabs>

            <l-separator />

            <l-tab-panels v-model="tab" animated>
                <l-tab-panel name="Sistem" class="row">
                    <l-input
                        type="number"
                        :label="this.$gl(`Oturum Açma Hakkı`, `Right to login`)"
                        v-model="dv.olisusers[0].loginright"
                        dense
                    />
                </l-tab-panel>
                <l-tab-panel name="Uygulama Hakları">
                    <q-markup-table flat bordered dense>
                        <thead class="bg-blue-grey-2">
                            <td style="width: 25%">
                                {{
                                    this.$gl(
                                        `Uygulama Kodu`,
                                        `Application Code`
                                    )
                                }}
                            </td>
                            <td></td>
                        </thead>
                        <tbody>
                            <tr
                                v-for="index in dv.olisusers[0].trights.length"
                                :key="index"
                            >
                                <td>
                                    <l-input
                                        v-model="dv.olisusers[0].trights[index]"
                                        :dense="dense"
                                    />
                                </td>
                            </tr>
                        </tbody>
                        <l-btn
                            round
                            dense
                            color="teal"
                            icon="add"
                            @click="dv.olisusers[0].trights.push('')"
                        />
                    </q-markup-table>
                </l-tab-panel>
                <l-tab-panel name="Destek Döküman Hakları">
                    <q-markup-table>
                        <thead class="bg-blue-grey-2">
                            <td style="width: 25%">
                                {{
                                    this.$gl(
                                        `Destek Döküman Kodu`,
                                        `Support Document Code`
                                    )
                                }}
                            </td>
                            <td></td>
                        </thead>
                        <tbody>
                            <tr
                                v-for="index in dv.olisusers[0].scrights.length"
                                :key="index"
                            >
                                <td>
                                    <l-input
                                        v-model="
                                            dv.olisusers[0].scrights[index]
                                        "
                                        :dense="dense"
                                    />
                                </td>
                            </tr>
                        </tbody>
                        <l-btn
                            round
                            dense
                            color="teal"
                            icon="add"
                            @click="
                                dv.olisusers[0].scrights.push({
                                    value: '',
                                })
                            "
                        />
                    </q-markup-table>
                </l-tab-panel>
            </l-tab-panels>
        </l-card0>
    </l-div>
</template>

<script>
import Crypto from "../../../lisRunner/configs/lisCrypto.js";
export default {
    props: ["dv", "tabInfo"],
    data() {
        return {
            dense: true,
            tab: "Sistem",
        };
    },

    methods: {
        async btnSave() {
            console.log("btnSave çalıştı", this.dv.olisusers[0].password, this.dv.olisusers[0].password.length);



            if (this.dv.olisusers[0].password.length != 64) {
                this.dv.olisusers[0].password = Crypto.textToScha256(
                    this.dv.olisusers[0].password
                ).toString();
            }

            await this.lis.function("SYST03/02-btnSave", this.dv);
            this.$q.notify({
                message: this.$gl(
                    "Kullanıcı Ayarları Kaydedildi.",
                    "User Settings Saved."
                ),
                type: "positive",
                actions: [{ label: "X", color: "white", dense: true }],
            });
            this.cancel();

        },
        cancel() {
            this.dv.lisDialog = "SYST03D01";
            this.tabInfo.blockGoToTransaction = false;
        },
        async init(prop) {
            await this.lis.function("SYST03/02-init", prop);
            this.dvt = [...this.dv];
        },
    },
};
</script>
