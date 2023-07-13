<template>
    <l-div>
        <!--Tittle Layer-->

        <l-card>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-toolbar>
                    <l-icon size="md" name="assignment_ind" />

                    <l-toolbar-title>{{
                        this.$gl(`Cari Kart Detayı`, `Current Card Detail`)
                    }}</l-toolbar-title>

                    <l-btn v-if="dv.modi != 2" icon="save" color="teal" @click="btnSave()" />
                    <l-btn icon="cancel" color="negative" @click="cancel()" />
                </l-toolbar>
            </l-toolbar>

            <l-div-flex>
                <!-- Detail Part-->

                <l-select :label="this.$gl(`Firma`, `Company`)" v-model="dv.liscustomers.company" options="lisbas001"
                    optValue="company" optTitle="stext" optCaptions="company" width="120px" class="bg-blue-1" />

                <l-select :label="this.$gl(`İş Alanı`, `Business Area`)" v-model="dv.liscustomers.busarea"
                    options="lisbas003" optValue="busarea" optTitle="stext" optCaptions="busarea" width="120px"
                    class="bg-blue-1" />

                <l-select v-model="dv.liscustomers.custorvend" map-options :options="[
                    { value: 0, label: this.$gl('Aday', `Applicant`) },
                    { value: 1, label: this.$gl('Müşteri', `Customer`) },
                    { value: 2, label: this.$gl('Tedarikçi', `Vendor`) },
                ]" optValue="value" optTitle="label"  :label="this.$gl(`Cari Tipi`, `Current Type`)"
                    dense style="min-width: 180px" class="bg-blue-1"></l-select>

                <l-input :readonly="modi == '2' ? 'true' : 'false'" v-model="dv.liscustomers.customer"
                    :label="this.$gl(`Cari Kodu`, `Current Code`)" />
                <l-input v-model="dv.liscustomers.name1" :label="this.$gl(`Cari Adı`, `Current Name`)"
                    style="min-width: 300px" />
                <l-input dense v-model="dv.liscustomers.title" :label="this.$gl(`Ünvan`, `Title`)"
                    style="min-width: 300px" />

                <l-select v-model="dv.liscustomers.islocked" :label="this.$gl(`Bloke Statüsü`, `Blocked Status`)"
                    map-options :options="[
                        { label: this.$gl(`Blokesiz`, `Unblocked`), value: 0 },
                        { label: this.$gl(`Blokeli`, `Blocked`), value: 1 },
                        {
                            label: this.$gl(`Ödeme Blokeli`, `Payment Blocked`),
                            value: 2,
                        },
                    ]" optValue="value" optTitle="label" style="min-width: 200px" />

                <l-checkbox :label="this.$gl(`Silindi mi?`, `Is Delete?`)" v-model="dv.liscustomers._deleted" dense />
            </l-div-flex>

            <l-separator inset />
            <div class="row q-pa-xs q-gutter-xs">
                <l-select :label="this.$gl(`Sektör`, `Sector`)" v-model="dv.liscustomers.sector" options="lisbas004"
                    optValue="sector" optTitle="stext" optCaptions="sector" width="120px" />
                <l-select :label="this.$gl(`Ülke`, `Country`)" v-model="dv.liscustomers.country" options="lisbas005"
                    optValue="country" optTitle="stext" optCaptions="country" width="130px" />

                <l-input v-model="dv.liscustomers.taxdept" :label="this.$gl(`Vergi Dairesi`, `Tax Administration`)"
                    style="width: 300px" />
                <l-input v-model="dv.liscustomers.taxnum" :label="this.$gl(`Vergi No`, `Tax Nnumber`)"
                    style="width: 300px" />

                <l-select :label="this.$gl(`Para Birimi`, `Currency`)" v-model="dv.liscustomers.currency"
                    options="lisbas007" optValue="unit" optTitle="stext" optCaptions="unit" :optFilter="{ unittype: 1 }"
                    width="200px" />
            </div>

            <!-- ****************************** -->

            <l-card>
                <l-tabs v-model="tab">
                    <l-tab name="Genel" :label="this.$gl(`Genel`, `General`)" />
                    <l-tab name="Muhasebe" :label="this.$gl(`Muhasebe`, `Accounting`)" />
                    <l-tab name="Banka" :label="this.$gl(`Banka`, `Bank`)" />
                    <l-tab name="Adres" :label="this.$gl(`Adres`, `Address`)" />
                    <l-tab name="İlgili Kişi" :label="this.$gl(`İlgili Kişi`, `Related person`)" />
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
                                    {{
                                        this.$gl(
                                            "Adres Bilgisi",
                                            "Address Information"
                                        )
                                    }}
                                </div>
                            </l-card-section>
                            <l-separator inset />
                            <l-card-section class="row q-gutter-xs">
                                <l-input v-model="dv.liscustomers.postcode" :label="this.$gl(`Posta Kodu`, `Post Code`)"
                                    dense />
                                <l-select :label="this.$gl(`Şehir`, `City`)" v-model="dv.liscustomers.city"
                                     options="lisbas006" optValue="city" optTitle="stext"
                                    width="130px" />
                                <l-input type="textarea" v-model="dv.liscustomers.address" dense
                                    :label="this.$gl(`Adres`, `Address`)" autogrow style="min-width: 300px">
                                </l-input>
                                <l-input v-model="dv.liscustomers.telnum" :label="this.$gl(`Telefon No`, `Phone Number`)
                                    " dense />
                                <l-input v-model="dv.liscustomers.faxnum" :label="this.$gl(`Fax No`, `Fax Number`)" dense />
                                <l-input v-model="dv.liscustomers.email" :label="this.$gl(`E-Mail`, `E-Mail`)" dense />
                                <l-input v-model="dv.liscustomers.website" :label="this.$gl(`Web Sitesi`, `Website`)"
                                    dense />
                            </l-card-section>
                        </l-card>

                        <l-card style="width: 49%; min-width: 320px">
                            <l-card-section>
                                <div class="text-overline">
                                    {{
                                        this.$gl(
                                            "Detay Bilgisi",
                                            "Detail Information"
                                        )
                                    }}
                                </div>
                            </l-card-section>
                            <l-separator inset />
                            <l-card-section class="row q-gutter-xs">
                            </l-card-section>
                        </l-card>
                    </l-tab-panel>

                    <l-tab-panel name="Muhasebe" class="q-gutter-xs row">
                        <l-card style="width: 49%; min-width: 320px">
                            <l-card-section>
                                <div class="text-overline">
                                    {{ this.$gl("Hesap", "Account") }}
                                </div>
                            </l-card-section>
                            <l-separator inset />
                            <l-card-section class="row q-gutter-xs">
                                <l-div-flex>
                                    <l-select :label="this.$gl(
                                        `Hesap Tipi`,
                                        `Account Type` )
                                        " v-model="dv.liscustomers.acctype" 
                                         options="lisfin004" 
                                         optValue="acctype" 
                                         optTitle="stext" 
                                         optCaptions="acctype" 
                                         width="150px" 
                                         class="bg-blue-1" />

                                    <l-input :label="this.$gl(
                                        `Müşt./Ted. Hesap No`,
                                        `Cust./Vend. Account Number`
                                    )
                                        " v-model="dv.liscustomers.glaccount" dense class="bg-blue-1" />
                                    <l-input :label="this.$gl(
                                        `Muhasebe Hesap No`,
                                        `Accounting Account Number`
                                    )
                                        " v-model="dv.liscustomers.account" dense />

                                    <l-select v-model="dv.liscustomers.exchmethod" :label="this.$gl(
                                        `Kur Hesaplama Metodu`,
                                        `Currency Calculation Method`
                                    )
                                        " map-options :options="[
        {
            label: this.$gl(
                `Alış Kuru`,
                `Buying Rate`
            ),
            value: 0,
        },
        {
            label: this.$gl(
                'Satış Kuru',
                `Sales Rate`
            ),
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
    ]" optValue="value"
     optTitle="label"
  style="width: 220px" />
                                </l-div-flex>

                                <div class="row bg-amber-2 q-gutter-xs q-pa-xs">
                                    <l-input class="bg-white" :label="this.$gl(
                                        `Kredi Limiti`,
                                        `Credit Limit`
                                    )
                                        " v-model="dv.liscustomers.creditlimit" dense />

                                    <l-select :label="this.$gl(`P.Br.`, `Currency`)" v-model="dv.liscustomers.creditlimitcurr
                                        " options="lisbas007" optValue="unit" optTitle="stext" optCaptions="unit"
                                        :optFilter="{ unittype: 1 }" dense style="min-width: 80px" class="bg-white" />
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
                                <l-select :label="this.$gl(
                                    `Satış Bölümü`,
                                    `Sales Department`
                                )
                                    " v-model="dv.liscustomers.saldept" 
                                    options="lissal003" optValue="saldept" optTitle="stext"
                        optCaptions="saldept" width="150px" />
                                <l-select :label="this.$gl(
                                    `Müşteri Grubu`,
                                    `Customer Group`
                                )
                                    " v-model="dv.liscustomers.custgrp" 
                                    options="lisbas008" optValue="custgrp" width="150px" />
                                <l-select :label="this.$gl(
                                    `E-Fatura Tipi`,
                                    `E-Invoice Type`
                                )
                                    " v-model="dv.liscustomers.einvotype" map-options :options="[
        {
            value: 0,
            label: this.$gl(
                `Belge Tipinden`,
                `From Document Type`
            ),
        },
        {
            value: 1,
            label: this.$gl(
                `Temel Fatura`,
                `Basic Invoice`
            ),
        },
        {
            value: 2,
            label: this.$gl(
                `Ticari Fatura`,
                `Commercial Invoice`
            ),
        },
    ]" optValue="value" optTitle="label" style="width: 200px" />
                            </l-card-section>
                            <l-separator inset />
                            <l-card-section horizontal>
                                <l-card-section>
                                    <l-checkbox :label="this.$gl(
                                        `E-İrsaliye Mükellefi`,
                                        `E-Waybill Payer`
                                    )
                                        " v-model="dvt.isEdelMember" dense disable />
                                </l-card-section>
                                <l-separator inset vertical />
                                <l-card-section>
                                    <l-checkbox :label="this.$gl(
                                        `E-Fatura Mükellefi`,
                                        `E-Invoice Payer`
                                    )
                                        " v-model="dvt.isEinvMember" dense disable />
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
                                <l-select :label="this.$gl(
                                    `Satınalma Bölümü`,
                                    `Purchasing Department`
                                )
                                    " v-model="dv.liscustomers.purdept" options="lispur003" optValue="purdept"
                                    optTitle="stext" optCaptions="purdept" width="150px" />

                                <l-select :label="this.$gl(
                                    `Kur Değer Yöntemi`,
                                    `Currency Value Method`
                                )
                                    " v-model="dv.liscustomers.manexchrate" :options="[
        {
            label: this.$gl(
                `Sipariş Tarihi`,
                `Order Date`
            ),
            value: 0,
        },
        {
            label: this.$gl(
                `İrsaliye Tarihi`,
                `Waybill date`
            ),
            value: 1,
        },
        {
            label: this.$gl(
                `Fatura Tarihi`,
                `Invoice Date`
            ),
            value: 2,
        },
        {
            label: this.$gl(
                `Sabitlenmiş`,
                `Pinned`
            ),
            value: 3,
        },
    ]" optValue="value" optTitle="label" style="width: 150px" />
                            </l-card-section>
                        </l-card>

                        <l-card style="width: 49%; min-width: 320px">
                            <l-card-section>
                                <div class="text-overline">
                                    {{ this.$gl(`Ödeme`, `Payment`) }}
                                </div>
                            </l-card-section>
                            <l-separator inset />
                            <l-card-section class="row q-gutter-xs">
                            </l-card-section>
                        </l-card>

                        <l-card style="width: 49%; min-width: 320px">
                            <l-card-section>
                                <div class="text-overline">
                                    {{ this.$gl(`Nakliye`, `Transport`) }}
                                </div>
                            </l-card-section>
                            <l-separator inset />
                            <l-card-section class="row q-gutter-xs">
                            </l-card-section>
                        </l-card>
                    </l-tab-panel>

                    <l-tab-panel name="Banka" class="q-gutter-xs">
                        <template v-for="bank in dv.liscustomers.custbanks" :key="bank.id">
                            <l-card class="row q-gutter-xs q-pa-xs">
                                <l-input :label="this.$gl(`Banka No`, `Bank Number`)" v-model="bank.banknum" dense />
                                <l-input :label="this.$gl(`Banka Adı`, `Bank Name`)" v-model="bank.bankname" dense />
                                <l-input :label="this.$gl(`Banka Adresi`, `Bank Address`)
                                    " v-model="bank.bankaddress" dense />
                                <l-input :label="this.$gl(`Hesap No`, `Account Number`)
                                    " v-model="bank.account" dense />
                                <l-input :label="this.$gl(`İban`, `IBAN`)" v-model="bank.iban" />
                                <l-input :label="this.$gl(`Swift`, `Swift`)" v-model="bank.swift" />
                                <l-input :label="this.$gl(`Ülke`, `Country`)" v-model="bank.country" />
                                <l-input :label="this.$gl(`Para Birimi`, `Currency`)" v-model="bank.currency" />
                                <l-chip dense justify="right" icon="cancel" clickable rounded glossy color="negative"
                                    text-color="white" @click="removeBank(bank)">{{ this.$gl("Sil", "Delete") }}</l-chip>
                            </l-card>
                        </template>
                        <l-chip dense justify="right" icon="add" clickable rounded glossy color="secondary"
                            text-color="white" @click="pushNewBank()">{{ this.$gl("Banka Ekle", "Add Bank") }}</l-chip>
                    </l-tab-panel>
                    <l-tab-panel name="Adres" class="q-gutter-xs row">
                        <template v-for="adr in dv.liscustomers.custaddress" :key="adr.id">
                            <l-card class="row q-gutter-xs q-pa-xs">
                                <l-input type="number" :label="this.$gl(`Adres No`, `Address Number`)
                                    " v-model="adr.adrnum" dense class="bg-blue-2" />
                                <l-input :label="this.$gl(`Adres İsmi`, `Address Name`)
                                    " v-model="adr.addressname" dense />
                                <l-input :label="this.$gl(`Ülke`, `Country`)" v-model="adr.country" dense />
                                <l-input :label="this.$gl(`Şehir`, `City`)" v-model="adr.city" dense />
                                <l-input :label="this.$gl(`Adres`, `Address`)" v-model="adr.address" dense autogrow
                                    style="width: 300px" />
                                <l-input :label="this.$gl(`Posta Kodu`, `Post Code`)" v-model="adr.postcode" dense />
                                <l-input :label="this.$gl(`Telefon`, `Telephone`)" v-model="adr.telnum" dense />
                                <l-input :label="this.$gl(`Fax`, `Fax`)" v-model="adr.faxnum" dense />
                                <l-input :label="this.$gl(`E-Mail`, `E-Mail`)" v-model="adr.email" dense />

                                <l-select :label="this.$gl(`Cari Tipi`, `Customer Type`)
                                    " v-model="adr.choicetype" map-options :options="[
        {
            value: 0,
            label: this.$gl(
                `Müşteri`,
                `Customer`
            ),
        },
        {
            value: 1,
            label: this.$gl(
                `Tedarikçi`,
                `Vendor`
            ),
        },
        {
            value: 2,
            label: this.$gl(
                `Herikisi`,
                `Both of them`
            ),
        },
    ]" optValue="value" optTitle="label" style="width: 170px" />
                                <l-select :label="this.$gl(`Fatura tipi`, `Invoice Type`)
                                    " v-model="adr.addresstype" :options="[
        {
            value: 0,
            label: this.$gl(
                `İrsaliye`,
                `Waybill`
            ),
        },
        {
            value: 1,
            label: this.$gl(
                `Fatura`,
                `Invoice`
            ),
        },
        {
            value: 2,
            label: this.$gl(`Hiçbiri`, `None`),
        },
    ]" optValue="value" optTitle="label" optCaptions="value" style="width: 130px" />

                                <l-input type="textarea" :label="this.$gl(`Notlar`, `Notes`)" v-model="adr.notes" dense
                                    autogrow />
                                <l-chip dense justify="right" icon="cancel" clickable rounded glossy color="negative"
                                    text-color="white" @click="removeAddress(adr)">{{ this.$gl("Sil", "Delete") }}</l-chip>
                            </l-card>
                        </template>
                        <l-chip dense justify="right" icon="add" clickable rounded glossy color="secondary"
                            text-color="white" @click="pushNewAddress()">{{ this.$gl("Adres Ekle", "Add Address")
                            }}</l-chip>
                    </l-tab-panel>

                    <l-tab-panel name="İlgili Kişi" class="q-gutter-xs row">
                        <template v-for="per in dv.liscustomers.custper" :key="per.id">
                            <l-card class="row q-gutter-xs q-pa-xs">
                                <l-select :label="this.$gl(`Hitap`, `Appeal`)" v-model="per.gender" :options="[
                                    {
                                        value: 0,
                                        label: this.$gl(`Bay`, `Mr`)
                                    },
                                    {
                                        value: 1,
                                        label: this.$gl(`Bayan`, `Mrs`)
                                    },
                                ]" 
                                optValue="value"
                                optTitle="label"
                                map-options
                                dense 
                                style="width: 150px" />
                                <l-input label="İsim" v-model="per.name" dense />
                                <l-input :label="this.$gl(`İkinci İsmi`, `Second Name`)
                                    " v-model="per.secondname" dense />
                                <l-input :label="this.$gl(`Soy İsim`, `Surname`)" v-model="per.surname" dense />

                                <l-input :label="this.$gl(`Departman`, `Department`)" v-model="per.department" dense />
                                <l-input :label="this.$gl(`Pozisyon`, `Position`)" v-model="per.position" dense />
                                <l-input :label="this.$gl(`Telefon No`, `Phone Number`)
                                    " v-model="per.phone" dense />
                                <l-input :label="this.$gl(`Dahili`, `Internal`)" v-model="per.extphone" dense />

                                <l-input :label="this.$gl(
                                    `Cep Telefon`,
                                    `Cell Phone Number`
                                )
                                    " v-model="per.mobil" dense />
                                <l-input :label="this.$gl(
                                    `Cep Telefon (Özel)`,
                                    `Cell Phone Number (Special)`
                                )
                                    " v-model="per.mobils" dense />
                                <l-input :label="this.$gl(`E-Mail`, `E-Mail`)" v-model="per.email" dense />

                                <l-chip dense justify="right" icon="cancel" clickable rounded glossy color="negative"
                                    text-color="white" @click="removePer(per)">{{ this.$gl("Sil", "Delete") }}</l-chip>
                            </l-card>
                        </template>
                        <l-chip dense justify="right" icon="add" clickable rounded glossy color="secondary"
                            text-color="white" @click="pushNewPer()">{{ this.$gl("Kişi Ekle", "Add Person") }}</l-chip>
                    </l-tab-panel>

                    <l-tab-panel name="Malzemeler" class="q-gutter-xs">
                        <l-card class="q-gutter-xs q-pa-xs">
                            <l-card-section>
                                {{
                                    this.$gl(
                                        "Müşteri Malzemeleri",
                                        "Customer Materials"
                                    )
                                }}
                            </l-card-section>
                            <q-seperator inset />
                            <template v-for="mat in dv.liscusmats" :key="mat.id">
                                <q-markup-table>
                                    <thead>
                                        <th>
                                            {{
                                                this.$gl(
                                                    "Müşteri Kodu",
                                                    "Customer Code"
                                                )
                                            }}
                                        </th>
                                        <th>
                                            {{
                                                this.$gl(
                                                    "Müşteri Adı",
                                                    "Customer Name"
                                                )
                                            }}
                                        </th>
                                        <th>
                                            {{
                                                this.$gl(
                                                    "Malzeme Kodu",
                                                    "Material Code"
                                                )
                                            }}
                                        </th>
                                        <th>
                                            {{
                                                this.$gl(
                                                    "Malzeme Açıklaması",
                                                    "Material Description"
                                                )
                                            }}
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
                            </template>
                        </l-card>
                        <l-card class="q-gutter-xs q-pa-xs">
                            <l-card-section>
                                {{
                                    this.$gl(
                                        "Tedarikçi Malzemeleri",
                                        "Vendor Materials"
                                    )
                                }}
                            </l-card-section>
                            <q-seperator inset />
                            <template v-for="mat in dv.liscusmats" :key="mat.id">
                                <q-markup-table>
                                    <thead>
                                        <th>
                                            {{
                                                this.$gl(
                                                    "Müşteri Kodu",
                                                    "Customer Code"
                                                )
                                            }}
                                        </th>
                                        <th>
                                            {{
                                                this.$gl(
                                                    "Müşteri Adı",
                                                    "Customer Name"
                                                )
                                            }}
                                        </th>
                                        <th>
                                            {{
                                                this.$gl(
                                                    "Malzeme Kodu",
                                                    "Material Code"
                                                )
                                            }}
                                        </th>
                                        <th>
                                            {{
                                                this.$gl(
                                                    "Malzeme Açıklaması",
                                                    "Material Description"
                                                )
                                            }}
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
                            </template>
                        </l-card>
                    </l-tab-panel>

                    <l-tab-panel name="Notlar" class="q-gutter-xs">
                        <template v-for="note in dv.liscustomers.custnotes" :key="note.id">
                            <l-card class="q-gutter-xs q-pa-xs">
                                <l-input :label="this.$gl(`Not Başlığı`, `Note Title`)
                                    " v-model="note.notetitle" dense class="bg-amber-1" />
                                <l-input type="textarea" :label="this.$gl(`Not`, `Notes`)" v-model="note.note" dense
                                    autogrow />
                                <l-chip dense justify="right" icon="cancel" clickable rounded glossy color="negative"
                                    text-color="white" @click="removeNote(note)">{{ this.$gl("Sil", "Delete") }}</l-chip>
                            </l-card>
                        </template>
                        <l-chip dense justify="right" icon="add" clickable rounded glossy color="secondary"
                            text-color="white" @click="pushNewNote()">{{ this.$gl("Not Ekle", "Add Note") }}</l-chip>
                    </l-tab-panel>
                    <l-tab-panel name="Eklenenler">
                        <l-doct02d01 :pCompany="dv.liscustomers.company" :pDoctype="'BAST02'"
                            :pDocnum="dv.liscustomers.customer" :numRange="'custDocs'" :modi="dv.modi" />
                    </l-tab-panel>
                </l-tab-panels>
            </l-card>
        </l-card>
        <l-dialog v-model="isAlertMessage" persistent transition-show="scale" transition-hide="scale">
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
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
    data() {
        return {
            dvt: {
                liscustomers: {},
                isEdelMember: false,
                isEinvMember: false,
            },
            tab: "Genel",
            isAlertMessage: false,
            alertMessage: "",
            lockKeyParams: {
                company: this.dv.liscustomers.company,
                lid: "BAST02",
                lockkey: this.dv.liscustomers.customer,
            },
        };
    },

    methods: {
        async btnSave() {
            await this.lis.function("BAST02/02-btnSave", this.dv);
            this.cancel();
            console.log("btnSave çalıştı");

        },

        async cancel() {
            console.log("Cancel");
            this.tabInfo.blockGoToTransaction = false;
            this.dv.lisDialog = "BAST02D01";
            this.dv.liscustomers = [];
        },
        async pushNewBank() {
            let newBank = { ...this.dv.liscustomers.custbanks[0] };
            console.log(newBank);
            for (let i in newBank) {
                newBank[i] = "";
            }

            this.dv.sc.isCustomer.custbanks.push(newBank);
        },
        async pushNewAddress() {
            let newAddress = { ...this.dv.liscustomers.custaddress[0] };

            for (let i in newAddress) {
                newAddress[i] = "";
            }
            newAddress._id = undefined;
            newAddress.adrnum =
                this.dv.liscustomers.custaddress[
                    this.dv.liscustomers.custaddress.length - 1
                ].adrnum + 1;

            this.dv.liscustomers.custaddress.push(newAddress);
        },

        async pushNewNote() {
            let newNote = { ...this.dv.liscustomers.custnotes[0] };

            for (let i in newNote) {
                newNote[i] = "";
            }

            newNote._id = undefined;
            this.dv.liscustomers.custnotes.push(newNote);
        },

        async pushNewPer() {
            let newPer = { ...this.dv.liscustomers.custper[0] };

            for (let i in newPer) {
                newPer[i] = "";
            }

            this.dv.liscustomers.custper.push(newPer);
        },

        async removeBank(bank) {
            this.dv.liscustomers.custbanks = [
                ...this.dv.liscustomers.custbanks.filter(
                    (e) => !((e._id == bank._id) & (e.banknum == bank.banknum))
                ),
            ];
        },
        async removeAddress(adr) {
            this.dv.liscustomers.custaddress = [
                ...this.dv.liscustomers.custaddress.filter(
                    (e) =>
                        !(
                            (e._id == adr._id) &
                            (e.addressname == adr.addressname)
                        )
                ),
            ];
        },
        async removeNote(note) {
            this.dv.liscustomers.custnotes = [
                ...this.dv.liscustomers.custnotes.filter(
                    (e) =>
                        !((e._id == note._id) & (e.notetitle == note.notetitle))
                ),
            ];
        },
        async removePer(per) {
            this.dv.liscustomers.custper = [
                ...this.dv.liscustomers.custper.filter(
                    (e) =>
                        !(
                            (e._id == per._id) &
                            (e.name == per.name) &
                            (e.surname == per.surname)
                        )
                ),
            ];
        },
        async init(prop) {
            this.dv = await this.lis.function("BAST02/02-init", prop);
            // await this.$Axios
            //   .post("BAST02/02-init", prop)
            //   .then((res) => {
            //     console.log("02-init");
            //     this.dv = [...res.data];
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //   });
            console.log(this.dvt);
        },
    },
    mounted() {
        this.init(this.dv);
        console.log("02 mounted çalıştı");
        console.log(this.dv.liscustomers.edelmember);
        console.log(this.dv.liscustomers.edelmember.length);
        this.dvt.isEdelMember =
            this.dv.liscustomers.edelmember.length > 0 ? true : false;
        this.dvt.isEinvMember =
            this.dv.liscustomers.einvmember.length > 0 ? true : false;
        console.log(this.dvt.isEdelMember);
    },
    async beforeUnmount() {
        console.log("***************unmount");
        // this.$Axios.post("cls-system.unlock", this.lockKeyParams);
        await this.lis.function("cls-system.unlock", this.lockKeyParams);
    },
};
</script>

function data() { throw new Error('Function not implemented.'); }
