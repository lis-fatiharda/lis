<template>
    <div>
        <l-div v-if="dv.lisDialog == 'BAST01D01'"> 
            <!--Tittle Layer-->
            <l-card0>
                <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                    <l-icon size="md" name="assignment_ind" />

                    <l-toolbar-title>{{
                        this.$gl("Destek Dökümanları", "Support Documents")
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
                    <l-select
                        :label="this.$gl('Modül', 'Module')"
                        v-model="dv.sc.module"
                        :options="dv.sc.moduleOpts"
                        optValue="module"
                        optTitle="module"
                        optCaptions="stext"
                        style="width: 150px"
                    >
                    </l-select>
                    <l-input
                        :label="this.$gl('Döküman Kodu', 'Document Code')"
                        
                        dense
                        v-model="dv.sc.modelCode"
                    >
                    </l-input>
                    <l-input
                        :label="
                            this.$gl(
                                'Döküman Açıklaması',
                                'Document Explanation'
                            )
                        "
                        
                        dense
                        v-model="dv.sc.modelTxt"
                    >
                    </l-input>

                    <l-space />

                    <l-btn
                        label="Hedef Firmaya Kopyala"
                        outline
                        dense
                        color="secondary"
                        @click="dialog = true"
                    />
                    <!-- /////////////////////////////////////////////////////////////// -->
                    <l-dialog v-model="dialog">
                        <l-card>
                            <l-toolbar>
                                <l-icon size="md" name="format_size" />
                                <l-toolbar-title>{{
                                    this.$gl(
                                        "Destek Tablolarını Kopyala",
                                        "Copy Support Tables"
                                    )
                                }}</l-toolbar-title>
                                <l-btn
                                    icon="save"
                                    color="teal"
                                    @click="copyCompany()"
                                    v-close-popup
                                />
                                <l-btn
                                    icon="cancel"
                                    color="negative"
                                    v-close-popup
                                />
                            </l-toolbar>
                            <l-card-section
                                class="row items-center q-gutter-sm"
                            >
                                <l-input
                                    
                                    dense
                                    v-model="dv.source"
                                    :label="
                                        this.$gl(
                                            `Kaynak Firma`,
                                            `Source Company`
                                        )
                                    "
                                />
                                <l-input
                                    
                                    dense
                                    v-model="dv.target"
                                    :label="
                                        this.$gl(
                                            `Hedef Firma`,
                                            `Target Company`
                                        )
                                    "
                                />
                            </l-card-section>
                        </l-card>
                    </l-dialog>

                    <!-- /////////////////////////////////////////////////////////////// -->
                    <l-btn
                        label="Hedef Dökümanı Temizle"
                        outline
                        dense
                        color="negative"
                        @click="dialog1 = true"
                    />
                    <l-dialog v-model="dialog1">
                        <l-card>
                            <l-toolbar>
                                <l-icon size="md" name="format_size" />
                                <l-toolbar-title>{{
                                    this.$gl(
                                        "Hedef Tablo Bilgilerini Sil",
                                        "Delete Target Table Information"
                                    )
                                }}</l-toolbar-title>
                                <l-btn
                                    icon="save"
                                    color="teal"
                                    @click="deleteCompany()"
                                    v-close-popup
                                />
                                <l-btn
                                    icon="cancel"
                                    color="negative"
                                    v-close-popup
                                />
                            </l-toolbar>
                            <l-card-section
                                class="row items-center q-gutter-sm"
                            >
                                <l-input
                                    
                                    dense
                                    v-model="dv.target2"
                                    :label="
                                        this.$gl(
                                            `Hedef Firma`,
                                            `Target Company`
                                        )
                                    "
                                />
                            </l-card-section>
                        </l-card>
                    </l-dialog>
                </l-div-flex>
                <!--------------------------------row-2-->
                <!--------------------------------row-3-->
            </l-card0>
            <!--Butons Layer Layer---------------------->

                    <l-btn color="warning" icon="search" @click="btnSearch()" />
                    <l-btn
                        color="info"
                        icon="visibility"
                        @click="btnShow(dv)"
                    />
                    <l-btn color="primary" icon="edit" @click="btnEdit(dv)" />
                    <l-btn
                        color="secondary"
                        icon="add"
                        @click="btnInsert(dv)"
                    />
            <!--Table Layer---------------------------->
            <q-markup-table flat bordered dense separator="cell">
                <thead>
                    <tr class="bg-blue-grey-2">
                        <th class="text-left" style="width: 15px"></th>
                        <th class="text-left">
                            {{
                                this.$gl(
                                    "Destek Dökümanı Kodu",
                                    "Support Document Code"
                                )
                            }}
                        </th>
                        <th class="text-left">
                            {{
                                this.$gl(
                                    "Destek Dökümanı Açıklaması",
                                    "Support Document Description"
                                )
                            }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in dv.olismodels"
                        :key="item.model"
                        @click="dv.selectedRow = item._id"
                        :class="
                            dv.selectedRow == item._id
                                ? 'bg-light-blue-1'
                                : 'bg-white'
                        "
                    >
                        <td class="text-left">
                            <l-chip dense :label="index + 1" rounded />
                        </td>
                        <td class="text-left">{{ item.model }}</td>
                        <td class="text-left">{{ item.stext }}</td>
                    </tr>
                </tbody>
                <l-scroller
                    :position="'bottom-right'"
                    :icon="'keyboard_arrow_up'"
                    :color="'brown-3'"
                />
            </q-markup-table>
        </l-div>
        <BAST01D02
            :dv="dv"
            :tabInfo="tabInfo"
            v-if="dv.lisDialog == 'BAST01D02'"
        />
        <LISFIN002
            :dv="dv"
            :tabInfo="tabInfo"
            v-if="dv.lisDialog == 'LISFIN002'"
        />
        <LISFIN003
            :dv="dv"
            :tabInfo="tabInfo"
            v-if="dv.lisDialog == 'LISFIN003'"
        />
        <LISBAS017
            :dv="dv"
            :tabInfo="tabInfo"
            v-if="dv.lisDialog == 'LISBAS017'"
        />
        <LISBAS018
            :dv="dv"
            :tabInfo="tabInfo"
            v-if="dv.lisDialog == 'LISBAS018'"
        />
        <LISINV002
            :dv="dv"
            :tabInfo="tabInfo"
            v-if="dv.lisDialog == 'LISINV002'"
        />
    </div>
</template>

<script>
import BAST01D02 from "./BAST01D02.vue";
import LISFIN002 from "./SUPS/lisfin002/LISFIN002.vue";
import LISFIN003 from "./SUPS/lisfin003/LISFIN003.vue";
import LISBAS017 from "./SUPS/lisbas017/LISBAS017.vue";
import LISBAS018 from "./SUPS/lisbas018/LISBAS018.vue";
import LISINV002 from "./SUPS/lisinv002/LISINV002.vue";

export default {
    props: ["tabInfo", "currentTab"],
    components: {
        BAST01D02,
        LISFIN002,
        LISFIN003,
        LISBAS017,
        LISBAS018,
        LISINV002,
    },

    data() {
        return {
            test: "",
            dialog: "false",
            dialog1: "false",

            dv: {
                source: "",
                target: "",
                target2: "",
                lisDialog: "BAST01D01",
                lisDialogDetail: "listDocs",
                modi: 2,
                dmodi: 2,
                sc: {
                    module: "",
                    moduleOpts: [],
                    modelCode: "",
                    modelTxt: "",
                    text: "testtext",
                },
                olismodels: [],
                lisModelDataLabel: {},
                lisModelData: [],
                lisModelDataDetail: [],
                schema: "",
                selectedRow: "",
                lockKeyParams: {
                    company: "",
                    lid: "",
                    lockkey: "",
                },
            },
        };
    },

    methods: {
        async btnSearch() {
            this.dv = await this.lis.function("BAST01/01-btnSearch", this.dv);
            console.log(
                this.lis.objectEqual(
                    { ad: "fatih" },
                    { ad: "fatih", soyad: "arda" }
                )
            );
        },
        async btnEdit(prop) {
            this.dv = await this.lis.function("BAST01/01-btnEdit", prop);
            console.log("dvlisModelData", this.dv.lisModelData);
            this.tabInfo.blockGoToTransaction = true;
        },
        async btnShow(prop) {
            this.dv = await this.lis.function("BAST01/01-btnShow", prop);
            this.tabInfo.blockGoToTransaction = true;
        },
        async btnInsert(prop) {
            this.dv = await this.lis.function("BAST01/01-btnInsert", prop);
            this.tabInfo.blockGoToTransaction = true;
        },
        async btnDelete(prop) {
            this.dv = await this.lis.function("BAST01/01-btnDelete", prop);
        },
        async copyCompany() {
            this.dv = await this.lis.function("BAST01/01-btnCopyComp", this.dv);
            
        },
        async deleteCompany() {
            this.dv = await this.lis.function(
                "BAST01/01-btnDeleteComp",
                this.dv
            );
            
        },

        async init(prop) {
            this.dv = await this.lis.function("BAST01/01-init", this.dv);
        },
    },

    mounted() {
        this.init(this.dv);

        console.log(
            "mounted worked",
            this.$gl("Destek Dökümanları", "Support Documents")
        );
        this.dv.sc.modelTxt = this.$gl(
            "Destek Dökümanları",
            "Support Documents"
        );
    },
};
</script>
