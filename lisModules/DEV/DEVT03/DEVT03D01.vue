<template>
    <div style="height: 100%">
        <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
            <l-icon size="md" name="list_alt" />

            <l-toolbar-title>{{ this.$gl("Help", "Help") }}</l-toolbar-title>

            <l-btn
                icon="cancel"
                flat
                round
                dense
                color="negative"
                @click="this.$btnGoHome(tabInfo)"
            />
        </l-toolbar>

        <q-splitter v-model="splitterModel" unit="px">
            <template #before>
                <div class="q-pa-md">
                    <l-input ref="filterRef" v-model="filter" label="Ara">
                        <template v-slot:append>
                            <q-icon
                                v-if="filter !== ''"
                                name="clear"
                                class="cursor-pointer"
                                @click="resetFilter"
                            />
                        </template>
                    </l-input>

                    <q-tree
                        :nodes="simple"
                        node-key="label"
                        selected-color="primary"
                        v-model:selected="selected"
                        :filter="filter"
                        dense
                    />
                </div>
            </template>

            <template #after>
                <l-tab-panels
                    v-model="selected"
                    animated
                    transition-prev="jump-up"
                    transition-next="jump-up"
                >
                    <l-tab-panel name="alert">
                        <alert />
                    </l-tab-panel>

                    <l-tab-panel name="function">
                        <lisFunction />
                    </l-tab-panel>

                    <l-tab-panel name="message">
                        <message />
                    </l-tab-panel>
                    <l-tab-panel name="objectAssign">
                        <objectAssign />
                    </l-tab-panel>
                    <l-tab-panel name="objectClear">
                        <objectClear />
                    </l-tab-panel>
                    <l-tab-panel name="objectCopy">
                        <objectCopy />
                    </l-tab-panel>
                    <l-tab-panel name="objectMove">
                        <objectMove />
                    </l-tab-panel>
                    <l-tab-panel name="objectNew">
                        <objectNew />
                    </l-tab-panel>

                    <l-tab-panel name="printPDF">
                        <printPDF />
                    </l-tab-panel>

                    <l-tab-panel name="round">
                        <round />
                    </l-tab-panel>

                    <l-tab-panel name="System variables">
                        <systemVars />
                    </l-tab-panel>

                    <l-tab-panel name="Icons">
                        <icons />
                    </l-tab-panel>

                    <l-tab-panel name="like">
                        <like />
                    </l-tab-panel>



                    <l-tab-panel name="createUUID">
                        <createUUID />
                    </l-tab-panel>

                    <!------------->
                    <l-tab-panel name="addDays">
                        <addDays />
                    </l-tab-panel>
                    <l-tab-panel name="addHours">
                        <addHours />
                    </l-tab-panel>
                    <l-tab-panel name="firstDayOfMonth">
                        <firstDayOfMonth />
                    </l-tab-panel>
                    <l-tab-panel name="firstDayOfYear">
                        <firstDayOfYear />
                    </l-tab-panel>
                    <l-tab-panel name="format">
                        <format />
                    </l-tab-panel>
                    <l-tab-panel name="getDay">
                        <getDay />
                    </l-tab-panel>

                    <l-tab-panel name="getDayOfWeek">
                        <getDayOfWeek />
                    </l-tab-panel>


                    <l-tab-panel name="getDayDiff">
                        <getDayDiff />
                    </l-tab-panel>
                    <l-tab-panel name="getHourDiff">
                        <getHourDiff />
                    </l-tab-panel>
                    <l-tab-panel name="getMiliSecDiff">
                        <getMiliSecDiff />
                    </l-tab-panel>
                    <l-tab-panel name="getMinDiff">
                        <getMinDiff />
                    </l-tab-panel>
                    <l-tab-panel name="getMonth">
                        <getMonth />
                    </l-tab-panel>
                    <l-tab-panel name="getSecDiff">
                        <getSecDiff />
                    </l-tab-panel>
                    <l-tab-panel name="getYear">
                        <getYear />
                    </l-tab-panel>
                    <l-tab-panel name="lastDayOfMonth">
                        <lastDayOfMonth />
                    </l-tab-panel>
                    <l-tab-panel name="lastDayOfYear">
                        <lastDayOfYear />
                    </l-tab-panel>

                    <l-tab-panel name="getWeek">
                        <getWeek />
                    </l-tab-panel>

                    

                </l-tab-panels>
            </template>
        </q-splitter>
    </div>
</template>

