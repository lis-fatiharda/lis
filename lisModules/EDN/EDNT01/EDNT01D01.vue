<template>
    <l-div>
        <q-layout view="hHh lpR fFf" container style="height: 850px">
            <q-header reveal :class="`bg-${tabInfo.moduleColor} text-black`">
                <l-toolbar>
                    <l-btn
                        flat
                        @click="drawerLeft = !drawerLeft"
                        round
                        dense
                        icon="chevron_right"
                    />
                    <l-toolbar-title>{{ strHeadText }}</l-toolbar-title>
                    <l-toolbar-title class="row">
                        <l-select
                            :label="this.$gl(`Firma`, `Company`)"
                            v-model="dv.sc.company"
                            options="lisbas001"
                            optValue="company"
                            optTitle="stext"
                            optCaptions="company"
                            width="120px"
                            @select="init()"
                        />
                        <l-input
                            dense
                            readonly
                            v-model="dv.sc.companyStext"
                        ></l-input>
                    </l-toolbar-title>

                    <l-toolbar-title class="row">
                        <l-btn
                            dense
                            icon="recent_actors"
                            outline
                            @click="CheckUserList()"
                            ><l-tooltip> Mükellef Listesi Güncelle</l-tooltip>
                        </l-btn>

                        <l-input
                            label="Sayfa Yenileme Aralığı (dk)"
                            v-model="dv.ic.refreshTime"
                        >
                            <q-btn
                                round
                                dense
                                color="black"
                                flat
                                icon="refresh"
                                @click="startTimer()"
                                ><l-tooltip
                                    >Zamanlayıcı Çalıştır</l-tooltip
                                ></q-btn
                            >
                        </l-input>
                    </l-toolbar-title>

                    <l-btn
                        icon="cancel"
                        flat
                        round
                        dense
                        color="negative"
                        @click="this.$btnGoHome(tabInfo)"
                    />
                </l-toolbar>
            </q-header>

            <q-drawer
                v-model="drawerLeft"
                :width="220"
                :breakpoint="700"
                bordered
                class="bg-grey-2"
            >
                <q-scroll-area class="fit">
                    <div style="max-width: 219px">
                        <q-list class="rounded-borders">
                            <q-expansion-item
                                expand-separator
                                icon="description"
                                :label="this.$gl(`E-Fatura`, `E-Invoice`)"
                                default-opened
                                popup
                                dense
                                :header-class="`bg-grey-4`"
                            >
                                <q-expansion-item
                                    :header-inset-level="1"
                                    expand-separator
                                    icon="receipt"
                                    :label="this.$gl(`Gelen`, `Incoming`)"
                                    default-opened
                                    dense
                                >
                                    <div>
                                        <l-chip
                                            clickable
                                            square
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 101;
                                                this.btnSearch();
                                            "
                                        >
                                            <q-avatar color="teal-2">{{
                                                dv.ic.icon101
                                            }}</q-avatar>
                                            {{
                                                this.$gl("Yeni", "New")
                                            }}</l-chip
                                        >
                                        <l-chip
                                            clickable
                                            square
                                            icon="receipt"
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 102;
                                                this.btnSearch();
                                            "
                                        >
                                            {{
                                                this.$gl("Alınan", "Received")
                                            }}</l-chip
                                        >
                                        <l-chip
                                            clickable
                                            square
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 103;
                                                this.btnSearch();
                                            "
                                        >
                                            <q-avatar color="red-3">{{
                                                dv.ic.icon103
                                            }}</q-avatar>
                                            {{
                                                this.$gl("Hatalı", "Incorrect")
                                            }}</l-chip
                                        >
                                        <l-chip
                                            clickable
                                            square
                                            icon="archive"
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 104;
                                                this.btnSearch();
                                            "
                                        >
                                            {{
                                                this.$gl(
                                                    "Arşivlenen",
                                                    "Archived"
                                                )
                                            }}</l-chip
                                        >
                                    </div>
                                </q-expansion-item>
                                <q-expansion-item
                                    :header-inset-level="1"
                                    expand-separator
                                    icon="outbox"
                                    :label="this.$gl(`Giden`, `Outgoing`)"
                                    default-opened
                                    dense
                                >
                                    <l-div>
                                        <l-chip
                                            clickable
                                            square
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 111;
                                                this.btnSearch();
                                            "
                                        >
                                            <q-avatar color="teal-2">{{
                                                dv.ic.icon111
                                            }}</q-avatar>
                                            {{
                                                this.$gl("Yeni", "New")
                                            }}</l-chip
                                        >
                                        <l-chip
                                            clickable
                                            square
                                            icon="send"
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 112;
                                                this.btnSearch();
                                            "
                                        >
                                            {{
                                                this.$gl("Gönderilen", "Sent")
                                            }}</l-chip
                                        >
                                        <l-chip
                                            clickable
                                            square
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 113;
                                                this.btnSearch();
                                            "
                                        >
                                            <q-avatar color="red-3">{{
                                                dv.ic.icon113
                                            }}</q-avatar>
                                            {{
                                                this.$gl("Hatalı", "Incorrect")
                                            }}</l-chip
                                        >
                                        <l-chip
                                            clickable
                                            square
                                            icon="archive"
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 114;
                                                this.btnSearch();
                                            "
                                        >
                                            {{
                                                this.$gl(
                                                    "Arşivlenen",
                                                    "Archived"
                                                )
                                            }}</l-chip
                                        >
                                    </l-div>
                                </q-expansion-item>
                            </q-expansion-item>

                            <q-expansion-item
                                expand-separator
                                icon="send_and_archive"
                                :label="this.$gl(`E-Arşiv`, `E-Archive`)"
                                default-opened
                                popup
                                dense
                                header-class="bg-grey-4"
                            >
                                <q-expansion-item
                                    :header-inset-level="1"
                                    expand-separator
                                    icon="outbox"
                                    :label="this.$gl(`Giden`, `Outgoing`)"
                                    default-opened
                                    dense
                                >
                                    <l-div>
                                        <l-chip
                                            clickable
                                            square
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 211;
                                                this.btnSearch();
                                            "
                                        >
                                            <q-avatar color="teal-3">{{
                                                dv.ic.icon201
                                            }}</q-avatar>
                                            {{
                                                this.$gl("Yeni", "New")
                                            }}</l-chip
                                        >
                                        <l-chip
                                            clickable
                                            square
                                            icon="send"
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 212;
                                                this.btnSearch();
                                            "
                                        >
                                            {{
                                                this.$gl("Gönderilen", "Sent")
                                            }}</l-chip
                                        >
                                        <l-chip
                                            clickable
                                            square
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 213;
                                                this.btnSearch();
                                            "
                                        >
                                            <q-avatar color="red-3">{{
                                                dv.ic.icon203
                                            }}</q-avatar>
                                            {{
                                                this.$gl("Hatalı", "Incorrect")
                                            }}</l-chip
                                        >
                                        <l-chip
                                            clickable
                                            square
                                            icon="archive"
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 214;
                                                this.btnSearch();
                                            "
                                        >
                                            {{
                                                this.$gl(
                                                    "Arşivlenen",
                                                    "Archived"
                                                )
                                            }}</l-chip
                                        >
                                    </l-div>
                                </q-expansion-item>
                            </q-expansion-item>

                            <q-expansion-item
                                expand-separator
                                icon="local_shipping"
                                :label="this.$gl(`E-İrsaliye`, `E-Delivery`)"
                                default-opened
                                popup
                                dense
                                header-class="bg-grey-4"
                            >
                                <q-expansion-item
                                    :header-inset-level="1"
                                    expand-separator
                                    icon="receipt"
                                    :label="this.$gl(`Gelen`, `Incoming`)"
                                    default-opened
                                    dense
                                >
                                    <l-div>
                                        <l-chip
                                            clickable
                                            square
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 301;
                                                this.btnSearch();
                                            "
                                        >
                                            <q-avatar color="teal-3">{{
                                                dv.ic.icon301
                                            }}</q-avatar>
                                            {{
                                                this.$gl("Yeni", "New")
                                            }}</l-chip
                                        >
                                        <l-chip
                                            clickable
                                            square
                                            icon="receipt"
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 302;
                                                this.btnSearch();
                                            "
                                        >
                                            {{
                                                this.$gl("Alınan", "Received")
                                            }}</l-chip
                                        >
                                        <l-chip
                                            clickable
                                            square
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 303;
                                                this.btnSearch();
                                            "
                                        >
                                            <q-avatar color="red-3">{{
                                                dv.ic.icon303
                                            }}</q-avatar>
                                            {{
                                                this.$gl("Hatalı", "Incorrect")
                                            }}</l-chip
                                        >
                                        <l-chip
                                            clickable
                                            square
                                            icon="archive"
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 304;
                                                this.btnSearch();
                                            "
                                        >
                                            {{
                                                this.$gl(
                                                    "Arşivlenen",
                                                    "Archived"
                                                )
                                            }}</l-chip
                                        >
                                    </l-div>
                                </q-expansion-item>
                                <q-expansion-item
                                    :header-inset-level="1"
                                    expand-separator
                                    icon="outbox"
                                    :label="this.$gl(`Giden`, `Outgoing`)"
                                    default-opened
                                    dense
                                >
                                    <l-div>
                                        <l-chip
                                            clickable
                                            square
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 311;
                                                this.btnSearch();
                                            "
                                        >
                                            <q-avatar color="teal-3">{{
                                                dv.ic.icon311
                                            }}</q-avatar>
                                            {{
                                                this.$gl("Yeni", "New")
                                            }}</l-chip
                                        >
                                        <l-chip
                                            clickable
                                            square
                                            icon="send"
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 312;
                                                this.btnSearch();
                                            "
                                        >
                                            {{
                                                this.$gl("Gönderilen", "Sent")
                                            }}</l-chip
                                        >
                                        <l-chip
                                            clickable
                                            square
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 313;
                                                this.btnSearch();
                                            "
                                        >
                                            <q-avatar color="red-3">{{
                                                dv.ic.icon313
                                            }}</q-avatar>
                                            {{
                                                this.$gl("Hatalı", "Incorrect")
                                            }}</l-chip
                                        >
                                        <l-chip
                                            clickable
                                            square
                                            icon="archive"
                                            size="12px"
                                            @click="
                                                dv.hProcessInt = 314;
                                                this.btnSearch();
                                            "
                                        >
                                            {{
                                                this.$gl(
                                                    "Arşivlenen",
                                                    "Archived"
                                                )
                                            }}</l-chip
                                        >
                                    </l-div>
                                </q-expansion-item>
                            </q-expansion-item>
                        </q-list>
                    </div>
                </q-scroll-area>
            </q-drawer>

            <q-page-container>
                <q-page>
                    <l-div>
                        <l-card-flex>
                            <l-input
                                v-model="dv.sc.doctype"
                                :label="this.$gl(`Belge Tipi`, `Document Type`)"
                                dense
                            >
                            </l-input>

                            <l-input
                                dense
                                v-model="dv.sc.docnum"
                                :label="this.$gl(`Belge No`, `Document No`)"
                            />

                            <l-input
                                dense
                                v-model="dv.sc.einvonumber"
                                :label="this.$gl(`E-Fatura No`, `E-Invoice No`)"
                            />

                            <l-date
                                v-model="dv.sc.docDate1"
                                :label="
                                    this.$gl(
                                        `Belge Tarih Aralığı Başl.`,
                                        `Document Date Range Start`
                                    )
                                "
                                style="width: 180px"
                            />
                            <l-date
                                v-model="dv.sc.docDate2"
                                :label="
                                    this.$gl(
                                        `Belge Tarih Aralığı Bitş.`,
                                        `Document Date Range End.`
                                    )
                                "
                                style="width: 180px"
                            />
                            <l-date
                                v-model="dv.sc.edocDate1"
                                :label="
                                    this.$gl(
                                        `Edn Tarih Aralığı Başl.`,
                                        `Edn Date Range Start`
                                    )
                                "
                                style="width: 180px"
                            />
                            <l-date
                                v-model="dv.sc.edocDate2"
                                :label="
                                    this.$gl(
                                        `Edn Tarih Aralığı Bitş.`,
                                        `Edn Date Range Ending.`
                                    )
                                "
                                style="width: 180px"
                            />

                            <l-input
                                :label="
                                    this.$gl(`Müşteri Kodu`, `Customer Code`)
                                "
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
                                :label="
                                    this.$gl(`Müşteri Adı`, `Customer Name`)
                                "
                                v-model="dv.sc.name1"
                                style="width: 300px"
                                dense
                            >
                            </l-input>
                        </l-card-flex>
                        <l-div0-flex class="q-gutter-xs">
                            <l-btn
                                color="warning"
                                icon="search"
                                @click="btnSearch()"
                            />
                            <l-btn
                                color="info"
                                icon="visibility"
                                @click="isShowDetail = true"
                            />
                            <l-btn
                                color="negative"
                                icon="delete"
                                @click="btnDelete(dv)"
                            />
                            <l-btn
                                color="deep-orange"
                                icon="print"
                                @click="btnPrint(dv)"
                            />

                            <l-space />
                            <l-btn
                                v-if="
                                    (dv.hProcessInt
                                        .toString()
                                        .substring(1, 2) ==
                                        '1') &
                                    ((dv.hProcessInt
                                        .toString()
                                        .substring(2, 3) ==
                                        '1') |
                                        (dv.hProcessInt
                                            .toString()
                                            .substring(2, 3) ==
                                            '3'))
                                        ? true
                                        : false
                                "
                                :label="this.$gl(`Gönder`, `Send`)"
                                @click="btnSend(dv)"
                                outline
                            />
                            <l-btn
                                v-if="
                                    (dv.hProcessInt
                                        .toString()
                                        .substring(1, 2) ==
                                        '1') &
                                    ((dv.hProcessInt
                                        .toString()
                                        .substring(2, 3) ==
                                        '1') |
                                        (dv.hProcessInt
                                            .toString()
                                            .substring(2, 3) ==
                                            '3'))
                                        ? true
                                        : false
                                "
                                :label="this.$gl(`P.K.Değiştir`, `pk?`)"
                                @click="btnChangePk()"
                                outline
                            />
                            <l-btn
                                v-if="
                                    (dv.hProcessInt
                                        .toString()
                                        .substring(0, 1) ==
                                        '1') &
                                    (dv.hProcessInt
                                        .toString()
                                        .substring(1, 2) ==
                                        '1') &
                                    ((dv.hProcessInt
                                        .toString()
                                        .substring(2, 3) ==
                                        '2') |
                                        (dv.hProcessInt
                                            .toString()
                                            .substring(2, 3) ==
                                            '3'))
                                        ? true
                                        : false
                                "
                                :label="
                                    this.$gl(`Statü Kontrol`, `Status Check`)
                                "
                                @click="btnStatusControl()"
                                outline
                            />

                            <!-- -->
                            <l-btn
                                v-if="
                                    dv.hProcessInt.toString().substring(1, 2) ==
                                    '0'
                                "
                                :label="
                                    this.$gl(
                                        `Gelen Faturaları Çek`,
                                        `Receive Incoming Invoice`
                                    )
                                "
                                @click="getInvoice()"
                                outline
                            />

                            <l-btn
                                v-if="
                                    dv.hProcessInt.toString().substring(1, 2) ==
                                    '0'
                                        ? true
                                        : false
                                "
                                :label="this.$gl(`İçeri Al`, `Import`)"
                                @click="btnSend()"
                                outline
                            />

                            <l-btn
                                v-if="
                                    dv.hProcessInt.toString().substring(2, 3) ==
                                    '2'
                                        ? true
                                        : false
                                "
                                label="Arşive Gönder"
                                @click="btnSetArchived()"
                                outline
                            />
                            <l-space />
                        </l-div0-flex>

                        <l-table
                            v-if="
                                dv.hProcessInt.toString().substring(1, 2) == '1'
                            "
                            name="EDNT01D01"
                            v-model="dv.lisedndocsList"
                            :columns="custColumns"
                            :readonly="true"
                        />
                        <l-table
                            v-if="
                                dv.hProcessInt.toString().substring(1, 2) == '0'
                            "
                            name="EDNT01D01"
                            v-model="dv.lisedndocsList"
                            :columns="vendColumns"
                            :context="contextMenu"
                            :readonly="true"
                        />
                    </l-div>
                </q-page>

                <l-dialog v-model="isShowDetail" persistent>
                    <EDNT01D02
                        :dv="dv"
                        :tabInfo="tabInfo"
                        @cancel="isShowDetail = false"
                    />
                </l-dialog>

                <l-dialog
                    v-model="isNewCustomer"
                    persistent
                    style="height: 80%"
                >
                    <BAST02D02
                        :dv="dv"
                        :tabInfo="tabInfo"
                        :lv="lv"
                        :isChild="true"
                        @cancel="isNewCustomer = false"
                    />
                </l-dialog>
            </q-page-container>
        </q-layout>
    </l-div>

    <l-dialog-small v-model="isShowPkSelect" persistent>
        <l-card>
            <q-markup-table
                flat
                bordered
                dense
                class="cursor-pointer"
                separator="cell"
            >
                <thead>
                    <tr class="bg-blue-grey-2">
                        <th class="text-left">P.K.</th><l-btn
                        icon="cancel"
                        flat
                        round
                        dense
                        color="negative"
                        @click="isShowPkSelect = false"
                    />
                    </tr>
                    
                </thead>
                <tbody>
                    <tr v-for="pk in pkList" :key="pk" @click="selectPk(pk)">
                        <td class="text-left">{{ pk }}</td>
                    </tr>
                </tbody>
            </q-markup-table>
        </l-card>
    </l-dialog-small>
