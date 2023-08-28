<template>
  
    <q-layout container class="bg-white" style="width: 1000px">
      <q-header :class="`bg-${tabInfo.moduleColor} text-black`">
        <l-toolbar>
          <l-toolbar-title>{{
            this.$gl("Kalem Detayı", "Item Detail")
          }}</l-toolbar-title>

          <l-btn
            v-close-popup
            dense
            color="negative"
            icon="close"
            @click="item.showDetail = false"
          />
        </l-toolbar>
      </q-header>

      <q-page-container>
        <q-page>
          <!--  Page Starts **************************************** -->
          <l-tabs
            v-model="tab"
          >
            <l-tab name="Genel" :label="this.$gl(`Genel`, `General`)" />
            <l-tab
              name="İndirim"
              :label="this.$gl(`İndir./artır.`, `Disc./Inc.`)"
            />
            <l-tab name="Statü" :label="this.$gl(`Statü`, `Status`)" />
            <l-tab
              name="Belge Takibi"
              :label="this.$gl(`Belge Takibi`, `Document Tracking`)"
            />
            <l-tab name="Notlar" :label="this.$gl(`Notlar`, `Notes`)" />
          </l-tabs>

          <l-tab-panels v-model="tab" animated>
            <l-tab-panel name="Genel" class="q-gutter-xs">
              <l-card class="q-pa-xs">
                <l-card-section class="row q-gutter-xs">
                  <l-select
                    v-model="item.itemtype"
                    :label="this.$gl(`Kalem Tipi`, `Item Type`)"
                    options="lispur002"
                    optValue="itemtype"
                    optTitle="stext"
                    optCaptions="unit"
                  />
                  <l-input
                    
                    dense
                    readonly
                    v-model="item.mattype"
                    label="Malzeme Tipi"
                  />

                  <l-input
                    :label="this.$gl(`Miktar`, `Quantity`)"
                    v-model.number="item.quantity"
                    dense
                    
                    type="number"
                  />

                  <l-select
                    :label="this.$gl(`Stok Birimi`, `Stock Unit`)"
                    v-model="item.qunit"
                    options="lisbas007"
                    optValue="unit"
                    optTitle="stext"
                    optCaptions="unit"
                    :optFilter="{ unittype: 0 }"
                    width="150px"
                    dense
                    class="bg-blue-1"
                  />
                </l-card-section>
              </l-card>

              <l-card class="bg-white q-pa-xs">
                <l-card-section class="row q-gutter-xs">
                  <l-checkbox
                    :label="this.$gl('Tolerans Var Mı?', 'Has Tolerance?')"
                    v-model="item.istolerance"
                  />
                  <l-input
                    :label="this.$gl('Alt Tolerans', 'Lower Tolerance')"
                    v-model="item.lowertol"
                    type="number"
                    
                    v-if="item.istolerance"
                  />
                  <l-input
                    :label="this.$gl('Üst Tolerans', 'Upper Tolerance')"
                    v-model="item.uppertol"
                    type="number"
                    
                    v-if="item.istolerance"
                  />
                </l-card-section>
              </l-card>
              <l-card class="bg-white q-pa-xs">
                <l-card-section class="row q-gutter-xs"> </l-card-section>
              </l-card>
              <l-card class="bg-white q-pa-xs">
                <l-card-section class="row q-gutter-xs"> </l-card-section>
              </l-card>
            </l-tab-panel>
            <l-tab-panel name="İndirim" class="row q-gutter-xs q-pa-xs">
              <l-card style="width: 100%; min-width: 320px">
                <div class="text-overline q-pa-xs">
                  {{ this.$gl("İndirimler", "Discounts") }}
                </div>
                <l-card-section class="q-gutter-xs">
                  <q-markup-table @change="calcPrice()">
                    <thead>
                      <tr>
                        <th>
                          {{ this.$gl("İndirim Anahtarı", "Discount Key") }}
                        </th>
                        <th>{{ this.$gl("İndirim Tipi", "Discount Type") }}</th>
                        <th>
                          {{ this.$gl("İndirim Oranı", "Discount Rate") }}
                        </th>
                        <th>
                          {{ this.$gl("İndirim Tutarı", "Discount Amount") }}
                        </th>
                        <th>
                          {{
                            this.$gl(
                              "İndirim Açıklaması",
                              "Discount Description"
                            )
                          }}
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(disc, index) in item.discount" :key="index">
                        <td>

                          <l-select
                          v-model="disc.disckey"
                          :options="dv.discOpts"
                  optValue="disckey"
                  optTitle="stext"
                  optCaptions="disckey"
                  @select="fetchDisc()"
                />
                          
                        </td>
                        <td>
                          <l-select
                            borderless
                           
                            map-options
                            readonly
                            v-model="disc.type"
                            :options="[
                              {
                                value: 0,
                                label: this.$gl(
                                  `Net Üzerinden Yüzdesel`,
                                  `Percentage over Net`
                                ),
                              },
                              {
                                value: 1,
                                label: this.$gl(
                                  `Brüt Üzerinden Yüzdesel`,
                                  `Percent of Gross`
                                ),
                              },
                              {
                                value: 2,
                                label: this.$gl(`Mutlak`, `Absolute`),
                              },
                              {
                                value: 3,
                                label: this.$gl(
                                  `Birim Başına Mutlak`,
                                  `Absolute Per Unit`
                                ),
                              },
                            ]"
                            optValue="value"
                            optTitle="label"
                          />
                        </td>

                        <td>
                          <l-input borderless dense v-model="disc.rate" />
                        </td>
                        <td>
                          <l-input borderless dense v-model="disc.amnt" />
                        </td>
                        <td>
                          <l-input borderless dense v-model="disc.stext" />
                        </td>
                        <td>
                          <l-chip
                            icon="cancel"
                            dense
                            clickable
                            text-color="negative"
                            class="bg-white"
                            @click="removeDisc(index)"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                  <l-chip
                    dense
                    justify="right"
                    icon="add"
                    clickable
                    rounded
                    glossy
                    color="secondary"
                    text-color="white"
                    @click="pushNewDisc()"
                  />
                </l-card-section>
              </l-card>

              <l-card style="width: 70%; min-width: 320px">
                <l-card-section class="row q-gutter-xs"> </l-card-section>
              </l-card>
              <l-card style="width: 29%; min-width: 320px">
                <l-card-section class="row q-gutter-xs"> </l-card-section>
              </l-card>
            </l-tab-panel>
            <l-tab-panel name="Statü" class="q-pa-xs">
              {{ this.$gl("Statü", "Status") }}
            </l-tab-panel>
            <l-tab-panel name="Belge Takibi" class="q-pa-xs q-gutter-xs">
              <div class="text-overline q-pa-xs">
                {{ this.$gl("Referans Belge", "Reference Document") }}
              </div>

              <div class="q-pa-xs q-gutter-xs row">
                <l-input
                  :label="this.$gl('Belge Tipi', 'Document Type')"
                  
                  dense
                  v-model="item.refdoctype"
                  style="width: 90px"
                  readonly
                />
                <l-input
                  :label="this.$gl('Belge No', 'Document No')"
                  
                  dense
                  v-model="item.refdocnum"
                  readonly
                />
                <l-input
                  :label="this.$gl('Kalem No', 'Item No')"
                  
                  dense
                  v-model="item.refitemnum"
                  style="width: 90px"
                  readonly
                />
              </div>
              <l-separator />
              <div class="text-overline q-pa-xs">
                {{ this.$gl("Envanter Hareketi", "Inventory Document") }}
              </div>

              <div class="q-pa-xs q-gutter-xs row">
                <l-input
                  :label="this.$gl('Belge Tipi', 'Document Type')"
                  
                  dense
                  v-model="itemInvdoctype"
                  style="width: 90px"
                  readonly
                />
                <l-input
                  :label="this.$gl('Belge No', 'Document No')"
                  
                  dense
                  v-model="itemInvdocnum"
                  readonly
                />
                <l-input
                  :label="this.$gl('Kalem No', 'Item No')"
                  
                  dense
                  v-model="itemInvitemnum"
                  style="width: 90px"
                  readonly
                />
              </div>
              <l-separator />
            </l-tab-panel>
            <l-tab-panel name="Notlar" class="q-pa-xs">
              {{ this.$gl("Notlar", "Notes") }}
            </l-tab-panel>
          </l-tab-panels>

          <!--  Page Ends **************************************** -->
        </q-page>
      </q-page-container>
    </q-layout>
  
