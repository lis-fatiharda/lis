<template>
    <l-card style="width: 100%" class="q-pa-xs q-gutter-xs">
        <div class="text-overline q-pa-xs">
            {{ this.$gl("Belge Geçmişi", "Document History") }}
        </div>
        <l-separator inset />
        <div class="q-gutter-xs row">
            <l-input label="Belgeyi Oluşturan" readonly  dense v-model="dv.lissaldocs.createdby"/>
            <l-datetime label="Tarih" :readonly = "true" v-model="dv.lissaldocs.createdAt"/>    
        </div>
        <div class="q-gutter-xs row">
            <l-input label="Belgeyi Değiştiren" readonly  dense v-model="dv.lissaldocs.createdby"/>
            <l-datetime label="Tarih" :readonly = "true" v-model="dv.lissaldocs.createdAt"/>    
        </div>
    </l-card>
    <l-card style="width: 100%">
        <div class="text-overline q-pa-xs">
            {{ this.$gl("Onay", "Approve") }}
        </div>
        <l-separator inset />
        <l-card-section class="q-gutter-xs"> </l-card-section>
    </l-card>
    <l-card style="width: 100%">
        <div class="text-overline q-pa-xs">
            {{ this.$gl("E-Belge Özellikleri", "E-Document Properties") }}
        </div>
        <l-separator inset />
        <l-card-section class="q-gutter-xs row">
            <l-input label="E-Belge Durumu" readonly  dense />
            <l-select label="E-Fatura Tipi" width="200px"
            v-model="dv.lissaldocs.einvotype" 
            :options= "[{einvotype: 0, stext: 'Temel Fatura'},{einvotype: 1, stext: 'Ticari Fatura'}]"
            optValue="einvotype"
            optTitle="stext"
            optCaptions="einvotype"
            :readonly = "dv.lissaldocs.isprinted == true? true : false"/>
        </l-card-section>
    </l-card>
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
};
</script>
