<template>
  <l-div-flex style="width: 100%">
    <l-card style="width: 49%; min-width: 320px">
      <l-card-section>
        <div class="text-overline">
          {{ this.$gl("Mal Alıcısı", "Goods Buyer") }}
        </div>
      </l-card-section>
      <l-separator inset />
      <l-card-section>
        <l-div-flex>
          <l-checkbox
            dense
            :label="this.$gl(`Aynı Firma`, `Same Company`)"
            v-model="dv.lissaldocs.isgrcrecv"
            @click="fetchGrcRecv()"
          />

          <l-input
            :label="this.$gl(`Malı Alan Firma`, `Company Receiving the Goods`)"
            dense
            v-model="dv.lissaldocs.grcrecv"
          >
            <l-chip
              class="bg-white"
              icon="search"
              dense
              clickable
              @click="dv.lissaldocs.isSelectGrc = !dv.lissaldocs.isSelectGrc"
            >
              <BAST02D01mini
                :pComp="dv.lissaldocs.company"
                :isShow="dv.lissaldocs.isSelectGrc"
                @ok="
                  dv.lissaldocs.isgrcrecv = false;
                  fetchGrcRecv($event);
                  dv.lissaldocs.isSelectGrc = false;
                "
                @cancel="dv.lissaldocs.isSelectGrc = false"
              />
            </l-chip>
          </l-input>
          <l-select
            v-model="dv.lissaldocs.grcadrnum"
            :options="grcAdrList"
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
          v-model="dv.lissaldocs.grctitle"
        />
        <l-input
          dense
          :label="this.$gl(`İsim`, `Name`)"
          v-model="dv.lissaldocs.grcname1"
        />
        <l-input
          dense
          :label="this.$gl(`Adres`, `Address`)"
          v-model="dv.lissaldocs.grcaddress"
        />

        <l-div-flex>
        
          <l-select
            :class="dv.lissaldocs.edoctype == 3 ? 'bg-blue-1' : 'bg-white'"
            :label="this.$gl(`Ülke`, `Country`)"
            v-model="dv.lissaldocs.grccountry"
            options="lisbas005"
            optValue="country"
            optTitle="stext"
            optCaptions="country"
            width="198px"
          />

          <l-select
            :class="dv.lissaldocs.edoctype == 3 ? 'bg-blue-1' : 'bg-white'"
            :label="this.$gl(`Şehir`, `City`)"
            v-model="dv.lissaldocs.grccity"
            options="lisbas006"
            optValue="city"
            optTitle="stext"
            optCaptions="city"
            width="198px"
          />
          <l-input
            dense
            :label="this.$gl(`Semt`, `District`)"
            v-model="dv.lissaldocs.grcdistrict"
            :class="dv.lissaldocs.edoctype == 3 ? 'bg-blue-1' : 'bg-white'"
          />
          <l-input
            dense
            :label="this.$gl(`Kapı No`, `Building`)"
            v-model="dv.lissaldocs.grcbuilding"
            :class="dv.lissaldocs.edoctype == 3 ? 'bg-blue-1' : 'bg-white'"
          />

          <l-input
            dense
            :label="this.$gl(`Posta Kodu`, `Post Code`)"
            v-model="dv.lissaldocs.grcpostcode"
            :class="dv.lissaldocs.edoctype == 3 ? 'bg-blue-1' : 'bg-white'"
          />
          <l-select
            :label="this.$gl(`Dil`, `Language`)"
            v-model="dv.lissaldocs.grclangu"
            options="lisbas019"
            optValue="langu"
            optTitle="stext"
            optCaptions="langu"
            width="198px"
          />
        </l-div-flex>

        <l-div-flex>
          <l-input
            :label="this.$gl(`Telefon`, `Telephone Number`)"
            v-model="dv.lissaldocs.grctelnum"
          />
          <l-input
            :label="this.$gl(`Fax`, `Fax`)"
            v-model="dv.lissaldocs.grcfaxnum"
          />
          <l-input
            :label="this.$gl(`E-Mail`, `E-Mail`)"
            v-model="dv.lissaldocs.grcemail"
          />
          <l-input
            :label="this.$gl(`Web Sitesi`, `Website`)"
            v-model="dv.lissaldocs.grcwebsite"
          />
        </l-div-flex>

        <l-separator />
        <l-div-flex>
          <l-input
            label="Şoför adı"
            v-model="dv.lissaldocs.drivername"
            :class="dv.lissaldocs.edoctype == 3 ? 'bg-blue-1' : 'bg-white'"
          />
          <l-input
            dense
            label="Şoför soyadı"
            v-model="dv.lissaldocs.driversurname"
            :class="dv.lissaldocs.edoctype == 3 ? 'bg-blue-1' : 'bg-white'"
          />
          <l-input
            dense
            label="Şoför TC no"
            v-model="dv.lissaldocs.driverid"
            :class="dv.lissaldocs.edoctype == 3 ? 'bg-blue-1' : 'bg-white'"
          />
          <l-input
            dense
            label="Plaka"
            v-model="dv.lissaldocs.driverplate"
            :class="dv.lissaldocs.edoctype == 3 ? 'bg-blue-1' : 'bg-white'"
          />
        </l-div-flex>

        <l-separator />

        <l-div-flex>
          <l-input
            dense
            :label="this.$gl(`Vergi Dairesi`, `Tax Administration`)"
            v-model="dv.lissaldocs.grctaxdept"
          />
          <l-input
            dense
            :label="this.$gl(`Vergi No`, `Tax No`)"
            v-model="dv.lissaldocs.grctaxnum"
          />

          <l-input
            dense
            :label="this.$gl(`Satış Bölümü`, `Sales Department`)"
            v-model="dv.lissaldocs.grcsaldept"
          />
        </l-div-flex>
      </l-card-section>
    </l-card>

    <l-card style="width: 49%; min-width: 320px">
      <l-card-section>
        <div class="text-overline">
          {{ this.$gl("Fatura Alıcısı", "Invoice Taker") }}
        </div>
      </l-card-section>
      <l-separator inset />
      <l-card-section>
        <l-div-flex>
          <l-checkbox
            dense
            :label="this.$gl(`Aynı Firma`, `Same Company`)"
            v-model="dv.lissaldocs.isircrecv"
            @click="fetchIrcRecv()"
          />

          <l-input
            :label="
              this.$gl(`Faturayı Alan Firma`, `Company Receiving Invoice`)
            "
            dense
            v-model="dv.lissaldocs.ircrecv"
          >
            <l-chip
              class="bg-white"
              icon="search"
              dense
              clickable
              @click="dv.lissaldocs.isSelectIrc = !dv.lissaldocs.isSelectIrc"
            >
              <BAST02D01mini
                :pComp="dv.lissaldocs.company"
                :isShow="dv.lissaldocs.isSelectIrc"
                @ok="
                  dv.lissaldocs.isircrecv = false;
                  fetchIrcRecv($event);
                  dv.lissaldocs.isSelectIrc = false;
                "
                @cancel="dv.lissaldocs.isSelectIrc = false"
              />
            </l-chip>
          </l-input>

          <l-select
            v-model="dv.lissaldocs.grcadrnum"
            :options="grcAdrList"
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
          v-model="dv.lissaldocs.irctitle"
        />
        <l-input
          dense
          :label="this.$gl(`İsim`, `Name`)"
          v-model="dv.lissaldocs.ircname1"
        />
        <l-input
          dense
          :label="this.$gl(`Adres`, `Address`)"
          v-model="dv.lissaldocs.ircaddress"
        />

        <l-div-flex>
          <l-select
            :label="this.$gl(`Ülke`, `Country`)"
            v-model="dv.lissaldocs.irccountry"
            options="lisbas005"
            optValue="country"
            optTitle="stext"
            optCaptions="country"
            width="198px"
          />

          <l-select
            :label="this.$gl(`Şehir`, `City`)"
            v-model="dv.lissaldocs.irccity"
            options="lisbas006"
            optValue="city"
            optTitle="stext"
            optCaptions="city"
            width="198px"
          />

          <l-input
            :label="this.$gl(`Semt`, `District`)"
            v-model="dv.lissaldocs.ircdistrict"
          />
          <l-input
            :label="this.$gl(`Kapı No`, `Building`)"
            v-model="dv.lissaldocs.ircbuilding"
          />
          <l-input
            :label="this.$gl(`Posta Kodu`, `Post Code`)"
            v-model="dv.lissaldocs.ircpostcode"
          />

          <l-select
            :label="this.$gl(`Dil`, `Language`)"
            v-model="dv.lissaldocs.irclangu"
            options="lisbas019"
            optValue="langu"
            optTitle="stext"
            optCaptions="langu"
            width="198px"
          />
        </l-div-flex>
        <l-div-flex>
          <l-input
            dense
            :label="this.$gl(`Telefon`, `Phone Number`)"
            v-model="dv.lissaldocs.irctelnum"
          />
          <l-input
            dense
            :label="this.$gl(`Fax`, `Fax`)"
            v-model="dv.lissaldocs.ircfaxnum"
          />
          <l-input
            dense
            :label="this.$gl(`E-Mail`, `E-Mail`)"
            v-model="dv.lissaldocs.ircemail"
          />
          <l-input
            dense
            :label="this.$gl(`Web Sitesi`, `Website`)"
            v-model="dv.lissaldocs.ircwebsite"
          />
        </l-div-flex>

        <l-separator />

        <l-div-flex>
          <l-input
            dense
            :label="this.$gl(`Vergi Dairesi`, `Tax Administration`)"
            v-model="dv.lissaldocs.irctaxdept"
          />
          <l-input
            dense
            :label="this.$gl(`Vergi No`, `Tax Number`)"
            v-model="dv.lissaldocs.irctaxnum"
          />

          <l-input
            dense
            :label="this.$gl(`Satış Bölümü`, `Sales Department`)"
            v-model="dv.lissaldocs.ircsaldept"
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
    fetchGrcRecv(Pevent) {
      console.log("fetchGrcRecv");
      if (this.dv.lissaldocs.isgrcrecv == true) {
        console.log("fetchgrcRecv true");
        this.dv.lissaldocs.grcrecv = this.dv.liscustomers.customer;
        this.dv.lissaldocs.grctitle = this.dv.liscustomers.title;
        this.dv.lissaldocs.grcname1 = this.dv.liscustomers.name1;
        this.dv.lissaldocs.grctaxdept = this.dv.liscustomers.taxdept;
        this.dv.lissaldocs.grctaxnum = this.dv.liscustomers.taxnum;
        this.dv.lissaldocs.grcwebsite = this.dv.liscustomers.website;
        this.dv.lissaldocs.grcsaldept = this.dv.liscustomers.saldept;

        this.grcAdrList = this.dv.liscustomers.custaddress;
        this.grcAdrList.forEach((e) => {
          e.value = e.adrnum;
        });
      } else {
        console.log("fetchgrcRecv else", Pevent);
        this.dv.lissaldocs.grcrecv = Pevent?.customer;
        this.dv.lissaldocs.grctitle = Pevent?.title;
        this.dv.lissaldocs.grcname1 = Pevent?.name1;
        this.dv.lissaldocs.grctaxdept = Pevent?.taxdept;
        this.dv.lissaldocs.grctaxnum = Pevent?.taxnum;
        this.dv.lissaldocs.grcwebsite = Pevent?.website;
        this.dv.lissaldocs.grcsaldept = Pevent?.saldept;

        this.grcAdrList = Pevent?.custaddress;
        this.grcAdrList.forEach((e) => {
          e.value = e.adrnum;
        });
      }
    },

    fetchGrcAdrnum() {
      let myAdrInfos = this.grcAdrList.filter((e) => {
        return e.adrnum == this.dv.lissaldocs.grcadrnum;
      });
      console.log("fetchgrcAdrnum", myAdrInfos[0]);
      this.dv.lissaldocs.grcaddress = myAdrInfos[0].address;
      this.dv.lissaldocs.grccountry = myAdrInfos[0].country;
      this.dv.lissaldocs.grclangu = myAdrInfos[0].langu;
      this.dv.lissaldocs.grccity = myAdrInfos[0].city;
      this.dv.lissaldocs.grcpostcode = myAdrInfos[0].postcode;
      this.dv.lissaldocs.grctelnum = myAdrInfos[0].telnum;
      this.dv.lissaldocs.grcfaxnum = myAdrInfos[0].faxnum;
      this.dv.lissaldocs.grcemail = myAdrInfos[0].email;
    },
    fetchIrcRecv(Pevent) {
      console.log("fetchIrcRecv");
      if (this.dv.lissaldocs.isircrecv == true) {
        console.log("fetchIrcRecv true");
        this.dv.lissaldocs.ircrecv = this.dv.liscustomers.customer;
        this.dv.lissaldocs.irctitle = this.dv.liscustomers.title;
        this.dv.lissaldocs.ircname1 = this.dv.liscustomers.name1;
        this.dv.lissaldocs.irctaxdept = this.dv.liscustomers.taxdept;
        this.dv.lissaldocs.irctaxnum = this.dv.liscustomers.taxnum;
        this.dv.lissaldocs.ircwebsite = this.dv.liscustomers.website;
        this.dv.lissaldocs.ircsaldept = this.dv.liscustomers.saldept;

        this.ircAdrList = this.dv.liscustomers.custaddress;
        this.ircAdrList.forEach((e) => {
          e.value = e.adrnum;
        });
      } else {
        console.log("fetchIrcRecv else", Pevent);
        this.dv.lissaldocs.ircrecv = Pevent?.customer;
        this.dv.lissaldocs.irctitle = Pevent?.title;
        this.dv.lissaldocs.ircname1 = Pevent?.name1;
        this.dv.lissaldocs.irctaxdept = Pevent?.taxdept;
        this.dv.lissaldocs.irctaxnum = Pevent?.taxnum;
        this.dv.lissaldocs.ircwebsite = Pevent?.website;
        this.dv.lissaldocs.ircsaldept = Pevent?.saldept;

        this.ircAdrList = Pevent?.custaddress;
        this.ircAdrList.forEach((e) => {
          e.value = e.adrnum;
        });
      }
    },

    fetchIrcAdrnum() {
      let myAdrInfos = this.ircAdrList.filter((e) => {
        return e.adrnum == this.dv.lissaldocs.ircadrnum;
      });
      console.log("fetchIrcAdrnum", myAdrInfos[0]);
      this.dv.lissaldocs.ircaddress = myAdrInfos[0].address;
      this.dv.lissaldocs.irccountry = myAdrInfos[0].country;
      this.dv.lissaldocs.irclangu = myAdrInfos[0].langu;
      this.dv.lissaldocs.irccity = myAdrInfos[0].city;
      this.dv.lissaldocs.ircpostcode = myAdrInfos[0].postcode;
      this.dv.lissaldocs.irctelnum = myAdrInfos[0].telnum;
      this.dv.lissaldocs.ircfaxnum = myAdrInfos[0].faxnum;
      this.dv.lissaldocs.ircemail = myAdrInfos[0].email;
    },
  },
};
</script>
