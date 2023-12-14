<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="account_balance" />

                <l-toolbar-title
                    >Vadeli Kağıtlar Çek,Senet,Akreditif Mektup</l-toolbar-title
                >

                <l-btn
                    icon="cancel"
                    flat
                    round
                    color="negative"
                    @click="this.$btnGoHome(tabInfo)"
                />
            </l-toolbar>

            <l-tabs v-model="tab">
                <l-tab name="Sorgula" :label="this.$gl(`Sorgula`, `Search`)" />
                <l-tab
                    name="Sorgula +"
                    :label="this.$gl(`Sorgula +`, `Search +`)"
                />
                <l-tab
                    name="Opsiyonlar"
                    :label="this.$gl(`Opsiyonlar`, `Options`)"
                />
            </l-tabs>

            <l-tab-panels v-model="tab" animated>
                <l-tab-panel name="Sorgula" class="q-pa-xs q-gutter-xs">
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
                            :label="this.$gl(`İ.A.`, `Business Area`)"
                            v-model="dv.sc.busarea"
                            options="lisbas003"
                            optValue="busarea"
                            optTitle="stext"
                            optCaptions="busarea"
                            width="120px"
                        />
                        <l-input
                            label="Harici Belge No"
                            v-model="dv.sc.extdocnum"
                        ></l-input>


                        <l-select
                            label="Kağıt Tipi"
                            map-options
                            v-model="dv.sc.futpapertype"
                            :options="[
                                { label: 'Çek', value: 1 },
                                { label: 'Senet', value: 2 },
                                {
                                    label: 'Akr.Mektup',
                                    value: 3,
                                },
                            ]"
                            optValue="value"
                            optTitle="label"
                            style="width: 180px"
                        />

                        <l-date
                            :label="
                                this.$gl(`Yevm.Tar.Başl.`, `Post. Date Str.`)
                            "
                            v-model="dv.sc.datefrom"
                            style="width: 150px"
                        />
                        <l-date
                            :label="
                                this.$gl(`Yevm.Tar.Bitiş`, `Post. Date End`)
                            "
                            v-model="dv.sc.dateuntil"
                            style="width: 150px"
                        />

                        <l-date
                            :label="
                                this.$gl(`Vade Tar.Başl.`, `Post. Date Str.`)
                            "
                            v-model="dv.sc.duedatefrom"
                            style="width: 150px"
                        />
                        <l-date
                            :label="
                                this.$gl(`Vade Tar.Bitiş`, `Post. Date End`)
                            "
                            v-model="dv.sc.duedateuntil"
                            style="width: 150px"
                        />

                        <l-input
                            label="Min.Tutar"
                            v-model="dv.sc.mintutar"
                        />
                        <l-input
                            label="Max.Tutar"
                            v-model="dv.sc.mintutar"
                        />
                    </l-div-flex>
                    <l-separator />

                    <l-div-flex>
                        <l-card>
                            <l-checkbox
                                label="Portföyde"
                                v-model="dv.sc.inportfoy1"
                            />
                            <l-checkbox
                                label="Portföyde(Prot.)"
                                v-model="dv.sc.inportfoy2"
                            />
                            <l-checkbox
                                label="Portföyde(Teminat)"
                                v-model="dv.sc.inportfoy3"
                            />
                        </l-card>

                        <l-card>
                          <l-checkbox label="Ödenmiş" v-model="dv.sc.payed1" />
                        <l-checkbox
                            label="Ödenmiş Kırd."
                            v-model="dv.sc.payed2"
                        />
                        
                        </l-card>

                        <l-card>
                          <l-checkbox label="Bankada" v-model="dv.sc.inbank1" />
                        <l-checkbox
                            label="Bankada Kırd.için"
                            v-model="dv.sc.inbank2"
                        />
                        </l-card>

                        <l-card>
                          <l-checkbox
                            label="Müşt.İade Edilmiş"
                            v-model="dv.sc.return1"
                        />
                        <l-checkbox
                            label="Müşt.İade(Prot)"
                            v-model="dv.sc.return2"
                        />
                        </l-card>
                        <l-card>
                          <l-checkbox
                            label="Ciro Edilmiş"
                            v-model="dv.sc.gross1"
                        />
                        <l-checkbox
                            label="Ciro Edilmiş(Prot)"
                            v-model="dv.sc.gross2"
                        />
                        </l-card>

                        <l-card>
                          <l-checkbox
                            label="Yasal Takipte"
                            v-model="dv.sc.infollowing"
                        />
                        <l-checkbox
                            label="Teminatta"
                            v-model="dv.sc.inguarantee"
                        />
                        </l-card>

                        <l-card>
                          <l-checkbox
                            label="Ver.Çeklerimiz(-)"
                            v-model="dv.sc.cheqsent"
                        />
                        <l-checkbox
                            label="Ver.Çek İadesi"
                            v-model="dv.sc.cheqback"
                        />
                        </l-card>
                        
                    </l-div-flex>
                </l-tab-panel>

                <l-tab-panel name="Sorgula +" class="row q-pa-xs q-gutter-xs">
                </l-tab-panel>

                <l-tab-panel name="Opsiyonlar" class="row q-pa-xs q-gutter-xs">
                </l-tab-panel>
            </l-tab-panels>
        </l-card0>

        <!--Searching Criterias Layer------>

        <!--------------------------------->

        <!--Butons Layer Layer---------------------->

            <l-btn color="primary" icon="search" @click="btnSearch(dv)" />
            <l-btn color="orange" icon="print" @click="btnSearch(dv)" />
        
            

        <l-table
            name="FINT03D01"
            v-model="dv.reportList"
            :columns="columns"
            :context="contextMenu"
            :width="'100%'"
            :readonly="true"
        />

        <FINT01D01mini
            :pComp="dv.sc.company"
            :isShow="zoomMaterialRow == null ? false : true"
            @ok="
                lis.objectMove($event, dv.lissaldocs.items[zoomMaterialRow]);
                dv.lissaldocs.items[zoomMaterialRow].material = $event.material;
                dv.lissaldocs.items[zoomMaterialRow].mtext = $event.stext;
                dv.lissaldocs.items[zoomMaterialRow].itemtype =
                    $event.salitemtype;
                dv.lissaldocs.items[zoomMaterialRow].qunit = $event.salunit;
                dv.lissaldocs.items[zoomMaterialRow].vatrate = $event.salvatkey;
                zoomMaterialRow = null;
                calcPrice();
            "
            @cancel="zoomMaterialRow = null"
        />
    </l-div>
