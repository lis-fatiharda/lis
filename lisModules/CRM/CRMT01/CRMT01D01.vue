<template>
    <div id="temp2">
        <l-div v-if="dv.lisDialog == 'crmt01d01'">
            <!--Tittle Layer-->
            <l-card0>
                <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                    <l-toolbar class="q-gutter-xs">
                        <l-icon
                            size="md"
                            name="list_alt"
                            @click="getMyLocation()"
                        >
                            <l-tooltip>{{
                                this.$gl(`Konum İşaretle`, `Mark Location`)
                            }}</l-tooltip>
                        </l-icon>
                        <l-toolbar-title>{{
                            this.$gl(`Aktivite Yönetimi`, `Activity Management`)
                        }}</l-toolbar-title>

                        <l-btn
                            color="negative"
                            flat
                            round
                            dense
                            icon="cancel"
                            @click="this.$btnGoHome(tabInfo)"
                        />
                    </l-toolbar>
                </l-toolbar>
                <!--Searching Criterias Layer------>
                <div class="row q-pa-xs q-gutter-xs">
                    <l-select
                        :label="this.$gl(`Firma`, `Company`)"
                        v-model="dv.sc.company"
                        options="lisbas001"
                        optValue="company"
                        optTitle="stext"
                        optCaptions="company"
                        width="120px"
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
                        :label="this.$gl(`Aktivite Tipi`, `Activity Type`)"
                        v-model="dv.sc.acttype"
                        options="liscrm001"
                        optValue="acttype"
                        optTitle="acttext"
                        optCaptions="acttype"
                        width="140px"
                    />

                    <l-input
                        dense
                        v-model="dv.sc.actnum"
                        :label="this.$gl(`Aktivite No`, `Activity No`)"
                    />

                    <l-input
                        dense
                        v-model="dv.sc.stext"
                        :label="this.$gl(`Aktivite Başlığı`, `Activity Title`)"
                    />
                    <l-select
                        :label="this.$gl(`Proje Kodu`, `Project Code`)"
                        v-model="dv.sc.project"
                        options="liscrm003"
                        optValue="project"
                        optTitle="stext"
                        optCaptions="project"
                        width="140px"
                    />
                    <l-select
                        :label="
                            this.$gl(`Aktivite Sorumlusu`, `Activity Manager`)
                        "
                        v-model="dv.sc.saldept"
                        options="lissal003"
                        optValue="saldept"
                        optTitle="stext"
                        optCaptions="saldept"
                        width="150px"
                        :readonly="!dv.crmAssignAuth"
                    />

                    <!-- Customer Informations -->

                    <l-input
                        :label="this.$gl(`Müşteri Kodu`, `Customer Code`)"
                        dense
                        v-model="dv.sc.customer"
                    >
                        <l-chip
                            class="bg-white"
                            icon="search"
                            dense
                            clickable
                            @click="isSelectCust = !isSelectCust"
                        >
                            <BAST02D01mini
                                :pComp="dv.sc.company"
                                :isShow="isSelectCust"
                                @ok="
                                    dv.sc.customer = $event.customer;
                                    isSelectCust = false;
                                "
                                @cancel="isSelectCust = false"
                            />
                        </l-chip>
                    </l-input>

                    <l-input
                        :label="this.$gl(`Cari Adı`, `Current Name`)"
                        v-model="dv.sc.name1"
                        style="width: 300px"
                        dense
                    >
                    </l-input>

                    <l-date
                        v-model="dv.sc.actdate1"
                        ::label="this.$gl(`Aktivite Tarihi <`, `Activity Date <`)"
                        style="width: 140px"
                    />
                    <l-date
                        v-model="dv.sc.actdate2"
                        ::label="this.$gl(`> Aktivite Tarihi`, `> Activity Date`)"
                        style="width: 140px"
                    />

                    <l-date
                        v-model="dv.sc.actiondate1"
                        ::label="this.$gl(`Aksiyon Tarihi <`, `Action Date <`)"
                        style="width: 140px"
                    />
                    <l-date
                        v-model="dv.sc.actiondate2"
                        :label="this.$gl(`> Aksiyon Tarihi`, `> Action Date`)"
                        style="width: 140px"
                    />

                    <l-select
                        :label="this.$gl(`Aktivite Statüsü`, `Activity Status`)"
                        v-model="dv.sc.actStat"
                        :options="[
                            {
                                value: 0,
                                label: this.$gl('Açık', `Open`),
                            },
                            {
                                value: 1,
                                label: this.$gl('Beklemede', 'Pending'),
                            },
                            {
                                value: 2,
                                label: this.$gl('Kapalı', 'Closed'),
                            },
                            {
                                value: 3,
                                label: this.$gl('Tümü', 'All'),
                            },
                        ]"
                        optValue="value"
                        optTitle="label"
                        style="width: 180px"
                    />

                    <l-checkbox
                        :label="this.$gl(`Silindi mi?`, `Is Deleted?`)"
                        v-model="dv.sc._deleted"
                        color="pink"
                    />
                </div>
                <!--------------------------------->
            </l-card0>
            <!--Butons Layer Layer---------------------->

            <l-btn-group>
                <l-btn color="warning" icon="search" @click="btnSearch(dv)" />
                <l-btn color="info" icon="visibility" @click="btnShow(dv)" />
                <l-btn color="primary" icon="edit" @click="btnEdit(dv)" />
                <l-btn color="secondary" icon="add" @click="btnInsert(dv)" />
                <l-btn color="deep-orange" icon="print" @click="btnPrint(dv)" />
            </l-btn-group>
            <q-toggle
                :label="dv.toggle"
                color="pink"
                :true-value="this.$gl(`Ağaç Görünümü`, `Tree View`)"
                :false-value="this.$gl(`Tablo Görünümü`, `Table View`)"
                v-model="dv.toggle"
            />

            <!--Table Layer---------------------------->
            <q-markup-table
                id="table"
                flat
                bordered
                dense
                v-if="dv.toggle == 'Tablo Görünümü'"
                separator="cell"
            >
                <thead>
                    <tr class="bg-blue-grey-2">
                        <th class="text-left" style="width: 15px">Seç</th>
                        <th class="text-left">
                            {{ this.$gl(`Aktivite Tipi`, `Activity Type`) }}
                        </th>
                        <th class="text-left">
                            {{ this.$gl(`Aktivite No`, `Activity No`) }}
                        </th>
                        <th class="text-left">
                            {{ this.$gl(`Aktivite Başlığı`, `Activity Title`) }}
                        </th>
                        <th class="text-left">
                            {{ this.$gl(`Müşteri Kodu`, `Customer Code`) }}
                        </th>
                        <th class="text-left">
                            {{ this.$gl(`Müşteri Adı`, `Customer Name`) }}
                        </th>
                        <th class="text-left">
                            {{
                                this.$gl(
                                    `Son Aksiyon Tarihi`,
                                    `Last Action Date`
                                )
                            }}
                        </th>
                        <th class="text-left">
                            {{
                                this.$gl(
                                    `Son Aksiyon Notu`,
                                    `Final Action Note`
                                )
                            }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in dv.crmDocList"
                        :key="item.id"
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
                        <td class="text-left">{{ item.acttype }}</td>
                        <td class="text-left">{{ item.actnum }}</td>
                        <td class="text-left">{{ item.stext }}</td>
                        <td class="text-left">{{ item.customer }}</td>
                        <td class="text-left">{{ item.name1 }}</td>
                        <td class="text-left">
                            <l-datetime
                                v-model="
                                    item.actions[item.actions.length - 1]
                                        .actdate
                                "
                                :readonly="true"
                            />
                        </td>
                        <td class="text-left">
                            {{ item.actions[item.actions.length - 1].ltext }}
                        </td>
                    </tr>
                </tbody>
                <l-scroller
                    :position="'bottom-right'"
                    :icon="'keyboard_arrow_up'"
                    :color="'brown-3'"
                />
            </q-markup-table>
            <q-list v-if="dv.toggle == 'Ağaç Görünümü'">
                <q-expansion-item
                    v-for="activity in dv.crmDocList"
                    :key="activity.id"
                    icon="support_agent"
                    :label="`${activity.acttype}-${activity.actnum}        ${activity.stext}`"
                    :caption="activity.name1"
                    @click="dv.selectedRow = activity._id"
                    :header-class="
                        dv.selectedRow == activity._id
                            ? 'bg-blue-3 text-white'
                            : 'bg-white'
                    "
                >
                    <template
                        v-for="(item, index) in activity.actions"
                        :key="index"
                    >
                        <l-card class="bg-grey-2">
                            <l-card-section class="row">
                                <l-chip
                                    :label="this.$gl(`Aksiyon -`, `Action -`)"
                                >
                                    {{ index + 1 }}
                                </l-chip>

                                <l-select
                                    :label="
                                        this.$gl(`Aksiyon Tipi`, `Action Type`)
                                    "
                                    v-model="item.type"
                                    options="liscrm002"
                                    optValue="actiontype"
                                    optTitle="actiontext"
                                    optCaptions="actiontype"
                                    width="120px"
                                />

                                <l-input
                                    dense
                                    readonly
                                    v-model="item.stext"
                                    :label="
                                        this.$gl(
                                            `Aksiyon Açıklaması`,
                                            `Action Description`
                                        )
                                    "
                                />
                                <l-input
                                    dense
                                    readonly
                                    autogrow
                                    v-model="item.ltext"
                                    :label="
                                        this.$gl(
                                            `Aksiyon Uzun Açıklaması`,
                                            `Action Long Description`
                                        )
                                    "
                                    style="width: 320px"
                                />

                                <div style="max-width: 300px">
                                    <l-input
                                        filled
                                        dense
                                        readonly
                                        v-model="item.actdate"
                                    >
                                        <template v-slot:prepend>
                                            <l-icon
                                                name="event"
                                                class="cursor-pointer"
                                            >
                                                <q-popup-proxy
                                                    cover
                                                    transition-show="scale"
                                                    transition-hide="scale"
                                                >
                                                    <q-date
                                                        v-model="item.actdate"
                                                        today-btn
                                                        mask="YYYY-MM-DD HH:mm"
                                                    >
                                                        <div
                                                            class="row items-center justify-end"
                                                        >
                                                            <l-btn
                                                                v-close-popup
                                                                :label="
                                                                    this.$gl(
                                                                        `Tamam`,
                                                                        `OK`
                                                                    )
                                                                "
                                                                color="primary"
                                                                flat
                                                            />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </l-icon>
                                        </template>

                                        <template v-slot:append>
                                            <l-icon
                                                name="access_time"
                                                class="cursor-pointer"
                                            >
                                                <q-popup-proxy
                                                    cover
                                                    transition-show="scale"
                                                    transition-hide="scale"
                                                >
                                                    <q-time
                                                        v-model="item.actdate"
                                                        mask="YYYY-MM-DD HH:mm"
                                                        format24h
                                                    >
                                                        <div
                                                            class="row items-center justify-end"
                                                        >
                                                            <l-btn
                                                                v-close-popup
                                                                :label="
                                                                    this.$gl(
                                                                        `Tamam`,
                                                                        `OK`
                                                                    )
                                                                "
                                                                color="primary"
                                                                flat
                                                            />
                                                        </div>
                                                    </q-time>
                                                </q-popup-proxy>
                                            </l-icon>
                                        </template>
                                    </l-input>
                                </div>
                            </l-card-section>
                        </l-card>
                    </template>
                </q-expansion-item>
            </q-list>
        </l-div>
        <crmt01d02
            :dv="dv"
            :tabInfo="tabInfo"
            v-if="dv.lisDialog == 'crmt01d02'"
        />
        <div v-show="false">
            <PDFactivities :dv="dv" />
        </div>
    </div>
</template>

<script>
import crmt01d02 from "./CRMT01D02.vue";
//import PDFactivities from "./PDF-activities.vue";

import Button from "primevue/button";

export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
    components: {
        crmt01d02,
        //PDFactivities,
        Button,
    },

    data() {
        return {
            dv: {
                lisDialog: "crmt01d01",
                modi: 2,
                selectedRow: "",
                sc: {
                    company: "01",

                    acttype: "",

                    actnum: "",
                    actionType: "",

                    actStat: "Tümü",
                    project: "",

                    saldept: "",

                    busarea: "S",

                    customer: "",
                    name1: "",
                    actdate1: this.lis.firstDayOfMonth(),
                    actdate2: this.lis.lastDayOfMonth(),
                    actiondate1: this.lis.firstDayOfMonth(),
                    actiondate2: this.lis.lastDayOfMonth(),
                    _deleted: false,
                    stext: "",
                },

                crmDocList: [],
                liscrmdocs: {},
                crmAssignAuth: false,
                crmofferAuth: false,
                crmmaterialAuth: false,
                crmCrew: "",

                toggle: "Tablo Görünümü",
            },
            isSelectCust: false,
        };
    },

    methods: {
        async getMyLocation() {
            
            await this.lis.function("CRMT01/getMyLocation");
            // await this.$Axios.post("CRMT01/getMyLocation").then((res) => {
            //   console.log(res.data);
            // });
        },
        async btnSearch(prop) {
            this.dv = await this.lis.function("CRMT01/01-btnSearch", prop);
            // await this.$Axios.post("CRMT01/01-btnSearch", prop).then((res) => {
            //   this.dv = res.data;
            // });
        },
        async btnEdit(prop) {
            this.dv = await this.lis.function("CRMT01/01-btnEdit", prop);
            // await this.$Axios
            //   .post("CRMT01/01-btnEdit", prop)
            //   .then((res) => {
            //     this.dv = res.data;
            //   })
            //   .catch((err) => {
            //     this.$q.notify({
            //       type: "negative",
            //       message: err.response.data,
            //       actions: [{ label: "X", color: "white", dense: true }],
            //     });
            //   });
        },
        async btnShow(prop) {
            this.dv = await this.lis.function("CRMT01/01-btnShow", prop);
            // await this.$Axios.post("CRMT01/01-btnShow", prop).then((res) => {
            //   this.dv = res.data;
            // });
        },
        async btnInsert(prop) {
            this.dv = await this.lis.function("CRMT01/01-btnInsert", prop);
            // await this.$Axios.post("CRMT01/01-btnInsert", prop).then((res) => {
            //   this.dv = res.data;
            // });
        },
        async btnPrint(prop) {
            this.dv = await this.lis.function("CRMT01/01-btnPrint", prop);
            // await this.$Axios.post("CRMT01/01-btnPrint", prop).then((res) => {
            //   this.dv = res.data;
            // });
        },
        btnPrint() {
            printPDF("#PDFactivities", "LisERP");
        },
        async init(prop) {
            this.dv = await this.lis.function("CRMT01/01-init", this.dv);
        },
    },

    mounted() {
        this.init(this.dv);
        console.log("mounted worked");
    },
};
</script>
