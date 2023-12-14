<template>
  <l-div>
    <!--Tittle Layer-->

    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-toolbar>
          <l-icon size="md" name="assignment_ind" />

          <l-toolbar-title>{{
            this.$gl(`Cari Kart Detayı`, `Current Card Detail`)
          }}</l-toolbar-title>

          <l-div-flex>
            <l-btn
              v-if="modi != 2"
              icon="save"
              color="teal"
              @click="btnSave()"
            />
            <l-btn
              v-if="isChild != true"
              icon="cancel"
              color="negative"
              @click="cancel()"
            />
            <l-btn
              v-if="isChild == true"
              icon="cancel"
              color="negative"
              @click="$emit('cancel')"
            />
          </l-div-flex>
        </l-toolbar>
      </l-toolbar>

      <l-div-flex>
        <!-- Detail Part-->

        <l-select
          :label="this.$gl(`Firma`, `Company`)"
          v-model="liscustomer.company"
          options="lisbas001"
          optValue="company"
          optTitle="stext"
          optCaptions="company"
          width="120px"
          class="bg-blue-1"
        />

        <l-select
          :label="this.$gl(`İş Alanı`, `Business Area`)"
          v-model="liscustomer.busarea"
          options="lisbas003"
          optValue="busarea"
          optTitle="stext"
          optCaptions="busarea"
          width="120px"
          class="bg-blue-1"
        />

        <l-select
          v-model="liscustomer.custorvend"
          map-options
          :options="[
            { value: 0, label: this.$gl('Aday', `Applicant`) },
            { value: 1, label: this.$gl('Müşteri', `Customer`) },
            { value: 2, label: this.$gl('Tedarikçi', `Vendor`) },
          ]"
          optValue="value"
          optTitle="label"
          :label="this.$gl(`Cari Tipi`, `Current Type`)"
          style="min-width: 180px"
          class="bg-blue-1"
        ></l-select>

        <l-input
          :readonly="modi == '2' ? 'true' : 'false'"
          v-model="liscustomer.customer"
          :label="this.$gl(`Cari Kodu`, `Current Code`)"
        />
        <l-input
          v-model="liscustomer.name1"
          :label="this.$gl(`Cari Adı`, `Current Name`)"
          style="min-width: 300px"
        />
        <l-input
          v-model="liscustomer.title"
          :label="this.$gl(`Ünvan`, `Title`)"
          style="min-width: 300px"
        />

        <l-select
          v-model="liscustomer.islocked"
          :label="this.$gl(`Bloke Statüsü`, `Blocked Status`)"
          map-options
          :options="[
            { label: this.$gl(`Blokesiz`, `Unblocked`), value: 0 },
            { label: this.$gl(`Blokeli`, `Blocked`), value: 1 },
            {
              label: this.$gl(`Ödeme Blokeli`, `Payment Blocked`),
              value: 2,
            },
          ]"
          optValue="value"
          optTitle="label"
          style="min-width: 200px"
        />

        <l-checkbox
          :label="this.$gl(`Silindi mi?`, `Is Delete?`)"
          v-model="liscustomer._deleted"
        />
      </l-div-flex>

      <l-separator inset />
      <l-div-flex>
        <l-select
          :label="this.$gl(`Sektör`, `Sector`)"
          v-model="liscustomer.sector"
          options="lisbas004"
          optValue="sector"
          optTitle="stext"
          optCaptions="sector"
          width="120px"
        />
        <l-select
          :label="this.$gl(`Ülke`, `Country`)"
          v-model="liscustomer.country"
          options="lisbas005"
          optValue="country"
          optTitle="stext"
          optCaptions="country"
          width="130px"
        />

        <l-input
          v-model="liscustomer.taxdept"
          :label="this.$gl(`Vergi Dairesi`, `Tax Administration`)"
          style="width: 300px"
        />
        <l-input
          v-model="liscustomer.taxnum"
          :label="this.$gl(`Vergi No`, `Tax Nnumber`)"
          style="width: 300px"
        />

        <l-select
          :label="this.$gl(`Para Birimi`, `Currency`)"
          v-model="liscustomer.currency"
          options="lisbas007"
          optValue="unit"
          optTitle="stext"
          optCaptions="unit"
          :optFilter="{ unittype: 1 }"
          width="200px"
        />
      </l-div-flex>
    </l-card0>

    <!-- ****************************** -->

    <l-card>
      <l-tabs v-model="tab">
        <l-tab name="Genel" :label="this.$gl(`Genel`, `General`)" />
        <l-tab name="Muhasebe" :label="this.$gl(`Muhasebe`, `Accounting`)" />
        <l-tab name="Banka" :label="this.$gl(`Banka`, `Bank`)" />
        <l-tab name="Adres" :label="this.$gl(`Adres`, `Address`)" />
        <l-tab
          name="İlgili Kişi"
          :label="this.$gl(`İlgili Kişi`, `Related person`)"
        />
        <l-tab name="Malzemeler" :label="this.$gl(`Malzemeler`, `Materials`)" />
        <l-tab name="Notlar" :label="this.$gl(`Notlar`, `Notes`)" />
        <l-tab name="Eklenenler" :label="this.$gl(`Eklenenler`, `Added`)" />
      </l-tabs>

      <l-separator />

      <l-tab-panels v-model="tab">
        <l-tab-panel name="Genel" class="q-gutter-xs row">
          <l-card style="width: 49%; min-width: 320px">
            <l-card-section>
              <div class="text-overline">
                {{ this.$gl("Adres Bilgisi", "Address Information") }}
              </div>
            </l-card-section>
            <l-separator inset />
            <l-card-section class="row q-gutter-xs">
              <l-input
                v-model="liscustomer.postcode"
                :label="this.$gl(`Posta Kodu`, `Post Code`)"
              />
              <l-select
                :label="this.$gl(`Şehir`, `City`)"
                v-model="liscustomer.city"
                options="lisbas006"
                optValue="city"
                optTitle="stext"
                optCaptions="city"
                width="130px"
              />
              <l-input
                type="textarea"
                v-model="liscustomer.address"
                :label="this.$gl(`Adres`, `Address`)"
                autogrow
                style="min-width: 300px"
              >
              </l-input>
              <l-input
                v-model="liscustomer.telnum"
                :label="this.$gl(`Telefon No`, `Phone Number`)"
                mask="+## (###) ### - ####"
              />
              <l-input
                v-model="liscustomer.faxnum"
                :label="this.$gl(`Fax No`, `Fax Number`)"
              />
              <l-input
                v-model="liscustomer.email"
                :label="this.$gl(`E-Mail`, `E-Mail`)"
              />
              <l-input
                v-model="liscustomer.website"
                :label="this.$gl(`Web Sitesi`, `Website`)"
              />
            </l-card-section>
          </l-card>

          <l-card style="width: 49%; min-width: 320px">
            <l-card-section>
              <div class="text-overline">
                {{ this.$gl("Detay Bilgisi", "Detail Information") }}
              </div>
            </l-card-section>
            <l-separator inset />
            <l-card-section class="row q-gutter-xs"> </l-card-section>
          </l-card>
        </l-tab-panel>

        <l-tab-panel name="Muhasebe" class="q-gutter-xs row">
          <l-card style="width: 49%; min-width: 320px">
            <l-div-flex>
              <div class="text-overline">
                {{ this.$gl("Hesap", "Account") }}
              </div>

              <l-space />
              <l-chip
                label="Hesap Hareketleri"
                color="teal-4"
                outline
                clickable
                @click="isShowFint03 = true"
              />
            </l-div-flex>
            <l-separator inset />
            <l-card-section class="row q-gutter-xs">
              <l-div-flex>
                <l-select
                  :label="this.$gl(`Hesap Tipi`, `Account Type`)"
                  v-model="liscustomer.acctype"
                  options="lisfin004"
                  optValue="acctype"
                  optTitle="stext"
                  optCaptions="acctype"
                  width="150px"
                  class="bg-blue-1"
                />

                <l-input
                  :label="
                    this.$gl(
                      `Müşt./Ted. Hesap No`,
                      `Cust./Vend. Account Number`
                    )
                  "
                  v-model="liscustomer.glaccount"
                  class="bg-blue-1"
                />
                <l-input
                  :label="
                    this.$gl(`Muhasebe Hesap No`, `Accounting Account Number`)
                  "
                  v-model="liscustomer.account"
                />

                <l-select
                  v-model="liscustomer.exchmethod"
                  :label="
                    this.$gl(
                      `Kur Hesaplama Metodu`,
                      `Currency Calculation Method`
                    )
                  "
                  map-options
                  :options="[
                    {
                      label: this.$gl(`Alış Kuru`, `Buying Rate`),
                      value: 0,
                    },
                    {
                      label: this.$gl('Satış Kuru', `Sales Rate`),
                      value: 1,
                    },
                    {
                      label: this.$gl(
                        'Efektif Alış Kuru',
                        `Effective Buying Rate`
                      ),
                      value: 2,
                    },
                    {
                      label: this.$gl(
                        'Efektif Satış Kuru',
                        `Effective Sales Rate`
                      ),
                      value: 3,
                    },
                  ]"
                  optValue="value"
                  optTitle="label"
                  style="width: 220px"
                />
              </l-div-flex>

              <div class="row q-gutter-xs q-pa-xs">
                <l-input
                  class="bg-white"
                  :label="this.$gl(`Kredi Limiti`, `Credit Limit`)"
                  v-model="liscustomer.creditlimit"
                />

                <l-select
                  :label="this.$gl(`P.Br.`, `Currency`)"
                  v-model="liscustomer.creditlimitcurr"
                  options="lisbas007"
                  optValue="unit"
                  optTitle="stext"
                  optCaptions="unit"
                  :optFilter="{ unittype: 1 }"
                  style="min-width: 80px"
                  class="bg-white"
                />
              </div>
            </l-card-section>
          </l-card>

          <l-card style="width: 49%; min-width: 320px">
            <l-card-section>
              <div class="text-overline">
                {{ this.$gl(`Satış`, `Sales`) }}
              </div>
            </l-card-section>
            <l-separator inset />
            <l-card-section class="row q-gutter-xs">
              <l-select
                :label="this.$gl(`Satış Bölümü`, `Sales Department`)"
                v-model="liscustomer.saldept"
                options="lissal003"
                optValue="saldept"
                optTitle="stext"
                optCaptions="saldept"
                width="150px"
              />
              <l-select
                :label="this.$gl(`Müşteri Grubu`, `Customer Group`)"
                v-model="liscustomer.custgrp"
                options="lisbas008"
                optValue="custgrp"
                width="150px"
              />
              <l-select
                :label="this.$gl(`E-Fatura Tipi`, `E-Invoice Type`)"
                v-model="liscustomer.einvotype"
                map-options
                :options="[
                  {
                    value: 0,
                    label: this.$gl(`Belge Tipinden`, `From Document Type`),
                  },
                  {
                    value: 1,
                    label: this.$gl(`Temel Fatura`, `Basic Invoice`),
                  },
                  {
                    value: 2,
                    label: this.$gl(`Ticari Fatura`, `Commercial Invoice`),
                  },
                ]"
                optValue="value"
                optTitle="label"
                style="width: 200px"
              />
            </l-card-section>
            <l-separator inset />
            <l-card-section horizontal>
              <l-card-section>
                <l-checkbox
                  :label="this.$gl(`E-İrsaliye Mükellefi`, `E-Waybill Payer`)"
                  v-model="isEdelMember"
                  disable
                />
              </l-card-section>
              <l-separator inset vertical />
              <l-card-section>
                <l-checkbox
                  :label="this.$gl(`E-Fatura Mükellefi`, `E-Invoice Payer`)"
                  v-model="isEinvMember"
                  disable
                />
              </l-card-section>
            </l-card-section>
          </l-card>

          <l-card style="width: 49%; min-width: 320px">
            <l-card-section>
              <div class="text-overline">
                {{ this.$gl(`Satın Alma`, `Purchasing`) }}
              </div>
            </l-card-section>
            <l-separator inset />
            <l-card-section class="row q-gutter-xs">
              <l-select
                :label="this.$gl(`Satınalma Bölümü`, `Purchasing Department`)"
                v-model="liscustomer.purdept"
                options="lispur003"
                optValue="purdept"
                optTitle="stext"
                optCaptions="purdept"
                width="150px"
              />

              <l-select
                :label="this.$gl(`Kur Değer Yöntemi`, `Currency Value Method`)"
                v-model="liscustomer.manexchrate"
                :options="[
                  {
                    label: this.$gl(`Sipariş Tarihi`, `Order Date`),
                    value: 0,
                  },
                  {
                    label: this.$gl(`İrsaliye Tarihi`, `Waybill date`),
                    value: 1,
                  },
                  {
                    label: this.$gl(`Fatura Tarihi`, `Invoice Date`),
                    value: 2,
                  },
                  {
                    label: this.$gl(`Sabitlenmiş`, `Pinned`),
                    value: 3,
                  },
                ]"
                optValue="value"
                optTitle="label"
                style="width: 150px"
              />
            </l-card-section>
          </l-card>

          <l-card style="width: 49%; min-width: 320px">
            <l-card-section>
              <div class="text-overline">
                {{ this.$gl(`Ödeme`, `Payment`) }}
              </div>
            </l-card-section>
            <l-separator inset />
            <l-card-section class="row q-gutter-xs"> </l-card-section>
          </l-card>

          <l-card style="width: 49%; min-width: 320px">
            <l-card-section>
              <div class="text-overline">
                {{ this.$gl(`Nakliye`, `Transport`) }}
              </div>
            </l-card-section>
            <l-separator inset />
            <l-card-section class="row q-gutter-xs"> </l-card-section>
          </l-card>
        </l-tab-panel>

        <l-tab-panel name="Banka" class="q-gutter-xs">
          <template v-for="bank in liscustomer.custbanks" :key="bank.id">
            <l-card class="row q-gutter-xs q-pa-xs">
              <l-input
                :label="this.$gl(`Banka No`, `Bank Number`)"
                v-model="bank.banknum"
              />
              <l-input
                :label="this.$gl(`Banka Adı`, `Bank Name`)"
                v-model="bank.bankname"
              />
              <l-input
                :label="this.$gl(`Banka Adresi`, `Bank Address`)"
                v-model="bank.bankaddress"
              />
              <l-input
                :label="this.$gl(`Hesap No`, `Account Number`)"
                v-model="bank.account"
              />
              <l-input :label="this.$gl(`İban`, `IBAN`)" v-model="bank.iban" />
              <l-input
                :label="this.$gl(`Swift`, `Swift`)"
                v-model="bank.swift"
              />
              <l-input
                :label="this.$gl(`Ülke`, `Country`)"
                v-model="bank.country"
              />
              <l-input
                :label="this.$gl(`Para Birimi`, `Currency`)"
                v-model="bank.currency"
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
                @click="removeBank(bank)"
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
            @click="pushNewBank()"
            >{{ this.$gl("Banka Ekle", "Add Bank") }}</l-chip
          >
        </l-tab-panel>
        <l-tab-panel name="Adres" class="q-gutter-xs row">
          <template v-for="adr in liscustomer.custaddress" :key="adr.id">
            <l-card class="row q-gutter-xs q-pa-xs">
              <l-input
                type="number"
                :label="this.$gl(`Adres No`, `Address Number`)"
                v-model="adr.adrnum"
                class="bg-blue-2"
              />
              <l-input
                :label="this.$gl(`Adres İsmi`, `Address Name`)"
                v-model="adr.addressname"
              />
              <l-input
                :label="this.$gl(`Ülke`, `Country`)"
                v-model="adr.country"
              />
              <l-input :label="this.$gl(`Şehir`, `City`)" v-model="adr.city" />
              <l-input
                :label="this.$gl(`Adres`, `Address`)"
                v-model="adr.address"
                autogrow
                style="width: 300px"
              />
              <l-input
                :label="this.$gl(`Posta Kodu`, `Post Code`)"
                v-model="adr.postcode"
              />
              <l-input
                :label="this.$gl(`Telefon`, `Telephone`)"
                v-model="adr.telnum"
              />
              <l-input :label="this.$gl(`Fax`, `Fax`)" v-model="adr.faxnum" />
              <l-input
                :label="this.$gl(`E-Mail`, `E-Mail`)"
                v-model="adr.email"
              />

              <l-select
                :label="this.$gl(`Cari Tipi`, `Customer Type`)"
                v-model="adr.choicetype"
                map-options
                :options="[
                  {
                    value: 0,
                    label: this.$gl(`Müşteri`, `Customer`),
                  },
                  {
                    value: 1,
                    label: this.$gl(`Tedarikçi`, `Vendor`),
                  },
                  {
                    value: 2,
                    label: this.$gl(`Herikisi`, `Both of them`),
                  },
                ]"
                optValue="value"
                optTitle="label"
                style="width: 170px"
              />
              <l-select
                :label="this.$gl(`Fatura tipi`, `Invoice Type`)"
                v-model="adr.addresstype"
                :options="[
                  {
                    value: 0,
                    label: this.$gl(`İrsaliye`, `Waybill`),
                  },
                  {
                    value: 1,
                    label: this.$gl(`Fatura`, `Invoice`),
                  },
                  {
                    value: 2,
                    label: this.$gl(`Hiçbiri`, `None`),
                  },
                ]"
                optValue="value"
                optTitle="label"
                optCaptions="value"
                style="width: 130px"
              />

              <l-input
                type="textarea"
                :label="this.$gl(`Notlar`, `Notes`)"
                v-model="adr.notes"
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
                @click="removeAddress(adr)"
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
            @click="pushNewAddress()"
            >{{ this.$gl("Adres Ekle", "Add Address") }}</l-chip
          >
        </l-tab-panel>

        <l-tab-panel name="İlgili Kişi" class="q-gutter-xs row">
          <template v-for="per in liscustomer.custper" :key="per.id">
            <l-card class="row q-gutter-xs q-pa-xs">
              <l-select
                :label="this.$gl(`Hitap`, `Appeal`)"
                v-model="per.gender"
                :options="[
                  {
                    value: 0,
                    label: this.$gl(`Bay`, `Mr`),
                  },
                  {
                    value: 1,
                    label: this.$gl(`Bayan`, `Mrs`),
                  },
                ]"
                optValue="value"
                optTitle="label"
                map-options
                style="width: 150px"
              />
              <l-input label="İsim" v-model="per.name" />
              <l-input
                :label="this.$gl(`İkinci İsmi`, `Second Name`)"
                v-model="per.secondname"
              />
              <l-input
                :label="this.$gl(`Soy İsim`, `Surname`)"
                v-model="per.surname"
              />

              <l-input
                :label="this.$gl(`Departman`, `Department`)"
                v-model="per.department"
              />
              <l-input
                :label="this.$gl(`Pozisyon`, `Position`)"
                v-model="per.position"
              />
              <l-input
                :label="this.$gl(`Telefon No`, `Phone Number`)"
                v-model="per.phone"
              />
              <l-input
                :label="this.$gl(`Dahili`, `Internal`)"
                v-model="per.extphone"
              />

              <l-input
                :label="this.$gl(`Cep Telefon`, `Cell Phone Number`)"
                v-model="per.mobil"
              />
              <l-input
                :label="
                  this.$gl(`Cep Telefon (Özel)`, `Cell Phone Number (Special)`)
                "
                v-model="per.mobils"
              />
              <l-input
                :label="this.$gl(`E-Mail`, `E-Mail`)"
                v-model="per.email"
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
                @click="removePer(per)"
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
            @click="pushNewPer()"
            >{{ this.$gl("Kişi Ekle", "Add Person") }}</l-chip
          >
        </l-tab-panel>

        <l-tab-panel name="Malzemeler" class="q-gutter-xs">
          <l-card class="q-gutter-xs q-pa-xs">
            <l-card-section>
              {{ this.$gl("Satılan Malzemeler", "Customer Materials") }}
              <l-table
                name = "BAST02D02"
                v-model="liscusmat"
                :columns="myColumnsSal"
                :summary = "false"
                :readonly="true"
              />
            </l-card-section>
            <q-seperator inset />
            <!-- <template v-for="mat in liscusmat" :key="mat.id">
              <q-markup-table>
                <thead>
                  <th>
                    {{ this.$gl("Müşteri Kodu", "Customer Code") }}
                  </th>
                  <th>
                    {{ this.$gl("Müşteri Adı", "Customer Name") }}
                  </th>
                  <th>
                    {{ this.$gl("Malzeme Kodu", "Material Code") }}
                  </th>
                  <th>
                    {{ this.$gl("Malzeme Açıklaması", "Material Description") }}
                  </th>
                  <th>
                    {{
                      this.$gl(
                        "Müşterideki Malzeme Kodu",
                        "Material Code at Customer"
                      )
                    }}
                  </th>
                  <th>
                    {{
                      this.$gl(
                        "Müşterideki Malzeme Açıklaması",
                        "Material Description in Customer"
                      )
                    }}
                  </th>
                </thead>
                <tbody>
                  <tr v-if="mat.custorvend == 'Müşteri'">
                    <td>
                      {{ mat.customer }}
                    </td>
                    <td>
                      {{ mat.name }}
                    </td>
                    <td>
                      {{ mat.material }}
                    </td>
                    <td>
                      {{ mat.mtext }}
                    </td>
                    <td>
                      {{ mat.materialcust }}
                    </td>
                    <td>
                      {{ mat.mtextcust }}
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </template> -->
          </l-card>
          <l-card class="q-gutter-xs q-pa-xs">
            <l-card-section>
              {{ this.$gl("Alınan Malzemeler", "Vendor Materials") }}
              <l-table
                name = "BAST02D02"
                v-model="liscusmat"
                :columns="myColumnsPur"
               :summary = "false"
                :readonly="true"
              />
            </l-card-section>
            <q-seperator inset />
            <!-- <template v-for="mat in liscusmat" :key="mat.id">
              <q-markup-table>
                <thead>
                  <th>
                    {{ this.$gl("Müşteri Kodu", "Customer Code") }}
                  </th>
                  <th>
                    {{ this.$gl("Müşteri Adı", "Customer Name") }}
                  </th>
                  <th>
                    {{ this.$gl("Malzeme Kodu", "Material Code") }}
                  </th>
                  <th>
                    {{ this.$gl("Malzeme Açıklaması", "Material Description") }}
                  </th>
                  <th>
                    {{
                      this.$gl(
                        "Müşterideki Malzeme Kodu",
                        "Material Code at Customer"
                      )
                    }}
                  </th>
                  <th>
                    {{
                      this.$gl(
                        "Müşterideki Malzeme Açıklaması",
                        "Material Description in Customer"
                      )
                    }}
                  </th>
                </thead>
                <tbody>
                  <tr v-if="mat.custorvend == 'Tedarikçi'">
                    <td>
                      {{ mat.customer }}
                    </td>
                    <td>
                      {{ mat.name }}
                    </td>
                    <td>
                      {{ mat.material }}
                    </td>
                    <td>
                      {{ mat.mtext }}
                    </td>
                    <td>
                      {{ mat.materialcust }}
                    </td>
                    <td>
                      {{ mat.mtextcust }}
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </template> -->
          </l-card>
        </l-tab-panel>

        <l-tab-panel name="Notlar" class="q-gutter-xs">
          <template v-for="note in liscustomer.custnotes" :key="note.id">
            <l-card class="q-gutter-xs q-pa-xs">
              <l-input
                :label="this.$gl(`Not Başlığı`, `Note Title`)"
                v-model="note.notetitle"
                class="bg-amber-1"
              />
              <l-input
                type="textarea"
                :label="this.$gl(`Not`, `Notes`)"
                v-model="note.note"
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
            :pCompany="liscustomer.company"
            :pDoctype="'BAST02'"
            :pDocnum="liscustomer.customer"
            :numRange="'custDocs'"
            :modi="modi"
          />
        </l-tab-panel>
      </l-tab-panels>
    </l-card>
    <l-dialog
      v-model="isAlertMessage"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <l-card class="bg-teal text-white" style="width: 300px">
        <l-card-section>
          <div class="text-h6">Lis Digital Company</div>
        </l-card-section>

        <l-card-section class="q-pt-none">
          {{ alertMessage }}
        </l-card-section>

        <l-card-actions align="right" class="bg-white text-teal">
          <l-btn flat label="OK" v-close-popup />
        </l-card-actions>
      </l-card>
    </l-dialog>
  </l-div>
  <l-dialog v-model="isShowFint03" persistent>
    <l-card0>
      <FINT03D01
        :cv="liscustomer"
        :tabInfo="tabInfo"
        :isChild="true"
        @cancel="isShowFint03 = false"
      />
    </l-card0>
  </l-dialog>
