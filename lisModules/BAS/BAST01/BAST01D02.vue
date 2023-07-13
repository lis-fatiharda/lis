<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-toolbar class="q-gutter-xs">
                    <l-icon size="md" name="assignment_ind" />

                    <l-toolbar-title>{{
                        this.$gl(
                            "Destek Dökümanı Detayı",
                            "Support Document Detail"
                        )
                    }}</l-toolbar-title>

                    <l-btn
                        v-if="dv.modi != 2"
                        icon="save"
                        color="teal"
                        @click="btnSave(dv)"
                    />
                    <l-btn icon="cancel" color="negative" @click="cancel()" />
                </l-toolbar>
            </l-toolbar>

            <l-div-flex>
                <l-input
                    dense
                    v-model="dv.olismodels[0].model"
                    :label="this.$gl(`Collection Kodu`, `Collection Code`)"
                    class="bg-deep-orange-1"
                />

                <l-input
                    style="width: 400px"
                    :label="
                        this.$gl(
                            `Collection Açıklaması`,
                            `Collection Description`
                        )
                    "
                    dense
                    v-model="dv.olismodels[0].stext"
                />
                <l-chip
                    :label="
                        this.$gl(
                            `Döküman Detayı Görüntülemek İçin Çift Tıklayın.`,
                            `Double Click to View Document Details.`
                        )
                    "
                    color="light-blue-1"
                />
            </l-div-flex>

            <!-- Listing Documents  -->
            <l-div v-if="dv.lisDialogDetail == 'listDocs'">
                <q-markup-table :seperator="'cell'" flat bordered dense>
                    <thead class="bg-blue-grey-2">
                        <tr>
                            <template
                                v-for="(value, key, index) in dv
                                    .lisModelData[0]"
                                :key="index"
                            >
                                <th
                                    v-if="
                                        (key != 'id') &
                                        (key != '_id') &
                                        (key != 'updatedAt') &
                                        (key != 'createdAt')
                                    "
                                    class="text-left"
                                >
                                    {{ dv.lisModelDataLabel[key]["label"] }}
                                </th>
                            </template>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="rows in dv.lisModelData"
                            :key="rows.id"
                            @dblclick="openDoc(rows)"
                        >
                            <template
                                v-for="(value, key, index) in rows"
                                :key="index"
                            >
                                <td
                                    v-if="
                                        (key != 'id') &
                                        (key != '_id') &
                                        (key != 'updatedAt') &
                                        (key != 'createdAt')
                                    "
                                    class="text-left"
                                >
                                    {{ value }}
                                </td>
                            </template>
                        </tr>
                    </tbody>
                </q-markup-table>
                <div class="row" justify-center>
                    <l-btn
                        round
                        color="secondary"
                        icon="add"
                        @click="pushNewDoc"
                    ></l-btn>
                </div>
            </l-div>
            <!-- Document Detail  -->
            <l-div v-if="dv.lisDialogDetail == 'docDetail'">
                <l-chip
                    clickable
                    icon="add"
                    class="float-right"
                    color="green"
                    v-if="dmodi == 0"
                    @click="addDoc()"
                >
                    Ekle
                </l-chip>
                <l-chip
                    clickable
                    icon="arrow_back"
                    class="float-right"
                    @click="dv.lisDialogDetail = 'listDocs'"
                ></l-chip>
                <l-div-flex>
                    <template
                        v-for="(value, key, index) in dv.lisModelDataDetail[0]"
                        :key="index"
                    >
                        <!-- ---------------------------------------->
                        <div
                            v-if="
                                (key != 'id') &
                                (key != '_id') &
                                (key != 'updatedAt') &
                                (key != 'createdAt') &
                                (key != '_deleted') &
                                (dv.lisModelDataLabel[key]?.options !=
                                    undefined)
                            "
                        >
                            <l-select
                                :label="dv.lisModelDataLabel[key]['label']"
                                v-model="dv.lisModelDataDetail[0][key]"
                                :options="dv.lisModelDataLabel[key].options"
                                optValue="value"
                                optTitle="stext"
                                optCaptions="value"
                                width="200px"
                                style="background-color: #e8eaf6"
                            />
                        </div>
                        <!-- ---------------------------------------->
                        <div
                            v-if="
                                (key != 'id') &
                                (key != '_id') &
                                (key != 'updatedAt') &
                                (key != 'createdAt') &
                                (key != '_deleted') &
                                (typeof value == 'number') &
                                (dv.lisModelDataLabel[key]?.options ==
                                    undefined)
                            "
                        >
                            <l-input
                                dense
                                type="number"
                                :label="dv.lisModelDataLabel[key]['label']"
                                v-model="dv.lisModelDataDetail[0][key]"
                                style="background-color: #e0f7fa"
                            />
                        </div>
                        <!-- ---------------------------------------->
                        <div
                            v-if="
                                (key != 'id') &
                                (key != '_id') &
                                (key != 'updatedAt') &
                                (key != 'createdAt') &
                                (key != '_deleted') &
                                (typeof value == 'string') &
                                (dv.lisModelDataLabel[key]?.options ==
                                    undefined)
                            "
                        >
                            <l-input
                                dense
                                autogrow
                                :label="dv.lisModelDataLabel[key]['label']"
                                v-model="dv.lisModelDataDetail[0][key]"
                            />
                        </div>
                        <!-- ---------------------------------------->
                        <div
                            v-if="
                                (key != 'id') &
                                (key != '_id') &
                                (key != 'updatedAt') &
                                (key != 'createdAt') &
                                (key != '_deleted') &
                                (typeof value == 'boolean')
                            "
                        >
                            <l-checkbox
                                dense
                                :label="dv.lisModelDataLabel[key]['label']"
                                v-model="dv.lisModelDataDetail[0][key]"
                            />
                        </div>
                    </template>
                </l-div-flex>

                <l-chip
                    :label="this.$gl(`Sil`, `Delete`)"
                    clickable
                    @click="btnDelete(dv)"
                    color="red-6"
                ></l-chip>
            </l-div>
        </l-card>
    </l-div>
