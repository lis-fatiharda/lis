<template>
  <l-dialog v-model="item.showDetail">
    <q-layout container class="bg-white" style="width: 1000px">
      <q-header :class="`bg-${tabInfo.moduleColor} text-black`">
        <l-toolbar>
          <l-toolbar-title>{{
            this.$gl(`Aksiyon Detayı`, `Action Detail`)
          }}</l-toolbar-title>

          <l-btn v-close-popup color="negative" icon="close" @click="item.showDetail = false" />
        </l-toolbar>
      </q-header>

      <q-page-container>
        <q-page>
          <!--  Page Starts **************************************** -->
          <l-card class="q-pa-xs">
            <l-card-section class="row q-gutter-xs">
              <l-select :label="this.$gl(`Aksiyon Tipi`, `Action Type`)" 
              v-model="dv.liscrmdocs.actiontype"
              options="liscrm002" 
              optValue="actiontype" 
              width="140px" />

              <l-input dense v-model="item.stext" :label="this.$gl(`Aksiyon Açıklaması`, `Action Description`)" />
              <l-input dense autogrow v-model="item.ltext" :label="this.$gl(`Aksiyon Uzun Açıklaması`, `Action Long Description`)
                " style="width: 320px" />
              <l-select dense :label="this.$gl(`Statü`, `Status`)" :options="[
                {
                  value: 0,
                  label: this.$gl('Açık', `Open`)
                },
                {
                  value: 1,
                  label: this.$gl('Beklemede', 'Pending')
                },
                {
                  value: 2,
                  label: this.$gl('Kapalı', `Closed`)
                },
              ]" optValue="value" optTitle="label" v-model="item.actstat" />

              <l-input dense readonly v-model="item.doctype" :label="this.$gl(`Teklif Tipi`, `Offer Type`)"
                v-if="item.docnum != ''" />
              <l-input dense readonly v-model="item.docnum" :label="this.$gl(`Teklif No`, `Offer No`)"
                v-if="item.docnum != ''" />

              <l-datetime v-model="item.actdate" 
                :label="this.$gl(`Aksiyon Tarihi`, `Action Date`)" style="max-width: 220px" />
            </l-card-section>
          </l-card>

          <!--  Page Ends **************************************** -->
        </q-page>
      </q-page-container>
    </q-layout>
  </l-dialog>
</template>

<script>
export default {
  props: ["dv", "item", "tabInfo"],

  data() {
    return {};
  },
};
</script>