</template>

<script>
import FINT03D01 from "../../FIN/FINT03/FINT03D01.vue";
export default {
  props: ["tabInfo", "isChild", "pCompany", "pCustomer", "modi"],
  components: { FINT03D01 },
  data() {
    return {
        myColumnsSal: [
        {
          label: this.$gl("Firma", "Company"),
          value: "company",
          type: "string",
        },
        {
          label: this.$gl("Malzeme", "Material"),
          value: "material",
          type: "string",
        },
        {
          label: this.$gl("Mal.Açıkl.", "Mat.Desc."),
          value: "mtext",
          type: "string",
        },
        {
          label: this.$gl("Müşt.Mal.", "Cust.Mat."),
          value: "custmaterial",
          type: "string",
        },
        {
          label: this.$gl("Müşt.Mal.Açıkl.", "Cust.Mat.Desc."),
          value: "custmtext",
          type: "string",
        },
        {
          label: this.$gl("Varyant", "Variant"),
          value: "variant",
          type: "string",
        },
      ],
        myColumnsPur: [
        {
          label: this.$gl("Firma", "Company"),
          value: "company",
          type: "string",
        },
        {
          label: this.$gl("Malzeme", "Material"),
          value: "material",
          type: "string",
        },
        {
          label: this.$gl("Mal.Açıkl.", "Mat.Desc."),
          value: "mtext",
          type: "string",
        },
        {
          label: this.$gl("Ted.Mal.", "Vend.Mat."),
          value: "custmaterial",
          type: "string",
        },
        {
          label: this.$gl("Ted.Mal.Açıkl.", "Vend.Mat.Desc."),
          value: "custmtext",
          type: "string",
        },
        {
          label: this.$gl("Varyant", "Variant"),
          value: "variant",
          type: "string",
        },
      ],
      liscustomer: {},
      liscusmat: [],
      isEdelMember: false,
      isEinvMember: false,
      isShowFint03: false,

      tab: "Genel",
      isAlertMessage: false,
      alertMessage: "",
    };
  },

  methods: {
    async btnSave() {
      await this.lis.function("BAST02/02-btnSave", {
        liscustomer: this.liscustomer,
        liscusmat: this.liscusmat,
        modi: this.modi,
      });
      if (this.isChild != true) {
        this.cancel();
      } else {
        this.$emit("cancel");
      }
    },

    async cancel() {
      this.tabInfo.blockGoToTransaction = false;
      this.$emit("cancel");
      this.liscustomer = {};
    },
    async pushNewBank() {
      let newBank = { ...this.liscustomer.custbanks[0] };
      console.log(newBank);
      for (let i in newBank) {
        newBank[i] = "";
      }

      this.liscustomer.custbanks.push(newBank);
    },
    async pushNewAddress() {
      let newAddress = { ...this.liscustomer.custaddress[0] };

      for (let i in newAddress) {
        newAddress[i] = "";
      }
      newAddress._id = undefined;
      newAddress.adrnum =
        this.liscustomer.custaddress[this.liscustomer.custaddress.length - 1]
          .adrnum + 1;

      this.liscustomer.custaddress.push(newAddress);
    },

    async pushNewNote() {
      let newNote = { ...this.liscustomer.custnotes[0] };

      for (let i in newNote) {
        newNote[i] = "";
      }

      newNote._id = undefined;
      this.liscustomer.custnotes.push(newNote);
    },

    async pushNewPer() {
      let newPer = { ...this.liscustomer.custper[0] };

      for (let i in newPer) {
        newPer[i] = "";
      }

      this.liscustomer.custper.push(newPer);
    },

    async removeBank(bank) {
      this.liscustomer.custbanks = [
        ...this.liscustomer.custbanks.filter(
          (e) => !((e._id == bank._id) & (e.banknum == bank.banknum))
        ),
      ];
    },
    async removeAddress(adr) {
      this.liscustomer.custaddress = [
        ...this.liscustomer.custaddress.filter(
          (e) => !((e._id == adr._id) & (e.addressname == adr.addressname))
        ),
      ];
    },
    async removeNote(note) {
      this.liscustomer.custnotes = [
        ...this.liscustomer.custnotes.filter(
          (e) => !((e._id == note._id) & (e.notetitle == note.notetitle))
        ),
      ];
    },
    async removePer(per) {
      this.liscustomer.custper = [
        ...this.liscustomer.custper.filter(
          (e) =>
            !(
              (e._id == per._id) &
              (e.name == per.name) &
              (e.surname == per.surname)
            )
        ),
      ];
    },
  },
  async mounted() {
    let myReturn = await this.lis.function("BAST02/02-init", {
      company: this.pCompany,
      customer: this.pCustomer,
      modi: this.modi,
    });

    this.liscustomer = myReturn.liscustomer;
    this.liscusmat = myReturn.liscusmat;

    this.isEdelMember = this.liscustomer.edelmember?.length > 0 ? true : false;
    this.isEinvMember = this.liscustomer.einvmember?.length > 0 ? true : false;
  },
  async beforeUnmount() {
    if (this.modi == 1) {
      await this.lis.function("cls-system.unlock", {
        company: this.pCompany,
        lid: "BAST02",
        lockkey: this.pCustomer,
      });
    }
  },
};
</script>

function data() { new Error('Function not implemented.'); }
