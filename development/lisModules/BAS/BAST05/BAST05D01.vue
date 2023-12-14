<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="list_alt" />

                <l-toolbar-title>{{
                    this.$gl("Döviz Kurları", "Exchange")
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
                    :label="this.$gl(`Kaynak Para Birimi`, `Source Currency`)"
                    v-model="dv.sc.lisUnit1"
                    options="lisbas007"
                    optValue="unit"
                    optTitle="stext"
                    optCaptions="unit"
                    :optFilter="{ unittype: 1 }"
                    width="200px"
                />
                <l-select
                    :label="this.$gl(`Hedef Para Birimi`, `Target Currency`)"
                    v-model="dv.sc.lisUnit2"
                    options="lisbas007"
                    optValue="unit"
                    optTitle="stext"
                    optCaptions="unit"
                    :optFilter="{ unittype: 1 }"
                    width="200px"
                />

                <l-date
                    v-model="dv.sc.curdate1"
                    :label="this.$gl(`Başlangıç Tarihi`, `Starting date`)"
                    style="width: 140px"
                />
                <l-date
                    v-date="dv.sc.curdate2"
                    :label="this.$gl(`Bitiş Tarihi`, `End Date`)"
                    style="width: 140px"
                />
            </l-div-flex>
            <!--------------------------------->
        </l-card0>
        <!--Butons Layer Layer---------------------->

        <l-btn-group>
            <l-btn color="warning" icon="search" @click="btnSearch()" />
            <l-btn
                color="secondary"
                icon="browser_updated"
                @click="fetchTcmbCur()"
            ></l-btn>
        </l-btn-group>

        <!--Table Layer---------------------------->
        <q-markup-table flat bordered dense separator="cell">
            <thead>
                <tr class="bg-blue-grey-2">
                    <th class="text-left" style="width: 120px">
                        {{ this.$gl("Firma", "Company") }}
                    </th>
                    <th class="text-left" style="min-width: 140px">
                        {{ this.$gl("Tarih", "Date") }}
                    </th>
                    <th class="text-left" style="width: 50px">
                        {{ this.$gl("Değer", "Value") }}
                    </th>
                    <th class="text-left" style="width: 80px">
                        {{ this.$gl("Para Br.", "Currency") }}
                    </th>
                    <th class="text-left" style="width: 120px">
                        {{ this.$gl("Alış Kuru", "Buying Rate") }}
                    </th>
                    <th class="text-left" style="width: 120px">
                        {{ this.$gl("Satış Kuru", "Sales Rate") }}
                    </th>
                    <th class="text-left" style="width: 120px">
                        {{
                            this.$gl(
                                "Efektif Alış Kuru",
                                "Effective Buying Rate"
                            )
                        }}
                    </th>
                    <th class="text-left" style="width: 120px">
                        {{
                            this.$gl(
                                "Efektif Satış Kuru",
                                "Effective Sales Rate"
                            )
                        }}
                    </th>
                    <th class="text-left" style="width: 100px">
                        {{ this.$gl("Para Br.", "Currency") }}
                    </th>
                    <th style="width: 40px"></th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, index) in dv.lisCurrencyList"
                    :key="item.id"
                    :class="item.isenable == true ? 'bg-brown-1' : 'white'"
                >
                    <td class="text-left">
                        <l-select
                            :label="this.$gl(`Firma`, `Company`)"
                            v-model="item.company"
                            options="lisbas001"
                            optValue="company"
                            optTitle="stext"
                            optCaptions="company"
                            width="120px"
                            class="bg-blue-1"
                        />
                    </td>
                    <td class="text-left">
                        <l-date
                            v-model="item.curdate"
                            :readonly="item.isenable == false ? true : false"
                        />
                    </td>
                    <td class="text-left">
                        <l-input
                            type="number"
                            borderless
                            dense
                            v-model="item.exchvalue"
                            :readonly="item.isenable == false ? true : false"
                        />
                    </td>
                    <td>
                        <!-- <q-select
                            borderless
                            dense
                            v-model="item.currency"
                            :options="dv.lisUnitOpts"
                            map-options
                            emit-value
                            :readonly="item.isenable == false ? true : false"
                            style="min-width: 100px"
                        /> -->
                        <l-select
                            :label="this.$gl(`Para Birimi`, `Currency`)"
                            v-model="item.currency"
                            options="lisbas007"
                            optValue="unit"
                            optTitle="stext"
                            optCaptions="unit"
                            :optFilter="{ unittype: 1 }"
                            :readonly="item.isenable == false ? true : false"
                            style="min-width: 100px"
                        />
                    </td>

                    <td>
                        <l-input
                            type="money"
                            v-model="item.exchratepur"
                            :readonly="item.isenable == false ? true : false"
                            :mfd="4"
                        />
                    </td>
                    <td>
                        <l-input
                            type="money"
                            v-model="item.exchratesal"
                            :readonly="item.isenable == false ? true : false"
                            :mfd="4"
                        />
                    </td>

                    <td>
                        <l-input
                            type="money"
                            v-model="item.effexchratepur"
                            :readonly="item.isenable == false ? true : false"
                            :mfd="4"
                        />
                    </td>
                    <td>
                        <l-input
                            type="money"
                            v-model="item.effexchratesal"
                            :readonly="item.isenable == false ? true : false"
                            :mfd="4"
                        />
                    </td>

                    <td>
                        <!-- <q-select
                            borderless
                            dense
                            v-model="item.tocurrency"
                            :options="dv.lisUnitOpts"
                            map-options
                            emit-value
                            :readonly="item.isenable == false ? true : false"
                            style="min-width: 100px"
                        /> -->
                        <l-select
                            :label="this.$gl(`Para Birimi`, `Currency`)"
                            v-model="item.tocurrency"
                            options="lisbas007"
                            optValue="unit"
                            optTitle="stext"
                            optCaptions="unit"
                            :optFilter="{ unittype: 1 }"
                            :readonly="item.isenable == false ? true : false"
                            style="min-width: 100px"
                        />
                    </td>

                    <td>
                        <l-chip
                            v-if="item.isenable == false"
                            clickable
                            icon="edit"
                            color="primary"
                            text-color="white"
                            @click="item.isenable = true"
                        />
                        <l-chip
                            v-if="item.isenable == true"
                            clickable
                            icon="save"
                            color="teal"
                            text-color="white"
                            @click="btnSave(item, index)"
                        />
                        <l-chip
                            v-if="item.isenable == true"
                            clickable
                            icon="delete"
                            color="red"
                            text-color="white"
                            @click="btnDelete(item, index)"
                        />
                        <l-chip
                            v-if="item.isenable == true"
                            clickable
                            icon="cancel"
                            color="grey"
                            text-color="white"
                            @click="item.isenable = false"
                        />
                    </td>
                </tr>
            </tbody>
        </q-markup-table>
        <l-chip
            dense
            justify="right"
            icon="add"
            clickable
            rounded
            glossy
            color="secondary"
            text-color="white"
            @click="pushNewItem()"
        />
    </l-div>
</template>

<script>
export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],

    data() {
        return {
            dv: {
                lisDialog: "bast05d01",
                modi: 2,
                selectedRow: "",
                lisCurrencyList: [],

                lisUnit1: "",
                lisUnit2: "",
                lisUnitOpts: [],
                sc: {
                    company: "01",
                    curdate1: this.lis.firstDayOfMonth(),
                    curdate2: this.lis.lastDayOfMonth(),
                },
            },
        };
    },

    methods: {
        async fetchTcmbCur() {
            //----- Controls Before Fetch ---------

            if ((this.dv.sc.company == null) | (this.dv.sc.company == "")) {
                this.$q.notify({
                    type: "warning",

                    message: this.$gl(
                        `Lütfen Firma Seçiniz!`,
                        `Please Select Company!`
                    ),
                    caption: this.$gl(
                        `İşlem Başlatılamadı!`,
                        `Failed to Start Operation!`
                    ),
                    actions: [{ label: "X", color: "white", dense: true }],
                });
                return;
            }
            await this.lis.function("BAST05/fetchTcmbCur", this.dv);
        },
        async pushNewItem() {
            this.dv.lisCurrencyList.push({
                _id: undefined,
                company: this.dv.sc.company,
                curdate: new Date(),
                exchrate: 1,
                currency: "",
                exchratepur: 1,
                exchratesal: 1,
                effexchratepur: 1,
                effexchratesal: 1,
                tocurrency: "TRY",
                isenable: true,
            });
        },
        async btnSearch() {
            this.dv = await this.lis.function("BAST05/01-btnSearch", this.dv);
        },
        async btnEdit(prop) {
            this.dv = await this.lis.function("BAST05/01-btnEdit", prop);
        },
        async btnDelete(item, index) {
            item = await this.lis.function("BAST05/01-btnDelete", {
                item,
                index,
            });
            item.isenable = false;
            this.dv.lisCurrencyList.splice(index, 1);
        },
        async btnSave(item, index) {
            //----- Controls Before Save ---------
            if ((item.company == null) | (item.company == "")) {
                this.$q.notify({
                    type: "warning",

                    message: this.$gl(
                        `Lütfen Firma Seçiniz!`,
                        `Please Select Company!`
                    ),
                    caption: this.$gl(
                        `İşlem Başlatılamadı!`,
                        `Failed to Start Operation!`
                    ),
                    actions: [{ label: "X", color: "white", dense: true }],
                });
                return;
            }
            if ((item.currency == null) | (item.currency == "")) {
                this.$q.notify({
                    type: "warning",

                    message: this.$gl(
                        `Lütfen Kaynak Kur Seçiniz!`,
                        `Please Select Source Rate!`
                    ),
                    caption: this.$gl(
                        `İşlem Başlatılamadı!`,
                        `Failed to Start Operation!`
                    ),
                    actions: [{ label: "X", color: "white", dense: true }],
                });
                return;
            }
            if ((item.tocurrency == null) | (item.tocurrency == "")) {
                this.$q.notify({
                    type: "warning",

                    message: this.$gl(
                        `Lütfen Hedef Kur Seçiniz!`,
                        `Please Select Destination Rate!`
                    ),
                    caption: this.$gl(
                        `İşlem Başlatılamadı!`,
                        `Failed to Start Operation!`
                    ),
                    actions: [{ label: "X", color: "white", dense: true }],
                });
                return;
            }
            if ((item.curdate == null) | (item.curdate == "")) {
                this.$q.notify({
                    type: "warning",

                    message: this.$gl(
                        `Lütfen Tarih Seçiniz!`,
                        `Please Select Date!`
                    ),
                    caption: this.$gl(
                        `İşlem Başlatılamadı!`,
                        `Failed to Start Operation!`
                    ),
                    actions: [{ label: "X", color: "white", dense: true }],
                });
                return;
            }

            //----- Save the Currency ---------
            item = await this.lis.function("BAST05/01-btnSave", { item, index })
                .item;
            this.dv.lisCurrencyList[index].isenable = false;
        },
    },

    mounted() {},
};
</script>