</template>

<script>
export default {
    props: ["dv", "tabInfo"],

    data() {
        return {};
    },

    methods: {
        async cancel() {
            console.log(this.dv.lisDialog);
            this.dv.lisDialog = "BAST01D01";
            this.tabInfo.blockGoToTransaction = false;
        },
        async btnSave(params) {
            await this.lis.function("BAST01/02-btnSave", params);
            this.cancel();
        },
        async pushNewDoc() {
            this.dv.lisModelData = await this.lis.function(
                "BAST01/02-pushNewDoc",
                this.dv
            );
            for (let item in this.dv.lisModelDataDetail[0]) {
                console.log(item);
                this.dv.lisModelDataDetail[0][item] = "";
            }
        },
        async openDoc(event) {
            console.log("openDoc", event._id);
            console.log("this.dv.lisModelData", this.dv.lisModelData);
            this.dv.lisDialogDetail = "docDetail";
            this.dv.modi = 1;
            this.dv.dmodi = 1;

            this.dv.lisModelDataDetail = this.dv.lisModelData.filter(
                (e) => e._id == event._id
            );
        },
        async addDoc() {
            console.log("ekle");
            this.dv.lisModelData.push(this.dv.lisModelDataDetail[0]);
            this.dv.lisModelDataDetail = {};
        },
        async getColumnName(key) {
            console.log(key);
            //console.log(this.dv.lisModelDataLabel[key]['label'].length > 0);
            let returnStr =
                this.dv.lisModelDataLabel[key] != undefined
                    ? this.dv.lisModelDataLabel[key]["label"]
                    : key;
            return returnStr;
        },
        async init() {
            this.dv = await this.lis.function("BAST01/02-init", params);
        },

        async btnDelete() {
            this.dv.lisModelData = await this.lis.function(
                "BAST01/01-btnDelete",
                this.dv
            );
            this.dv.lisDialogDetail = "listDocs";
        },
    },

    mounted() {
        this.init(this.dv);
        console.log("02 created çalıştı");
    },
    async beforeUnmount() {
        if (this.dv.modi != 2) {
            await this.lis.function("cls-system.unlock", this.dv.lockKeyParams);
        }
    },
};
</script>

function data() { throw new Error('Function not implemented.'); }
