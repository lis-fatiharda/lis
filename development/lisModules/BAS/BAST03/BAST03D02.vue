<template>
  <l-div>
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-toolbar class="q-gutter-xs">
          <l-icon size="md" name="inventory" />

          <l-toolbar-title>{{
            this.$gl("Malzeme Kartı Detayı", "Material Card Detail")
          }}</l-toolbar-title>

          <l-btn
            v-if="dv.modi != 2"
            icon="save"
            color="teal"
            @click="btnSave(), fillmsg()"
          />
          <l-btn icon="cancel" color="negative" @click="cancel()" />
        </l-toolbar>
      </l-toolbar>

      <l-div-flex>
        <l-select
          :label="this.$gl(`Firma`, `Company`)"
          v-model="lismaterial.company"
          options="lisbas001"
          optValue="company"
          optTitle="stext"
          optCaptions="company"
          width="120px"
        />

        <l-input
          dense
          :label="this.$gl(`Malzeme Kodu`, `Material Code`)"
          v-model="lismaterial.material"
        />
        <l-input
          dense
          :label="this.$gl(`Malzeme Adı`, `Material Name`)"
          v-model="lismaterial.mtext"
          class="bg-blue-1"
        />
        <l-select
          :label="this.$gl(`Tip`, `Type`)"
          v-model="lismaterial.mattype"
          options="lisbas009"
          optValue="mattype"
          optTitle="stext"
          optCaptions="mattype"
          width="170px"
          class="bg-blue-1"
        />

        <l-select
          :label="this.$gl(`Malz. Grp.`, `Material Group`)"
          v-model="lismaterial.matgrp"
          options="lisbas014"
          optValue="matgrp"
          optTitle="stext"
          optCaptions="matgrp"
          width="150px"
          class="bg-blue-1"
        />

        <l-select
          :label="this.$gl(`Stok Birimi`, `Stock Unit`)"
          v-model="lismaterial.skunit"
          options="lisbas007"
          optValue="unit"
          optTitle="stext"
          optCaptions="unit"
          :optFilter="{ unittype: 0 }"
          width="150px"
          dense
          class="bg-blue-1"
        />
        <l-select
          :label="this.$gl(`Tedarik Tipi`, `Supply Type`)"
          v-model="lismaterial.spprokey"
          options="lisbas016	"
          optValue="spprokey"
          optTitle="stext"
          optCaptions="spprokey"
          width="150px"
          class="bg-blue-1"
        />
        <l-select
          :label="this.$gl(`Stok Tipi`, `Stock Type`)"
          v-model="lismaterial.specialstock"
          options="lisinv005"
          optValue="specialstock"
          optTitle="stext"
          optCaptions="specialstock"
          width="150px"
          class="bg-blue-1"
        />

        <l-select
          :label="this.$gl(`Sektör`, `Sector`)"
          v-model="lismaterial.sector"
          options="lisbas004"
          optValue="sector"
          optTitle="stext"
          optCaptions="sector"
          width="130px"
        />
        <l-select
          :label="this.$gl(`Statü`, `Status`)"
          v-model="lismaterial.matstat"
          options="lisbas010"
          optValue="matstat"
          optTitle="stext"
          optCaptions="matstat"
          width="120px"
        />
        <l-checkbox
          :label="this.$gl(`Sil`, `Delete`)"
          v-model="lismaterial._deleted"
          dense
          color="pink"
        />
      </l-div-flex>
    </l-card0>

    <l-card>
      <l-tabs v-model="tab">
        <l-tab name="Genel" :label="this.$gl(`Genel`, `General`)" />
        <l-tab name="Teknik" :label="this.$gl(`Teknik`, `Technical`)" />
        <l-tab name="Birimler" :label="this.$gl(`Birimler`, `Units`)" />
        <l-tab name="Depolar" :label="this.$gl(`Depolar`, `Warehouses`)" />
        <l-tab name="Satınalma" :label="this.$gl(`Satınalma`, `Purchasing`)" />
        <l-tab name="Satış" :label="this.$gl(`Satış`, `Sales`)" />

        <l-tab name="Muhasebe" :label="this.$gl(`Muhasebe`, `Accounting`)" />
        <l-tab name="Notlar" :label="this.$gl(`Notlar`, `Notes`)" />
        <l-tab name="Eklenenler" :label="this.$gl(`Eklenenler`, `Added`)" />
      </l-tabs>

      <l-separator />

      <l-tab-panels v-model="tab">
        <l-tab-panel name="Genel" class="q-gutter-xs row">
          <l-card style="width: 49%; min-width: 320px">
            <l-card-section>
              <div class="text-overline">
                {{ this.$gl("Muhasebe", "Accounting") }}
              </div>
            </l-card-section>
            <l-separator inset />
            <l-card-section class="row q-gutter-xs">
              <q-option-group
                v-model="lismaterial.acctype"
                :options="accountingOpts"
                dense
              />
            </l-card-section>
          </l-card>

          <l-card style="width: 49%; min-width: 320px">
            <l-card-section>
              <div class="text-overline">
                {{
                  this.$gl(
                    "Teknik - Üretim - MRP",
                    "Technical - Production - MRP"
                  )
                }}
              </div>
            </l-card-section>
            <l-separator inset />
            <l-card-section class="row q-gutter-xs">
              <l-input
                type="textarea"
                dense
                :label="
                  this.$gl(`Malzeme Uzun Açıklama`, `Material Long Description`)
                "
                v-model="lismaterial.ltext"
                style="min-width: 300px"
              />
            </l-card-section>
          </l-card>
          <l-card style="width: 49%; min-width: 320px">
            <l-card-section>
              <div class="text-overline">{{ this.$gl("Satış", "Sales") }}</div>
            </l-card-section>
            <l-separator inset />
            <l-card-section class="row q-gutter-md">
              <l-div-flex>
                <l-select
                  :label="this.$gl(`Satış Bölümü`, `Sales Department`)"
                  v-model="lismaterial.saldept"
                  options="lissal003"
                  optValue="saldept"
                  optTitle="stext"
                  optCaptions="saldept"
                  width="150px"
                />

                <l-select
                  :label="this.$gl(`Satış Birimi`, `Sales Unit`)"
                  v-model="lismaterial.salunit"
                  options="lisbas007"
                  optValue="unit"
                  optTitle="stext"
                  optCaptions="unit"
                  :optFilter="{ unittype: 0 }"
                  width="200px"
                />
              </l-div-flex>

              <l-div-flex>
                <l-select
                  :label="this.$gl(`Para Birimi`, `Currency`)"
                  v-model="lismaterial.salcurrency"
                  options="lisbas007"
                  optValue="unit"
                  optTitle="stext"
                  optCaptions="unit"
                  :optFilter="{ unittype: 1 }"
                  width="200px"
                />

                <l-input
                  type="Number"
                  :label="this.$gl(`Satış Fiyatı`, `Sale Price`)"
                  v-model="lismaterial.salprice"
                  dense
                  style="width: 170px"
                  class="bg-teal-1"
                />
                <l-input
                  type="Number"
                  :label="this.$gl(`Fiyat Birimi`, `Price Unit`)"
                  v-model="lismaterial.salpunit"
                  dense
                  style="width: 170px"
                  class="bg-teal-1"
                />
              </l-div-flex>
            </l-card-section>
          </l-card>
          <l-card style="width: 49%; min-width: 320px">
            <l-card-section>
              <div class="text-overline">
                {{ this.$gl("Satınalma", "Purchasing") }}
              </div>
            </l-card-section>
            <l-separator inset />
            <l-card-section class="row q-gutter-xs">
              <l-select
                :label="this.$gl(`Satınalma Bölümü`, `Purchasing Department`)"
                v-model="lismaterial.purdept"
                options="lispur003"
                optValue="purdept"
                optTitle="stext"
                optCaptions="purdept"
                width="200px"
              />

              <l-select
                :label="this.$gl(`Satınalma Birimi`, `Purchasing Unit`)"
                v-model="lismaterial.purunit"
                options="lisbas007"
                optValue="unit"
                optTitle="stext"
                optCaptions="unit"
                :optFilter="{ unittype: 0 }"
                width="200px"
              />
              <l-input
                type="Number"
                :label="this.$gl(`KDV`, `VAT`)"
                v-model="lismaterial.purvatkey"
                dense
              />
            </l-card-section>
          </l-card>
        </l-tab-panel>

        <l-tab-panel name="Teknik" class="q-gutter-xs row">
          <l-card style="width: 49%; min-width: 320px">
            <l-card-section>
              <div class="text-overline">
                {{ this.$gl("Teknik", "Technical") }}
              </div>
            </l-card-section>
            <l-separator inset />

            <l-card-section class="row q-gutter-xs">
              <l-input
                type="textarea"
                dense
                :label="
                  this.$gl(`Malzeme Uzun Açıklama`, `Material Long Description`)
                "
                v-model="lismaterial.ltext"
                style="min-width: 300px"
              />

              <div class="q-gutter-xs">
                <l-input
                  :label="this.$gl(`GTIP`, `Hs Code`)"
                  v-model="lismaterial.gtip"
                  dense
                />
                <l-input
                  :label="
                    this.$gl(`Harici Malzeme Kodu`, `External Material Code`)
                  "
                  v-model="lismaterial.extmaterial"
                  dense
                />
                <div class="q-gutter-xs row">
                  <l-select
                    :label="this.$gl(`Varyant`, `Variant`)"
                    v-model="lismaterial.varkey"
                    options="lisvariants"
                    optValue="varkey"
                    optTitle="stext"
                    optCaptions="varkey"
                    width="200px"
                  />
                  <l-checkbox
                    :label="
                      this.$gl(
                        `Ürün Ağacı Oluşturuldu?`,
                        `Product Tree Created?`
                      )
                    "
                    v-model="lismaterial.isbom"
                    dense
                  />
                </div>
              </div>
            </l-card-section>
          </l-card>

          <l-card style="width: 49%; min-width: 320px">
            <l-card-section>
              <div class="text-overline">
                {{ this.$gl("Üretim", "Production") }}
              </div>
            </l-card-section>
            <l-separator inset />
            <l-card-section class="row q-gutter-xs">
              <l-input
                type="textarea"
                dense
                :label="this.$gl(`Üretim Notu`, `Production Notes`)"
                v-model="lismaterial.prodtext"
                style="min-width: 300px"
              />
            </l-card-section>
          </l-card>
          <l-card style="width: 49%; min-width: 320px">
            <l-card-section class="row q-gutter-xs">
              <l-div>
                <div class="q-gutter-xs row">
                  <l-input
                    type="Number"
                    :label="this.$gl(`Boyut`, `Dimension`)"
                    v-model="lismaterial.dimension"
                    dense
                  />
                </div>
                <div class="q-gutter-xs row">
                  <l-input
                    type="Number"
                    :label="this.$gl(`Brüt Ağırlık`, `Gross Weight`)"
                    v-model="lismaterial.brutweight"
                    dense
                  />

                  <l-select
                    :label="this.$gl(`Brüt Ağırlık Br.`, `Gross Weight Unt.`)"
                    v-model="lismaterial.bwunit"
                    options="lisbas007"
                    optValue="unit"
                    optTitle="stext"
                    optCaptions="unit"
                    :optFilter="{ unittype: 0 }"
                    width="200px"
                  />
                </div>
                <div class="q-gutter-xs row">
                  <l-input
                    type="Number"
                    :label="this.$gl(`Net Ağırlık`, `Net Weight`)"
                    v-model="lismaterial.netweight"
                    dense
                  />

                  <l-select
                    :label="this.$gl(`Net Ağırlık Br.`, `Net Weight Unt.`)"
                    v-model="lismaterial.nwunit"
                    options="lisbas007"
                    optValue="unit"
                    optTitle="stext"
                    optCaptions="unit"
                    :optFilter="{ unittype: 0 }"
                    width="200px"
                  />
                </div>
                <div class="q-gutter-xs row">
                  <l-input
                    type="Number"
                    :label="this.$gl(`Uzunluk`, `Length`)"
                    v-model="lismaterial.length"
                    dense
                  />

                  <l-select
                    :label="this.$gl(`Uzunluk Birimi`, `Unit of Length`)"
                    v-model="lismaterial.lengthunit"
                    options="lisbas007"
                    optValue="unit"
                    optTitle="stext"
                    optCaptions="unit"
                    :optFilter="{ unittype: 0 }"
                    width="200px"
                  />
                </div>
                <div class="q-gutter-xs row">
                  <l-input
                    type="Number"
                    :label="this.$gl(`Yükseklik`, `Height`)"
                    v-model="lismaterial.height"
                    dense
                  />

                  <l-select
                    :label="this.$gl(`Yükseklik Birimi`, `Height Unit`)"
                    v-model="lismaterial.heightunit"
                    options="lisbas007"
                    optValue="unit"
                    optTitle="stext"
                    optCaptions="unit"
                    :optFilter="{ unittype: 0 }"
                    width="200px"
                  />
                </div>
                <div class="q-gutter-xs row">
                  <l-input
                    type="Number"
                    :label="this.$gl(`Genişlik`, `Width`)"
                    v-model="lismaterial.width"
                    dense
                  />

                  <l-select
                    :label="this.$gl(`Genişlik Birimi`, `Width Unit`)"
                    v-model="lismaterial.widthunit"
                    options="lisbas007"
                    optValue="unit"
                    optTitle="stext"
                    optCaptions="unit"
                    :optFilter="{ unittype: 0 }"
                    width="200px"
                  />
                </div>

                <div class="q-gutter-xs row">
                  <l-input
                    type="Number"
                    :label="this.$gl(`Hacim`, `Volume`)"
                    v-model="lismaterial.volume"
                    dense
                  />

                  <l-select
                    :label="this.$gl(`Hacim Birimi`, `Volume Unit`)"
                    v-model="lismaterial.volumeunit"
                    options="lisbas007"
                    optValue="unit"
                    optTitle="stext"
                    optCaptions="unit"
                    :optFilter="{ unittype: 0 }"
                    width="200px"
                  />
                </div>
                <div class="q-gutter-xs row">
                  <l-input
                    type="Number"
                    :label="this.$gl(`Yüzey`, `Surface`)"
                    v-model="lismaterial.surface"
                    dense
                  />

                  <l-select
                    :label="this.$gl(`Yüzey Birimi`, `Surface Unit`)"
                    v-model="lismaterial.surfaceunit"
                    options="lisbas007"
                    optValue="unit"
                    optTitle="stext"
                    optCaptions="unit"
                    :optFilter="{ unittype: 0 }"
                    width="200px"
                  />
                </div>
              </l-div>
            </l-card-section>
          </l-card>
          <l-card style="width: 49%; min-width: 320px">
            <l-card-section>
              <div class="text-overline">MRP</div>
            </l-card-section>
            <l-separator inset />
            <l-card-section class="row q-gutter-xs"> </l-card-section>
          </l-card>
        </l-tab-panel>

        <l-tab-panel name="Birimler" class="q-gutter-xs">
          <template v-for="unit in lismaterial.matunits" :key="unit.id">
            <l-card class="q-gutter-xs q-pa-xs row">
              <l-input
                :label="this.$gl(`Per Unit`, `Per Unit`)"
                v-model="unit.perskunit"
                dense
                type="number"
              />
              <l-input
                :label="this.$gl(`Stok Birimi`, `Stock Unit`)"
                v-model="lismaterial.skunit"
                dense
                readOnly
              />
              <l-chip icon="drag_handle" />
              <l-input
                :label="this.$gl(`Birim Değeri`, `Unit Value`)"
                v-model="unit.value"
                dense
                type="number"
              />

              <l-select
                :label="this.$gl(`Birim`, `Unit`)"
                v-model="unit.unit"
                options="lisbas007"
                optValue="unit"
                optTitle="stext"
                optCaptions="unit"
                :optFilter="{ unittype: 0 }"
                width="150px"
                dense
                class="bg-amber-1"
              />

              <l-chip
                dense
                justify="right"
                icon="cancel"
                clickable
                rounded
                glossy
                color="negative"
                text-color="white"
                @click="removeUnit(unit)"
                >{{ this.$gl("Sil", "Delete") }}</l-chip
              >
            </l-card>
          </template>
          <l-chip
            dense
            justify="right"
            icon="add"
            clickable
            rounded
            glossy
            color="secondary"
            text-color="white"
            @click="pushNewUnit()"
            >{{ this.$gl("Birim Ekle", "Add Unit") }}</l-chip
          >
        </l-tab-panel>
        <l-tab-panel name="Depolar" class="q-gutter-xs">
          <template v-for="stock in lismaterial.matstock" :key="stock.id">
            <l-card class="q-gutter-xs q-pa-xs row">
              <l-select
                :label="this.$gl(`Tesis`, `Plant`)"
                v-model="stock.plant"
                options="lisbas002"
                optValue="plant"
                optTitle="stext"
                optCaptions="plant"
                width="120px"
              />
              <l-select
                :label="this.$gl(`Depo`, `Warehouse`)"
                v-model="stock.warehouse"
                options="lisinv003"
                optValue="warehouse"
                optTitle="stext"
                optCaptions="warehouse"
                width="140px"
              />
              <l-select
                :label="this.$gl(`Stok Yeri`, `Stock Place`)"
                v-model="stock.stockplace"
                options="lisinv004"
                optValue="stockplace"
                optTitle="stext"
                optCaptions="stokcplace"
                width="140px"
              />

              <l-checkbox
                :label="
                  this.$gl(`Tesiste Varsayılan Giriş`, `Plant Default Login`)
                "
                v-model="stock.recdef"
                dense
              />
              <l-checkbox
                :label="
                  this.$gl(`Tesiste Varsayılan Çıkış`, `Plant Default Exit`)
                "
                v-model="stock.issdef"
                dense
              />

              <l-chip
                dense
                justify="right"
                icon="cancel"
                clickable
                rounded
                glossy
                color="negative"
                text-color="white"
                @click="removeStock(stock)"
                >{{ this.$gl("Sil", "Delete") }}</l-chip
              >
            </l-card>
          </template>
          <l-chip
            dense
            justify="right"
            icon="add"
            clickable
            rounded
            glossy
            color="secondary"
            text-color="white"
            @click="pushNewStock()"
            >{{
              this.$gl("Depo-Stokyeri Ekle", "Add Warehouse-Stock Place")
            }}</l-chip
          >
        </l-tab-panel>

        <l-tab-panel name="Satınalma" class="q-gutter-xs row">
          <l-card style="width: 49%; min-width: 320px">
            <l-card-section class="row q-gutter-xs">
              <l-select
                :label="this.$gl(`Satınalma Bölümü`, `Purchasing Department`)"
                v-model="lismaterial.purdept"
                options="lispur003"
                optValue="purdept"
                optTitle="stext"
                optCaptions="purdept"
                width="220px"
              />

              <l-select
                :label="this.$gl(`Satınalma Birimi`, `Purchasing Unit`)"
                v-model="lismaterial.purunit"
                options="lisbas007"
                optValue="unit"
                optTitle="stext"
                optCaptions="unit"
                :optFilter="{ unittype: 0 }"
                width="220px"
              />
              <l-input
                type="Number"
                :label="
                  this.$gl(`Minimum Sipariş Seviyesi`, `Minimum Order Level`)
                "
                v-model="lismaterial.purminlot"
                dense
                style="width: 220px"
              />
              <l-input
                type="Number"
                :label="
                  this.$gl(`Maximum Sipariş Seviyesi`, `Maximum Order Level`)
                "
                v-model="lismaterial.purmaxlot"
                dense
                style="width: 220px"
              />
            </l-card-section>
          </l-card>

          <l-card style="width: 49%; min-width: 320px">
            <l-card-section class="row q-gutter-xs">
              <l-select
                :label="this.$gl(`Sipariş Tipi`, `Order Type`)"
                v-model="lismaterial.purdoctype"
                options="lissal001"
                optValue="doctype"
                optTitle="stext"
                optCaptions="doctype"
                width="200px"
              />
              <l-select
                :label="this.$gl(`Sipariş Kalem Tipi`, `Order Item Type`)"
                v-model="lismaterial.puritemtype"
                options="lispur002"
                optValue="itemtype"
                optTitle="stext"
                optCaptions="itemtype"
                width="200px"
              />

              <l-input
                type="Number"
                :label="this.$gl(`KDV`, `VAT`)"
                v-model="lismaterial.purvatkey"
                dense
              />
            </l-card-section>
          </l-card>
          <l-card style="width: 49%; min-width: 320px">
            <l-card-section class="row q-gutter-xs">
              <l-card class="bg-brown-1">
                <l-card-section>
                  <l-checkbox
                    :label="this.$gl(`Tolerans Kullan`, `Use Tolerance`)"
                    v-model="lismaterial.ispurtolerance"
                    dense
                  />
                </l-card-section>
                <l-card-section class="q-gutter-xs row">
                  <l-input
                    type="Number"
                    :label="this.$gl(`Alt Tolerans (%)`, `Lower Tolerance (%)`)"
                    v-model="lismaterial.purlowertol"
                    dense
                  />
                  <l-input
                    type="Number"
                    :label="this.$gl(`Üst Tolerans (%)`, `Upper Tolerance (%)`)"
                    v-model="lismaterial.puruppertol"
                    dense
                  />
                </l-card-section>
              </l-card>
            </l-card-section>
          </l-card>
          <l-card style="width: 49%; min-width: 320px">
            <l-card-section class="row q-gutter-xs"> </l-card-section>
          </l-card>
        </l-tab-panel>

        <l-tab-panel name="Satış" class="q-gutter-xs row">
          <l-card style="width: 49%; min-width: 320px">
            <l-card-section class="row q-gutter-xs">
              <l-select
                :label="this.$gl(`Satış Bölümü`, `Sales Department`)"
                v-model="lismaterial.saldept"
                options="lissal003"
                optValue="saldept"
                optTitle="stext"
                optCaptions="saldept"
                width="150px"
              />

              <l-select
                :label="this.$gl(`Para Birimi`, `Currency`)"
                v-model="lismaterial.salcurrency"
                options="lisbas007"
                optValue="unit"
                optTitle="stext"
                optCaptions="unit"
                :optFilter="{ unittype: 1 }"
                width="160px"
              />
              <l-select
                :label="this.$gl(`Satış Birimi`, `Sales Unit`)"
                v-model="lismaterial.salunit"
                options="lisbas007"
                optValue="unit"
                optTitle="stext"
                optCaptions="unit"
                :optFilter="{ unittype: 0 }"
                width="160px"
              />

              <l-input
                type="Number"
                :label="
                  this.$gl(`Minimum Sipariş Seviyesi`, `Minimum Order Level`)
                "
                v-model="lismaterial.salminlot"
                dense
                style="width: 220px"
              />
              <l-input
                type="Number"
                :label="
                  this.$gl(`Maximum Sipariş Seviyesi`, `Maximum Order Level`)
                "
                v-model="lismaterial.salmaxlot"
                dense
                style="width: 220px"
              />

              <l-input
                type="Number"
                :label="this.$gl(`Satış Fiyatı`, `Sale Price`)"
                v-model="lismaterial.salprice"
                dense
                style="width: 170px"
                class="bg-teal-1"
              />
              <l-input
                type="Number"
                :label="this.$gl(`Fiyat Birimi`, `Price Unit`)"
                v-model="lismaterial.salpunit"
                dense
                style="width: 170px"
                class="bg-teal-1"
              />
            </l-card-section>
          </l-card>

          <l-card style="width: 49%; min-width: 320px">
            <l-card-section class="row q-gutter-xs">
              <l-select
                :label="this.$gl(`Satış Tipi`, `Sales Type`)"
                v-model="lismaterial.saldoctype"
                options="lissal001"
                optValue="doctype"
                optTitle="stext"
                optCaptions="doctype"
                width="160px"
              />
              <l-select
                :label="this.$gl(`Satış Kalem Tipi`, `Sales Item Type`)"
                v-model="lismaterial.salitemtype"
                options="lissal002"
                optValue="itemtype"
                optTitle="stext"
                optCaptions="itemtype"
                width="160px"
              />

              <l-input
                type="Number"
                :label="this.$gl(`KDV`, `VAT`)"
                v-model="lismaterial.salvatkey"
                dense
              />
            </l-card-section>
          </l-card>
          <l-card style="width: 49%; min-width: 320px">
            <l-card-section class="row q-gutter-xs">
              <l-card class="bg-brown-1">
                <l-card-section>
                  <l-checkbox
                    :label="this.$gl(`Tolerans Kullan`, `Use Tolerance`)"
                    v-model="lismaterial.issaltolerance"
                    dense
                  />
                </l-card-section>
                <l-card-section class="q-gutter-xs row">
                  <l-input
                    type="Number"
                    :label="this.$gl(`Alt Tolerans (%)`, `Lower Tolerance (%)`)"
                    v-model="lismaterial.sallowertol"
                    dense
                  />
                  <l-input
                    type="Number"
                    :label="this.$gl(`Üst Tolerans (%)`, `Upper Tolerance (%)`)"
                    v-model="lismaterial.saluppertol"
                    dense
                  />
                </l-card-section>
              </l-card>
            </l-card-section>
          </l-card>
          <l-card style="width: 49%; min-width: 320px">
            <l-card-section class="row q-gutter-xs"> </l-card-section>
          </l-card>
        </l-tab-panel>

        <l-tab-panel name="Muhasebe" class="q-gutter-xs row">
          <l-card class="my-card" style="width: 59%; min-width: 320px" bordered>
            <l-card-section horizontal>
              <l-card-section class="q-gutter-xs">
                <div class="row q-gutter-xs">
                  <l-input
                    type="Number"
                    :label="
                      this.$gl(`Son Satınalma Fiyatı`, `Last Purchase Price`)
                    "
                    v-model="lismaterial.lpurprice"
                    dense
                    style="width: 170px"
                  />
                  <hr />

                  <l-datetime
                    v-model="lismaterial.lpurpricedate"
                    :label="
                      this.$gl(
                        `Son Satınalma Fiyatı Tarihi`,
                        `Last Purchase Price Date`
                      )
                    "
                    style="max-width: 220px"
                  />
                </div>
                <div class="row q-gutter-xs">
                  <l-input
                    type="Number"
                    :label="
                      this.$gl(
                        `En düşük satınalma fiyatı`,
                        `Lowest Purchase Price`
                      )
                    "
                    v-model="lismaterial.lowprice"
                    dense
                    style="width: 170px"
                  />

                  <l-datetime
                    v-model="lismaterial.lowpricedate"
                    :label="
                      this.$gl(
                        `En düşük satınalma fiyatı Tarihi`,
                        `Date of Lowest Purchase Price`
                      )
                    "
                    style="max-width: 220px"
                  />
                </div>
                <div class="row q-gutter-xs">
                  <l-input
                    type="Number"
                    :label="this.$gl(`Son hareket fiyatı`, `Last move price`)"
                    v-model="lismaterial.lmoveprice"
                    dense
                    style="width: 170px"
                  />

                  <l-datetime
                    v-model="lismaterial.lmovepricedate"
                    :label="
                      this.$gl(
                        `Son hareket fiyatı Tarihi`,
                        `Date of last move price`
                      )
                    "
                    style="max-width: 220px"
                  />
                </div>
                <div class="row q-gutter-xs">
                  <l-input
                    type="Number"
                    :label="
                      this.$gl(`Yeniden Değerleme Fiyatı`, `Revaluation Price`)
                    "
                    v-model="lismaterial.lrevprice"
                    dense
                    style="width: 170px"
                  />
                  <l-datetime
                    v-model="lismaterial.lrevpricedate"
                    :label="
                      this.$gl(
                        `Yeniden Değerleme Fiyatı Tarihi`,
                        `Revaluation Price Date`
                      )
                    "
                    style="max-width: 220px"
                  />
                </div>
              </l-card-section>

              <l-card-section> </l-card-section>
            </l-card-section>
          </l-card>

          <l-card style="width: 40%; min-width: 320px">
            <l-card-section class="row q-gutter-xs">
              <div class="row q-gutter-xs">
                <l-input
                  :label="this.$gl(`Hesap Grubu`, `Account Group`)"
                  v-model="lismaterial.mataccgrp"
                  dense
                />
                <l-input
                  :label="this.$gl(`Satış Hesap Grubu`, `Sales Account Group`)"
                  v-model="lismaterial.matsalaccgrp"
                  dense
                />
              </div>
              <q-seperator inset />
              <div class="row q-gutter-xs">
                <l-select
                  :label="this.$gl(`Para Birimi`, `Currency`)"
                  v-model="lismaterial.matcurrency"
                  options="lisbas007"
                  optValue="unit"
                  optTitle="stext"
                  optCaptions="unit"
                  width="200px"
                  :optFilter="{ unittype: 1 }"
                />
                <l-input
                  :label="this.$gl(`Fiyat Birimi`, `Price Unit`)"
                  v-model="lismaterial.matpunit"
                  dense
                />
              </div>
            </l-card-section>

            <l-card-section horizontal class="q-gutter-xs">
              <l-card-section class="bg-amber-1 q-gutter-xs" style="width: 49%">
                <div class="text-overline">Std Maliyet</div>
                <l-input
                  type="Number"
                  :label="this.$gl(`Maliyet Sonucu`, `Calculate Price`)"
                  v-model="lismaterial.calcprice"
                  dense
                />
                <l-input
                  type="Date"
                  :label="this.$gl(`Maliyet Tarihi`, `Calculate Price Date`)"
                  v-model="lismaterial.calcpricedate"
                  dense
                />
              </l-card-section>

              <q-seperator vertical />

              <l-card-section class="bg-teal-1 q-gutter-xs" style="width: 49%">
                <div class="text-overline">
                  {{ this.$gl("Fiili Maliyet", "Actual Cost") }}
                </div>
                <l-input
                  type="Number"
                  :label="this.$gl(`Maliyet Sonucu`, `Calculate Price`)"
                  v-model="lismaterial.actualprice"
                  dense
                />
                <l-input
                  type="Date"
                  :label="this.$gl(`Maliyet Tarihi`, `Calculate Price Date`)"
                  v-model="lismaterial.actualpricedate"
                  dense
                />
              </l-card-section>
            </l-card-section>
          </l-card>
        </l-tab-panel>

        <l-tab-panel name="Notlar" class="q-gutter-xs">
          <template v-for="note in lismaterial.matnotes" :key="note.id">
            <l-card class="q-gutter-xs q-pa-xs">
              <l-input
                :label="this.$gl(`Not Başlığı`, `Note Title`)"
                v-model="note.notetitle"
                dense
                class="bg-amber-1"
              />
              <l-input
                type="textarea"
                :label="this.$gl(`Not`, `Notes`)"
                v-model="note.note"
                dense
                autogrow
              />
              <l-chip
                dense
                justify="right"
                icon="cancel"
                clickable
                rounded
                glossy
                color="negative"
                text-color="white"
                @click="removeNote(note)"
                >{{ this.$gl("Sil", "Delete") }}</l-chip
              >
            </l-card>
          </template>
          <l-chip
            dense
            justify="right"
            icon="add"
            clickable
            rounded
            glossy
            color="secondary"
            text-color="white"
            @click="pushNewNote()"
            >{{ this.$gl("Not Ekle", "Add Note") }}</l-chip
          >
        </l-tab-panel>
        <l-tab-panel name="Eklenenler">
          <l-doct02d01
            :pCompany="lismaterial.company"
            :pDoctype="'BAST03'"
            :pDocnum="lismaterial.material"
            :numRange="'custDocs'"
            :modi="dv.modi"
          />
        </l-tab-panel>
      </l-tab-panels>
    </l-card>
  </l-div>
