<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-icon size="md" name="account_tree" />

                <l-toolbar-title>{{
                    this.$gl("İş Merkezi Detayı", "Work Centers Detail")
                }}</l-toolbar-title>

                <div class="q-gutter-xs">
                    <l-btn
                        v-if="dv.modi != 2"
                        icon="print"
                        color="primary"
                        @click="btnPrint()"
                    />

                    <l-btn
                        v-if="dv.modi != 2"
                        icon="save"
                        color="teal"
                        @click="btnSave()"
                    />

                    <l-btn
                        icon="cancel"
                        color="negative"
                        @click="this.cancel()"
                    />
                </div>
            </l-toolbar>
            <l-card-flex>
            <l-select
                :label="this.$gl(`Firma`, `Company`)"
                v-model="dv.lisworkcenters.company"
                options="lisbas001"
                optValue="company"
                width="120px"
                optTitle="stext"
                optCaptions="company"
                class="bg-blue-1"
            />

            <l-select
                :label="this.$gl(`Tesis`, `Plant`)"
                v-model="dv.lisworkcenters.plant"
                options="lisbas002"
                optValue="plant"
                optTitle="stext"
                optCaptions="plant"
                class="bg-blue-1"
                width="120px"
                
            />

            <l-input
                dense
                v-model="dv.lisworkcenters.workcenter"
                :label="this.$gl(`İş Merkezi`, `Work Center`)"
                style="width: 240px"
            />

            <l-input
                dense
                v-model="dv.lisworkcenters.stext"
                :label="
                    this.$gl(`İş Merkezi Açıklaması`, `Work Center Description`)
                "
                style="width: 240px"
            />

            <l-checkbox
                :label="this.$gl(`Silindi?`, `Is Deleted?`)"
                v-model="dv.lisworkcenters._deleted"
                color="pink"
                default:false
            />
        </l-card-flex>
        </l-card0>
        <!-- -------------------------------------------------------------------- -->
        <l-card style="width: 100%; min-width: 320px">
            <div class="text-overline q-pa-xs">
                {{ this.$gl("Detaylar", "Details") }}
            </div>

            <l-separator inset />
            <br />
            <div class="row q-gutter-xs">
                <div class="row q-gutter-xs">
                    <l-select
                        :label="
                            this.$gl(
                                `İş Merkezi Sorumlusu`,
                                `Workcenter Responsible`
                            )
                        "
                        v-model="dv.lisworkcenters.workresp"
                        optTitle="stext"
                        options="lisbom004"
                        optValue="responsible"
                        optCaptions="responsible"
                        width="180px"
                    />
                    <l-select
            :label="this.$gl(`Üst İş Merkezi`, `Main Work Center`)"
            v-model="dv.lisworkcenters.workcenter"
            options="destektablo"
            optValue="workcenter"
            optTitle="stext"
            optCaptions="workcenter"
            width="180px"
          />
                   

                    <l-input
                        dense
                        v-model="dv.lisworkcenters.costcenter"
                        :label="this.$gl(`Mlyt. Merk.`, `Cost Center`)"
                        style="width: 240px"
                    />
                    <l-input
                        dense
                        v-model="dv.lisworkcenters.capgrp"
                        :label="this.$gl(`İşM.Kap.Grp`, `Workc Cap. Grp.`)"
                        style="width: 240px"
                    />

                    <l-select
            :label="this.$gl(`Aktivite Tİpi`, `Activite Type`)"
            v-model="dv.lisworkcenters.type"
            options="destektablo"
            optValue="type"
            optTitle="stext"
            optCaptions="type"
            width="120px"
          />

                  
                </div>
                <div class="row q-gutter-xs">
                    <l-input
                        dense
                        v-model="dv.lisworkcenters.value"
                        :label="
                            this.$gl(`Opr.Sür.`, `Estimated Operation Time`)
                        "
                        style="width: 150px"
                    />
                    <l-select
            :label="this.$gl(`Birim`, `Unit`)"
            v-model="dv.lisworkcenters.unit"
            options="destektablo"
            optValue="unit"
            optTitle="stext"
            optCaptions="unit"
            width="120px"
          />
          <l-select
            :label="this.$gl(`Opr. Tipi`, `Opr. Type`)"
            v-model="dv.lisworkcenters.type"
            options="destektablo"
            optValue="type"
            optTitle="stext"
            optCaptions="type"
            width="120px"
          />
              <l-select
            :label="this.$gl(`Opr.Kntr.Tpi`, `Opr.Ctrl Type`)"
            v-model="dv.lisworkcenters.oprcontrol"
            options="destektablo"
            optValue="oprcontrol"
            optTitle="stext"
            optCaptions="oprcontrol"
            width="120px"
          />    

            

                    <l-checkbox
                        :label="this.$gl(`Maliyete Ekle`, `Add to Cost`)"
                        v-model="dv.lisworkcenters.activities[0].iscost"
                        color="pink"
                    />
                </div>
            </div>
            <div><br /></div>
        </l-card>
    </l-div>
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
    data() {
        return {
            lockKeyParams: {
                company: this.dv.lisworkcenters.company,
                lid: "BOMT02",
                lockkey: this.dv.lisworkcenters.workcenter,
            },
        };
    },

    methods: {
        async btnSave() {
            console.log("btnSave çalıştı");
            await this.lis.function("BOMT02/02-btnSave", this.dv);
            this.cancel();
            // await this.$Axios
            //   .post("BOMT02/02-btnSave", this.dv)
            //   .then((res) => {
            //     console.log(res.data);
            //     this.cancel();
            //   })
            //   .catch(function (err) {
            //     console.log(err);
            //   });
        },
        cancel() {
            this.tabInfo.blockGoToTransaction = false;
            this.dv.lisDialog = "BOMT02D01";
        },
        async init(prop) {
            this.dv = await this.lis.function("BOMT02/02-init", this.dv);
        },
    },
    mounted() {
        this.init(this.dv);
        console.log("02 created çalıştı");
        this.tabInfo.blockGoToTransaction = true;
    },
    async beforeUnmount() {
        //this.$Axios.post("cls-system.unlock", this.lockKeyParams);
        await this.lis.function("cls-system.unlock", this.lockKeyParams);
    },
};
</script>

function data() { new Error('Function not implemented.'); }
