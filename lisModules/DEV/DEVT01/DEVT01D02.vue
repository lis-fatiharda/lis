:
<template>
    <l-div>
        <!--Tittle Layer-->
        <l-card0 style="width: 100%; height: 900px">
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-toolbar class="q-gutter-xs">
                    <l-icon size="md" name="assignment_ind" />

                    <l-toolbar-title>{{
                        this.$gl("Model Detayı", "Model Detail")
                    }}</l-toolbar-title>

                    <l-btn
                        v-if="dv.modi != 2"
                        icon="save"
                        color="teal"
                        @click="btnSave()"
                    />
                    <l-btn icon="cancel" color="negative" @click="cancel()" />
                </l-toolbar>
            </l-toolbar>

            <!-- Head Layer -->

            <l-div-flex>
                <l-select
                    v-model="dv.olismodels[0].module"
                    :options="dv.sc.moduleOpts"
                    optValue="module"
                    optTitle="module"
                    optCaptions="stext"
                    :label="this.$gl(`modul`, `modul`)"
                    style="width: 150px"
                />

                <l-input v-model="dv.olismodels[0].model" label="Model" />

                <l-input
                    v-model="dv.olismodels[0].stext"
                    :label="this.$gl(`Model Açıklaması`, `Model Description`)"
                />

                <l-checkbox
                    v-model="dv.olismodels[0].type"
                    :label="this.$gl(`Destek Tablosu`, `Support Table`)"
                />

                <l-checkbox
                    v-model="dv.olismodels[0].isprojectmodel"
                    label="Projeye Özel"
                />


                
                <l-input
                    v-model="dv.olismodels[0].supComponent"
                    :label="
                        this.$gl(`Component Dosya Yolu`, `Component File Path`)
                    "
                    style="width: 300px"
                />
            </l-div-flex>

            <hr />

            <l-input
                style="width: 100%; height: 900px"
                v-model="dv.olismodels[0].modelTxt"
                filled
                type="textarea"
                autogrow
            />
        </l-card0>
    </l-div>
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
    data() {
        return {
            dvt: this.dv,
        };
    },

    methods: {
        async btnSave() {
            console.log("btnSave çalıştı");
            await this.lis.function("DEVT01/02-btnSave", this.dv);
            this.cancel();
            // await this.$Axios
            //   .post("DEVT01/02-btnSave", this.dv)
            //   .then((res) => {
            //     console.log(res.data);
            //     if (this.dv.message != null) {
            //       alert(this.dv.message);
            //     }
            //     this.cancel();

            //     //this.dv = res.data;
            //   })
            //   .catch(function (err) {
            //     alert(err);
            //   });
        },
        async init(prop) {
            console.log("02-init çalıştı");
        },
        cancel() {
            this.dv.lisDialog = "DEVT01D01";
            this.tabInfo.blockGoToTransaction = false;
        },
    },
    mounted() {
        this.init(this.dv);
    },
};
</script>

function data() { throw new Error('Function not implemented.'); }