</template>

<script>
export default {
  props: ["dv", "tabInfo", "pCompany", "pMaterial", "modi"],
  data() {
    return {
      isSelectVar: false,
      tab: "Genel",
      accountingOpts: [
        {
          label: "Standart",
          value: 0,
        },
        {
          label: "Yürüyen Ağırlıklı Ortalama",
          value: 1,
        },
        {
          label: "Ortalama",
          value: 2,
        },
        {
          label: "LIFO",
          value: 3,
        },
        {
          label: "FIFO",
          value: 4,
        },
      ],
      scWarehouse: [],
      scStockplace: [],
      lismaterial: {},
      liscusmat: [],
    };
  },

  methods: {
    async pushNewNote() {
      let newNote = { ...this.lismaterial.matnotes[0] };

      for (let i in newNote) {
        newNote[i] = "";
      }

      newNote._id = undefined;

      this.lismaterial.matnotes.push(newNote);
    },

    async removeNote(note) {
      this.lismaterial.matnotes = [
        ...this.lismaterial.matnotes.filter(
          (e) => !((e._id == note._id) & (e.notetitle == note.notetitle))
        ),
      ];
    },
    //********************************* */
    async pushNewUnit() {
      let newUnit = { ...this.lismaterial.matunits[0] };

      for (let i in newUnit) {
        newUnit[i] = "";
      }

      newUnit._id = undefined;

      this.lismaterial.matunits.push(newUnit);
    },
    async removeUnit(unit) {
      this.lismaterial.matunits = [
        ...this.lismaterial.matunits.filter(
          (e) => !((e._id == unit._id) & (e.unit == unit.unit))
        ),
      ];
    },
    //********************************* */
    async pushNewStock() {
      let newStock = { ...this.lismaterial.matstock[0] };

      for (let i in newStock) {
        newStock[i] == false ? false : "";
      }

      newStock._id = undefined;

      this.lismaterial.matstock.push(newStock);
    },
    async removeStock(stock) {
      this.lismaterial.matstock = [
        ...this.lismaterial.matstock.filter(
          (e) =>
            !(
              (e._id == stock._id) &
              (e.plant == stock.plant) &
              (e.warehouse == stock.warehouse) &
              (e.stockplace == stock.stockplace)
            )
        ),
      ];
    },
    //********************************* */
    async btnSave() {
      // Controls before Save ------------
      if (this.lismaterial.specialstock == null) {
        this.$q.notify({
          type: "warning",

          message: this.$gl(
            `Özel Stok Tipi Seçiniz!`,
            `Choose Special Stock Type!`
          ),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }
      if (this.lismaterial.specialstock == null) {
        this.$q.notify({
          type: "warning",

          message: this.$gl(
            `Özel Stok Tipi Seçiniz!`,
            `Choose Special Stock Type!`
          ),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }
      // Save the Document ---------------
      await this.lis.function("BAST03/02-btnSave", {
        lismaterial: this.lismaterial,
        liscusmat: this.liscusmat,
        modi: this.modi,
      });
      this.cancel();

    },
    cancel() {
      this.tabInfo.blockGoToTransaction = false;
      this.dv.lisDialog = "BAST03D01";
    },
    async init(prop) {
      await this.lis.function("BAST03/02-init", prop);
    },
  },

  async mounted() {
    this.init(this.dv);
    this.tabInfo.blockGoToTransaction = true;

    let myReturn = await this.lis.function("BAST03/02-init", {
      company: this.pCompany,
      material: this.pMaterial,
      modi: this.modi,
    });

    this.lismaterial = myReturn.lismaterial;
    this.liscusmat = myReturn.liscusmat;

  },
  async beforeUnmount() {
    await this.lis.function("cls-system.unlock", {
        company: this.pCompany,
        lid: "BAST03",
        lockkey: this.pMaterial,
      });
  },
};
</script>

function data() { new Error('Function not implemented.'); }