</template>

<script>
import EDNT01D02 from "./EDNT01D02.vue";
import BAST02D02 from "../../BAS/BAST02/BAST02D02.vue";
export default {
    props: ["lv", "tabInfo"],
    components: {
        EDNT01D02,
    },

    data() {
        return {
            contextMenu: [
                {
                    name: "Kabul Et",
                    callback: () => {
                        this.lis.function("EDNT01/01-acceptInv", this.dv);
                    },
                },
                {
                    name: "Reddet",
                    callback: () => {
                        this.lis.function("EDNT01/01-rejectInv", this.dv);
                    },
                },

                {
                    name: "separator",
                },

                {
                    name: "Cari Ata",
                    callback: this.assignVendor,
                },
            ],
            custColumns: [
                {
                    label: this.$gl("Belge Tipi", "Document Type"),
                    value: "doctype",
                    type: "string",
                },
                {
                    label: this.$gl("Belge No", "Document No"),
                    value: "docnum",
                    type: "string",
                },
                {
                    label: this.$gl("E-Belge Tipi", "E-Document Type"),
                    value: "einvotype",
                    type: "select",
                    options: [
                        {
                            label: this.$gl(`Temel`, `Basic`),
                            value: 0,
                        },
                        {
                            label: this.$gl(`Ticari`, `Commercial`),
                            value: 1,
                        },
                    ],
                },
                {
                    label: this.$gl("E-Belge No", "E-Document Number"),
                    value: "einvonumber",
                    type: "string",
                },
                {
                    label: this.$gl("Müşteri Kodu", "Customer Code"),
                    value: "customer",
                    type: "string",
                },
                {
                    label: this.$gl("Müşteri Adı", "Customer Name"),
                    value: "name1",
                    type: "string",
                },
                {
                    label: this.$gl("Belge Toplamı", "Document Total"),
                    value: "grandtotal",
                    type: "number",
                },
                {
                    label: this.$gl("P.Br.", "Currency"),
                    value: "currency",
                    type: "string",
                },
                {
                    label: this.$gl("P.Kutusu", "P.Box"),
                    value: "alias",
                    type: "string",
                },
                {
                    label: this.$gl("UUID", "UUID"),
                    value: "einvouuid",
                    type: "string",
                },
                {
                    label: this.$gl("K.Gönderilme Tarihi", "Queued Date"),
                    value: "edocdate",
                    type: "date",
                },
                {
                    label: this.$gl("K.Gönderen", "Queued Sender"),
                    value: "createdby",
                    type: "string",
                },
                {
                    label: this.$gl("İşlem Tarihi", "Transaction date"),
                    value: "docdate",
                    type: "date",
                },
                {
                    label: this.$gl("İşlem Yapan", "Transacter"),
                    value: "processedby",
                    type: "string",
                },
                {
                    label: this.$gl("Statü Kodu", "Status Code"),
                    value: "processstat",
                    type: "string",
                },
                {
                    label: this.$gl("Statü Açıklaması", "Status Text"),
                    value: "processstatstr",
                    type: "string",
                },
            ],
            vendColumns: [
                {
                    label: this.$gl("Belge Tipi", "Document Type"),
                    value: "doctype",
                    type: "string",
                },
                {
                    label: this.$gl("Belge No", "Document No"),
                    value: "docnum",
                    type: "string",
                },
                {
                    label: this.$gl("E-Belge Tipi", "E-Document Type"),
                    value: "einvotype",
                    type: "select",
                    options: [
                        {
                            label: this.$gl(`Temel`, `Basic`),
                            value: 0,
                        },
                        {
                            label: this.$gl(`Ticari`, `Commercial`),
                            value: 1,
                        },
                    ],
                },

                {
                    label: this.$gl("E-Belge No", "E-Document Number"),
                    value: "einvonumber",
                    type: "string",
                },
                {
                    label: this.$gl("Tedarikçi Kodu", "Customer Code"),
                    value: "customer",
                    type: "string",
                },
                {
                    label: this.$gl("Tedarikçi Adı", "Customer Name"),
                    value: "name1",
                    type: "string",
                },

                {
                    label: this.$gl("Vergi No", "Tax Number"),
                    value: "taxnum",
                    type: "string",
                },
                {
                    label: this.$gl("Belge Toplamı", "Document Total"),
                    value: "grandtotal",
                    type: "number",
                },
                {
                    label: this.$gl("P.Br.", "Currency"),
                    value: "currency",
                    type: "string",
                },
                {
                    label: this.$gl("P.Kutusu", "P.Box"),
                    value: "alias",
                    type: "string",
                },
                {
                    label: this.$gl("UUID", "UUID"),
                    value: "einvouuid",
                    type: "string",
                },
                {
                    label: this.$gl("K.Gönderilme Tarihi", "Queued Date"),
                    value: "edocdate",
                    type: "date",
                },
                {
                    label: this.$gl("K.Gönderen", "Queued Sender"),
                    value: "createdby",
                    type: "string",
                },
                {
                    label: this.$gl("İşlem Tarihi", "Transaction date"),
                    value: "docdate",
                    type: "date",
                },
                {
                    label: this.$gl("İşlem Yapan", "Transacter"),
                    value: "processedby",
                    type: "string",
                },
                {
                    label: this.$gl("Statü Kodu", "Status Code"),
                    value: "processstat",
                    type: "string",
                },
                {
                    label: this.$gl("Statü Açıklaması", "Status Text"),
                    value: "processstatstr",
                    type: "string",
                },

                {
                    label: "Yanılandı",
                    value: "isresponded",
                    type: "checkbox",
                },
            ],
            dv: {
                modi: 0,
                sc: {
                    company: "01",
                    companyStext: "",
                    doctype: "",
                    docnum: "",
                    einvonumber: "",
                    docDate1: this.lis.firstDayOfMonth(),
                    docDate2: new Date("2030-01-01"),
                    edocDate1: this.lis.firstDayOfMonth(),
                    edocDate2: new Date("2030-01-01"),
                    customer: "",
                    name1: "",
                    edoctype: 3,
                    postway: 1,
                },
                ic: {
                    interval: undefined,
                    refreshTime: 15,
                    icon101: 0,
                    icon103: 0,
                    icon111: 0,
                    icon113: 0,
                    icon201: 0,
                    icon203: 0,
                    icon301: 0,
                    icon303: 0,
                    icon311: 0,
                    icon313: 0,
                },

                lisedndocsList: [],
                hProcessInt: 111,
                selectedRow: "",
                liscustomers: {},
            },

            isShowDetail: false,
            isNewCustomer: false,
            hProcessText: "",
            drawerLeft: true,
            isSelectCust: false,
            isShowPkSelect: false,
            pkList: [],
        };
    },
    computed: {
        strHeadText() {
            switch (this.dv.hProcessInt) {
                case 101:
                    return "E-Fatura - Gelen / Yeni";
                case 102:
                    return "E-Fatura - Gelen / Alınan";
                case 103:
                    return "E-Fatura - Gelen / Hata";
                case 104:
                    return "E-Fatura - Gelen / Arşiv";

                case 111:
                    return "E-Fatura - Giden / Yeni";

                case 112:
                    return "E-Fatura - Giden / Gönderilen";

                case 113:
                    return "E-Fatura - Giden / Hata";

                case 114:
                    return "E-Fatura - Giden / Arşiv";
                //--
                case 211:
                    return "E-Arşiv - Giden / Yeni";

                case 212:
                    return "E-Arşiv - Giden / Gönderilen";

                case 213:
                    return "E-Arşiv - Giden / Hata";

                case 214:
                    return "E-Arşiv - Giden / Arşiv";
                //--
                case 301:
                    return "E-İrsaliye - Gelen / Yeni";

                case 302:
                    return "E-İrsaliye - Gelen / Alınan";

                case 303:
                    return "E-İrsaliye - Gelen / Hata";

                case 304:
                    return "E-İrsaliye - Gelen / Arşiv";

                case 311:
                    return "E-İrsaliye - Giden / Yeni";

                case 312:
                    return "E-İrsaliye - Giden / Gönderilen";

                case 313:
                    return "E-İrsaliye - Giden / Hata";

                case 314:
                    return "E-İrsaliye - Giden / Arşiv";
            }
        },
    },
    methods: {
        async btnChangePk() {
            let selectedRow = this.dv.lisedndocsList.findIndex(
                (e) => e._selected == true
            );
            if (selectedRow < 0) {
                this.lis.alert("w", "Lütfen Bir Satır Seçiniz!");
                return;
            }
            console.log("selectedRow", selectedRow)
            this.pkList = await this.lis.function(
                "EDNT01/btnChangePk",
                this.dv
            );
            this.isShowPkSelect = true;
        },
        async selectPk(pk) {
            let selectedRow = this.dv.lisedndocsList.findIndex(
                (e) => e._selected == true
            );
            await this.lis.function("EDNT01/setPk", {
                _id: this.dv.lisedndocsList[selectedRow]._id,
                pk,
            });
            this.dv.lisedndocsList[selectedRow].alias = pk;
            this.isShowPkSelect = false;
        },
        async btnSetArchived() {
            await this.lis.function("EDNT01/01-btnSetArchived", this.dv);
            this.btnSearch();
        },
        async assignVendor() {
            let isExists = await this.lis.function(
                "EDNT01/assignVendor",
                this.dv
            );

            if (isExists != true) {
                let myReturn = await this.lis.message(
                    "C",
                    "Yeni Cari Kart Açılsın mı?",
                    `${isExists.taxnum} Vergi No İle Eşleşen Bir Cari Kart Bulunamadı!`
                );
                if (myReturn == true) {
                    let reportListSelected = this.dv.lisedndocsList.filter(
                        (e) =>
                            (e._selected == true) &
                            (e.taxnum == isExists.taxnum)
                    );
                    this.dv.liscustomers = await this.lis.function(
                        "EDNT01/createVendor",
                        reportListSelected[0]
                    );
                    this.isNewCustomer = true;
                }
            }
        },
        async getInvoice() {
            this.dv = await this.lis.function("EDNT01/01-getInvoice", this.dv);
        },
        async btnStatusControl() {
            await this.lis.function("EDNT01/01-btnStatusControl", this.dv);
            this.lis.alert("p", "Belge Statüleri Güncellendi.");
            this.btnSearch();
        },
        async btnSend() {
            await this.lis.function("EDNT01/01-btnSend", this.dv);
            this.lis.alert("p", "Seçili Belgeler Gönderildi.");
            this.btnSearch();
        },
        async CheckUserList() {
            this.lis.function("EDNT01/01-checkUserList");
        },

        async btnSearch() {
            this.dv = await this.lis.function("EDNT01/01-btnSearch", this.dv);
        },

        async btnDelete() {
            await this.lis.function("EDNT01/01-btnDelete", this.dv);
            this.lis.alert("p", "Belge Kuyruktan Silindi.");
            this.btnSearch();
        },
        async btnPrint() {
            const item = this.dv.lisedndocsList.filter((e) => {
                return e._selected == true;
            });

            function b64_to_utf8(str) {
                return decodeURIComponent(escape(window.atob(str)));
            }
            //----------------------

            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(item[0].edistr, "text/xml");
            var xsltEncoded = xmlDoc.getElementsByTagName(
                "cbc:EmbeddedDocumentBinaryObject"
            )[0].childNodes[0].nodeValue;

            const xsltDecoded = b64_to_utf8(xsltEncoded);

            console.log("xsltDecoded", xsltDecoded);

            //----------------------
            let ediStr =
                "<?xml-stylesheet type='text/xsl' href='" +
                item[0].doctype +
                "_" +
                item[0].docnum +
                ".xslt'?>" +
                item[0].edistr;

            const url = window.URL.createObjectURL(new Blob([ediStr]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                item[0].doctype + "_" + item[0].docnum + ".xml"
            ); //or any other extension
            document.body.appendChild(link);
            link.click();
            //---

            const urlxslt = window.URL.createObjectURL(new Blob([xsltDecoded]));
            const linkxslt = document.createElement("a");
            linkxslt.href = urlxslt;
            linkxslt.setAttribute(
                "download",
                item[0].doctype + "_" + item[0].docnum + ".xslt"
            ); //or any other extension
            document.body.appendChild(linkxslt);
            linkxslt.click();
        },

        startTimer() {
            if (this.dv.ic.refreshTime != 0) {
                clearInterval(this.dv.ic.interval);
                this.init();
                this.dv.ic.interval = setInterval(
                    this.init,
                    this.dv.ic.refreshTime * 60000
                );
            }
        },
        async init() {
            if (this.dv.ic.refreshTime == 0) {
                clearInterval(this.dv.ic.interval);
                return;
            }
            this.dv = await this.lis.function("EDNT01/01-init", this.dv);
            console.log(new Date());
        },
    },

    async mounted() {
        this.init();
    },
    beforeUnmount() {
        clearInterval(this.dv.ic.interval);
    },
};
</script>
