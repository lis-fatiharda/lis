<template>
    <l-div-flex style="width: 100%">
        <l-card style="width: 49%; min-width: 320px">
            <l-card-section>
                <div class="text-overline">
                    {{ this.$gl("Malı Gönderen", "Sender of Goods") }}
                </div>
            </l-card-section>
            <l-separator inset />
            <l-card-section class="q-gutter-xs">
                <l-div-flex>
                    <l-checkbox
                        dense
                        :label="this.$gl(`Aynı Firma`, `Same Company`)"
                        v-model="dv.lispurdocs.isgrcsend"
                        @click="fetchGrcSend()"
                    />

                    <l-input
                        :label="
                            this.$gl(
                                `Malı Gönderen Firma`,
                                `Company Sending Goods`
                            )
                        "
                        v-model="dv.lispurdocs.grcsend"
                    >
                        <l-chip
                            class="bg-white"
                            icon="search"
                            dense
                            clickable
                            @click="
                                dv.lispurdocs.isSelectGrc =
                                    !dv.lispurdocs.isSelectGrc
                            "
                        >
                            <BAST02D01mini
                                :pComp="dv.lispurdocs.company"
                                :isShow="dv.lispurdocs.isSelectGrc"
                                @ok="
                                    fetchGrcSend($event);
                                    dv.lispurdocs.isSelectGrc = false;
                                "
                                @cancel="dv.lispurdocs.isSelectGrc = false"
                            />
                        </l-chip>
                    </l-input>

                    <l-select
                        v-model="dv.lispurdocs.grcadrnum"
                        :options="dv.lisVendor.custaddress"
                        :label="this.$gl(`Adres No`, `Address No`)"
                        style="min-width: 120px"
                        class="bg-yellow-1"
                        optValue="adrnum"
                        optTitle="addressname"
                        optCaptions="address"
                        @select="fetchGrcAdrnum()"
                    />
                </l-div-flex>
                <l-input
                    dense
                    :label="this.$gl(`Ünvan`, `Title`)"
                    v-model="dv.lispurdocs.grctitle"
                />
                <l-input
                    dense
                    :label="this.$gl(`İsim`, `Name`)"
                    v-model="dv.lispurdocs.grcname1"
                />
                <l-input
                    dense
                    :label="this.$gl(`Address`, ``)"
                    v-model="dv.lispurdocs.grcaddress"
                />
                
                <l-div-flex>
                    <l-input
                        dense
                        :label="this.$gl(`Ülke`, `Country`)"
                        v-model="dv.lispurdocs.grccountry"
                    />
                  <l-input
                    dense
                    :label="this.$gl(`Şehir`, `City`)"
                    v-model="dv.lispurdocs.grccity"
                />
                <l-input
                    dense
                    :label="this.$gl(`Semt`, `District`)"
                    v-model="dv.lispurdocs.ircdistrict"
                />
                <l-input
                    dense
                    :label="this.$gl(`Kapı No`, `Building`)"
                    v-model="dv.lispurdocs.ircbuilding"
                />
                <l-input
                    dense
                    :label="this.$gl(`Posta Kodu`, `Post Code`)"
                    v-model="dv.lispurdocs.grcpostcode"
                />
                    
                    <l-input
                        dense
                        :label="this.$gl(`Dil`, `Language`)"
                        v-model="dv.lispurdocs.grclangu"
                    />
                    <l-input
                        dense
                        :label="this.$gl(`Telefon`, `Phone Number`)"
                        v-model="dv.lispurdocs.grctelnum"
                    />
                    <l-input
                        dense
                        :label="this.$gl(`Fax`, `Fax`)"
                        v-model="dv.lispurdocs.grcfaxnum"
                    />
                </l-div-flex>
              
                
                <l-separator/>
                <l-div-flex>
                    <l-input
                        dense
                        :label="this.$gl(`Vergi Dairesi`, `Tax Administration`)"
                        v-model="dv.lispurdocs.grctaxdept"
                    />
                    <l-input
                        dense
                        :label="this.$gl(`Vergi No`, `Tax No`)"
                        v-model="dv.lispurdocs.grctaxnum"
                    />
                    <l-input
                    dense
                    :label="
                        this.$gl(`Satınalma Bölümü`, `Purchasing Department`)
                    "
                    v-model="dv.lispurdocs.grcpurdept"
                />
                </l-div-flex>
            </l-card-section>
        </l-card>

        <l-card style="width: 49%; min-width: 320px">
            <l-card-section>
                <div class="text-overline">
                    {{ this.$gl("Faturayı Gönderen", "Sender of Invoice") }}
                </div>
            </l-card-section>
            <l-separator inset />
            <l-card-section class="q-gutter-xs">
                <l-div-flex>
                    <l-checkbox
                        dense
                        :label="this.$gl(`Aynı Firma`, `Same Company`)"
                        v-model="dv.lispurdocs.isircsend"
                        @click="fetchIrcSend()"
                    />

                    <l-input
                        :label="
                            this.$gl(
                                `Faturayı Alan Firma`,
                                `Company Receiving Invoice`
                            )
                        "
                        dense
                        v-model="dv.lispurdocs.ircsend"
                    >
                        <l-chip
                            class="bg-white"
                            icon="search"
                            dense
                            clickable
                            @click="
                                dv.lispurdocs.isSelectIrc =
                                    !dv.lispurdocs.isSelectIrc
                            "
                        >
                            <BAST02D01mini
                                :pComp="dv.lispurdocs.company"
                                :isShow="dv.lispurdocs.isSelectIrc"
                                @ok="
                                    dv.lispurdocs.isircsend = false;
                                    fetchIrcSend($event);
                                    dv.lispurdocs.isSelectIrc = false;
                                "
                                @cancel="dv.lispurdocs.isSelectIrc = false"
                            />
                        </l-chip>
                    </l-input>

                    <l-select
                        v-model="dv.lispurdocs.ircadrnum"
                        :options="dv.lisVendor.custaddress"
                        :label="this.$gl(`Adres No`, `Address No`)"
                        style="min-width: 120px"
                        class="bg-yellow-1"
                        optValue="adrnum"
                        optTitle="addressname"
                        optCaptions="address"
                        @select="fetchIrcAdrnum()"
                    />
                </l-div-flex>
                <l-input
                    dense
                    :label="this.$gl(`Ünvan`, `Title`)"
                    v-model="dv.lispurdocs.irctitle"
                />
                <l-input
                    dense
                    :label="this.$gl(`İsim`, `Name`)"
                    v-model="dv.lispurdocs.ircname1"
                />
                <l-input
                    dense
                    :label="this.$gl(`Adres`, `Address`)"
                    v-model="dv.lispurdocs.ircaddress"
                />
                
                <l-div-flex>

                    <l-input
                        dense
                        :label="this.$gl(`Ülke`, `Country`)"
                        v-model="dv.lispurdocs.irccountry"
                    />
                  <l-input
                    dense
                    :label="this.$gl(`Şehir`, `City`)"
                    v-model="dv.lispurdocs.irccity"
                />
                <l-input
                    dense
                    :label="this.$gl(`Semt`, `District`)"
                    v-model="dv.lispurdocs.ircdistrict"
                />
                <l-input
                    dense
                    :label="this.$gl(`Kapı No`, `Building`)"
                    v-model="dv.lispurdocs.ircbuilding"
                />
                <l-input
                    dense
                    :label="this.$gl(`Posta Kodu`, `Post Code`)"
                    v-model="dv.lispurdocs.ircpostcode"
                />
                    
                    <l-input
                        dense
                        :label="this.$gl(`Dil`, `Language`)"
                        v-model="dv.lispurdocs.irclangu"
                    />
                    <l-input
                        dense
                        :label="this.$gl(`Telefon`, `Phone Number`)"
                        v-model="dv.lispurdocs.irctelnum"
                    />
                    <l-input
                        dense
                        :label="this.$gl(`Fax`, `Fax`)"
                        v-model="dv.lispurdocs.ircfaxnum"
                    />
                </l-div-flex>
               
                <l-separator/>
                <l-div-flex>
                    <l-input
                        dense
                        :label="this.$gl(`Vergi Dairesi`, `Tax Administration`)"
                        v-model="dv.lispurdocs.irctaxdept"
                    />
                    <l-input
                        dense
                        :label="this.$gl(`Vergi No`, `Tax Number`)"
                        v-model="dv.lispurdocs.irctaxnum"
                    />
                    <l-input
                    dense
                    :label="
                        this.$gl(`Satınalma Bölümü`, `Purchasing Department`)
                    "
                    v-model="dv.lispurdocs.ircpurdept"
                />
                </l-div-flex>
            </l-card-section>
        </l-card>
    </l-div-flex>
