<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card class="q-pa-xs">
            <div :class="`text-white bg-${tabInfo.moduleColor}`">
                <l-toolbar>
                    <l-btn flat round dense icon="assignment_ind" />

                    <l-toolbar-title>Detay</l-toolbar-title>

                    <l-btn
                        v-if="dv.modi != 2"
                        round
                        flat
                        icon="save"
                        class="bg-secondary"
                        @click="btnSave()"
                    />
                    <l-btn
                        flat
                        round
                        icon="cancel"
                        class="bg-negative"
                        @click="cancel()"
                    />
                </l-toolbar>
                <l-toolbar inset>
                    <q-breadcrumbs active-color="white" style="font-size: 16px">
                        <q-breadcrumbs-el label="Ana Sayfa" icon="home" />
                        <q-breadcrumbs-el
                            label="Default dialog"
                            icon="application"
                        />
                        <q-breadcrumbs-el label="Detay" icon="application" />
                    </q-breadcrumbs>
                </l-toolbar>
            </div>

            <div class="row">
                <!-- Detail Part-->
            </div>

            <hr />
        </l-card>
    </div>
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
    data() {
        return {
            lockKeyParams: {
                company: this.dv.lisCustomer.company,
                lid: "BAST02",
                lockkey: this.dv.lisCustomer.customer,
            },
        };
    },

    methods: {
        async btnSave() {
            console.log("btnSave çalıştı");
            await this.$Axios
                .post("list01/02-btnSave", this.dv)
                .then((res) => {
                    console.log(res.data);
                    this.cancel();
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        cancel() {
            this.tabInfo.blockGoToTransaction = false;
            this.dv.lisDialog = "list01d01";
        },
        async init(prop) {
            await this.$Axios
                .post("list01/02-init", prop)
                .then(function (res) {
                    console.log("02-init");
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
    },
    mounted() {
        this.init(this.dv);
        console.log("02 created çalıştı");
        this.tabInfo.blockGoToTransaction = true;
    },
    beforeUnmount() {
        this.$Axios.post("cls-system.unlock", this.lockKeyParams);
    },
};
</script>

function data() { throw new Error('Function not implemented.'); }
