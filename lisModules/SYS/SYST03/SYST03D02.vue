<template>
  <l-div>
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-toolbar>
          <l-icon size="md" name="assignment_ind" />

          <l-toolbar-title>{{
            this.$gl(`Kullanıcı Detayı`, `User Detail`)
          }}</l-toolbar-title>

          <l-btn
            v-if="dv.modi != 2"
            icon="save"
            color="teal"
            @click="btnSave()"
          />
          <l-btn icon="cancel" color="negative" @click="cancel()" />
        </l-toolbar>
      </l-toolbar>

      <l-div-flex>
        <l-input
          dense
          :label="this.$gl(`Kullanıcı Adı`, `User name`)"
          v-model="dv.olisusers.username"
          :readonly="dv.modi == 2 ? true : false"
        ></l-input>

        <l-input
          dense
          :label="this.$gl(`Şifre`, `Password`)"
          v-model="dv.olisusers.password"
        ></l-input>

        <l-input
          dense
          label="E-mail"
          v-model="dv.olisusers.email"
          :readonly="
            (product_LICENSE == 'Express') & (dv.modi < 1) ? false : true
          "
        ></l-input>

        <l-checkbox
          v-model="dv.olisusers.issuperuser"
          :label="this.$gl(`Anahtar Kullanıcı?`, `Key User?`)"
        />
        <l-checkbox
          v-model="dv.olisusers.isblocked"
          :label="this.$gl(`Blokeli?`, `Blocked?`)"
        />

        <l-checkbox
          v-model="dv.olisusers._deleted"
          :label="this.$gl(`Sil`, `Deleted`)"
          color="negative"
        />

        <l-input
          dense
          :label="this.$gl(`Adres Defteri İsim`, `Address Book Name`)"
          v-model="dv.olisusers.name"
        ></l-input>
        <l-input
          dense
          :label="this.$gl(`Adres Defteri Soyİsim`, `Address Book Surname`)"
          v-model="dv.olisusers.surname"
        ></l-input>
      </l-div-flex>
      <hr />

      <l-tabs v-model="tab">
        <l-tab name="Sistem" :label="this.$gl(`Sistem`, `System`)"> </l-tab>
        <l-tab
          name="Uygulama Hakları"
          :label="this.$gl(`Uygulama Hakları`, `Application Rights`)"
        />
        <l-tab
          name="Destek Döküman Hakları"
          :label="this.$gl(`Destek Döküman Hakları`, `Support Document Rights`)"
        />
        <l-tab name="Gruplar" :label="this.$gl(`Gruplar`, `Groups`)" />
      </l-tabs>

      <l-separator />

      <l-tab-panels v-model="tab" animated>
        <l-tab-panel name="Sistem" class="row">
          <l-input
            type="number"
            :label="this.$gl(`Oturum Açma Hakkı`, `Right to login`)"
            v-model="dv.olisusers.loginright"
            dense
          />
        </l-tab-panel>
        <l-tab-panel name="Uygulama Hakları">
          <q-markup-table flat bordered dense>
            <thead class="bg-blue-grey-2">
              <td style="width: 25%">
                {{ this.$gl(`Uygulama Kodu`, `Application Code`) }}
              </td>
              <td></td>
            </thead>
            <tbody>
              <tr v-for="index in dv.olisusers.trights.length" :key="index">
                <td>
                  <l-input
                    v-model="dv.olisusers.trights[index]"
                    :dense="dense"
                  />
                </td>
              </tr>
            </tbody>
            <l-btn
              round
              dense
              color="teal"
              icon="add"
              @click="dv.olisusers.trights.push('')"
            />
          </q-markup-table>
        </l-tab-panel>
        <l-tab-panel name="Destek Döküman Hakları">
          <q-markup-table>
            <thead class="bg-blue-grey-2">
              <td style="width: 25%">
                {{ this.$gl(`Destek Döküman Kodu`, `Support Document Code`) }}
              </td>
              <td></td>
            </thead>
            <tbody>
              <tr v-for="index in dv.olisusers.scrights.length" :key="index">
                <td>
                  <l-input
                    v-model="dv.olisusers.scrights[index]"
                    :dense="dense"
                  />
                </td>
              </tr>
            </tbody>
            <l-btn
              round
              dense
              color="teal"
              icon="add"
              @click="
                dv.olisusers.scrights.push({
                  value: '',
                })
              "
            />
          </q-markup-table>
        </l-tab-panel>
        <l-tab-panel name="Gruplar">
          <l-table
            name="SYST03D02"
            v-model="dv.lisGroupsList"
            :columns="myColumnsGroups"
            :readonly="true"
          />
        </l-tab-panel>
      </l-tab-panels>
    </l-card0>
  </l-div>
</template>

<script>
import Crypto from "../../../lisRunner/configs/lisCrypto.js";
export default {
  props: ["dv", "tabInfo"],
  data() {
    return {
      dense: true,
      tab: "Sistem",
      product_LICENSE: localStorage.product_LICENSE,
      myColumnsGroups: [
        {
          label: this.$gl(`Firma`, `Company`),
          value: "company",
          type: "string",
        },

        {
          label: this.$gl(`Grup`, `Group`),
          value: "group",
          type: "string",
        },
        {
          label: this.$gl(`Açıklama`, `Description`),
          value: "stext",
          type: "string",
        },
      ],
    };
  },

  methods: {
    async btnSave() {
      if (this.dv.olisusers.username == "") {
        this.lis.alert("w", "Lütfen Kullancı Adı Giriniz!");
        return;
      }

      if (
        (localStorage.product_LICENSE == "Express") &
        (this.dv.olisusers.email == "")
      ) {
        this.lis.alert("w", "Lütfen Mail Giriniz!");
        return;
      }

      if (localStorage.product_LICENSE == "Express") {
        await this.ctrlEmailDuplicate(this.dv);
        return;
      }

      if (this.dv.olisusers.password.length != 64) {
        this.dv.olisusers.password = Crypto.textToScha256(
          this.dv.olisusers.password
        ).toString();
      }

      if (localStorage.product_LICENSE == "Express") {
        await this.lis.function(
          "https://lyz.liserp.com/lisApi/cmp-system.updateUser",
          this.dv
        );
      }

      await this.lis.function("SYST03/02-btnSave", this.dv);

      this.lis.alert("p", "Kullanıcı Ayarları Kaydedildi.");
      this.cancel();
    },

    async ctrlEmailDuplicate() {
      await this.lis.callWebService(
        "https://lyz.liserp.com/lisApi/cmp-system.ctrlEmailDuplicate",
        this.dv
      );
    },
    cancel() {
      this.dv.lisDialog = "SYST03D01";
      this.tabInfo.blockGoToTransaction = false;
    },
    async init() {
      console.log("çalıştı çalıştı", this.dv);

      let list = await this.lis.function("SYST03/02-init", this.dv);
      this.dv.lisGroupsList = list.lisGroupsList;
      //this.dv.lisGroupsList
      console.log("lisGroupsList", this.dv.lisGroupsList);
      //this.dvt = [...this.dv];
    },
  },
  mounted() {
    this.init(this.dv);
  },
};
</script>
