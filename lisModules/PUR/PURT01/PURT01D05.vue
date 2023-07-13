<template>
    <l-card style="width: 49%; min-width: 320px">
        <div class="text-overline q-pa-xs">
            {{ this.$gl("Nakliye Bilgisi", "Shipping Information") }}
        </div>
        <l-separator inset />
        <l-card-section class="q-gutter-xs">
            <l-input
                :label="this.$gl(`Nakliyeci`, `Shipper`)"
                
                dense
                v-model="dv.lispurdocs.freighter"
                style="width: 200px"
            >
                <l-chip
                    class="bg-white"
                    icon="search"
                    dense
                    clickable
                    @click="
                        dv.lispurdocs.isSelectFrg = !dv.lispurdocs.isSelectFrg
                    "
                >
                    <BAST02D01mini
                        :pComp="dv.sc.company"
                        :isShow="dv.lispurdocs.isSelectFrg"
                        @ok="
                            dv.lispurdocs.freighter = $event.customer;
                            dv.lispurdocs.isSelectFrg = false;
                        "
                        @cancel="dv.lispurdocs.isSelectFrg = false"
                    />
                </l-chip>
            </l-input>

            <div class="row q-gutter-xs">
                
                
            <l-select
          :label="this.$gl(`Teslim Şekli`, `Delivery Method`)"
          v-model="dv.lispurdocs.shipping"
          options="lispur006"
          optValue="shipping"
          optTitle="stext"
          optCaptions="shipping"
          width="150px"
        /><l-input  dense readonly />
            </div>
            <div class="row q-gutter-xs">
              
         <l-select
          :label="this.$gl(`İstasyon`, `Station`)"
          v-model="dv.lispurdocs.station"
        
          options="lispur007"
          optValue="station"
          optTitle="stext"
          optCaptions="station"
          width="150px"
        />
                <l-input  dense readonly />
            </div>
        </l-card-section>
    </l-card>

    <l-card style="width: 49%; min-width: 320px">
        <div class="text-overline q-pa-xs">
            {{ this.$gl("Tedarikçi Bilgisi", "Vendor Information") }}
        </div>
        <l-separator inset />
        <l-card-section class="row q-gutter-xs"> </l-card-section>
    </l-card>

    <l-card style="width: 49%; min-width: 320px">
        <div class="text-overline q-pa-xs">
            {{ this.$gl("Satınalma Bilgisi", "Purchasing Information") }}
        </div>
        <l-separator inset />
        <l-card-section class="row q-gutter-xs">
            <l-checkbox
                label="KDV Dahil"
                v-model="dv.lispurdocs.isvatinclude"
            />
        </l-card-section>
    </l-card>
</template>

<script>
export default {
    props: ["dv", "tabInfo"],

    methods: {},
};
</script>
