<template>
  <div class="q-pa-xs q-gutter-xs">
    <!--Tittle Layer-->
    <l-card>
      <l-card-section :class="`bg-${tabInfo.moduleColor}`">
        <l-toolbar class="q-gutter-xs">
          <l-toolbar-title>
            <q-breadcrumbs active-color="black" style="font-size: 16px">
              <q-breadcrumbs-el
                :label="this.$gl(`Aktivite Yönetimi`, `Activity Management`)"
                icon="support_agent"
              />
              <q-breadcrumbs-el
                :label="this.$gl(`Aktivite Detayı`, `Activity Detail`)"
              />
            </q-breadcrumbs>
          </l-toolbar-title>

          <l-btn
            v-if="dv.modi != 2"
            icon="mail"
            color="info"
            @click="btnMail()"
          />
          <l-btn
            v-if="dv.modi != 2"
            icon="save"
            color="teal"
            @click="btnSave({ cancelThen: true })"
          />
          <l-btn icon="cancel" color="negative" @click="cancel()" />
        </l-toolbar>
      </l-card-section>

      <l-card-section class="row q-pa-xs q-gutter-xs">
        <l-select
          :label="this.$gl(`Firma`, `Company`)"
          v-model="dv.liscrmdocs.company"
          options="lisbas001"
          optValue="company"
          optTitle="stext"
          optCaptions="company"
          width="120px"
        />

        <l-select
          :label="this.$gl(`Aktivite Tipi`, `Activity Type`)"
          v-model="dv.liscrmdocs.acttype"
          optTitle="acttext"
          options="liscrm001"
          optValue="acttype"
          width="140px"
          class="bg-cyan-1"
          :readonly="dv.modi == 0 ? false : true"
        />


        <l-input
          
          dense
          readonly
          v-model="dv.liscrmdocs.actnum"
          :label="this.$gl(`Aktivite No`, `Activity No`)"
        />

        <l-input
          
          dense
          v-model="dv.liscrmdocs.stext"
          :label="this.$gl(`Aktivite Başlığı`, `Activity Title`)"
          class="bg-cyan-1"
        />

        <l-select
          :label="this.$gl(`Proje Kodu`, `Project Code`)"
          v-model="dv.liscrmdocs.project"
          options="liscrm003"
          optValue="project"
          optTitle="stext"
          optCaptions="project"
          width="140px"
        />

        <l-select
          :label="this.$gl(`Aktivite Sorumlusu`, `Activity Manager`)"
          v-model="dv.liscrmdocs.saldept"
          options="lissal003"
          optValue="saldept"
          optTitle="stext"
          optCaptions="saldept"
          width="150px"
          :readonly="!dv.crmAssignAuth"
        />
        <l-select
          :label="this.$gl(`Aktivite Statüsü`, `Activity Status`)"
          
          dense
          v-model="dv.liscrmdocs.actstat"
          :options="[
            {value: 0,
            label: this.$gl(`Açık`, `Open`)},
            {value: 1,
            label: this.$gl(`Beklemede`, `Pending`)},
            {value: 2,
            label: this.$gl(`Kapalı`, `Closed`)},
          
          ]"
          optValue="value"
