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
          v-model="dv.lismaterials.company"
          options="lisbas001"
          optValue="company"
          optTitle="stext"
          optCaptions="company"
          width="120px"
        />

        <l-input
          dense
          :label="this.$gl(`Malzeme Kodu`, `Material Code`)"
          v-model="dv.lismaterials.material"
        />
        <l-input
          dense
          :label="this.$gl(`Malzeme Adı`, `Material Name`)"
          v-model="dv.lismaterials.mtext"
          class="bg-blue-1"
        />
        <l-select
          :label="this.$gl(`Tip`, `Type`)"
          v-model="dv.lismaterials.mattype"
          options="lisbas009"
          optValue="mattype"
          optTitle="stext"
          optCaptions="mattype"
          width="170px"
          class="bg-blue-1"
        />

        <l-select
          :label="this.$gl(`Malz. Grp.`, `Material Group`)"
          v-model="dv.lismaterials.matgrp"
          options="lisbas014"
          optValue="matgrp"
          optTitle="stext"
          optCaptions="matgrp"
          width="150px"
          class="bg-blue-1"
        />

        <l-select
          :label="this.$gl(`Stok Birimi`, `Stock Unit`)"
          v-model="dv.lismaterials.skunit"
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
          v-model="dv.lismaterials.spprokey"
          options="lisbas016	"
          optValue="spprokey"
          optTitle="stext"
          optCaptions="spprokey"
          width="150px"
          class="bg-blue-1"
        />
        <l-select
          :label="this.$gl(`Stok Tipi`, `Stock Type`)"
          v-model="dv.lismaterials.specialstock"
          options="lisinv005"
          optValue="specialstock"
          optTitle="stext"
          optCaptions="specialstock"
          width="150px"
          class="bg-blue-1"
        />

        <l-select
          :label="this.$gl(`Sektör`, `Sector`)"
          v-model="dv.lismaterials.sector"
          options="lisbas004"
          optValue="sector"
          optTitle="stext"
          optCaptions="sector"
          width="130px"
        />
        <l-select
          :label="this.$gl(`Statü`, `Status`)"
          v-model="dv.lismaterials.matstat"
          options="lisbas010"
          optValue="matstat"
          optTitle="stext"
          optCaptions="matstat"
          width="120px"
        />
        <l-checkbox
          :label="this.$gl(`Sil`, `Delete`)"
          v-model="dv.lismaterials._deleted"
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
                v-model="dv.lismaterials.acctype"
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
                v-model="dv.lismaterials.ltext"
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
                  v-model="dv.lismaterials.saldept"
                  options="lissal003"
                  optValue="saldept"
                  optTitle="stext"
                  optCaptions="saldept"
                  width="150px"
                />

                <l-select
                  :label="this.$gl(`Satış Birimi`, `Sales Unit`)"
                  v-model="dv.lismaterials.salunit"
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
                  v-model="dv.lismaterials.salcurrency"
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
                  v-model="dv.lismaterials.salprice"
                  dense
                  style="width: 170px"
                  class="bg-teal-1"
                />
                <l-input
                  type="Number"
                  :label="this.$gl(`Fiyat Birimi`, `Price Unit`)"
                  v-model="dv.lismaterials.salpunit"
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
                v-model="dv.lismaterials.purdept"
                options="lispur003"
                optValue="purdept"
                optTitle="stext"
                optCaptions="purdept"
                width="200px"
              />

              <l-select
                :label="this.$gl(`Satınalma Birimi`, `Purchasing Unit`)"
                v-model="dv.lismaterials.purunit"
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
                v-model="dv.lismaterials.purvatkey"
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
                v-model="dv.lismaterials.ltext"
                style="min-width: 300px"
              />

              <div class="q-gutter-xs">
                <l-input
                  :label="this.$gl(`GTIP`, `Hs Code`)"
                  v-model="dv.lismaterials.gtip"
                  dense
                />

                <l-select
                  :label="this.$gl(`Varyant`, `Variant`)"
                  v-model="dv.lismaterials.varkey"
                  options="lisvariants"
                  optValue="varkey"
                  optTitle="stext"
                  optCaptions="varkey"
                  width="200px"
                />
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
                v-model="dv.lismaterials.prodtext"
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
                    v-model="dv.lismaterials.dimension"
                    dense
                  />
                </div>
                <div class="q-gutter-xs row">
                  <l-input
                    type="Number"
                    :label="this.$gl(`Brüt Ağırlık`, `Gross Weight`)"
                    v-model="dv.lismaterials.brutweight"
                    dense
                  />

                  <l-select
                    :label="this.$gl(`Brüt Ağırlık Br.`, `Gross Weight Unt.`)"
                    v-model="dv.lismaterials.bwunit"
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
                    v-model="dv.lismaterials.netweight"
                    dense
                  />

                  <l-select
                    :label="this.$gl(`Net Ağırlık Br.`, `Net Weight Unt.`)"
                    v-model="dv.lismaterials.nwunit"
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
                    v-model="dv.lismaterials.length"
                    dense
                  />

                  <l-select
                    :label="this.$gl(`Uzunluk Birimi`, `Unit of Length`)"
                    v-model="dv.lismaterials.lengthunit"
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
                    v-model="dv.lismaterials.height"
                    dense
                  />

                  <l-select
                    :label="this.$gl(`Yükseklik Birimi`, `Height Unit`)"
                    v-model="dv.lismaterials.heightunit"
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
                    v-model="dv.lismaterials.width"
                    dense
                  />

                  <l-select
                    :label="this.$gl(`Genişlik Birimi`, `Width Unit`)"
                    v-model="dv.lismaterials.widthunit"
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
                    v-model="dv.lismaterials.volume"
                    dense
                  />

                  <l-select
                    :label="this.$gl(`Hacim Birimi`, `Volume Unit`)"
                    v-model="dv.lismaterials.volumeunit"
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
                    v-model="dv.lismaterials.surface"
                    dense
                  />

                  <l-select
                    :label="this.$gl(`Yüzey Birimi`, `Surface Unit`)"
                    v-model="dv.lismaterials.surfaceunit"
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
          <template v-for="unit in dv.lismaterials.matunits" :key="unit.id">
            <l-card class="q-gutter-xs q-pa-xs row">
              <l-input
                :label="this.$gl(`Per Unit`, `Per Unit`)"
                v-model="unit.perskunit"
                dense
                type="number"
              />
              <l-input
                :label="this.$gl(`Stok Birimi`, `Stock Unit`)"
                v-model="dv.lismaterials.skunit"
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
          <template v-for="stock in dv.lismaterials.matstock" :key="stock.id">
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
                v-model="dv.lismaterials.purdept"
                options="lispur003"
                optValue="purdept"
                optTitle="stext"
                optCaptions="purdept"
                width="220px"
              />

              <l-select
                :label="this.$gl(`Satınalma Birimi`, `Purchasing Unit`)"
                v-model="dv.lismaterials.purunit"
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
                v-model="dv.lismaterials.purminlot"
                dense
                style="width: 220px"
              />
              <l-input
                type="Number"
                :label="
                  this.$gl(`Maximum Sipariş Seviyesi`, `Maximum Order Level`)
                "
                v-model="dv.lismaterials.purmaxlot"
                dense
                style="width: 220px"
              />
            </l-card-section>
          </l-card>

          <l-card style="width: 49%; min-width: 320px">
            <l-card-section class="row q-gutter-xs">
              <l-select
                :label="this.$gl(`Sipariş Tipi`, `Order Type`)"
                v-model="dv.lismaterials.purdoctype"
                options="lissal001"
                optValue="doctype"
                optTitle="stext"
                optCaptions="doctype"
                width="200px"
              />
              <l-select
                :label="this.$gl(`Sipariş Kalem Tipi`, `Order Item Type`)"
                v-model="dv.lismaterials.puritemtype"
                options="lispur002"
                optValue="itemtype"
                optTitle="stext"
                optCaptions="itemtype"
                width="200px"
              />

              <l-input
                type="Number"
                :label="this.$gl(`KDV`, `VAT`)"
                v-model="dv.lismaterials.purvatkey"
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
                    v-model="dv.lismaterials.ispurtolerance"
                    dense
                  />
                </l-card-section>
                <l-card-section class="q-gutter-xs row">
                  <l-input
                    type="Number"
                    :label="this.$gl(`Alt Tolerans (%)`, `Lower Tolerance (%)`)"
                    v-model="dv.lismaterials.purlowertol"
                    dense
                  />
                  <l-input
                    type="Number"
                    :label="this.$gl(`Üst Tolerans (%)`, `Upper Tolerance (%)`)"
                    v-model="dv.lismaterials.puruppertol"
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
                v-model="dv.lismaterials.saldept"
                options="lissal003"
                optValue="saldept"
                optTitle="stext"
                optCaptions="saldept"
                width="150px"
              />

              <l-select
                :label="this.$gl(`Para Birimi`, `Currency`)"
                v-model="dv.lismaterials.salcurrency"
                options="lisbas007"
                optValue="unit"
                optTitle="stext"
                optCaptions="unit"
                :optFilter="{ unittype: 1 }"
                width="160px"
              />
              <l-select
                :label="this.$gl(`Satış Birimi`, `Sales Unit`)"
                v-model="dv.lismaterials.salunit"
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
                v-model="dv.lismaterials.salminlot"
                dense
                style="width: 220px"
              />
              <l-input
                type="Number"
                :label="
                  this.$gl(`Maximum Sipariş Seviyesi`, `Maximum Order Level`)
                "
                v-model="dv.lismaterials.salmaxlot"
                dense
                style="width: 220px"
              />

              <l-input
                type="Number"
                :label="this.$gl(`Satış Fiyatı`, `Sale Price`)"
                v-model="dv.lismaterials.salprice"
                dense
                style="width: 170px"
                class="bg-teal-1"
              />
              <l-input
                type="Number"
                :label="this.$gl(`Fiyat Birimi`, `Price Unit`)"
                v-model="dv.lismaterials.salpunit"
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
                v-model="dv.lismaterials.saldoctype"
                options="lissal001"
                optValue="doctype"
                optTitle="stext"
                optCaptions="doctype"
                width="160px"
              />
              <l-select
                :label="this.$gl(`Satış Kalem Tipi`, `Sales Item Type`)"
                v-model="dv.lismaterials.salitemtype"
                options="lissal002"
                optValue="itemtype"
                optTitle="stext"
                optCaptions="itemtype"
                width="160px"
              />

              <l-input
                type="Number"
                :label="this.$gl(`KDV`, `VAT`)"
                v-model="dv.lismaterials.salvatkey"
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
                    v-model="dv.lismaterials.issaltolerance"
                    dense
                  />
                </l-card-section>
                <l-card-section class="q-gutter-xs row">
                  <l-input
                    type="Number"
                    :label="this.$gl(`Alt Tolerans (%)`, `Lower Tolerance (%)`)"
                    v-model="dv.lismaterials.sallowertol"
                    dense
                  />
                  <l-input
                    type="Number"
                    :label="this.$gl(`Üst Tolerans (%)`, `Upper Tolerance (%)`)"
                    v-model="dv.lismaterials.saluppertol"
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
                    v-model="dv.lismaterials.lpurprice"
                    dense
                    style="width: 170px"
                  />
                  <hr />

                  <l-datetime
                    v-model="dv.lismaterials.lpurpricedate"
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
                    v-model="dv.lismaterials.lowprice"
                    dense
                    style="width: 170px"
                  />

                  <l-datetime
                    v-model="dv.lismaterials.lowpricedate"
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
                    v-model="dv.lismaterials.lmoveprice"
                    dense
                    style="width: 170px"
                  />

                  <l-datetime
                    v-model="dv.lismaterials.lmovepricedate"
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
                    v-model="dv.lismaterials.lrevprice"
                    dense
                    style="width: 170px"
                  />
                  <l-datetime
                    v-model="dv.lismaterials.lrevpricedate"
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
                  v-model="dv.lismaterials.mataccgrp"
                  dense
                />
                <l-input
                  :label="this.$gl(`Satış Hesap Grubu`, `Sales Account Group`)"
                  v-model="dv.lismaterials.matsalaccgrp"
                  dense
                />
              </div>
              <q-seperator inset />
              <div class="row q-gutter-xs">
                <l-select
                  :label="this.$gl(`Para Birimi`, `Currency`)"
                  v-model="dv.lismaterials.matcurrency"
                  options="lisbas007"
                  optValue="unit"
                  optTitle="stext"
                  optCaptions="unit"
                  width="200px"
                  :optFilter="{ unittype: 1 }"
                />
                <l-input
                  :label="this.$gl(`Fiyat Birimi`, `Price Unit`)"
                  v-model="dv.lismaterials.matpunit"
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
                  v-model="dv.lismaterials.calcprice"
                  dense
                />
                <l-input
                  type="Date"
                  :label="this.$gl(`Maliyet Tarihi`, `Calculate Price Date`)"
                  v-model="dv.lismaterials.calcpricedate"
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
                  v-model="dv.lismaterials.actualprice"
                  dense
                />
                <l-input
                  type="Date"
                  :label="this.$gl(`Maliyet Tarihi`, `Calculate Price Date`)"
                  v-model="dv.lismaterials.actualpricedate"
                  dense
                />
              </l-card-section>
            </l-card-section>
          </l-card>
        </l-tab-panel>

        <l-tab-panel name="Notlar" class="q-gutter-xs">
          <template v-for="note in dv.lismaterials.matnotes" :key="note.id">
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
            :pCompany="dv.lismaterials.company"
            :pDoctype="'BAST03'"
            :pDocnum="dv.lismaterials.material"
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
  props: ["dv", "tabInfo"],
  data() {
    return {
      isSelectVar : false,
      tab: "Genel",
      lockKeyParams: {
        company: this.dv.lismaterials.company,
        lid: "BAST03",
        lockkey: this.dv.lismaterials.material,
      },
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
    };
  },

  methods: {
    async pushNewNote() {
      let newNote = { ...this.dv.lismaterials.matnotes[0] };

      for (let i in newNote) {
        newNote[i] = "";
      }

      newNote._id = undefined;

      this.dv.lismaterials.matnotes.push(newNote);
    },

    async removeNote(note) {
      this.dv.lismaterials.matnotes = [
        ...this.dv.lismaterials.matnotes.filter(
          (e) => !((e._id == note._id) & (e.notetitle == note.notetitle))
        ),
      ];
    },
    //********************************* */
    async pushNewUnit() {
      let newUnit = { ...this.dv.lismaterials.matunits[0] };

      for (let i in newUnit) {
        newUnit[i] = "";
      }

      newUnit._id = undefined;

      this.dv.lismaterials.matunits.push(newUnit);
    },
    async removeUnit(unit) {
      this.dv.lismaterials.matunits = [
        ...this.dv.lismaterials.matunits.filter(
          (e) => !((e._id == unit._id) & (e.unit == unit.unit))
        ),
      ];
    },
    //********************************* */
    async pushNewStock() {
      let newStock = { ...this.dv.lismaterials.matstock[0] };

      for (let i in newStock) {
        newStock[i] == false ? false : "";
      }

      newStock._id = undefined;

      this.dv.lismaterials.matstock.push(newStock);
    },
    async removeStock(stock) {
      this.dv.lismaterials.matstock = [
        ...this.dv.lismaterials.matstock.filter(
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
      if (this.dv.lismaterials.defspecial == null) {
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
      if (this.dv.lismaterials.defspecial == null) {
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
      await this.lis.function("BAST03/02-btnSave", this.dv);
      this.cancel();
      // await this.$Axios
      //   .post("BAST03/02-btnSave", this.dv)
      //   .then((res) => {
      //     this.$q.notify({
      //       message: this.$gl(
      //         `Malzeme Kartı Kaydedildi.`,
      //         `Material Card Saved.`
      //       ),
      //       type: "positive",
      //       actions: [{ label: "X", color: "white", dense: true }],
      //     });
      //     this.cancel();
      //   })
      //   .catch(function (err) {
      //     this.$q.notify({
      //       message: this.$gl(
      //         `Malzeme Kartı Kaydedilemedi!`,
      //         `Material Card Failed to Save!`
      //       ),
      //       caption: err.response.data,
      //       type: "negative",
      //       actions: [{ label: "X", color: "white", dense: true }],
      //     });
      //   });
    },
    cancel() {
      this.tabInfo.blockGoToTransaction = false;
      this.dv.lisDialog = "BAST03D01";
    },
    async init(prop) {
      await this.lis.function("BAST03/02-init", prop);
      // await this.$Axios
      //   .post("BAST03/02-init", prop)
      //   .then(function (res) {
      //     console.log("02-init");
      //   })
      //   .catch(function (err) {
      //     console.log(err);
      //   });
    },
  },

  mounted() {
    this.init(this.dv);
    this.tabInfo.blockGoToTransaction = true;
  },
  async beforeUnmount() {
    await this.lis.function("cls-system.unlock", this.lockKeyParams);
  },
};
</script>

function data() { throw new Error('Function not implemented.'); }