<script>
// https://quasarframework.github.io/quasar-ui-qmarkdown/examples
import alert from "./components/basic/alert.vue";
import lisFunction from "./components/basic/lisFunction.vue";
import message from "./components/basic/message.vue";
import objectAssign from "./components/basic/objectAssign.vue";
import objectClear from "./components/basic/objectClear.vue";
import objectCopy from "./components/basic/objectCopy.vue";
import objectMove from "./components/basic/objectMove.vue";
import objectNew from "./components/basic/objectNew.vue";
import printPDF from "./components/basic/printPDF.vue";
import createUUID from "./components/basic/createUUID.vue";

//
import round from "./components/calculation/round.vue";
//
import like from "./components/database/like.vue";

//
import systemVars from "./components/systemVars/systemVars.vue";
//
import icons from "./components/icons/icons.vue";
//
import addDays from "./components/date/addDays.vue";
import addHours from "./components/date/addHours.vue";
import firstDayOfMonth from "./components/date/firstDayOfMonth.vue";
import firstDayOfYear from "./components/date/firstDayOfYear.vue";
import format from "./components/date/format.vue";
import getDay from "./components/date/getDay.vue";
import getDayOfWeek from "./components/date/getDayOfWeek.vue";
import getDayDiff from "./components/date/getDayDiff.vue";
import getHourDiff from "./components/date/getHourDiff.vue";
import getMiliSecDiff from "./components/date/getMiliSecDiff.vue";
import getMinDiff from "./components/date/getMinDiff.vue";
import getMonth from "./components/date/getMonth.vue";
import getSecDiff from "./components/date/getSecDiff.vue";
import getWeek from "./components/date/getWeek.vue";


import getYear from "./components/date/getYear.vue";
import lastDayOfMonth from "./components/date/lastDayOfMonth.vue";
import lastDayOfYear from "./components/date/lastDayOfYear.vue";


export default {
    props: ["tabInfo"],
    
    data() {
        return {
            splitterModel: 300,
            selected: "Food",

            filter: "",
            filterRef: "",

            simple: [
                {
                    label: "Notes",
                    icon: "note",
                    children: [
                        {
                            label: "Lis System Design",
                        },
                        {
                            label: "A Vue Component in Lis",
                        },
                        {
                            label: "Vue Cycle Hooks",
                        },
                        {
                            label: "Querry in Lisdb",
                        },
                    ],
                },
                {
                    label: "Basic",
                    icon: "home",
                    children: [
                        {
                            label: "alert",
                        },
                        {
                            label: "function",
                        },
                        {
                            label: "message",
                        },
                        {
                            label: "objectAssign",
                        },
                        {
                            label: "objectClear",
                        },
                        {
                            label: "objectCopy",
                        },
                        {
                            label: "objectMove",
                        },
                        {
                            label: "objectNew",
                        },
                        {
                            label: "printPDF",
                        },
                        {
                            label: "createUUID",
                        },
                    ],
                },

                {
                    label: "calculation",
                    icon: "calculate",
                    children: [
                        {
                            label: "round",
                        },
                    ],
                },

                {
                    label: "Date",
                    icon: "event",
                    children: [
                        {
                            label: "getYear",
                        },

                        {
                            label: "getMonth",
                        },

                        {
                            label: "getDay",
                        },
                        {
                            label: "getDayOfWeek",
                        },

                        {
                            label: "addDays",
                        },
                        {
                            label: "getDayDiff",
                        },

                        {
                            label: "firstDayOfMonth",
                        },
                        {
                            label: "firstDayOfYear",
                        },
                        {
                            label: "lastDayOfMonth",
                        },
                        {
                            label: "lastDayOfYear",
                        },

                        {
                            label: "addHours",
                        },
                        {
                            label: "getHourDiff",
                        },
                        {
                            label: "getMinDiff",
                        },
                        {
                            label: "getSecDiff",
                        },

                        {
                            label: "getMiliSecDiff",
                        },

                        {
                            label: "format",
                        },
                        {
                            label: "getWeek",
                        },
                    ],
                },

                {
                    label: "Database",
                    icon: "data_object",
                    children: [
                        {
                            label: "like",
                        },
                    ],
                },

                {
                    label: "Tags",
                    icon: "code",
                    children: [
                        {
                            label: "l-input",
                        },
                    ],
                },

                {
                    label: "System variables",
                    icon: "settings_suggest",
                },

                {
                    label: "Icons",
                    icon: "emoji_emotions",
                },
            ],
        };
    },

    methods: {
        resetFilter() {
            this.filter = "";
            this.filterRef.focus();
        },
    },
};
</script>
