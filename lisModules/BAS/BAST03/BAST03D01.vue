<template>
  <div>
    <l-div v-if="dv.lisDialog == 'BAST03D01'">
      <!--Tittle Layer-->
      <l-card0>
        <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
          <l-icon size="md" name="list_alt" />

          <l-toolbar-title>{{
            this.$gl("Malzeme Kartları", "Material Cards")
          }}</l-toolbar-title>

          <l-btn
            icon="cancel"
            flat
            round
            dense
            color="negative"
            @click="this.$btnGoHome(tabInfo)"
          />
        </l-toolbar>
        <!--Searching Criterias Layer------>
        <l-div-flex>
          <l-select
                        :label="this.$gl(`Firma`, `Company`)"
                        v-model="dv.sc.company"
                        options="lisbas001"
                        optValue="company"
                        optTitle="stext"
                        optCaptions="company"
                        width="120px"
                        class="bg-blue-1"
                    />

          <l-input
            
            dense
            :label="this.$gl(`Malzeme Kodu`, `Material Code`)"
            v-model="dv.sc.material"
          />
          <l-input
            
            dense
            :label="this.$gl(`Malzeme Adı`, `Material Name`)"
            v-model="dv.sc.stext"
          />
          <l-input
            
            dense
            :label="
              this.$gl(`Malzeme Uzun Açıklaması`, `Material Long Description`)
            "
            v-model="dv.sc.ltext"
            style="width: 250px"
          />
          <l-select
            :label="this.$gl(`Tip`, `Type`)"
            v-model="dv.sc.mattype"
             options="lisbas009"
            optValue="mattype"
            optTitle="stext"
            optCaptions="mattype"
            width="150px"
          />
          <l-select
            :label="this.$gl(`Malz. Grp.`, `Material Group`)"
            v-model="dv.sc.matgrp"
           options="lisbas014"
            optValue="matgrp"
            optTitle="stext"
            optCaptions="matgrp"
            width="150px"
          />
          <l-select
            :label="this.$gl(`Statü`, `Status`)"
            v-model="dv.sc.matstat"
            options="lisbas010"
            optValue="matstat"
            optTitle="stext"
            optCaptions="matstat"
            width="150px"
          />

          <l-select
            :label="this.$gl(`Sektör`, `Sector`)"
             v-model="dv.sc.sector"
            options="lisbas004"
            optValue="sector"
            optTitle="stext"
            optCaptions="sector"
            width="130px"
          />

          <l-checkbox
            :label="this.$gl(`Silindi?`, `Is Delete?`)"
            v-model="dv.sc._deleted"
            color="pink"
          />
        </l-div-flex>

        <!--------------------------------->
      </l-card0>
      <!--Butons Layer Layer---------------------->


        <l-btn-group>
          <l-btn color="warning"  icon="search" @click="btnSearch(dv)" />
          <l-btn color="info"  icon="visibility" @click="btnShow(dv)" />
          <l-btn color="primary"  icon="edit" @click="btnEdit(dv)" />
          <l-btn color="secondary"  icon="add" @click="btnInsert(dv)" />
          <l-btn color="deep-orange"  icon="print" @click="btnPrint(dv)" />
        </l-btn-group>
   
      <!--Table Layer---------------------------->
      <!-- <q-markup-table flat bordered dense separator="cell">
        <thead>
          <tr class="bg-blue-grey-2">
            <th class="text-left" style="width: 20px"></th>
            <th class="text-left">{{ this.$gl("Malzeme", "Material") }}</th>
            <th class="text-left">{{ this.$gl("Tipi", "Type") }}</th>
            <th class="text-left">
              {{ this.$gl("Açıklaması", "Description") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in dv.materialList"
            :key="item.id"
            @click="dv.selectedRow = item._id"
            :class="dv.selectedRow == item._id ? 'bg-light-blue-1' : 'bg-white'"
          >
            <td class="text-left">
              <l-chip dense :label="index + 1" rounded  />
            </td>
            <td class="text-left">{{ item.material }}</td>
            <td class="text-left">{{ item.mattype }}</td>
            <td class="text-left">{{ item.stext }}</td>
            <q-menu touch-position context-menu>
              <q-list dense style="min-width: 100px">
                <q-item
                  clickable
                  class="bg-info text-white"
                  @click="btnShow(dv)"
                >
                  <q-item-section
                    >{{ this.$gl("Göster", "Show") }}
                  </q-item-section>
                  <q-item-section side>
                    <l-icon name="visibility" color="white" />
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  class="bg-primary text-white"
                  @click="btnEdit(dv)"
                >
                  <q-item-section
                    >{{ this.$gl("Düzenle", "Edit") }}
                  </q-item-section>
                  <q-item-section side>
                    <l-icon name="edit" color="white" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </tr>
        </tbody>
        <l-scroller
          :position="'bottom-right'"
          :icon="'keyboard_arrow_up'"
          :color="'brown-3'"
        />
      </q-markup-table> -->
      <l-table
        name="BAST03D01"
        :tableData="dv.materialList"
        :columns="myColumnsMat"
        :height="'75vh'"
        :width="'100%'"
        :readonly="true"
      />
    </l-div>
    <BAST03D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'BAST03D02'" />
    <div v-show="false">
        <BAST03D01PDF :dv="dv" />
    </div>
  </div>
</template>

<script>
import BAST03D02 from "./BAST03D02.vue";
import BAST03D01PDF from "./BAST03D01PDF.vue";

export default {
  props: ["lv", "goToTransaction", "currentTab", "tabInfo"],
  components: {
    BAST03D02,
    BAST03D01PDF,
  },

  data() {
    return {
      myColumnsMat: [
        {
          label: this.$gl("Malzeme", "Material"),
          value: "material",
          type: "string",
        },
        {
          label: this.$gl("Tipi", "Type"),
          value: "mattype",
          type: "string",
        },
        {
          label: this.$gl("Açıklaması", "Description"),
          value: "stext",
          type: "string",
        },
        {
          label: this.$gl("Sektör", "Sector"),
          value: "sector",
          type: "string",
        },
        {
          label: this.$gl("Malzeme Grubu", "Material Group"),
          value: "matgrp",
          type: "string",
        },
        {
          label: this.$gl("Stok Birimi", "Stock Unit"),
          value: "skunit",
          type: "string",
        },
        {
          label: this.$gl("Çıkış Birimi", "Output Unit"),
          value: "salunit",
          type: "string",
        },

        {
          label: this.$gl(
            "Malzeme Uzun Açıklaması",
            "Material Long Description"
          ),
          value: "ltext",
          type: "string",
        },
      ],
      dv: {
        lisDialog: "BAST03D01",
        modi: 2,
        selectedRow: "",
        materialList: [],
        lismaterials: {},
        sc: {
          company: "01",
         
          stext: "",
          material: "",
          
          //*** */
          
          //*** */
          
          //*** */
          
          //*** */
          matstat: "",
          
          mattype: "",
          
          matgrp: "",
         
          sector: "",
         
          ltext: "",
          _deleted: false,
        },
      },
    };
  },

  methods: {
    async btnSearch(prop) {
      this.dv = await this.lis.function("BAST03/01-btnSearch", prop);
      console.log(prop);
      this.dv.selectedRow = "";
    },
    async btnEdit(prop) {
      this.dv = await this.lis.function("BAST03/01-btnEdit", prop);
    },
    async btnShow(prop) {
      this.dv = await this.lis.function("BAST03/01-btnShow", prop);
    },
    async btnInsert(prop) {
      this.dv = await this.lis.function("BAST03/01-btnInsert", prop);
    },
    async btnPrint() {
            this.lis.printPDF("BAST03D01PDF", "Malzeme Kartları Raporu");
        },
    async init(prop) {
      this.dv = await this.lis.function("BAST03/01-init", this.dv);
    },
  },

  mounted() {
    this.init(this.dv);
    console.log("mounted worked");
  },
};
</script>