</template>

<script>
import calcPrice from "./calcPrice.js";
export default {
  props: ["dv", "cpdItemTypes", "item", "tabInfo"],

  data() {
    return {
      tab: "Genel",
      itemInvdoctype: "",
      itemInvdocnum: "",
      itemInvitemnum: 0,
    };
  },

  methods: {
    calcPrice() {
      this.dv.lispurdocs = calcPrice(this.dv.lispurdocs);
    },
    async pushNewDisc() {
      console.log("pushNewDisc");
      let myReturn = await this.lis.function("PURT01/pushNewDisc", this.dv);
      this.item.discount.push(myReturn);
    },
    fetchDisc(pIndex) {
      console.log("mal fatih");
      console.log(pIndex);
      console.log(this.item.discount[pIndex]);

      var myDisc = this.dv.discOpts.filter((e) => {
        return (
          (e.usage == 1) & (e.disckey == this.item.discount[pIndex].disckey)
        );
      });
      console.log(this.item.discount[pIndex].type);
      console.log(myDisc[0].type);
      this.item.discount[pIndex].type = myDisc[0].type;
      this.item.discount[pIndex].rate = myDisc[0].rate;
      this.item.discount[pIndex].amnt = myDisc[0].amnt;
      this.item.discount[pIndex].stext = myDisc[0].stext;
      this.item.discount[pIndex].isenable = myDisc[0].isenable;
    },
    removeDisc(index) {
      this.item.discount.splice(index, 1);
    },
  },
  async mounted() {
    let olisinvdocs = await this.lis.function("PURT01/31-init", {
      lispurdocs: this.dv.lispurdocs,
      item: this.item,
    });
    console.log("olisinvdocs", olisinvdocs);
    this.itemInvdoctype = olisinvdocs.doctype;
    this.itemInvdocnum = olisinvdocs.docnum;
    this.itemInvitemnum = olisinvdocs.items.itemnum;
  },
};
</script>
