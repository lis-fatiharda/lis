<template>

    <l-div-flex>
        <l-card style="width: 49%; min-width: 320px">
        <div class="text-overline q-pa-xs">
            {{ this.$gl("Nakliye Bilgisi", "Shipping Information") }}
        </div>
        <l-separator inset />
        <l-card-section class="q-gutter-xs">
            <div class="row q-gutter-xs">
                <l-input
                    :label="this.$gl(`Nakliyeci`, `Shipper`)"
                    dense
                    v-model="dv.lissaldocs.freighter"
                    style="width: 200px"
                >
                    <l-chip
                        class="bg-white"
                        icon="search"
                        dense
                        clickable
                        @click="
                            dv.lissaldocs.isSelectFrg =
                                !dv.lissaldocs.isSelectFrg
                        "
                    >
                        <BAST02D01mini
                            :pComp="dv.scCompany"
                            :isShow="dv.lissaldocs.isSelectFrg"
                            @ok="
                                dv.lissaldocs.freighter = $event.customer;
                                dv.lissaldocs.isSelectFrg = false;
                            "
                            @cancel="dv.lissaldocs.isSelectFrg = false"
                        />
                    </l-chip>
                </l-input>

                <l-input dense readonly />
            </div>

            <div class="row q-gutter-xs">
                <l-select
                    :label="this.$gl(`Teslim Şekli`, `Delivery Method`)"
                    v-model="dv.lissaldocs.shipping"
                    options="lissal006"
                    optValue="shipping"
                    optTitle="stext"
                    optCaptions="shipping"
                    width="150px"
                />
                <l-input dense readonly />
            </div>

            <div class="row q-gutter-xs">
                <l-select
                    :label="this.$gl(`Nakliye Tipi`, `Shipping Type`)"
                    v-model="dv.lissaldocs.freight"
                    options="lissal007"
                    optValue="freight"
                    optTitle="stext"
                    optCaptions="freight"
                    width="150px"
                />

                <l-input dense readonly />
            </div>
        </l-card-section>
    </l-card>

    <l-card style="width: 49%; min-width: 320px">
        <div class="text-overline q-pa-xs">
            {{ this.$gl("Müşteri Bilgisi", "Customer Information") }}
        </div>
        <l-separator inset />
        <l-card-section class="row q-gutter-xs"> </l-card-section>
    </l-card>
    <l-card style="width: 49%; min-width: 320px">
        <div class="text-overline q-pa-xs">
            {{ this.$gl("Finans Bilgisi", "Financial Information") }}
        </div>
        <l-separator inset />
        <l-card-section class="row q-gutter-xs">
            <div v-for="vat in dv.lissaldocs.vats" :key="vat">
                <l-input dense readonly label="KDV" v-model="vat.vatrate" />
                <l-input
                    dense
                    readonly
                    label="KDV Tutarı"
                    v-model="vat.vatamnt"
                />
                <l-select
                    v-model="vat.novatcode"
                    :options="dv.noVatReasons"
                    :label="this.$gl(`KDV Muafiyet Sebebi`, `No Vat Reasons`)"
                    style="width: 150px"
                    dense
                    emit-value
                    class="bg-blue-1"
                    optValue="taxcode"
                    optTitle="taxname"
                    optCaptions="taxcode"
                />

                <l-input
                    dense
                    :label="
                        this.$gl(`Muafiyet Açıklaması`, `Exemption Statement`)
                    "
                    style="min-width: 320px"
                    v-model="vat.novattxt"
                />
            </div>
        </l-card-section>
    </l-card>
    <l-card style="width: 49%; min-width: 320px">
        <div class="text-overline q-pa-xs">
            {{ this.$gl("Satış Bilgisi", "Sales Information") }}
        </div>
        <l-separator inset />
        <l-card-section class="row q-gutter-xs">
            <l-checkbox
                label="KDV Dahil"
                v-model="dv.lissaldocs.isvatinclude"
            />
        </l-card-section>
    </l-card>
    </l-div-flex>
    
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
};
</script>