optTitle="label"
          style="width: 180px"
        />

        <l-datetime
          v-model="dv.liscrmdocs.actdate"
          ::label="this.$gl(`Oluşturma Tarihi`,`Creation Date`)"
          style="max-width: 220px"
        />

        <l-checkbox
          :label="this.$gl(`Silindi?`, `Is Deleted?`)"
          v-model="dv.liscrmdocs._deleted"
          color="pink"
        />
      </l-card-section>
      <l-separator inset />
      <l-card-section class="row q-pa-xs q-gutter-xs">
        <l-input
          :label="this.$gl(`Müşteri Kodu`, `Customer code`)"
          
          dense
          v-model="dv.liscrmdocs.customer"
          :readonly="dv.modi == 0 ? false : true"
        >
          <l-chip
            class="bg-white"
            icon="search"
            dense
            clickable
            @click="
              dv.modi == 0
                ? (dv.liscrmdocs.isSelectCust = !dv.liscrmdocs.isSelectCust)
                : false
            "
          >
            <BAST02D01mini
              :pComp="dv.sc.company"
              :isShow="dv.liscrmdocs.isSelectCust"
              @ok="
                fetchCustInfos($event);
                dv.liscrmdocs.isSelectCust = false;
              "
              @cancel="dv.liscrmdocs.isSelectCust = false"
            />
          </l-chip>
        </l-input>

        <l-input
          
          dense
          v-model="dv.liscrmdocs.name1"
          :label="this.$gl(`Müşteri İsmi`, `Customer Name`)"
          style="width: 240px"
          class="bg-cyan-1"
          :readonly="dv.modi == 0 ? false : true"
        />

        <l-chip
          v-if="
            ((dv.liscrmdocs.customer == '') |
              (dv.liscrmdocs.customer == undefined)) &
            (dv.liscrmdocs.name1 != '')
          "
          icon="star"
          :label="
            this.$gl(
              `Aday Cari Kart Açılacak`,
              `Candidate Current Card Will Be Opened`
            )
          "
          color="orange"
          text-color="white"
        />

        <!-- Detail Part-->
      </l-card-section>
    </l-card>

    <l-card class="q-pa-xs q-gutter-xs">
      <l-tabs
        v-model="tab"
      >
        <l-tab name="Aksiyonlar" :label="this.$gl(`Aksiyonlar`, `Actions`)" />
        <l-tab name="Detay" :label="this.$gl(`Detay`, `Detail`)" />

        <l-tab
          v-if="dv.crmmaterialAuth"
          name="Malzeme"
          :label="this.$gl(`Malzeme`, `Material`)"
        />
        <l-tab
          v-if="dv.crmofferAuth"
          name="Teklif"
          :label="this.$gl(`Teklif`, `Offer`)"
        />
        <l-tab name="Notlar" :label="this.$gl(`Notlar`, `Notes`)" />
        <l-tab name="Eklenenler" :label="this.$gl(`Eklenenler`, `Added`)" />
      </l-tabs>

      <l-tab-panels v-model="tab" animated>
        <l-tab-panel name="Aksiyonlar" class="q-gutter-md q-pa-xs">
          <template v-for="(item, index) in dv.liscrmdocs.actions" :key="index">
            <l-card class="bg-brown-1">
              <l-card-section class="row">
                <l-chip
                  clickable
                  :label="index + 1"
                  @click="item.showDetail = !item.showDetail"
                />
                <crmt01d03 :dv="dv" :item="item" :tabInfo="tabInfo" />
                <l-select
                  :label="this.$gl(`Aksiyon Tipi`, `Action Type`)"
                  v-model="dv.liscrmdocs.actiontype"
                  optTitle="actiontext"
                  options="liscrm002"
                  optValue="actiontype"
                  width="140px"
                />
              
                <l-input
                  
                  dense
                  v-model="item.stext"
                  :label="this.$gl(`Aksiyon Açıklaması`, `Action Description`)"
                />
                <l-select
                  
                  dense
                  :label="this.$gl(`Statü`, `Status`)"
                  :options="[
                   { value: 0,
            label: this.$gl(`Açık`, `Open`)},
            {value: 1,
            label: this.$gl(`Beklemede`, `Pending`)},
            {value: 2,
            label: this.$gl(`Kapalı`, `Closed`)},
                  ]"
                  optValue="value"
                  optTitle="label"
                  v-model="item.actstat"
                />

                <l-input
                  
                  dense
                  readonly
                  v-model="item.doctype"
                  :label="this.$gl(`Teklif Tipi`, `Offer Type`)"
                  v-if="item.docnum != ''"
                />
                <l-input
                  
                  dense
                  readonly
                  v-model="item.docnum"
                  :label="this.$gl(`Teklif No`, `Offer No`)"
                  v-if="item.docnum != ''"
                />

                <l-datetime
                  v-model="item.actdate"
                  :label="this.$gl(`Aksiyon Tarihi`, `Action Date`)"
                  style="max-width: 220px"
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
                  @click="removeAction(item, index)"
                  >{{ this.$gl(`Sil`, `Delete`) }}</l-chip
                >
              </l-card-section>
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
            @click="pushNewAction()"
            >{{ this.$gl(`Aksiyon Ekle`, `Add Action`) }}</l-chip
          >
        </l-tab-panel>

        <l-tab-panel name="Detay" class="row q-gutter-xs q-pa-xs">
          <l-card style="width: 49%; min-width: 320px">
            <div class="text-overline q-pa-xs">Müşteri Detay Bilgileri</div>

            <l-separator inset />
            <l-card-section class="row q-gutter-xs">
              <l-input
                
                dense
                v-model="dv.liscrmdocs.busarea"
                :label="this.$gl(`İş Alanı`, `Business Area`)"
                style="width: 240px"
              />
              <l-input
                
                dense
                v-model="dv.liscrmdocs.sector"
                :label="this.$gl(`Sektör`, `Sector`)"
                style="width: 240px"
              />
              <l-input
                
                dense
                v-model="dv.liscrmdocs.taxdept"
                :label="this.$gl(`Vergi Dairesi`, `Tax Administration`)"
                style="width: 240px"
              />
              <l-input
                
                dense
                v-model="dv.liscrmdocs.taxnum"
                :label="this.$gl(`Vergi no`, `Tax Number`)"
                style="width: 240px"
              />
              <l-input
                
                dense
                v-model="dv.liscrmdocs.accesstype"
                :label="this.$gl(`Bize Ulaşma Şekli`, `How to Contact Us`)"
                style="width: 240px"
              />

              <l-select
                :label="this.$gl(`Ülke`, `Country`)"
                v-model="dv.liscrmdocs.country"
                options="lisbas005"
                optValue="country"
                optTitle="stext"
                optCaptions="country"
                width="130px"
              />
              <l-select
                :label="this.$gl(`Şehir`, `City`)"
                v-model="dv.liscrmdocs.city"
                options="lisbas006"
                optValue="city"
                optTitle="stext"
                optCaptions="city"
                width="130px"
              />
              <!-- <l-input
                
                dense
                v-model="dv.liscrmdocs.city"
                :label="this.$gl(`Şehir`, `City`)"
                style="width: 240px"
              /> -->

              <l-input
                
                dense
                v-model="dv.liscrmdocs.telnum"
                :label="this.$gl(`Telefon`, `Telephone`)"
                style="width: 240px"
              />
              <l-input
                
                dense
                v-model="dv.liscrmdocs.email"
                :label="this.$gl(`E-Mail`, `E-Mail`)"
                style="width: 240px"
              />
              <l-input
                
                dense
                autogrow
                v-model="dv.liscrmdocs.address"
                :label="this.$gl(`Adres`, `Address`)"
                style="width: 240px"
              />

              <l-input
                
                dense
                autogrow
                v-model="dv.liscrmdocs.ltext"
                :label="
                  this.$gl(
                    `Aktivite Uzun Açıklaması`,
                    `Activity Long Description`
                  )
                "
                style="width: 240px"
              />
            </l-card-section>
          </l-card>

          <l-card style="width: 49%; min-width: 320px">
            <div class="text-overline q-pa-xs">
              {{ this.$gl(`Müşteri İlgili Kişi`, `Customer Contact Person`) }}
            </div>
            <l-separator inset />
            <l-card-section class="row q-gutter-xs">
              <l-select
                :label="this.$gl(`Hitap`, `Appeal`)"
                v-model="dv.liscrmdocs.cpgender"
                :options="[{value: 0,
               label: this.$gl(`Bay`, `Mr`)}, {value: 0,
               label: this.$gl(`Bayan`, `Mrs`)}]"
                
              
                style="width: 130px"
              />
              <l-input
                :label="this.$gl(`İsim`, `Name`)"
                v-model="dv.liscrmdocs.cpname"
                
                dense
              />
              <l-input
                :label="this.$gl(`İkinci İsmi`, `Second Name`)"
                v-model="dv.liscrmdocs.cpsecondname"
                
                dense
              />
              <l-input
                :label="this.$gl(`Soy İsim`, `Surname`)"
                v-model="dv.liscrmdocs.cpsurname"
                
                dense
              />

              <l-input
                :label="this.$gl(`Departman`, `Department`)"
                v-model="dv.liscrmdocs.cpdepartment"
                
                dense
              />
              <l-input
                :label="this.$gl(`Pozisyon`, `Position`)"
                v-model="dv.liscrmdocs.cpposition"
                
                dense
              />
              <l-input
                :label="this.$gl(`Telefon`, `Telephone`)"
                v-model="dv.liscrmdocs.cpphone"
                
                dense
              />
              <l-input
                :label="this.$gl(`E-Mail`, `E-Mail`)"
                v-model="dv.liscrmdocs.cpemail"
                
                dense
              />
            </l-card-section>
          </l-card>
          <l-card style="width: 49%; min-width: 320px">
            <l-card-section class="row q-gutter-xs">
              <l-input
                
                dense
                readonly
                v-model="dv.liscrmdocs.createdAt"
                :label="
                  this.$gl(`Aktivite Açılma Tarihi`, `Activity Opening Date`)
                "
                style="width: 240px"
              />
              <l-input
                
                dense
                readonly
                v-model="dv.liscrmdocs._createdby"
                :label="this.$gl(`Oluşturan`, `Created by`)"
                style="width: 240px"
              />
            </l-card-section>
          </l-card>
          <l-card style="width: 49%; min-width: 320px">
            <l-card-section class="row q-gutter-xs"> </l-card-section>
          </l-card>
        </l-tab-panel>

        <l-tab-panel
          v-if="dv.crmmaterialAuth"
          name="Malzeme"
          class="q-gutter-md q-pa-xs"
        >
          <template
            v-for="(item, index) in dv.liscrmdocs.materials"
            :key="index"
          >
            <l-card class="bg-brown-1">
              <l-card-section class="row">
                <l-select
                  :label="this.$gl(`Tip`, `Type`)"
                  v-model="dv.liscrmdocs.mattype"
                  options="lisbas009"
                  optValue="mattype"
                  optTitle="stext"
                  optCaptions="mattype"
                  width="120px"
                  :readonly="item.isopened == true ? true : false"
                />

                <l-input
                  
                  dense
                  clearable
                  :label="this.$gl(`Malzeme Kodu`, `Material Code`)"
                  v-model="item.material"
                  readonly
                >
                </l-input>

                <l-input
                  
                  dense
                  :label="this.$gl(`Malzeme Adı`, `Material Name`)"
                  v-model="item.stext"
                  :readonly="item.isopened == true ? true : false"
                />
                <l-input
                  
                  dense
                  :label="
                    this.$gl(
                      `Malzeme Uzun Açıklama`,
                      `Material Long Description`
                    )
                  "
                  v-model="item.ltext"
                  autogrow
                  :readonly="item.isopened == true ? true : false"
                />

              

                <l-select
          :label="this.$gl(`Stok Birimi`, `Stock Unit`)"
          v-model="item.skunit"
          options="lisbas007"
          optValue="unit"
          :optFilter="{ unittype: 0 }"
          width="150px"
          dense
          :readonly="item.isopened == true ? true : false"
        />
                <l-select
                  :label="this.$gl(`Stok Tipi`, `Stock Type`)"
                  v-model="dv.liscrmdocs.specialstock"
                  options="lisinv005"
                  optValue="specialstock"
                  optTitle="stext"
                  optCaptions="specialstock"
                  width="150px"
                  :readonly="item.isopened == true? true : false"
               />

                <l-select
                  :label="this.$gl(`Statü`, `Status`)"
                  v-model="dv.liscrmdocs.matstat"
                  options="lisbas010"
                  optValue="matstat"
                  optTitle="stext"
                  optCaptions="matstat"
                  width="120px"
                  :readonly="item.isopened == true? true : false"
                 />

                <l-chip
                  clickable
                  v-if="!item.isopened & (dv.modi != 2)"
                  @click="btnNewMaterial(item, index)"
                >
                  <q-avatar
                    icon="inventory"
                    color="pink-2"
                    clickable
                    text-color="lHh Lpr lFf"
                  />
                  {{
                    this.$gl(`Malzeme Kartı Oluştur`, `Create Material Card`)
                  }}
                </l-chip>

                <l-chip
                  v-if="!item.isopened & (dv.modi != 2)"
                  dense
                  justify="right"
                  icon="cancel"
                  clickable
                  rounded
                  glossy
                  color="negative"
                  text-color="white"
                  @click="removeMaterial(item, index)"
                  >{{ this.$gl(`Sil`, `Delete`) }}</l-chip
                >
              </l-card-section>
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
            @click="pushNewMaterial()"
            >{{ this.$gl(`Malzeme Ekle`, `Add Material`) }}</l-chip
          >
        </l-tab-panel>

        <l-tab-panel
          v-if="dv.crmofferAuth"
          name="Teklif"
          class="q-gutter-md q-pa-xs"
        >
          <template v-for="(item, index) in dv.liscrmdocs.offers" :key="index">
            <l-card class="bg-brown-1">
              <l-card-section class="row">
                <l-chip label="Teklif - ">
                  {{ index + 1 }}
                </l-chip>
                <l-select
                  :label="this.$gl(`Belge Tipi`, `Document Type`)"
                  v-model="dv.liscrmdocs.doctype"
                  options="lissal001"
                  optValue="doctype"
                  optTitle="stext"
                  optCaptions="doctype"
                  width="125px"
                  :readonly="item.iscrmoffer == true ? true : false"
                />

                <l-input
                  
                  dense
                  v-model="item.docnum"
                  :label="this.$gl(`Teklif No`, `Offer No`)"
                  readonly
                  style="width: 150px"
                />

                <l-input
                  
                  dense
                  v-model="item.stext"
                  :label="this.$gl(`Açıklama`, `Description`)"
                  :readonly="item.iscrmoffer == true ? true : false"
                />
                <l-input
                  
                  dense
                  autogrow
                  v-model="item.ltext"
                  :label="this.$gl(`Uzun Açıklama`, `Long Description`)"
                  style="width: 320px"
                  :readonly="item.iscrmoffer == true ? true : false"
                />

                <l-select
          :label="this.$gl(`Para.Br.`, `Currency Unit`)"
          v-model="item.currency"
          options="lisbas007"
          optValue="unit"
          :optFilter="{ unittype: 1 }"
          width="150px"
          dense
          :readonly="item.isopened == true ? true : false"
        />

               

                <l-datetime
                  v-model="item.createdAt"
                  :label="this.$gl(`Teklif Tarihi`, `Order Date`)"
                  :readonly="true"
                  style="max-width: 220px"
                />
                <l-chip
                  clickable
                  @click="btnOpenOffer(item, index)"
                  v-if="(item.iscrmoffer == false) & (dv.modi != 2)"
                >
                  <q-avatar
                    icon="local_offer"
                    color="blue-2"
                    text-color="lHh Lpr lFf"
                  />
                  {{ this.$gl(`Teklif Oluştur`, `Create Offer`) }}
                </l-chip>

                <l-chip
                  dense
                  justify="right"
                  icon="cancel"
                  clickable
                  rounded
                  glossy
                  color="negative"
                  text-color="white"
                  @click="removeOffer(item, index)"
                  v-if="(item.iscrmoffer == false) & (dv.modi != 2)"
                  >{{ this.$gl(`Sil`, `Delete`) }}</l-chip
                >
              </l-card-section>
              <l-tabs
                v-model="offerTab"
              >
                <l-tab name="Kalemler" :label="this.$gl(`Kalemler`, `Items`)" />
                <l-tab
                  name="Ödeme Planı"
                  :label="this.$gl(`Ödeme Planı`, `Payment Plan`)"
                />
              </l-tabs>
              <l-tab-panels v-model="offerTab" animated>
                <l-tab-panel name="Kalemler" class="q-pa-xs">
                  <q-markup-table flat bordered dense>
                    <thead>
                      <tr class="bg-blue-grey-2">
                        <th class="text-left" style="width: 50px">
                          {{ this.$gl(`Kalem`, `Item`) }}
                        </th>
                        <th class="text-left">
                          {{ this.$gl(`Tipi`, `Type`) }}
                        </th>
                        <th class="text-left">
                          {{ this.$gl(`Malzeme Kodu`, `Material Code`) }}
                        </th>
                        <th class="text-left">
                          {{ this.$gl(`Malzeme Adı`, `Material Name`) }}
                        </th>
                        <th class="text-left" style="width: 90px">
                          {{ this.$gl(`Miktar`, `Quantity`) }}
                        </th>
                        <th class="text-left" style="width: 90px">
                          {{ this.$gl(`Miktar br`, `Quantity Unit`) }}
                        </th>
                        <th class="text-left" style="min-width: 120px">
                          {{ this.$gl(`Fiyat`, `Price`) }}
                        </th>
                        <th class="text-left" style="min-width: 70px">
                          {{ this.$gl(`Fiyat br`, `Price Unit`) }}
                        </th>

                        <th class="text-left" style="min-width: 120px">
                          {{ this.$gl(`Net Toplam`, `Net Total`) }}
                        </th>
                        <th class="text-left" style="min-width: 70px">KDV</th>
                        <th class="text-left" style="min-width: 120px">
                          {{ this.$gl(`KDV Tutarı`, `VAT Amount`) }}
                        </th>
                        <th class="text-left" style="min-width: 120px">
                          {{ this.$gl(`Genel Toplam`, `Overall Total`) }}
                        </th>

                        <th class="text-left" style="width: 40px"></th>
                      </tr>
                    </thead>
                    <tbody @change="calcPrice(index)">
                      <tr
                        v-for="(offerItem, offerItemIndex) in item.items"
                        :key="offerItem.id"
                      >
                        <td class="text-left">
                          {{ offerItemIndex + 1 }}
                        </td>

                        <td class="text-left">
                          <l-select
                            v-model="offerItem.itemtype"
                            :options="fetchItemTypes(item.doctype)"
                            borderless
                            optValue="itemtype" 
                            optTitle="stext"
                            optCaptions="itemtype"
                          />
                            
                          
                          <!-- <q-select
                            v-model="offerItem.itemtype"
                            :options="fetchItemTypes(item.doctype)"
                            borderless>
                            <template v-slot:option="scope">
                              <q-item v-bind="scope.itemProps">
                                <q-item-section>
                                  <q-item-label>{{
                                    scope.opt.itemtype
                                  }}</q-item-label>
                                  <q-item-label caption>{{
                                    scope.opt.stext
                                  }}</q-item-label>
                                </q-item-section>
                              </q-item>
                            </template>
                          </q-select> -->
                        </td>
                        <td class="text-left">
                          <l-input
                            v-model.number="offerItem.material"
                            dense
                            borderless
                          >
                            <l-chip
                              icon="search"
                              dense
                              clickable
                              class="bg-white"
                              @click="offerItem.isShow = !offerItem.isShow"
                            />
                          </l-input>
                          <BAST03D01mini
                            :pComp="dv.sc.company"
                            :isShow="offerItem.isShow"
                            @ok="
                              offerItem.material = $event.material;
                              offerItem.mtext = $event.stext;
                              offerItem.isShow = false;
                            "
                            @cancel="offerItem.isShow = false"
                          />
                        </td>
                        <td class="text-left">
                          <l-input dense borderless v-model="offerItem.mtext" />
                        </td>
                        <td class="text-left">
                          <l-input
                            v-model="offerItem.quantity"
                            dense
                            borderless
                            type="number"
                          />
                        </td>
                        <td class="text-left">
                          <!-- <q-select
                            v-model="offerItem.qunit"
                            :options="dv.sc.skunitOpts"
                            dense
                            borderless
                            reverse-fill-mask
                            input-class="text-right"
                          /> -->
                          <l-select
                          v-model="offerItem.qunit"
                            :options="dv.sc.skunitOpts"
                            borderless
                            reverse-fill-mask
                            input-class="text-right"
                            optValue="skunit" 
                            optTitle="stext"
                          />
                        </td>

                        <td class="text-left bg-teal-1">
                          <l-input
                            v-model="offerItem.price"
                            dense
                            borderless
                            type="number"
                          />
                        </td>
                        <td class="text-left">
                          <l-input
                            v-model="offerItem.punit"
                            dense
                            borderless
                            type="number"
                          />
                        </td>
                        <td class="text-left bg-teal-1">
                          <l-input
                            v-model="offerItem.subtotal"
                            dense
                            borderless
                            type="number"
                          />
                        </td>

                        <td class="text-left">
                          <l-input
                            type="number"
                            v-model="offerItem.vatrate"
                            dense
                            borderless
                          />
                        </td>

                        <td class="text-left bg-teal-1">
                          <l-input
                            type="number"
                            v-model="offerItem.vatamnt"
                            readonly
                            dense
                            borderless
                          />
                        </td>
                        <td class="text-left bg-teal-1">
                          <l-input
                            v-model="offerItem.grandtotal"
                            type="number"
                            dense
                            borderless
                          />
                        </td>

                        <td>
                          <l-chip
                            icon="cancel"
                            dense
                            clickable
                            text-color="negative"
                            color="white"
                            @click="removeOfferItem(index, offerItemIndex)"
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
                    @click="pushNewOfferItem(index)"
                    :disable="item.iscrmoffer == true ? true : false"
                  />
                </l-tab-panel>
                <l-tab-panel name="Ödeme Planı" class="q-pa-xs">
                  <l-card style="width: 100%">
                    <l-card-section class="row q-gutter-xs">
                      {{ this.$gl(`Ödeme Planı`, `Payment Plan`) }}
                    </l-card-section>
                    <l-separator inset />
                    <l-card-section class="row">
                      <q-markup-table style="width: 100%">
                        <thead>
                          <tr class="bg-blue-grey-2">
                            <th style="width: 35px">
                              {{ this.$gl(`No`, `No`) }}
                            </th>
                            <th style="width: 55px">
                              {{ this.$gl(`Tipi`, `Type`) }}
                            </th>
                            <th style="width: 55px">
                              {{ this.$gl(`Gün`, `Day`) }}
                            </th>
                            <th style="width: 290px">
                              {{ this.$gl(`Tarih`, `Date`) }}
                            </th>
                            <th style="width: 200px">
                              {{ this.$gl(`Yüzde %`, `Percent %`) }}
                            </th>
                            <th style="width: 200px">
                              {{ this.$gl(`Ödeme Tutarı`, `Payment Total`) }}
                            </th>
                            <th style="width: 65px">
                              {{ this.$gl(`Statü`, `Status`) }}
                            </th>
                            <th>{{ this.$gl(`Not`, `Note`) }}</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody @change="calcPayDay(index)">
                          <tr
                            v-for="(pItem, pIndex) in dv.liscrmdocs.offers[
                              index
                            ].payplan"
                            :key="pIndex"
                          >
                            <td>
                              <l-chip :label="pIndex + 1" />
                            </td>
                            <td>
                              <l-select
                              v-model="pItem.paytype"
                                :options="dv.scPaytypeOpts"
                            borderless
                            optValue="paytype" 
                            optTitle="stext"
                            optCaptions="paytype"
                          />
                              <!-- <q-select
                                v-model="pItem.paytype"
                                :options="dv.scPaytypeOpts"
                                dense
                                borderless
                                emit-value
                              >
                                <template v-slot:option="scope">
                                  <q-item v-bind="scope.itemProps">
                                    <q-item-section>
                                      <q-item-label>{{
                                        scope.opt.paytype
                                      }}</q-item-label>
                                      <q-item-label caption>{{
                                        scope.opt.stext
                                      }}</q-item-label>
                                    </q-item-section>
                                  </q-item>
                                </template>
                              </q-select> -->
                            </td>
                            <td>
                              <l-input
                                borderless
                                dense
                                v-model="pItem.payday"
                                @change="calcpaydate(index)"
                              />
                            </td>
                            <td>
                              <l-date
                                v-model="pItem.paydate"
                                @change="calcPayDay(index);"
                              />
                            </td>
                            <td>
                              <l-input
                                borderless
                                dense
                                v-model="pItem.paypercent"
                                @change="calcPayPercent(index)"
                              />
                            </td>
                            <td>
                              <l-input
                                borderless
                                dense
                                v-model="pItem.payamount"
                                @change="calcPayAmount(index)"
                              />
                            </td>
                            <td>
                              <l-input
                                borderless
                                dense
                                v-model="pItem.paystat"
                              />
                            </td>
                            <td>
                              <l-input borderless dense v-model="pItem.ltext" />
                            </td>
                            <td>
                              <l-chip
                                icon="cancel"
                                dense
                                clickable
                                text-color="negative"
                                class="bg-white"
                                @click="removePayplan(pIndex, index)"
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
                        @click="pushNewPayplan(index)"
                      />
                    </l-card-section>
                  </l-card>
                </l-tab-panel>
              </l-tab-panels>
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
            @click="pushNewOffer()"
            >{{ this.$gl(`Teklif Ekle`, `Add Offer`) }}</l-chip
          >
        </l-tab-panel>

        <l-tab-panel name="Notlar" class="q-gutter-xs q-pa-xs">
          <template v-for="note in dv.liscrmdocs.crmnotes" :key="note.id">
            <l-card class="q-gutter-xs q-pa-xs">
              <l-input
                :label="this.$gl(`Not Başlığı`, `Note Title`)"
                v-model="note.notetitle"
                
                dense
                class="bg-amber-1"
              />
              <l-input
                type="textarea"
                :label="this.$gl(`Not`, `Note`)"
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
                >{{ this.$gl(`Sil`, `Delete`) }}</l-chip
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
            >{{ this.$gl(`Not Ekle`, `Add Note`) }}</l-chip
          >
        </l-tab-panel>

        <l-tab-panel name="Eklenenler" class="q-gutter-xs">
          <l-doct02d01
            :pCompany="dv.liscrmdocs.company"
            :pDoctype="'CRMT01'"
            :pDocnum="dv.liscrmdocs.acttype + dv.liscrmdocs.actnum"
            :numRange="'custDocs'"
            :modi="dv.modi"
          />
        </l-tab-panel>
      </l-tab-panels>
    </l-card>
  </div>