</template>

<script>
export default {
    props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
    components: {},

    data() {
        return {
            tab: "Sorgula",
            dv: {
                sc: {
                    company: "01",
                    acctype: "",
                    extdocnum: "",
                    futpapertype: 1,
                    datefrom: this.lis.firstDayOfYear(),
                    dateuntil: this.lis.lastDayOfMonth(),
                    duedatefrom: this.lis.firstDayOfYear(),
                    duedateuntil: this.lis.lastDayOfMonth(),

                inportfoy1: false,
                inportfoy2: false,
                inportfoy3: false,

                payed1: false,
                payed2: false,

                inbank1: false,
                inbank2: false,

                return1: false,
                return2: false,

                gross1: false,
                gross2: false,

                infollowing: false,
                inguarantee: false,
                cheqsent: false,
                cheqback: false,

                    _deleted: false,
                },

                tbalance: 0,

                reportList: [],
            },
            columns: [
                {
                    label: this.$gl(`Yevmiye Tarihi`, `Post Date.`),
                    value: "postdate",
                    type: "date",
                    _textColor: "red",
                },
                {
                    label: this.$gl(`Vade Tarihi`, `Post Date.`),
                    value: "postdate",
                    type: "date",
                    _textColor: "red",
                },

                {
                    label: this.$gl(`Belge Tipi`, `Document Type`),
                    value: "doctype",
                    type: "string",
                    _textColor: "blue",
                },
                {
                    label: this.$gl(`Belge No`, `Document No`),
                    value: "docnum",
                    type: "string",
                    _textColor: "blue",
                },

                {
                    label: this.$gl(`Kalem`, `Item`),
                    value: "items.itemnum",
                    type: "number",
                },

                {
                    label: this.$gl(`Hesap Tipi`, `Account Type`),
                    value: "items.acctype",
                    type: "string",
                },

                {
                    label: this.$gl(`Hesap No`, `Account`),
                    value: "items.account",
                    type: "string",
                },
                {
                    label: this.$gl(`Hesap Açk.`, `Account Text`),
                    value: "items.atext",
                    type: "string",
                },
                {
                    label: this.$gl(`T.D Hesap No`, `T.D Account`),
                    value: "items.glaccount",
                    type: "string",
                },
                {
                    label: this.$gl(`Açıklama`, `Text`),
                    value: "items.stext",
                    type: "string",
                },

                {
                    label: this.$gl(
                        `Borç Toplamı (Belge P.Br.)`,
                        `Amnt.(Doc.Cur.Unt.)`
                    ),
                    value: "items.ddebit",
                    type: "number",
                    _textColor: "green",
                },
                {
                    label: this.$gl(
                        `Alacak Toplamı (Belge P.Br.)`,
                        `Amnt.(Doc.Cur.Unt.)`
                    ),
                    value: "items.dcredit",
                    type: "number",
                    _textColor: "green",
                },
                {
                    label: this.$gl(
                        `Bakiye (Belge P.Br.)`,
                        `Diff.(Doc.Cur.Unt.)`
                    ),
                    value: "items.ddiff",
                    type: "number",
                    _textColor: "blue",
                },
                {
                    label: this.$gl(`B/A`, `B/A`),
                    value: "items.dpostway",
                    type: "string",
                },

                {
                    label: this.$gl(`B.P.Br.`, `currency`),
                    value: "items.currency",
                    type: "string",
                },
                {
                    label: this.$gl(`Kur`, `Exch.Rate`),
                    value: "items.currate",
                    type: "number",
                },

                {
                    label: this.$gl(
                        `Borç Toplamı (Firma P.Br.)`,
                        `Amnt.(Com.Cur.Unt.)`
                    ),
                    value: "items.hdebit",
                    type: "number",
                    _textColor: "green",
                },
                {
                    label: this.$gl(
                        `Alacak Toplamı (Firma P.Br.)`,
                        `Amnt.(Com.Cur.Unt.)`
                    ),
                    value: "items.hcredit",
                    type: "number",
                    _textColor: "green",
                },

                {
                    label: this.$gl(
                        `Bakiye (Firma P.Br.)`,
                        `Diff.(Com.Cur.Unt.)`
                    ),
                    value: "items.hdiff",
                    type: "number",
                    _textColor: "blue",
                },
                {
                    label: this.$gl(`B/A`, `B/A`),
                    value: "items.hpostway",
                    type: "string",
                },
            ],
        };
    },

    methods: {
        async btnSearch(prop) {
            this.dv = await this.lis.function("FINT07/01-btnSearch", prop);
        },
    },

    mounted() {},
};
</script>