</template>

<script>
export default {
    props: ["dv", "tabInfo"],

    data() {
        return {
            grcAdrList: [],
            ircAdrList: [],
        };
    },

    methods: {
        fetchGrcSend(Pevent) {
            console.log("fetchIrcsend");
            if (this.dv.lispurdocs.isgrcsend == true) {
                console.log("fetchgrcsend true");
                this.dv.lispurdocs.grcsend = this.dv.lisVendor.customer;
                this.dv.lispurdocs.grctitle = this.dv.lisVendor.title;
                this.dv.lispurdocs.grcname1 = this.dv.lisVendor.name1;
                this.dv.lispurdocs.grctaxdept = this.dv.lisVendor.taxdept;
                this.dv.lispurdocs.grctaxnum = this.dv.lisVendor.taxnum;
                this.dv.lispurdocs.grcwebsite = this.dv.lisVendor.website;
                this.dv.lispurdocs.grcpurdept = this.dv.lisVendor.purdept;

                this.grcAdrList = this.dv.lisVendor.custaddress;
                this.grcAdrList.forEach((e) => {
                    e.value = e.adrnum;
                });
            } else {
                console.log("fetchgrcsend else", Pevent);
                this.dv.lispurdocs.grcsend = Pevent?.customer;
                this.dv.lispurdocs.grctitle = Pevent?.title;
                this.dv.lispurdocs.grcname1 = Pevent?.name1;
                this.dv.lispurdocs.grctaxdept = Pevent?.taxdept;
                this.dv.lispurdocs.grctaxnum = Pevent?.taxnum;
                this.dv.lispurdocs.grcwebsite = Pevent?.website;
                this.dv.lispurdocs.grcpurdept = Pevent?.purdept;

                this.grcAdrList = Pevent?.custaddress;
                this.grcAdrList.forEach((e) => {
                    e.value = e.adrnum;
                });
            }
        },

        fetchGrcAdrnum() {
            let myAdrInfos = this.grcAdrList.filter((e) => {
                return e.adrnum == this.dv.lispurdocs.grcadrnum;
            });
            console.log("fetchgrcAdrnum", myAdrInfos[0]);
            this.dv.lispurdocs.grcaddress = myAdrInfos[0].address;
            this.dv.lispurdocs.grccountry = myAdrInfos[0].country;
            this.dv.lispurdocs.grclangu = myAdrInfos[0].langu;
            this.dv.lispurdocs.grccity = myAdrInfos[0].city;
            this.dv.lispurdocs.grcpostcode = myAdrInfos[0].postcode;
            this.dv.lispurdocs.grctelnum = myAdrInfos[0].telnum;
            this.dv.lispurdocs.grcfaxnum = myAdrInfos[0].faxnum;
            this.dv.lispurdocs.grcemail = myAdrInfos[0].email;
        },

        fetchIrcSend(Pevent) {
            console.log("fetchIrcsend");
            if (this.dv.lispurdocs.isircsend == true) {
                console.log("fetchIrcsend true");
                this.dv.lispurdocs.ircsend = this.dv.lisVendor.customer;
                this.dv.lispurdocs.irctitle = this.dv.lisVendor.title;
                this.dv.lispurdocs.ircname1 = this.dv.lisVendor.name1;
                this.dv.lispurdocs.irctaxdept = this.dv.lisVendor.taxdept;
                this.dv.lispurdocs.irctaxnum = this.dv.lisVendor.taxnum;
                this.dv.lispurdocs.ircwebsite = this.dv.lisVendor.website;
                this.dv.lispurdocs.ircpurdept = this.dv.lisVendor.purdept;

                this.ircAdrList = this.dv.lisVendor.custaddress;
                this.ircAdrList.forEach((e) => {
                    e.value = e.adrnum;
                });
            } else {
                console.log("fetchIrcsend else", Pevent);
                this.dv.lispurdocs.ircsend = Pevent?.customer;
                this.dv.lispurdocs.irctitle = Pevent?.title;
                this.dv.lispurdocs.ircname1 = Pevent?.name1;
                this.dv.lispurdocs.irctaxdept = Pevent?.taxdept;
                this.dv.lispurdocs.irctaxnum = Pevent?.taxnum;
                this.dv.lispurdocs.ircwebsite = Pevent?.website;
                this.dv.lispurdocs.ircpurdept = Pevent?.purdept;

                this.ircAdrList = Pevent?.custaddress;
                this.ircAdrList.forEach((e) => {
                    e.value = e.adrnum;
                });
            }
        },

        fetchIrcAdrnum() {
            let myAdrInfos = this.ircAdrList.filter((e) => {
                return e.adrnum == this.dv.lispurdocs.ircadrnum;
            });
            console.log("fetchIrcAdrnum", myAdrInfos[0]);
            this.dv.lispurdocs.ircaddress = myAdrInfos[0].address;
            this.dv.lispurdocs.irccountry = myAdrInfos[0].country;
            this.dv.lispurdocs.irclangu = myAdrInfos[0].langu;
            this.dv.lispurdocs.irccity = myAdrInfos[0].city;
            this.dv.lispurdocs.ircpostcode = myAdrInfos[0].postcode;
            this.dv.lispurdocs.irctelnum = myAdrInfos[0].telnum;
            this.dv.lispurdocs.ircfaxnum = myAdrInfos[0].faxnum;
            this.dv.lispurdocs.ircemail = myAdrInfos[0].email;
        },
    },
};
</script>
