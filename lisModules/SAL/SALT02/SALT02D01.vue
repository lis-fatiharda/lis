<template>
    <div>
        <l-div>
            <!--Tittle Layer-->
            <l-card0>
                <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                    <l-icon size="md" name="assignment_ind" />

                    <l-toolbar-title>{{
                        $gl("Belge Gelişimi", "Document History")
                    }}</l-toolbar-title>

                    <l-btn
                        icon="cancel"
                        flat
                        round
                        dense
                        color="negative"
                        @click="
                            this.pDv != null
                                ? this.$emit('close', false)
                                : this.$btnGoHome(tabInfo)
                        "
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

                    <l-select
                        :label="this.$gl(`İş Alanı`, `Business Area`)"
                        v-model="dv.sc.busarea"
                        options="lisbas003"
                        optValue="busarea"
                        optTitle="stext"
                        optCaptions="busarea"
                        width="120px"
                    />

                    <l-select
                        :label="this.$gl(`Belge Tipi`, `Document Type`)"
                        v-model="dv.sc.doctype"
                        options="lissal001"
                        optValue="doctype"
                        optTitle="stext"
                        optCaptions="doctype"
                        width="125px"
                    />

                    <l-input
                        dense
                        v-model="dv.sc.docnum"
                        :label="this.$gl(`Belge No`, `Document No`)"
                        class="bg-blue-1"
                    />

                    <l-input
                        type="number"
                        dense
                        v-model="dv.sc.itemnum"
                        :label="this.$gl(`Kalem No`, `Document Item`)"
                    />

                    <l-btn
                        color="teal-3"
                        icon="search"
                        @click="btnSearch(dv)"
                    />
                </l-div-flex>
                <!--------------------------------->
            </l-card0>
            <!--Table Layer---------------------------->

            <l-div>
                <q-tree
                    :nodes="dv.itemFlowList"
                    default-expand-all
                    node-key="docnum"
                >
                    <template v-slot:default-header="prop">
                        <div class="row items-center">
                            <l-icon
                                :name="
                                    prop.node.offtype > 0
                                        ? 'local_offer'
                                        : prop.node.ordtype > 0
                                        ? 'list_alt'
                                        : prop.node.deltype > 0
                                        ? 'local_shipping'
                                        : prop.node.invtype > 0
                                        ? 'receipt_long'
                                        : null
                                "
                                :color="
                                    prop.node.offtype > 0
                                        ? 'amber'
                                        : prop.node.ordtype > 0
                                        ? 'negative'
                                        : prop.node.deltype > 0
                                        ? 'primary'
                                        : prop.node.invtype > 0
                                        ? 'teal'
                                        : null
                                "
                                size="28px"
                                class="q-mr-sm"
                            />
                            <div class="text-weight-bold text-primary">
                                {{ prop.node.doctype }} -
                                {{ prop.node.docnum }} /
                                {{
                                    this.lis.format(
                                        new Date(prop.node.validfrom),
                                        "dd.MM.yyyy HH:mm"
                                    )
                                }}
                            </div>
                        </div>
                    </template>

                    <template v-slot:default-body="prop">
                        <l-card>
                            <q-markup-table separator="cell">
                                <tr class="bg-grey-2">
                                    <th>Kalem</th>
                                    <th>Malzeme Kodu</th>
                                    <th>Malzeme Açıklaması</th>
                                    <th>Miktar</th>
                                    <th>Br</th>
                                    <th>Fiyat</th>
                                    <th>F.Br</th>
                                    <th>Net Tutar</th>
                                    <th>Para Br.</th>
                                    <th>Statü</th>
                                </tr>
                                <tr>
                                    <td>{{ prop.node.items.itemnum }}</td>
                                    <td>{{ prop.node.items.material }}</td>
                                    <td>{{ prop.node.items.mtext }}</td>
                                    <td>{{ prop.node.items.quantity }}</td>
                                    <td>{{ prop.node.items.qunit }}</td>
                                    <td>{{ prop.node.items.price }}</td>
                                    <td>{{ prop.node.items.punit }}</td>
                                    <td>{{ prop.node.items.subtotal }}</td>
                                    <td>{{ prop.node.currency }}</td>
                                    <td
                                        :class="`text-left ${
                                            prop.node.items.stat == 1
                                                ? 'bg-amber-3'
                                                : prop.node.items.stat == 2
                                                ? 'bg-green-3'
                                                : 'bg-white'
                                        }`"
                                    >
                                        <l-select
                                            v-model="prop.node.items.stat"
                                            borderless
                                            dense
                                            readonly
                                            emit-value
                                            map-options
                                            :options="[
                                                {
                                                    label: this.$gl(
                                                        `Açık`,
                                                        `Open`
                                                    ),
                                                    value: 0,
                                                },
                                                {
                                                    label: this.$gl(
                                                        `Kısmi`,
                                                        `Partial`
                                                    ),
                                                    value: 1,
                                                },
                                                {
                                                    label: this.$gl(
                                                        `Kapalı`,
                                                        `Closed`
                                                    ),
                                                    value: 2,
                                                },
                                            ]"
                                            optValue="value"
                                            optTitle="label"
                                        />
                                    </td>
                                </tr>
                            </q-markup-table>
                        </l-card>
                    </template>
                </q-tree>
            </l-div>
        </l-div>
    </div>
</template>

<script>
export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo", "pDv"],

    data() {
        return {
            dv: {
                modi: 2,
                itemFlowList: [],
                sc: {
                    company: "01",

                    busarea: "",

                    doctype: "",

                    docnum: "",
                    itemnum: 0,
                },
            },
        };
    },

    methods: {
        async btnSearch(prop) {
            // controls Before Search

            if ((this.dv.sc.doctype == "") | (this.dv.sc.docnum == "")) {
                this.$q.notify({
                    type: "negative",
                    message: this.$gl(
                        "Belge Tipi ve Belge No Seçiniz!",
                        "Please Choose Doctype and Docnum"
                    ),
                    actions: [{ label: "X", color: "white", dense: true }],
                });
                return;
            }
            this.dv = await this.lis.function("SALT02/01-btnSearch", prop);
        },
        async btnEdit(prop) {
            this.dv = await this.lis.function("SALT02/01-btnEdit", prop);
        },
        async btnShow(prop) {
            this.dv = await this.lis.function("SALT02/01-btnShow", prop);
        },
        async init(prop) {
            this.dv = await this.lis.function("SALT02/01-init", this.dv);
        },
    },

    mounted() {
        if (this.pDv) {
            if (this.pDv != undefined) {
                this.dv.sc.company = this.pDv.company;
                this.dv.sc.busarea = this.pDv.busarea;
                this.dv.sc.doctype = this.pDv.doctype;
                this.dv.sc.docnum = this.pDv.docnum;
                this.dv.sc.itemnum = this.pDv.itemnum;
                this.btnSearch(this.dv);
            }
            return;
        }

        //this.init(this.dv);
        //console.log("mounted worked");
    },
};
</script>
