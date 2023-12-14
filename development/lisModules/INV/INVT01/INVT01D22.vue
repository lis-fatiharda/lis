<template>
    <q-stepper
        v-model="step"
        ref="stepper"
        alternative-labels
        color="primary"
        animated
    >
        <q-step
            :name="1"
            :title="
                $gl(
                    'Satınalma Belgesi veya Tedarikçi Seçiniz',
                    'Choose Purchase Document or Vendor'
                )
            "
            icon="description"
            :done="step > 1"
        >
           
            <q-radio v-model="step1Option" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="purDoc" :label= "$gl('Satınalma Siparişi', 'Purchase Document')" />
            <q-radio v-model="step1Option" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="vendor" :label= "$gl('Tedarikçi', 'Vendor')" />
            <div class="row q-pa-xs q-gutter-xs">
                <l-select
                    v-if="step1Option == 'vendor'"
                    v-model="dv.sc.busarea"
                    label="İş Alanı"
                    options="lisbas003"
                    optValue="busarea"
                    optTitle="stext"
                    optCaptions="busarea"
                    width="130px"
                />
                <l-input
                    v-if="step1Option == 'vendor'"
                    v-model="dv.sc.vendor"
                    label="Tedarikçi"
                    
                    dense
                />

                <l-select
                    v-if="step1Option == 'purDoc'"
                    v-model="dv.sc.doctype"
                    label="Belge Tipi"
                    options="lispur001"
                    optValue="doctype"
                    optTitle="stext"
                    optCaptions="doctype" 
                    width="130px"
                />
                <l-input
                    v-if="step1Option == 'purDoc'"
                    v-model="dv.sc.docnum"
                    label="Belge No"
                    
                    dense
                />
            </div>
        </q-step>

        <q-step
            :name="2"
            :title="
                $gl('Stok Girişi Yapılacak Kalemleri Seçiniz', 'Choose Items')
            "
            caption="Optional"
            icon="create_new_folder"
            :done="step > 2"
        >
            An ad group contains one or more ads which target a shared set of
            keywords.
        </q-step>

        <q-step
            :name="3"
            :title="
                $gl(
                    'Stok Girişi Belgesi Onayı',
                    'İnventory Document Acceptance'
                )
            "
            icon="add_comment"
        >
            Try out different ad text to see what brings in the most customers,
            and learn how to enhance your ads using features like ad extensions.
            If you run into any problems with your ads, find out how to tell if
            they're running and how to resolve approval issues.
        </q-step>

        <template v-slot:navigation>
            <q-stepper-navigation>
                <l-btn
                    @click="next()"
                    color="primary"
                    :label="
                        step === 3
                            ? $gl('Bitir', 'Finish')
                            : $gl('Onay', 'Accept')
                    "
                />
                <l-btn
                    v-if="step > 1"
                    flat
                    color="primary"
                    @click="back()"
                    :label="$gl('Geri', 'Back')"
                    class="q-ml-sm"
                />
                <l-btn
                    flat
                    color="grey"
                    @click="reset()"
                    :label="$gl('Temizle', 'Reset')"
                    class="q-ml-sm"
                />
            </q-stepper-navigation>
        </template>
    </q-stepper>
</template>

<script>
export default {
    props: ["tabInfo"],

    data() {
        return {
            step: 1,
            done1: false,
            done2: false,
            done3: false,
            step1Option: "purDoc",

            myColumns: [
                {
                    type: "string",
                    label: "Malzeme Kodu",
                    value: "material",
                },
                {
                    type: "string",
                    label: "Malzeme Adı",
                    value: "stext",
                },
                {
                    type: "string",
                    label: "Miktar",
                    value: "quantity",
                },
            ],
            contextMenu: [
                {
                    name: "Satır Ekle",
                    callback: async () => {
                        let myReturn = await this.lis.function(
                            "INVT01/22-pushNewItem",
                            this.dv
                        );
                        this.dv.olisinvdocs.items.push(myReturn.items[0]);
                    },
                },
            ],
            dv: {
                lisDialog: "INVT01D22",
                olisinvdocs: {},
                sc: {
                    busarea: "",
                    vendor: "",
                    doctype: "",
                    docnum: "",
                },
            },
        };
    },
    computed: {
        fetchWarehouses() {
            let tmpWarehouses = this.dv.sc.warehouseOpts.filter(
                (e) => e.plant == this.dv.sc.plant
            );
            return tmpWarehouses;
        },
    },

    methods: {
        reset() {
            this.done1 = false;
            this.done2 = false;
            this.done3 = false;
            this.step = 1;

            this.dv.sc.busarea = "";
            this.dv.sc.vendor = "";
            this.dv.sc.doctype = "";
            this.dv.sc.docnum = "";
        },
        next() {
            if (this.step == 1 && this.step1Option == "purDoc") {
                this.step = 3;
            } else {
                this.$refs.stepper.next();
            }
            
        },
        back() {
            if (this.step1Option == "purDoc") {
                this.step = 1;
            } else {
                this.$refs.stepper.previous()
            }
            
        },
        fetchStockplaces(Pplant, Pwarehouse) {
            let tmpStockplaces = this.dv.sc.stockplaceOpts.filter(
                (e) => (e.plant == Pplant) & (e.warehouse == Pwarehouse)
            );
            return tmpStockplaces;
        },
        async pushNewItem() {
            let myReturn = await this.lis.function(
                "INVT01/22-pushNewItem",
                this.dv
            );
            this.dv.olisinvdocs.items.push(myReturn.items);
        },
        removeItem(index) {
            if (this.olisinvdocs.items.length > 1) {
                this.olisinvdocs.items.splice(index, 1);
            }
        },
        async btnSave() {
            console.log("btnSave çalıştı");
            await this.lis.function("INVT01/22-btnSave", this.dv.olisinvdocs);
            this.cancel();
        },
        cancel() {
            this.dv.lisDialog = "INVT01D01";
        },
    },
    async mounted() {
        this.dv = await this.lis.function("INVT01/22-init", this.dv);
    },
};
</script>

function data() { new Error('Function not implemented.'); }