</template>

<script>
//import addDocPage from "../../../components/pages/addDocPage.vue";
import crmt01d03 from "./CRMT01D03.vue";
//*** */

//*** */
export default {
  props: ["dv", "tabInfo"],
  components: {
    //addDocPage,
    crmt01d03,
  },
  data() {
    return {
      tab: "Aksiyonlar",
      offerTab: "Kalemler",
      lockKeyParams: {
        company: this.dv.liscrmdocs.company,
        lid: "CRMT01",
        lockkey: this.dv.liscrmdocs.acttype + this.dv.liscrmdocs.actnum,
      },
      dialogMaterial: false,
      dialogOffer: false,
    };
  },

  methods: {
    //---Payplan
    async pushNewPayplan(index) {
      let myReturn = await this.lis.function("SALT01/pushNewPayplan", this.dv);
      this.dv.liscrmdocs.offers[index].payplan.push(myReturn);
      //   this.$Axios.post("salt01/pushNewPayplan", this.dv).then((res) => {
      //     console.log(res.data);
      //     this.dv.liscrmdocs.offers[index].payplan.push(res.data);
      //   });
    },
    removePayplan(pIndex, index) {
      this.dv.liscrmdocs.offers[index].payplan.splice(pIndex, 1);
    },
    calcPayPercent(index) {
      var sumPercent = 0;
      for (let i in this.dv.liscrmdocs.offers[index].payplan) {
        let tmpPayPlan = this.dv.liscrmdocs.offers[index].payplan[i];

        if (sumPercent + parseInt(tmpPayPlan.paypercent) <= 100) {
          sumPercent += parseInt(tmpPayPlan.paypercent);
          if (
            (parseInt(i) + 1 ==
              this.dv.liscrmdocs.offers[index].payplan.length) &
            (this.dv.liscrmdocs.offers[index].payplan.length > 1)
          ) {
            tmpPayPlan.paypercent += 100 - sumPercent;
            sumPercent = 100;
          }
        } else {
          tmpPayPlan.paypercent = 100 - sumPercent;
          sumPercent = 100;
        }
        console.log("tmpPayPlan.payamount");

        console.log(this.dv.liscrmdocs.offers[index].grandtotal);
        console.log("tmpPayPlan.payamount");

        tmpPayPlan.payamount =
          this.dv.liscrmdocs.offers[index].grandtotal *
          (parseInt(tmpPayPlan.paypercent) / 100);
      }
    },
    calcPayAmount(index) {
      var sumAmount = 0;
      for (let i in this.dv.liscrmdocs.offers[index].payplan) {
        let tmpPayPlan = this.dv.liscrmdocs.offers[index].payplan[i];

        if (
          sumAmount + parseInt(tmpPayPlan.payamount) <=
          this.dv.lissaldocs.grandtotal
        ) {
          sumAmount += parseInt(tmpPayPlan.payamount);
          if (
            parseInt(i) + 1 ==
            this.dv.liscrmdocs.offers[index].payplan.length
          ) {
            tmpPayPlan.payamount +=
              this.dv.liscrmdocs.offers[index].grandtotal - sumAmount;
            sumAmount = this.dv.liscrmdocs.offers[index].grandtotal;
          }
        } else {
          tmpPayPlan.payamount =
            this.dv.liscrmdocs.offers[index].grandtotal - sumAmount;
          sumAmount = this.dv.liscrmdocs.offers[index].grandtotal;
        }

        tmpPayPlan.paypercent =
          (tmpPayPlan.payamount / this.dv.liscrmdocs.offers[index].grandtotal) *
          100;
      }
    },
    calcPayDay(index) {
      for (let i in this.dv.liscrmdocs.offers[index].payplan) {
        let tmpPayPlan = this.dv.liscrmdocs.offers[index].payplan[i];
        tmpPayPlan.payday =
          Math.round(
            (new Date(tmpPayPlan.paydate) - new Date()) / (1000 * 60 * 60 * 24)
          ) + 1;
        console.log(tmpPayPlan.payday);
      }
    },
    calcpaydate(index) {
      for (let i in this.dv.liscrmdocs.offers[index].payplan) {
        let tmpPayPlan = this.dv.liscrmdocs.offers[index].payplan[i];
        let tmpDate = new Date();

        tmpDate.setDate(
          Math.round(tmpDate.getDate()) + Math.round(tmpPayPlan.payday)
        );
        console.log(tmpDate);
        let pmtMonth = tmpDate.getMonth() + 1;
        tmpPayPlan.paydate =
          pmtMonth + "." + tmpDate.getDate() + "." + tmpDate.getFullYear();
        console.log(tmpPayPlan.paydate);
      }
    },
    //----------------
    calcPrice(index) {
      this.dv.liscrmdocs.offers[index].grandtotal = 0;
      this.dv.liscrmdocs.offers[index].subtotal = 0;
      for (let i in this.dv.liscrmdocs.offers[index].items) {
        let tmpSalItem = this.dv.liscrmdocs.offers[index].items[i];
        tmpSalItem.subtotal =
          tmpSalItem.quantity * (tmpSalItem.price / tmpSalItem.punit);
        this.dv.liscrmdocs.offers[index].subtotal += tmpSalItem.subtotal;
        tmpSalItem.vatamnt = tmpSalItem.subtotal * (tmpSalItem.vatrate / 100);

        tmpSalItem.grandtotal = tmpSalItem.subtotal + tmpSalItem.vatamnt;
        this.dv.liscrmdocs.offers[index].grandtotal += tmpSalItem.grandtotal;
      }
    },
    fetchItemTypes(Pdoctype) {
      let tmpTypes = this.dv.sc.salItemOpts.filter(
        (e) =>
          (e.doctype == Pdoctype) & (e.company == this.dv.liscrmdocs.company)
      );
      return tmpTypes;
    },
    //*********************** */
    async pushNewOffer() {
      let newOffer = { ...this.dv.liscrmdocs.offers[0] };

      for (let i in newOffer) {
        if (typeof newOffer[i] == "string") {
          newOffer[i] = "";
        }

        if (typeof newOffer[i] == "boolean") {
          newOffer[i] = false;
        }
      }

      newOffer._id = undefined;
      newOffer.items = [];
      newOffer.iscrmoffer = false;

      this.dv.liscrmdocs.offers.push(newOffer);
    },
    async removeOffer(item, index) {
      this.dv.liscrmdocs.offers.splice(index, 1);
    },
    async pushNewOfferItem(index) {
      console.log(index);
      let myReturn = await this.lis.function("CRMT01/pushNewOfferItem", this.dv);
      this.dv.liscrmdocs.offers[index].items.push(myReturn);
      // this.$Axios.post("CRMT01/pushNewOfferItem", this.dv).then((res) => {
      //   console.log(res.data);
      //   this.dv.liscrmdocs.offers[index].items.push(res.data);
      // });
    },

    async removeOfferItem(index, offerItemIndex) {
      this.dv.liscrmdocs.offers[index].items.splice(offerItemIndex, 1);
    },
    async btnOpenOffer(item, index) {
      //---- Controls Before Offer for Activity Save----
      if (
        (this.dv.liscrmdocs.acttype == null) |
        (this.dv.liscrmdocs.acttype == "")
      ) {
        this.$q.notify({
          type: "warning",

          message: this.$gl(
            `Aktivite Kaydedilemedi!`,
            `Activity Failed to Save!`
          ),
          caption: this.$gl(
            `Lütfen Aktivite Tipi Seçiniz!`,
            `Please Select Activity Type!`
          ),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }
      if (this.dv.liscrmdocs.stext.length <= 0) {
        this.$q.notify({
          type: "warning",
          message: this.$gl(
            `Aktivite Kaydedilemedi!`,
            `Activity Failed to Save!`
          ),
          caption: this.$gl(
            "Lütfen Aktivite Başlık Bilgisi Giriniz!",
            "Please Enter Activity Title Information!"
          ),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }
      if (this.dv.liscrmdocs.saldept.length <= 0) {
        this.$q.notify({
          type: "warning",
          message: this.$gl(
            `Aktivite Kaydedilemedi!`,
            `Activity Failed to Save!`
          ),
          caption: this.$gl(
            "Lütfen Aktivite Sorumlusu Seçiniz!",
            "Please Select Activity Manager!"
          ),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }
      if (this.dv.liscrmdocs.customer.length <= 0) {
        this.$q.notify({
          type: "warning",
          message: this.$gl(
            `Aktivite Kaydedilemedi!`,
            `Activity Failed to Save!`
          ),
          caption: this.$gl(
            "Lütfen Müşteri Seçiniz!",
            "Please Select Customer!"
          ),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }
      //---- Controls Before Offer ----
      if ((item.doctype == "") | (item.doctype == null)) {
        this.$q.notify({
          type: "warning",
          message: this.$gl(
            "Lütfen Teklif Tipi Seçiniz!",
            "Please Select Offer Type!"
          ),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }
      if ((item.stext == "") | (item.stext == null)) {
        this.$q.notify({
          type: "warning",
          message: this.$gl(
            "Lütfen Teklif Açıklaması Giriniz!",
            "Please Enter Offer Description!"
          ),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }
      if ((item.currency == "") | (item.currency == null)) {
        this.$q.notify({
          type: "warning",
          message: this.$gl(
            "Lütfen Teklif Para Birimi Seçiniz!",
            "Please Select Offer Currency!"
          ),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }

      //---- Save the Offer ----
      this.lis.objectMove(item, this.dv.liscrmdocs);
      item.company = this.dv.liscrmdocs.company;
      item.customer = this.dv.liscrmdocs.customer;
      item.name1 = this.dv.liscrmdocs.name1;
      item.createdAt = new Date();
      this.dv.liscrmdocs.offers[index] = await this.lis.function(
        "CRMT01/openOffer",
        item
      );
      // this.$Axios
      //   .post("CRMT01/openOffer", item)
      //   .then((res) => {
      //     console.log("********************");
      //     console.log(res.data);
      //     this.dv.liscrmdocs.offers[index] = res.data;
      //     this.$q.notify({
      //       message: this.$gl("Teklif Açıldı", "Offer Opened."),
      //       type: "positive",
      //       actions: [{ label: "X", color: "white", dense: true }],
      //     });

      //---- Push Offer Action ----

      let newAction = { ...this.dv.liscrmdocs.actions[0] };

      for (let i in newAction) {
        newAction[i] = "";
      }
      newAction._id = undefined;
      newAction.actdate = new Date().toLocaleString();
      newAction.actstat = "Beklemede";
      newAction.type = "P0";
      newAction.stext = "Teklif İsteği.";
      newAction.doctype = res.data.doctype;
      newAction.docnum = res.data.docnum;
      this.dv.liscrmdocs.actions.push(newAction);
      this.$q.notify({
        message: this.$gl(
          "Teklif Aksiyonu Girişi Yapıldı.",
          "Offer Action Entry Has Been Done."
        ),
        type: "positive",
        actions: [{ label: "X", color: "white", dense: true }],
      });

      //---- Save the Activity ----
      this.btnSave({ cancelThen: false });
      // })
      // .catch((err) => {
      //   this.$q.notify({
      //     message: this.$gl("Teklif Açılamadı!", "Offer Failed!"),
      //     caption: err.response.data,
      //     type: "negative",
      //     actions: [{ label: "X", color: "white", dense: true }],
      //   });
      // });
    },
    async pushNewMaterial() {
      let newMaterial = { ...this.dv.liscrmdocs.materials[0] };

      for (let i in newMaterial) {
        if (typeof newMaterial[i] == "string") {
          newMaterial[i] = "";
        }

        if (typeof newMaterial[i] == "boolean") {
          newMaterial[i] = false;
        }
        if (typeof newMaterial[i] == "object") {
          newMaterial[i] = [];
        }
      }

      newMaterial._id = undefined;

      this.dv.liscrmdocs.materials.push(newMaterial);
    },

    async removeMaterial(item, index) {
      this.dv.liscrmdocs.materials.splice(index, 1);
    },
    async btnNewMaterial(item, index) {
      item.company = this.dv.liscrmdocs.company;
      //Ekranda seçilir hale getirilecek
      item.specialstock = "1";
      item.matstat = "T";
      //----------------------
      this.dv.liscrmdocs.materials[index].material = await this.lis.function(
        "CRMT01/openMaterial",
        item
      ).material;
      this.dv.liscrmdocs.materials[index].isopened = true;

      // await this.$Axios
      //   .post("CRMT01/openMaterial", item)
      //   .then((res) => {
      //     this.dv.liscrmdocs.materials[index].isopened = true;
      //     this.dv.liscrmdocs.materials[index].material = res.data.material;
      //     this.$q.notify({
      //       message: this.$gl("Malzeme Kartı Açıldı.", "Material Card Opened."),
      //       type: "positive",
      //       actions: [{ label: "X", color: "white", dense: true }],
      //     });
      //---- Save the Activity ----
      this.btnSave({ cancelThen: false });
      // })
      // .catch((err) => {
      //   this.$q.notify({
      //     message: this.$gl(
      //       "Malzeme Kartı Açılamadı!",
      //       "Unable to Open Material Card!"
      //     ),
      //     caption: err.response.data,
      //     type: "negative",
      //     actions: [{ label: "X", color: "white", dense: true }],
      //   });
      //   return;
      // });
    },
    async btnFetchMaterial() {
      let newMaterial = { ...this.dv.liscrmdocs.materials[0] };

      for (let i in newMaterial) {
        newMaterial[i] = "";
      }
      newMaterial._id = undefined;
      newMaterial.company = dv.sc.company;

      this.dv.liscrmdocs.materials.push(newMaterial);
    },

    // Notes
    async pushNewNote() {
      let newNote = { ...this.dv.liscrmdocs.crmnotes[0] };

      for (let i in newNote) {
        newNote[i] = "";
      }
      newNote._id = undefined;

      this.dv.liscrmdocs.crmnotes.push(newNote);
    },
    async removeNote(note) {
      this.dv.liscrmdocs.crmnotes = [
        ...this.dv.liscrmdocs.crmnotes.filter(
          (e) => !((e._id == note._id) & (e.notetitle == note.notetitle))
        ),
      ];
    },
    // Actions
    async pushNewAction() {
      let newAction = { ...this.dv.liscrmdocs.actions[0] };

      for (let i in newAction) {
        newAction[i] = "";
      }
      newAction._id = undefined;
      newAction.actdate = new Date().toLocaleString();

      this.dv.liscrmdocs.actions.push(newAction);
    },
    async removeAction(item, index) {
      this.dv.liscrmdocs.actions.splice(index, 1);
    },

    //**** Fetch Customer Infos */
    fetchCustInfos(cust) {
      this.lis.objectMove(this.dv.liscrmdocs, cust);
      this.dv.liscrmdocs.customer = cust.customer;
      this.dv.liscrmdocs.name1 = cust.name1;
      this.dv.liscrmdocs.address = cust.address;
      this.dv.liscrmdocs.telnum = cust.telnum;
      this.dv.liscrmdocs.email = cust.email;
      this.dv.liscrmdocs.cpgender = cust.custper[0].gender;
      this.dv.liscrmdocs.cpname = cust.custper[0].name;
      this.dv.liscrmdocs.cpsecondname = cust.custper[0].secondname;
      this.dv.liscrmdocs.cpsurname = cust.custper[0].surname;
      this.dv.liscrmdocs.cpdepartment = cust.custper[0].department;
      this.dv.liscrmdocs.cpposition = cust.custper[0].position;
    },
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.dv.sc.fCustomerOpts = this.dv.sc.customerOpts;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.dv.sc.fCustomerOpts = this.dv.sc.customerOpts.filter(
          (v) => v.name1.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    //**** Fetch Material Infos */
    fetchMatInfos(mat, index) {
      this.dv.liscrmdocs.material[index].stext = mat.stext;
      this.dv.liscrmdocs.material[index].ltext = mat.Ltext;
      this.dv.liscrmdocs.material[index].mattype = mat.mattype;
      this.dv.liscrmdocs.material[index].skunit = mat.skunit;
    },
    filterMaterial(val, update) {
      if (val === "") {
        update(() => {
          this.dv.sc.fCustomerOpts = this.dv.sc.customerOpts;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.dv.sc.fCustomerOpts = this.dv.sc.customerOpts.filter(
          (v) => v.name1.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    async btnMail() {
      await this.lis.function("cls-system.sendMail", this.dv);
      // await this.$Axios
      //   .post("cls-system.sendMail", this.dv)
      //   .then((res) => {
      //     console.log("Mail gönderildi.");
      //   })
      //   .catch(function (err) {
      //     console.log(err);
      //   });
    },
    async btnSave(props) {
      //----- Controls Before Save ---------
      if (
        (this.dv.liscrmdocs.acttype == null) |
        (this.dv.liscrmdocs.acttype == "")
      ) {
        this.$q.notify({
          type: "warning",
          message: this.$gl(
            "Lütfen Aktivite Tipi Seçiniz!",
            "Please Select Activity Type!"
          ),
          caption: this.$gl(
            `Aktivite Kaydedilemedi!`,
            `Activity Failed to Save!`
          ),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }
      if (this.dv.liscrmdocs.stext.length <= 0) {
        this.$q.notify({
          type: "warning",
          message: this.$gl(
            "Lütfen Aktivite Başlık Bilgisi Giriniz!",
            "Please Enter Activity Title Information!"
          ),
          caption: this.$gl(
            `Aktivite Kaydedilemedi!`,
            `Activity Failed to Save!`
          ),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }
      if (this.dv.liscrmdocs.saldept.length <= 0) {
        this.$q.notify({
          type: "warning",
          message: this.$gl(
            "Lütfen Aktivite Sorumlusu Seçiniz!",
            "Please Select Activity Manager!"
          ),
          caption: this.$gl(
            `Aktivite Kaydedilemedi!`,
            `Activity Failed to Save!`
          ),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }
      if (this.dv.liscrmdocs.name1.length <= 0) {
        this.$q.notify({
          type: "warning",
          message: this.$gl(
            "Müşteri İsmi Boş Bırakılamaz!",
            "Customer Name Cannot Be Blank!"
          ),
          caption: this.$gl(
            `Aktivite Kaydedilemedi!`,
            `Activity Failed to Save!`
          ),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }
      console.log("this.dv.liscrmdocs.actions.length");
      console.log(this.dv.liscrmdocs.actions.length);
      if (this.dv.liscrmdocs.actions.length <= 0) {
        this.$q.notify({
          type: "warning",
          message: this.$gl("Lütfen Aksiyon Giriniz!", "Please Enter Action!"),
          caption: this.$gl(
            `Aktivite Kaydedilemedi!`,
            `Activity Failed to Save!`
          ),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }
      //------ Save The Document ----------
      await this.lis.function("CRMT01/02-btnSave", this.dv);
      if (props.cancelThen == true) {
        this.cancel();
      }
      // await this.$Axios
      //   .post("CRMT01/02-btnSave", this.dv)
      //   .then((res) => {
      //     if (this.dv.liscrmdocs.customer.length <= 0) {
      //       this.$q.notify({
      //         message: this.$gl(
      //           "Yeni Aday Müşteri Kartı Açıldı.",
      //           "New Prospective Customer Card Opened."
      //         ),
      //         type: "positive",
      //         actions: [{ label: "X", color: "white", dense: true }],
      //       });
      //     }

      //     this.$q.notify({
      //       message: this.$gl(`Aktivite Kaydedildi.`, `Activity Saved.`),
      //       type: "positive",
      //       actions: [{ label: "X", color: "white", dense: true }],
      // });
      //   if (props.cancelThen == true) {
      //     this.cancel();
      //   }
      // })
      // .catch(function (err) {
      //   this.$q.notify({
      //     message: this.$gl(
      //       `Aktivite Kaydedilemedi!`,
      //       `Activity Failed to Save!`
      //     ),
      //     caption: err.response.data,
      //     type: "negative",
      //     actions: [{ label: "X", color: "white", dense: true }],
      //   });
      // });
    },
    cancel() {
      console.log("cancel");
      this.dv.lisDialog = "crmt01d01";
      this.dv.liscrmdocs = {};
      this.tabInfo.blockGoToTransaction = false;
    },
    async init(prop) {
      await this.lis.function("CRMT01/02-init", prop);
      // await this.$Axios
      //   .post("CRMT01/02-init", prop)
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
    console.log("02 created çalıştı");
    this.tabInfo.blockGoToTransaction = true;

    if (this.dv.modi == 0) {
      this.dv.liscrmdocs.materials[0].company = this.dv.sc.company;
      this.dv.liscrmdocs.saldept = this.dv.sc.saldept;
    }
  },
  async beforeUnmount() {
    console.log("beforeUnmount");
    if (this.dv.modi != 2) {
      //this.$Axios.post("cls-system.unlock", this.lockKeyParams);
      await this.lis.function("cls-system.unlock", this.lockKeyParams);
    }
  },
};
</script>
