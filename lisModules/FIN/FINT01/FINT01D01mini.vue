<template>
    <l-dialog v-model="pIsShow" persistent>
        <l-div class="bg-white">
            <!--Tittle Layer-->
            <l-card0>
                <l-toolbar class="bg-amber-2">
                    <l-toolbar-title>Hesap Planı</l-toolbar-title>

                    <l-btn
                        flat
                        round
                        dense
                        icon="done"
                        color="teal"
                        @click="selectAccount()"
                    >
                        <l-tooltip>
                            Seçilen Hesap Bilgilerini Getir
                        </l-tooltip>
                    </l-btn>
                    <l-btn
                        flat
                        round
                        dense
                        icon="cancel"
                        color="negative"
                        @click="cancel()"
                    />
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
                        class="bg-blue-1"
                    />

                    <l-select
                        :label="this.$gl(`Hesap Tipi`, `Account Type`)"
                        v-model="dv.sc.acctype"
                        options="lisfin004"
                        optValue="acctype"
                        optTitle="stext"
                        optCaptions="acctype"
                        width="130px"
                    />

                    <l-input
                        :label="this.$gl(`Hesap No`, `Account No`)"
                        
                        dense
                        v-model="dv.sc.account"
                    ></l-input>
                    <l-input
                        :label="this.$gl(`Hesap Açk.`, `Account Descr.`)"
                        
                        dense
                        v-model="dv.sc.stext"
                    ></l-input>

                    <l-btn
                        color="warning"
                        
                        dense
                        icon="search"
                        @click="btnSearch()"
                    >
                        <l-tooltip> Ara </l-tooltip></l-btn
                    >
                </div>

                <!--------------------------------->
            </l-card0>
            <!--Table Layer---------------------------->

            <q-markup-table flat bordered dense>
                <thead>
                    <tr class="bg-blue-grey-2">
                        <th class="text-left"></th>
                        <th class="text-left">Hesap Tipi</th>
                        <th class="text-left">Hesap No</th>
                        <th class="text-left">Açıklama</th>
                        <th class="text-left">T.D Hesap</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in dv.reportList"
                        :key="item.id"
                        @click="dv.selectedRow = item._id"
                        :class="
                            dv.selectedRow == item._id
                                ? 'bg-light-blue-1'
                                : 'bg-white'
                        "
                    >
                        <td>
                            <l-chip dense :label="index + 1" rounded glossy />
                        </td>
                        <td class="text-left">{{ item.acctype }}</td>
                        <td class="text-left">{{ item.account }}</td>
                        <td class="text-left">{{ item.stext }}</td>
                        <td class="text-left">{{ item.glaccount }}</td>
                    </tr>
                </tbody>
            </q-markup-table>
        </l-div>
    </l-dialog>
</template>

<script>
export default {
    props: ["isShow", "pComp"],

    data() {
        return {
            pIsShow: this.isShow,
            itemColumns: [{

            }],
            dv: {
                sc: {
                    company: "01",
                    acctype: "G",
                    account: "",
                    glaccount: "",
                    stext: "",
                },
                reportList: [],
                selectedRow: "",
            },
        };
    },

    watch: {
        isShow(newValue) {
            this.pIsShow = newValue;
        },
    },

    methods: {
        async btnSearch() {
            this.dv = await this.lis.function("FINT01/01-btnSearchMini", this.dv);
        },
        async selectAccount() {
            this.dv.reportList = this.dv.reportList.filter(
                (e) => e._id == this.dv.selectedRow
            );
            if (this.dv.reportList.length == 1) {
                this.$emit("ok", this.dv.reportList[0]);
            } else {
                this.$q.notify({
                    message: "Bir Hesap Seçilmedi!",
                    type: "negative",
                });
                this.$emit("ok", undefined);
            }
        },
        cancel() {
            this.$emit("cancel", false);
        },
    },

    
};
</script>
